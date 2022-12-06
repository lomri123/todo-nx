import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  TodoItemBase,
  TodoItemSentState,
  ItemSentStates,
  TodoItemState,
  InitialState,
  ItemToupdate,
} from './types';
import SentStatusFSM from '../machine/state-machine';

function useTodoListHook(initialState: InitialState = []) {
  const [todoList, setTodoList] = useState<TodoItemBase[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [itemToupdateState, setItemToUpdateState] = useState<ItemToupdate>(
    {} as ItemToupdate
  );
  const [todoSentStateList, setTodoSentStateList] = useState<
    TodoItemSentState[]
  >([]);

  useEffect(() => {
    if (
      Array.isArray(initialState) &&
      initialState.length > 0 &&
      !initialized
    ) {
      setInitialized((curr) => !curr);
      setTodoList(initialState);
    }
  }, [initialState, initialized]);

  useEffect(() => {
    if (itemToupdateState && Object.keys(itemToupdateState).length > 0) {
      const { newState, tempId, newId } = itemToupdateState;

      const sentItem = todoSentStateList.filter(
        (todoSentState) => todoSentState.id === tempId
      )[0];
      if (sentItem) {
        if (newState === ItemSentStates.complete) {
          sentItem.sentStateMachine.complete();
        }
        if (newState === ItemSentStates.error) {
          sentItem.sentStateMachine.error();
        }
        if (newState === ItemSentStates.sent) {
          sentItem.sentStateMachine.resend();
        }
        sentItem.id = newId || tempId;
        setTodoSentStateList(
          todoSentStateList.map((todoSentState) =>
            todoSentState.id === tempId ? sentItem : todoSentState
          )
        );
      }
    }
  }, [itemToupdateState]);

  const _toggleTodoItemState = (state: TodoItemState): TodoItemState => {
    const oppositeState = {
      pending: 'complete',
      complete: 'pending',
    };

    return oppositeState[state] as TodoItemState;
  };

  const toggleTodoItem = (todoItemId: string) => {
    const newTodoList = todoList.map((todoItem) =>
      todoItem.id === todoItemId
        ? { ...todoItem, state: _toggleTodoItemState(todoItem.state) }
        : todoItem
    );
    setTodoList(newTodoList);
  };

  const updateTodoItemSentState = (
    newState: ItemSentStates,
    tempId: string,
    newId?: string
  ) => {
    setItemToUpdateState({ newState, tempId, newId });
  };

  const addTodoItem = (todoItemText: string) => {
    const todoItem: TodoItemBase = {
      text: todoItemText,
      state: TodoItemState.pending,
      id: uuidv4(),
    };
    const todoSentState = {
      ...todoItem,
      sentStateMachine: new SentStatusFSM(),
    };
    setTodoSentStateList((prevState) => [...prevState, todoSentState]);
    setTodoList([...todoList, todoItem]);
    return todoItem;
  };

  const removeTodoItem = (todoItemId: string) => {
    const filteredTodoList = todoList.filter(
      (todoItem) => todoItem.id !== todoItemId
    );
    setTodoList(filteredTodoList);
  };

  return {
    todoList,
    todoSentStateList,
    toggleTodoItem,
    addTodoItem,
    removeTodoItem,
    updateTodoItemSentState,
  };
}

export default useTodoListHook;

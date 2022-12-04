import { useState } from 'react';
import { TodoItemBase, TodoItemState } from './types';

function useTodoListHook(initialState = []) {
  const [todoList, setTodoList] = useState<TodoItemBase[]>(initialState);

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
  const addTodoItem = (todoItem: TodoItemBase) => {
    setTodoList((currList) => [...currList, todoItem]);
  };

  const removeTodoItem = (todoItemId: string) => {
    const filteredTodoList = todoList.filter(
      (todoItem) => todoItem.id !== todoItemId
    );
    setTodoList(filteredTodoList);
  };

  return { todoList, toggleTodoItem, addTodoItem, removeTodoItem };
}

export default useTodoListHook;

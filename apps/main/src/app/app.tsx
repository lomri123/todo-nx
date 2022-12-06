import { KeyboardEvent, MouseEvent } from 'react';
import Todo, {
  ITodoItem,
  useTodoListHook,
  ItemSentStates,
} from '@todo-nx/todo';

import todoApi from '../store';

export function App() {
  const { data: todos } = todoApi.useGetAllQuery();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();
  const {
    todoList,
    todoSentStateList,
    toggleTodoItem,
    addTodoItem,
    removeTodoItem,
    updateTodoItemSentState,
  } = useTodoListHook(todos);

  const handleTodoItemToggle = async (
    event: MouseEvent,
    todoItem: ITodoItem
  ) => {
    const newState =
      todoItem.state === Todo.State.complete
        ? Todo.State.pending
        : Todo.State.complete;
    const newTodoItem = { ...todoItem, state: newState };
    try {
      await updateTodo(newTodoItem);
      toggleTodoItem(todoItem.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoItemDelete = async (
    event: MouseEvent,
    todoItem: ITodoItem
  ) => {
    try {
      await deleteTodo(todoItem);
      removeTodoItem(todoItem.id);
    } catch (error) {
      console.log(error);
    }
  };
  const onTodoInputSubmit = async (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoItemText: string
  ) => {
    const tempItem: ITodoItem = addTodoItem(todoItemText);
    try {
      const reponse = await addTodo(todoItemText);
      setTimeout(() => {
        updateTodoItemSentState(
          ItemSentStates.complete,
          tempItem.id,
          // @ts-ignore
          reponse.data.id
        );
      }, 2000);
    } catch (error) {
      updateTodoItemSentState(ItemSentStates.error, tempItem.id);
      console.log(error);
    }
  };
  return (
    <Todo
      todoList={todoList}
      todoSentStateList={todoSentStateList}
      onItemToggle={handleTodoItemToggle}
      onItemDelete={handleTodoItemDelete}
      onTodoInputSubmit={onTodoInputSubmit}
    />
  );
}

export default App;

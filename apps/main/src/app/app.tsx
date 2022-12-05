/* eslint-disable @typescript-eslint/ban-ts-comment */
import { KeyboardEvent, MouseEvent } from 'react';
import Todo, { ITodoItem } from '@todo-nx/todo';

import todoApi from '../store';

export function App() {
  const { data: todos } = todoApi.useGetAllQuery();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  console.log('todos', todos);
  const todoList: ITodoItem[] = [
    { id: 'item-1', text: 'item 1', state: Todo.State['complete'] },
  ];
  // @ts-ignore
  const handleTodoItemToggle = (event, text) => {
    console.log('handleTodoItemToggle', event, text);
  };
  // @ts-ignore
  const handleTodoItemDelete = (event, todo) => {
    deleteTodo(todo);
  };
  const onTodoInputSubmit = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoText: string
  ) => {
    addTodo(todoText);
  };
  return (
    <Todo
      todoList={todos}
      // @ts-ignore
      onItemToggle={handleTodoItemToggle}
      // @ts-ignore
      onItemDelete={handleTodoItemDelete}
      onTodoInputSubmit={onTodoInputSubmit}
    />
  );
}

export default App;

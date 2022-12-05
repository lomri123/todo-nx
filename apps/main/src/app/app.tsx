import { KeyboardEvent, MouseEvent } from 'react';
import Todo, { ITodoItem } from '@todo-nx/todo';

import todoApi from '../store';

export function App() {
  const { data: todos } = todoApi.useGetAllQuery();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const handleTodoItemToggle = (event: MouseEvent, todoItem: ITodoItem) => {
    const newState =
      todoItem.state === Todo.State.complete
        ? Todo.State.pending
        : Todo.State.complete;
    const newTodoItem = { ...todoItem, state: newState };
    updateTodo(newTodoItem);
  };

  const handleTodoItemDelete = (event: MouseEvent, todoItem: ITodoItem) => {
    deleteTodo(todoItem);
  };
  const onTodoInputSubmit = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoItemText: string
  ) => {
    addTodo(todoItemText);
  };
  return (
    <Todo
      todoList={todos}
      onItemToggle={handleTodoItemToggle}
      onItemDelete={handleTodoItemDelete}
      onTodoInputSubmit={onTodoInputSubmit}
    />
  );
}

export default App;

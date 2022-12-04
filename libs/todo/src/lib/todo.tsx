import { KeyboardEvent, MouseEvent, MouseEventHandler } from 'react';
import TodoInput from './todo-input';
import TodoItem from './todo-item';
import TodoList from './todo-list';
import styles from './todo.module.scss';
import { TodoItemBase } from './types';

export interface TodoProps {
  todoList: TodoItemBase[];
  onItemToggle: MouseEventHandler;
  onItemDelete: MouseEventHandler;
  onTodoInputSubmit: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoText: string
  ) => void;
}

const Todo = ({
  todoList,
  onItemToggle,
  onItemDelete,
  onTodoInputSubmit,
}: TodoProps) => {
  return (
    <div className={styles['container']}>
      <TodoList>
        {todoList.map((todoItem) => {
          const { id, state, text } = todoItem;
          return (
            <TodoItem
              id={id}
              state={state}
              text={text}
              onItemToggle={onItemToggle}
              onItemDelete={onItemDelete}
            />
          );
        })}
      </TodoList>
      <TodoInput onTodoInputSubmit={onTodoInputSubmit} />
    </div>
  );
};

export default Todo;

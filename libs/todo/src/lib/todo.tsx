import TodoInput from './todo-input';
import TodoList from './todo-list';
import styles from './todo.module.scss';
import { TodoItemBase } from './types';

export interface TodoProps {
  todoList: TodoItemBase[];
}

export function Todo(props: TodoProps) {
  return (
    <div className={styles['container']}>
      <TodoList />
      <TodoInput />
    </div>
  );
}

export default Todo;

import styles from './todo.module.scss';

/* eslint-disable-next-line */
export interface TodoProps {}

export function Todo(props: TodoProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Todo!</h1>
    </div>
  );
}

export default Todo;

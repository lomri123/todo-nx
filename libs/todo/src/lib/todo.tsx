import TodoInput from './todo-input';
import TodoItem from './todo-item';
import TodoList from './todo-list';
import styles from './todo.module.scss';
import {
  TodoItemBase,
  TodoItemActions,
  TodoInputActions,
  TodoItemState,
} from './types';

export interface TodoProps extends TodoItemActions, TodoInputActions {
  todoList?: TodoItemBase[];
  initialInputText?: string;
}

const Todo = ({
  todoList,
  initialInputText,
  onItemToggle,
  onItemDelete,
  onTodoInputSubmit,
}: TodoProps) => {
  return (
    <div className={styles['container']}>
      <TodoList>
        {todoList?.map((todoItem) => {
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
      <TodoInput
        onTodoInputSubmit={onTodoInputSubmit}
        initialText={initialInputText}
      />
    </div>
  );
};

export default Object.assign(Todo, {
  State: TodoItemState,
}) as typeof Todo & {
  State: typeof TodoItemState;
};

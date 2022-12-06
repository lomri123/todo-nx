import { useCallback } from 'react';

import TodoInput from './todo-input';
import TodoItem from './todo-item';
import TodoList from './todo-list';
import styles from './todo.module.scss';
import {
  TodoItemBase,
  TodoItemActions,
  TodoInputActions,
  TodoItemState,
  TodoItemSentState,
  ItemSentStates,
} from './types';

export interface TodoProps extends TodoItemActions, TodoInputActions {
  todoList?: TodoItemBase[];
  todoSentStateList?: TodoItemSentState[];
  initialInputText?: string;
}

const stateColor: { [index: string]: string } = {
  [ItemSentStates.sent]: 'gray',
  [ItemSentStates.complete]: 'black',
  [ItemSentStates.error]: 'red',
  black: 'black',
};

const Todo = ({
  todoList,
  todoSentStateList,
  initialInputText,
  onItemToggle,
  onItemDelete,
  onTodoInputSubmit,
}: TodoProps) => {
  const todoSentState = useCallback(
    (id: string) => {
      const filteredSentState = todoSentStateList?.filter(
        (todoSentState) => todoSentState.id === id
      )?.[0];
      const currentState =
        filteredSentState?.sentStateMachine?.getCurrentState();

      return stateColor[currentState || 'black'];
    },
    [todoSentStateList]
  );
  return (
    <div className={styles['container']}>
      <TodoList>
        {todoList?.map((todoItem) => {
          const { id, state, text } = todoItem;
          return (
            <TodoItem
              key={id}
              id={id}
              state={state}
              sentStateColor={todoSentState(id)}
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

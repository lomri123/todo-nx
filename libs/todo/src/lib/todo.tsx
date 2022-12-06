import { useCallback } from 'react';
import Box from '@mui/material/Box';

import TodoInput from './todo-input';
import TodoItem from './todo-item';
import TodoList from './todo-list';
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
    <Box display="flex" flexDirection="column" width="100%">
      <TodoInput
        onTodoInputSubmit={onTodoInputSubmit}
        initialText={initialInputText}
      />
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
    </Box>
  );
};

export default Object.assign(Todo, {
  State: TodoItemState,
}) as typeof Todo & {
  State: typeof TodoItemState;
};

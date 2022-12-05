import { KeyboardEvent, MouseEvent } from 'react';

export enum TodoItemState {
  pending = 'pending',
  complete = 'complete',
}

export interface TodoItemBase {
  id: string;
  text: string;
  state: TodoItemState;
}

export interface TodoItemActions {
  onItemToggle: (event: MouseEvent, todoItem: TodoItemBase) => void;
  onItemDelete: (event: MouseEvent, todoItem: TodoItemBase) => void;
}

export interface TodoInputActions {
  onTodoInputSubmit: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoText: string
  ) => void;
}

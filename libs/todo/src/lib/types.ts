import { KeyboardEvent, MouseEvent } from 'react';
import SentStatusFSM from '../machine/state-machine';

export enum TodoItemState {
  pending = 'pending',
  complete = 'complete',
}

export enum ItemSentStates {
  sent = 'sent',
  complete = 'complete',
  error = 'error',
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

export interface TodoItemSentState extends TodoItemBase {
  sentStateMachine: SentStatusFSM;
}

export type ItemToupdate = {
  newState: ItemSentStates;
  tempId: string;
  newId?: string;
};

export type InitialState = TodoItemBase[] | undefined;

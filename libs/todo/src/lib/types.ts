export enum TodoItemState {
  pending = 'pending',
  complete = 'complete',
}

export interface TodoItemBase {
  id: string;
  text: string;
  state: TodoItemState;
}

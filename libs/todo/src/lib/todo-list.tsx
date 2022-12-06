import { ReactNode } from 'react';
import List from '@mui/material/List';

export interface TodoListProps {
  children?: ReactNode;
}

export function TodoList(props: TodoListProps) {
  const { children } = props;
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{children}</List>
  );
}

export default TodoList;

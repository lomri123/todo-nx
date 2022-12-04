import { MouseEventHandler } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoItemBase, TodoItemState } from './types';

export interface TodoItemProps extends TodoItemBase {
  onItemToggle: MouseEventHandler;
  onItemDelete: MouseEventHandler;
}

const TodoItem = ({
  id,
  text,
  state,
  onItemToggle,
  onItemDelete,
}: TodoItemProps) => {
  const checked = state === TodoItemState.complete;
  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onItemDelete}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={onItemToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': id }}
          />
        </ListItemIcon>
        <ListItemText id={id} primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default Object.assign(TodoItem, {
  State: TodoItemState,
}) as typeof TodoItem & {
  State: typeof TodoItemState;
};

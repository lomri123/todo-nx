import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoItemBase, TodoItemActions, TodoItemState } from './types';
import { MouseEvent } from 'react';

export interface TodoItemProps extends TodoItemBase, TodoItemActions {
  sentStateColor?: string;
}

const TodoItem = ({
  id,
  text,
  state,
  sentStateColor = 'black',
  onItemToggle,
  onItemDelete,
}: TodoItemProps) => {
  const checked = state === TodoItemState.complete;
  const handleItemToggle = (event: MouseEvent): void => {
    onItemToggle(event, { id, text, state });
  };
  const handleItemDelete = (event: MouseEvent): void => {
    onItemDelete(event, { id, text, state });
  };

  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleItemDelete}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleItemToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': id }}
          />
        </ListItemIcon>
        <ListItemText
          id={id}
          primary={text}
          style={{ color: sentStateColor }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Object.assign(TodoItem, {
  State: TodoItemState,
}) as typeof TodoItem & {
  State: typeof TodoItemState;
};

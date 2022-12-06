import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

import { TodoInputActions } from './types';
export interface TodoInputProps extends TodoInputActions {
  initialText?: string;
}

const TodoInput = ({ initialText = '', onTodoInputSubmit }: TodoInputProps) => {
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    setTodoText(initialText);
  }, []);

  const clearTodoText = () => setTodoText('');

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoText(event.target.value);
  };

  const handleInputSubmit = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    onTodoInputSubmit(event, todoText);
    clearTodoText();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleInputSubmit(event);
    }
  };

  const handleDeleteButtonClick = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    handleInputSubmit(event);
  };

  return (
    <OutlinedInput
      id="outlined-todo-input"
      placeholder="add a new todo"
      label={false}
      value={todoText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="add a new todo"
            onClick={handleDeleteButtonClick}
            edge="end"
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default TodoInput;

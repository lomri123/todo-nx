import { ChangeEvent, MouseEvent, KeyboardEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
export interface TodoInputProps {
  onTodoInputSubmit: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    todoText: string
  ) => void;
  initialText?: string;
}

const TodoInput = ({ initialText = '', onTodoInputSubmit }: TodoInputProps) => {
  const [todoText, setTodoText] = useState(initialText);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoText(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      onTodoInputSubmit(event, todoText);
    }
  };

  return (
    <OutlinedInput
      id="outlined-adornment-password"
      value={todoText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={(event) => onTodoInputSubmit(event, todoText)}
            edge="end"
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
      label="Password"
    />
  );
};

export default TodoInput;
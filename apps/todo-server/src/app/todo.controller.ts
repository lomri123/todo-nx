import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

enum TodoState {
  pending = 'pending',
  complete = 'complete',
}

interface Todo {
  id: string;
  text: string;
  state: TodoState;
}

let todos: Todo[] = [
  'NestJS',
  'GraphQL',
  'Apollo',
  'TypeScript',
  'React',
  'Redux',
  'React Query',
  'Angular',
  'Vue',
  'D3',
  'Svelte',
  'SolidJS',
  'NextJS',
  'AWS',
].map((text, index) => ({
  id: uuidv4(),
  text: `Learn ${text}`,
  state: TodoState.pending,
}));

@Controller('todos')
export class TodosController {
  constructor() {}

  @Get()
  async index(): Promise<Todo[]> {
    return todos;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Todo> {
    return todos.find((todo) => todo.id === id);
  }

  @Post()
  async create(@Body() { text }: { text: string }): Promise<Todo> {
    const todo = {
      id: uuidv4(),
      text,
      state: TodoState.pending,
    };
    todos.push(todo);
    return todo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Todo): Promise<Todo> {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo));

    return data;
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<string> {
    todos = todos.filter((todo) => todo.id !== id);
    return id;
  }
}

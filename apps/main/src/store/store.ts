import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodoItem } from '@todo-nx/todo';

const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAll: builder.query<ITodoItem[], void>({
      query: () => `todos`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text) {
        return {
          url: `todos`,
          method: 'POST',
          body: {
            text,
          },
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodo: builder.mutation<ITodoItem, ITodoItem>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'PUT',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation<ITodoItem, ITodoItem>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'DELETE',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export default todoApi;

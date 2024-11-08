import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/state/todo/index';
import TodoApp from './src/screens/Todo/Todo';

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
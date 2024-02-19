// Библиотеки
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Корневой компонент
import App from './components/App/App';
// Store
import store from './Redux/store';
// Стили
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

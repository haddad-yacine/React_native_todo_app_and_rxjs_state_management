import {LoadingIndicator, StoreState} from '../types';

const loadingIndicator: LoadingIndicator = {
  isVisible: false,
  queue: 0,
};

export const initialState: StoreState = {
  todos: [],
  loadingIndicator,
  isDoneTodosVisible: true,
};

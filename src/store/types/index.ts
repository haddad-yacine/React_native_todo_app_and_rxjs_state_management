import {BehaviorSubject} from 'rxjs';

export interface Todo {
  id: number;
  isDone: boolean;
  title: string;
}

export interface LoadingIndicator {
  queue: number;
  isVisible: boolean;
}
export interface StoreState {
  todos: Todo[];
  hideDoneTodos: boolean;
  loadingIndicator: LoadingIndicator;
}

//#region Store
export interface Subject {
  id: keyof StoreState;
  subject: BehaviorSubject<StoreState>;
}

export interface SubscribeParams {
  onNext: (state: StoreState) => void;
  subjectId?: keyof StoreState;
}

export interface SetStateParams {
  newState: Partial<StoreState>;
  subjectId?: keyof StoreState;
}

export type SubjectId = keyof StoreState;
//#endregion

import {useState} from 'react';
import {UIManager, LayoutAnimation} from 'react-native';
import useStoreState from '../store/hooks/core/useStoreState';
import {Todo} from '../store/types';
import useTodos from './useTodos';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const useTodo = (props: {id: number}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const todo = useStoreState<Todo>({
    selector: (state) => state.todos.find((item) => item.id === props.id)!,
    isEqual: (prev, cur) => prev.isDone === cur.isDone,
  });

  const {toggleTodo, removeTodo, addTodo} = useTodos();

  const remove = () => {
    LayoutAnimation.easeInEaseOut(() => {
      removeTodo(props.id);
    });
    setIsDeleted(true);
  };

  return {todo, addTodo, toggleTodo, removeTodo: remove, isDeleted};
};

export default useTodo;

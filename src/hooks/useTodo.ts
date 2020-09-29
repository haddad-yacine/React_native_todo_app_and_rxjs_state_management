import {useEffect, useState} from 'react';
import {UIManager, LayoutAnimation} from 'react-native';
import useStoreState from '../store/hooks/core/useStoreState';
import {Todo} from '../store/types';
import useTodos from './useTodos';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const useTodo = (props: {id: number}) => {
  const [isVisible, setIsVisible] = useState(true);
  const todo = useStoreState<Todo>({
    selector: (state) => state.todos.find((item) => item.id === props.id)!,
    isEqual: (prev, cur) => prev.isDone === cur.isDone,
  });
  const {id, isDone} = todo;

  const isDoneTodosVisible = useStoreState<boolean>({
    selector: (state) => state.isDoneTodosVisible,
    isEqual: (prev, curr) => prev === curr,
  });

  const {toggle, remove} = useTodos();

  const removeTodo = () => {
    LayoutAnimation.easeInEaseOut(() => {
      remove(id);
    });
    setIsVisible(false);
  };

  useEffect(() => {
    if (isDone) {
      LayoutAnimation.easeInEaseOut();
      setIsVisible(isDoneTodosVisible);
    }
  }, [isDone, isDoneTodosVisible]);

  return {
    todo,
    toggle: () => toggle(id),
    remove: removeTodo,
    isVisible,
    isDoneTodosVisible,
  };
};

export default useTodo;

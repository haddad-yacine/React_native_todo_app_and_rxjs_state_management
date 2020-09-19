/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  CheckBox,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Todo as TodoType} from '../store/types';
import useTodo from '../hooks/useTodo';
import useStoreState from '../store/hooks/core/useStoreState';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Todo = (props: TodoType) => {
  const {isDeleted, removeTodo, todo, toggleTodo} = useTodo(props);
  const [hideMe, setHideMe] = useState(false);
  const hideDoneTodos = useStoreState<boolean>({
    selector: (state) => state.hideDoneTodos,
    isEqual: (prev, curr) => prev === curr,
  });
  const {id, isDone, title} = todo;

  useEffect(() => {
    if (isDone) {
      LayoutAnimation.easeInEaseOut();
      setHideMe(!hideDoneTodos);
    }
  }, [isDone, hideDoneTodos]);

  return (
    <View
      style={{
        height: isDeleted || hideMe ? 0 : undefined,
        overflow: 'hidden',
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isDone ? 'yellow' : 'white',
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.delete} onPress={removeTodo}>
          DELETE
        </Text>
        <CheckBox onValueChange={() => toggleTodo(id)} value={isDone} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 3,
    marginVertical: 3,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  delete: {
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 15,
    fontWeight: '500',
    color: 'blue',
    textTransform: 'uppercase',
  },
});

export default memo(Todo, () => true);

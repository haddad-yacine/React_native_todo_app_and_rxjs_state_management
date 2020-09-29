/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  CheckBox,
  UIManager,
  Animated,
} from 'react-native';
import {Todo as TodoType} from '../store/types';
import useTodo from '../hooks/useTodo';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Todo = (props: TodoType) => {
  const {isVisible, remove, todo, toggle} = useTodo(props);
  const {isDone, title} = todo;

  return (
    <Animated.View
      style={{
        height: isVisible ? undefined : 0,
        overflow: 'hidden',
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isDone ? 'yellow' : 'white',
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.delete} onPress={remove}>
          DELETE
        </Text>
        <CheckBox onValueChange={toggle} value={isDone} />
      </View>
    </Animated.View>
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

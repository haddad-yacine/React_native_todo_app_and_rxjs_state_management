import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import useTodos from '../hooks/useTodos';

const TodoInput = () => {
  const [todoDescription, setTodoDescription] = useState('');
  const {addTodo} = useTodos();

  const onPress = () => {
    if (todoDescription.trim()) {
      addTodo(todoDescription);
      setTodoDescription('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        multiline
        value={todoDescription}
        placeholder="Todo description"
        onChangeText={(text) => setTodoDescription(text)}
      />
      <Text
        onPress={onPress}
        style={[
          styles.text,
          {color: todoDescription.trim() ? 'blue' : 'grey'},
        ]}>
        ADD
      </Text>
    </View>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    elevation: 10,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 1,
    padding: 8,
    minHeight: 70,
  },
  text: {
    padding: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    backgroundColor: '#d4d5d6',
    borderRadius: 10,
    padding: 8,
  },
  textInputContainer: {},
});

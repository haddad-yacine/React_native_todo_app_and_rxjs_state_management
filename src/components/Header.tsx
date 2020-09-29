import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Store from '../store';
import useStoreState from '../store/hooks/core/useStoreState';

type HeaderState = {todosLength: number; isDoneTodosVisible: boolean};

const Header = () => {
  const headerState = useStoreState<HeaderState>({
    selector: (state) => ({
      todosLength: state.todos.length,
      isDoneTodosVisible: state.isDoneTodosVisible,
    }),
    isEqual: (prev, cur) =>
      prev.isDoneTodosVisible === cur.isDoneTodosVisible &&
      prev.todosLength === cur.todosLength,
  });

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text style={styles.title}>Todos: </Text>
        <Text style={styles.text}>
          {headerState.todosLength ? headerState.todosLength : 0}
        </Text>
      </View>
      <View style={styles.switch}>
        <Text style={styles.title}>Is Done Todos Visible: </Text>
        <Switch
          value={headerState.isDoneTodosVisible}
          onValueChange={(value) =>
            Store.setState({
              newState: {isDoneTodosVisible: value},
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
  switch: {
    flexDirection: 'row',
  },
});

export default Header;

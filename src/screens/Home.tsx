import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import Todo from '../components/Todo';
import {Todo as TodoType} from '../store/types';
import useStoreState from '../store/hooks/core/useStoreState';

const Home = () => {
  const todos = useStoreState<TodoType[]>({
    selector: (state) => state.todos,
    isEqual: (prev, cur) => prev.length === cur.length,
  });

  return (
    <FlatList
      data={todos}
      renderItem={({item, index}) => <Todo {...{...item, key: index}} />}
      keyExtractor={({id}) => id.toString()}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});

export default Home;

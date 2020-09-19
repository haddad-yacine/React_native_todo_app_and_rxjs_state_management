import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Home from './src/screens/Home';
import Header from './src/components/Header';
import TodoInput from './src/components/TodoInput';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <Home />
      <TodoInput />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default App;

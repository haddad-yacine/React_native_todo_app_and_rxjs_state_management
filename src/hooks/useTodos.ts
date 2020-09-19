import store from '../store';

const useTodos = () => {
  const addTodo = (title: string) => {
    store.setState({
      newState: {
        todos: [
          ...store.getCurrentState().todos,
          {id: store.getGlobalId(), isDone: false, title},
        ],
      },
    });
  };

  const toggleTodo = (todoId: number) => {
    let todo = store
      .getCurrentState()
      .todos.find((todoItem) => todoItem.id === todoId);
    todo = {...todo!, isDone: !todo?.isDone};
    console.log('=> toggleTodo: ', todo);

    const todosItems = store.getCurrentState().todos.map((todoItem) => {
      if (todoItem.id === todoId) {
        return todo!;
      }
      return todoItem!;
    });

    store.setState({
      newState: {
        todos: todosItems!,
      },
    });
  };

  const removeTodo = (todoId: number) => {
    store.setState({
      newState: {
        todos: store
          .getCurrentState()
          .todos.filter((todo) => todo.id !== todoId),
      },
    });
  };

  return {addTodo, toggleTodo, removeTodo};
};

export default useTodos;

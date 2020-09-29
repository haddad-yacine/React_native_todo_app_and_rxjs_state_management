import store from '../store';

const useTodos = () => {
  const add = (title: string) => {
    store.setState({
      newState: {
        todos: [
          ...store.getCurrentState().todos,
          {id: store.getGlobalId(), isDone: false, title},
        ],
      },
    });
  };

  const toggle = (todoId: number) => {
    let todo = store
      .getCurrentState()
      .todos.find((todoItem) => todoItem.id === todoId);
    todo = {...todo!, isDone: !todo?.isDone};

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

  const remove = (todoId: number) => {
    store.setState({
      newState: {
        todos: store
          .getCurrentState()
          .todos.filter((todo) => todo.id !== todoId),
      },
    });
  };

  return {add, toggle, remove};
};

export default useTodos;

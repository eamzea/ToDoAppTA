import { types } from '../types/types';

// {
//   id: new Date().getDate(),
//   title: "Cumpleaños",
//   done: false,
//   user: {
//     _id: 123,
//     name: "Edgar",
//   },
// },

export const initialToDoState = {
  todos: [],
};

export const todoReducer = (state = initialToDoState, action) => {
  switch (action.type) {
    case types.toDoAddNew:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case types.toDoUpdated:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case types.toDoLoaded:
      return {
        ...state,
        todos: [...action.payload],
      };
    case types.toDoLogout:
      return {
        ...initialToDoState,
      };

    default:
      return state;
  }
};

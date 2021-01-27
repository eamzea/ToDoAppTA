import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

const todoStartAddNew = async (todo, user) => {
  try {
    const resp = await fetchWithToken('todos/create-todo', todo, 'POST');
    const body = await resp.json();

    if (body.ok) {
      todo.id = body.todo.id;
      todo.user = {
        _id: user.uid,
        name: user.name,
      };

      return {
        type: types.toDoAddNew,
        payload: todo,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const todoStartUpdate = todo => {
  return async dispatch => {
    try {
      const resp = await fetchWithToken(`todos/update/${todo.id}`, todo, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        return {
          type: types.eventUpdated,
          payload: todo,
        };
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const todoStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`todos/delete/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body.ok) {
        return {
          type: types.todoDeleted,
        };
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const todoStartLoading = async () => {
  try {
    const resp = await fetchWithToken('todos/get-todos');
    const body = await resp.json();

    if (body.todos.length > 0) {
      return {
        type: types.toDoLoaded,
        payload: body.todos,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const eventLogout = () => ({
  type: types.toDoLogout,
});

const TodoActions = {
  todoStartAddNew,
  todoStartUpdate,
  todoStartLoading,
};

export default TodoActions;

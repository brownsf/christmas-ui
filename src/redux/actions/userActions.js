import axios from 'axios';
import * as types from '../constants';

const API_URL = 'https://node-express-es6-starter-kcrkdxfuyi.now.sh';
export function getUsers() {
  const url = `${API_URL}`;
  return (dispatch) => {
    dispatch({
      type: types.LOAD_USERS,
    });
    axios
      .get(url)
      .then(response =>
        dispatch({
          type: types.RECV_USERS,
          data: response.data,
        }),
      )
      .catch(response =>
        dispatch({
          type: types.ERROR_USERS,
          error: response.error,
        }),
      );
  };
}

export function addUser(firstName, lastName) {
  const url = `${API_URL}/users`;
  return (dispatch) => {
    dispatch({
      type: types.ADD_USER,
    });
    axios
      .post(url, { firstName, lastName })
      .then(response =>
        dispatch({
          type: types.SAVE_USER,
          data: response.data,
        }),
      )
      .catch(response =>
        dispatch({
          type: types.ERROR_ADD_USER,
          error: response.error,
        }),
      );
  };
}

export function addExclude(userId, excludes) {
  const url = `${API_URL}/exclude`;
  return (dispatch) => {
    dispatch({
      type: types.ADD_USER_EXCLUDES,
    });
    axios
      .post(url, { userId, excludes })
      .then(response =>
        dispatch({
          type: types.SAVE_USER_EXCLUDES,
          data: response.data,
        }),
      )
      .catch(response =>
        dispatch({
          type: types.ERROR_USER_EXCLUDES,
          error: response.error,
        }),
      );
  };
}
export function getExcludeList(userId) {
  const url = `${API_URL}/exclude/${userId}`;
  return (dispatch) => {
    dispatch({
      type: types.LOAD_EXCLUDED,
    });
    axios
      .get(url)
      .then(response =>
        dispatch({
          type: types.RECV_EXCLUDED,
          data: response.data,
        }),
      )
      .catch(response =>
        dispatch({
          type: types.ERROR_EXCLUDED,
          error: response.error,
        }),
      );
  };
}
export function getChoice(userId) {
  const url = `${API_URL}/choose/${userId}`;
  return (dispatch) => {
    dispatch({
      type: types.ADD_CHOICE,
    });
    axios
      .get(url)
      .then(response =>
        dispatch({
          type: types.SAVE_CHOICE,
          data: response.data,
        }),
      )
      .catch(response =>
        dispatch({
          type: types.ERROR_CHOICE,
          error: response.error,
        }),
      );
  };
}

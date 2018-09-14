import * as types from '../constants';

const initialState = {
  loading: false,
  users: [],
  loadingExcluded: false,
  excluded: [],
  choosing: false,
  chosen: undefined,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_USER:
      return { ...state, loading: true };
    case types.SAVE_USER:
      return { ...state, loading: false };
    case types.LOAD_USERS:
      return { ...state, loading: true, users: [] };
    case types.RECV_USERS:
      return { ...state, loading: false, users: action.data };
    case types.LOAD_EXCLUDED:
      return { ...state, loadingExcluded: true };
    case types.RECV_EXCLUDED:
      return {
        ...state,
        loadingExcluded: false,
        excluded: action.data.map(excluded => excluded.exclude_user),
      };
    case types.ADD_CHOICE:
      return { ...state, choosing: true, chosen: undefined };
    case types.SAVE_CHOICE:
      return { ...state, choosing: false, chosen: action.data };
    default:
      return state;
  }
}

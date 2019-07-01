import { GET_ALL_DATA, UPDATE_USERS_STATE } from "../actions/actionType";

//  defining initial state
const initialState = {
  users: [],
  meta: [],
  usersLoading: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATA: 
      return {
        ...state,
        users: action.data.users,
        meta: action.data.meta,
        usersLoading: action.data.usersLoading
      }
    case UPDATE_USERS_STATE:
      return {
        ...state,
        users: action.users
      }
    default:
      return state;
  }
}

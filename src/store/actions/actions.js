import { GET_ALL_DATA, UPDATE_USERS_STATE } from "./actionType";

export const getAllData = (data) => {
  return {
    type: GET_ALL_DATA,
    data
  }
} 

export const updateUsersState = (users) => {
  return {
    type: UPDATE_USERS_STATE,
    users
  }
}
/*
1. import * as user from "../userActions"; // if you want to import all of the actions

user.setUserName("Will");

2. import { setUserName } from "../userActions"; // if you want to import just 1 action

setUserName("Will");
*/

export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}

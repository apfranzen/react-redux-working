import axios from "axios";

export function handleSubmit(submission_data) {
  console.log('data action hit')
  return function(dispatch) {
    dispatch({type: "SUBMIT_FORM", payload: submission_data})
  }
}

export function addField(name) {
  return function(dispatch) {
    dispatch({type: "ADD_FIELD", payload: name})
  }
}

export function updateState(value, id) {
  return function(dispatch) {
    dispatch({type: "UPDATE_STATE", payload: value, 'id': id})
  }
}

export function fetchData() {
  return function(dispatch) {
    axios.get("http://localhost:8080/search?query=heart")
      .then((response) => {
        dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATA_FULFILLED", payload: err})
      })
  }
}

export function addTweet(id, text) {
  return {
    type: 'ADD_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function updateTweet(id, text) {
  return {
    type: 'UPDATE_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function deleteTweet(id) {
  return { type: 'DELETE_TWEET', payload: id}
}
import axios from "axios";

export function addField(name) {
  return function(dispatch) {
    dispatch({type: "ADD_FIELD", payload: name})
  }
}

export function updateState(value, index) {
  return function(dispatch) {
    console.log(index);
    dispatch({type: "UPDATE_STATE", payload: value, 'index': index})
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
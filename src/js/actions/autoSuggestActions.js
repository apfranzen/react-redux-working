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

export function fetchData(value, id) {
  return function(dispatch) {
    console.log(value)
    axios.get(`http://localhost:8080/search?query=${value}`)
      .then((response) => {
        dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATA_ERROR", payload: err})
      })
      
  }
}

const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';

export function loadSuggestions(value) {
  return dispatch => {
    dispatch(loadSuggestionsBegin());

    // Fake an AJAX call
    setTimeout(() => {
      dispatch(maybeUpdateSuggestions(getMatchingLanguages(value), value));
    }, randomDelay());
  };
}

export function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  };
}

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  };
}

export function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN
  };
}

export function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  };
}
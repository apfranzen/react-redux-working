import React from "react"
import { connect } from "react-redux"
import axios from "axios";
import lodash from "lodash";

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"
import { handleSubmit } from "../actions/dataActions"

import { Button, Col, Grid } from 'react-bootstrap';
import { Autocomplete } from "react-autocomplete"


import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.

function getMatchingLanguages(value, results) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');

  let combinedResults = results['lowest-level-terms'].concat(results['preferred-terms'])

  return _.orderBy(combinedResults, ['weight'], ['desc']).slice(0, 10)
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------- */
/*    Component    */
/* --------------- */

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  // const inputLength = inputValue.length;

  return inputLength === 0 ? [] : results.filter(result =>
    result.term.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.term.name;

// Use your imagination to render suggestions.
/*const renderSuggestion = suggestion => (
  <div>
    {suggestion.term.name}
  </div>
);*/

function getSuggestionValue(suggestion) {
  return suggestion.term.name;
}

function renderSuggestion(suggestion) {
  return (
    <div class="row">
      <div className="col-9">
        <span>{suggestion.term.name} </span> 
      </div>
        <progress className="col-3" value={suggestion.weight} max="100">{suggestion.weight}</progress>
      
    </div>
  );
}

var timeout = null;

@connect((store) => {
  // console.log(store.data.reaction)
  return {
    reaction: store.data.reaction,
  };
})

export default class Example extends React.Component {
  constructor(reaction) {
    super();

    // console.log(this.props.value)
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };
  }
  
  loadSuggestions(value) {
    // Cancel the previous request
    // if (this.lastRequestId !== null) {
    //   clearTimeout(this.lastRequestId);
    // }
    clearTimeout(timeout)
    this.setState({
      isLoading: true
    });
    
    // Fake request
    console.log(value)

    timeout = setTimeout(function() {
      axios.get(`http://localhost:8080/search?query=${value}`)
      .then((response) => {
        console.log(response)
        // dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
        this.setState({
          isLoading: false,
          suggestions: getMatchingLanguages(value, response.data)
        })
      })
      .catch((err) => {
        // dispatch({type: "FETCH_DATA_ERROR", payload: err})
        console.log(err)
      })
    }.bind(this), 300)
    
  }

  onChange = (event, { newValue }) => {
  // onChange = (event, { newValue }) => {
    console.log(newValue)
    this.props.dispatch(updateState(event.target.value, event.target.id, event.target))
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, isLoading } = this.state;
    console.log(value)

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Reaction',
      value,
      onChange: this.onChange,
      className: "form-control",
      id: 'reaction'
      // value: this.props.reaction
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    // Finally, render it!
    return (
      <div>
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          />
      </div>
    );
  }
}
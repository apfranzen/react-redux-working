import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"
import { handleSubmit } from "../actions/dataActions"

import { Button, Col, Grid } from 'react-bootstrap';
import { Autocomplete } from "react-autocomplete"


import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];

const results = [
    {
      "weight": 19,
      "term": {
        "code": 10009112,
        "name": "Chronic pulmonary heart disease",
        "current": true,
        "preferred-term": {
          "code": 10010970,
          "name": "Cor pulmonale chronic"
        }
      }
    },
    {
      "weight": 20,
      "term": {
        "code": 10054962,
        "name": "Fetal heartbeat absent",
        "current": true,
        "preferred-term": {
          "code": 10051139,
          "name": "Foetal heart rate abnormal"
        }
      }
    },
    {
      "weight": 28,
      "term": {
        "code": 10058322,
        "name": "Foetal heart rate deceleration",
        "current": true,
        "preferred-term": {
          "code": 10058322,
          "name": "Foetal heart rate deceleration"
        }
      }
    },
    {
      "weight": 29,
      "term": {
        "code": 10020080,
        "name": "High output heart failure",
        "current": true,
        "preferred-term": {
          "code": 10007560,
          "name": "Cardiac failure high output"
        }
      }
    },
    {
      "weight": 30,
      "term": {
        "code": 10025528,
        "name": "Malformation heart (NOS)",
        "current": true,
        "preferred-term": {
          "code": 10019273,
          "name": "Heart disease congenital"
        }
      }
    },
    {
      "weight": 30,
      "term": {
        "code": 10054387,
        "name": "Fetal heart rate increased",
        "current": true,
        "preferred-term": {
          "code": 10051138,
          "name": "Foetal heart rate increased"
        }
      }
    }
]

function getMatchingLanguages(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');

  return results.filter(result => regex.test(result.term.name));
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
  console.log(anything)
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  console.log(suggestion)
  return (
    <span>{suggestion.term.name}</span>
  );
}

export default class Example extends React.Component {
  constructor() {
    super();

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
    this.lastRequestId = null;
  }

  loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });
    
    // Fake request
    this.lastRequestId = setTimeout(() => {
      this.setState({
        isLoading: false,
        suggestions: getMatchingLanguages(value)
      });
    }, 1000);
  }

  onChange = (event, { newValue }) => {
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

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
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
          inputProps={inputProps} />
      </div>
    );
  }
}
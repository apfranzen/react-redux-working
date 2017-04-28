import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"
import { handleSubmit } from "../actions/dataActions"

import { Button, Col, Grid } from 'react-bootstrap';
import { Autocomplete } from "react-autocomplete"

/*
@connect(a, b) - expects 2 different functions
function a is for getting store values in as props. Expects you to return an object

export default class Layout extends React.Component {
  
  render() {
    this.props.user  handleChange(event) {
    console.log(event)
    this.props.dispatch(updateState(event.target.value, event.target.id, event.target))
  }
    return null
  }
}
*/
var timeout = null;

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    lowestLevelTerms: store.data.lowestLevelTerms,
    devices: store.data.devices,
    reaction: store.data.reaction,
    fieldDirty: store.data.fieldDirty,
    timeout: store.data.timeout
  };
})
export default class Layout extends React.Component {
  const 
  // this is pulling in the users
  // componentWillMount() {
  //   this.props.dispatch(fetchUser())
  // }

  // componentWillMount() {
  //   console.log('component will mount')
  //   this.props.dispatch(fetchData())
  // }

  fetchData(event) {
    // var timeout = null;
    // this.props.dispatch({type: "FIELD_DIRTY"})
    clearTimeout(timeout);
    this.props.dispatch({type: "TIMEOUT", payload: "no"})
    this.props.dispatch({type: "UPDATE_STATE", payload: event.target.value, 'id': event.target.id})

    
    timeout = setTimeout(function(){ this.props.dispatch({type: "TIMEOUT", payload: 'yes'}) }.bind(this), 3000);
    // if (event.target.value ) {
    //   console.log('event target fired')
    //    this.props.dispatch(fetchData(event.target.value))
    // .then((response) => {
    //     this.props.dispatch({type: "FETCH_DATA_FULFILLED", payload: response.data})
    //   })
    // }
  }

  addField() {
    let index = Object.keys(this.props.devices).length + 1
    let name = ('device-' + index)
    this.props.dispatch(addField(name))
  }

  handleChange(event) {
    console.log(event)
    this.props.dispatch(updateState(event.target.value, event.target.id, event.target))
  }

  // handleReaction(event) {
  //   console.log('handleReaction hit');
  //     // this.props.dispatch(updateState(event.target.value, event.target.id, event.target))
  //     this.props.dispatch(fetchData())
  // }


  handleSubmit(event) {
    event.preventDefault()    
    this.props.dispatch(handleSubmit(this.props))
  }

  // getInitialState() {
  //   return {
  //     value: '',
  //     unitedStates: fetchData(),
  //     loading: false
  //   }
  // }

  render() {
    const { user, lowestLevelTerms, devices, reaction } = this.props;

    // if (!lowestLevelTerms.length) {
    //   return <button onClick={this.fetchData.bind(this)}>load cadvent suggestions</button>
    // }

    const mappedDevices = Object.keys(devices).map((device, index) => {
      return <input type="text"
        className="form-control device-input" 
        id={`device-${index + 1}`}
        placeholder={`Input device ${index +1} here`}   
        value={this.props.devices[`device-${index +1}`].device}   
        key={index}
        onChange={this.handleChange.bind(this)}>
        </input>

    })

    const mappedSuggestions = lowestLevelTerms.map((lowestLevelTerm, index) => <div><li>{lowestLevelTerm.term.name}</li></div>)

    //  const mappedSuggestions = lowestLevelTerms.map(lowestLevelTerm => {lowestLevelTerm.term.name})

    return <div>
      <Grid bsClass="container">
        <div className="row">
          <div className="col-4">
            <h1>Untoured Events</h1>
          </div>
          <div className="col-4">
            <h1>2</h1>
          </div>
        </div>
        <p>The timeout status is: {this.props.timeout}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          
          <div className="form-group row" >
            <label className="col-2 col-form-label">
              Reaction:
                </label>
            <div className="col-5">
              <input type="text" name="reaction" className="form-control" 
              value={this.props.reaction} 
              id="reaction-1"
              onChange={this.fetchData.bind(this)} />
            </div>
          </div>
          <div className="form-group row" >

            <label className="col-2 col-form-label">
              Devices:
                  </label>
            <div className="col-5">
              {mappedDevices}
            </div>
            <Button className="addField" type="button" value="addField" bsSize="med" onClick={this.addField.bind(this)}>Add Device</Button>
          </div>
          <button type="submit" value="Submit" className="btn btn-lg btn-block submit">Submit</button>
        </form>
        <h3>Low Level Terms</h3>
        <ul>{mappedSuggestions}</ul>

       
      </ Grid>
    </div>
  }
}
  
import React from "react"
import { connect } from "react-redux"

import Example from './Autocomplete.js'

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"
import { handleSubmit } from "../actions/dataActions"

import { Button, Col, Grid } from 'react-bootstrap';
import { Autocomplete } from "react-autocomplete"

var timeout = null;

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    lowestLevelTerms: store.data.lowestLevelTerms,
    devices: store.data.devices,
    reaction: store.data.reaction,
  };
})

export default class Layout extends React.Component {

  deviceHelper(event) {
    this.props.dispatch({type: "UPDATE_STATE", payload: event.target.value, 'id': event.target.id})
    this.props.dispatch(fetchData(event.target.value))
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

  handleSubmit(event) {
    event.preventDefault()    
    this.props.dispatch(handleSubmit(this.props))
  }

  render() {
    const { user, lowestLevelTerms, devices, reaction } = this.props;

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

    const mappedSuggestions = lowestLevelTerms.map((lowestLevelTerm, index) => <div key={index}><li >{lowestLevelTerm.term.name}</li></div>)

    return <div>
      <Grid bsClass="container">
        <div className="row">
          <div className="col-10">
            <h1 className="text-center">Adverse Events Reporting</h1>
          </div>
        </div>
        <hr />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row" >
            <label className="col-2 col-form-label">
              Reaction:
                </label>
            <div className="col-5">
              {/*<input type="text" name="reaction" className="form-control" 
              value={this.props.reaction} 
              id="reaction-1"
              onChange={this.deviceHelper.bind(this)} />*/}
              <Example />
            </div>
          </div>
          <div className="form-group row" >

            <label className="col-2 col-form-label">
              Devices:
                  </label>
            <div className="col-5">
              {mappedDevices}
            </div>
            <Button className="addField" type="button" value="addField" bsSize="sm" onClick={this.addField.bind(this)}>Add Device</Button>
          </div>
          <button type="submit" value="Submit" className="btn btn-lg btn-block submit">Submit</button>
        </form>
        <ul>{mappedSuggestions}</ul>
        
      </ Grid>
    </div>
  }
}
  
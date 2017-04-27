import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"
import { handleSubmit } from "../actions/dataActions"

import { Button, Col, Grid } from 'react-bootstrap';

/*
@connect(a, b) - expects 2 different functions
function a is for getting store values in as props. Expects you to return an object

export default class Layout extends React.Component {
  
  render() {
    this.props.user
    return null
  }
}
*/
@connect((store) => {
  console.log(store)
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    lowestLevelTerms: store.data.lowestLevelTerms,
    devices: store.data.devices,
  };
})
export default class Layout extends React.Component {
  const 
  // this is pulling in the users
  // componentWillMount() {
  //   this.props.dispatch(fetchUser())
  // }

  fetchData() {
    this.props.dispatch(fetchData())
  }

  addField() {
    let index = Object.keys(this.props.devices).length + 1
    let name = ('device-' + index)
    console.log(name)
    this.props.dispatch(addField(name))
  }

  handleChange(event) {
    console.log(event.target)
    this.props.dispatch(updateState(event.target.value, event.target.id))
  }

  handleSubmit(event) {
    event.preventDefault()    
    console.log(this.props)
    this.props.dispatch(handleSubmit(this.props))
  }


  render() {
    const { user, lowestLevelTerms, devices } = this.props;
    console.log(lowestLevelTerms)

    // if (!lowestLevelTerms.length) {
    //   return <button onClick={this.fetchData.bind(this)}>load cadvent suggestions</button>
    // }

    const mappedDevices = Object.keys(devices).map((device, index) => {
      return <input type="text"
        className="form-control device-input" 
        value={this.props.devices[`device-${index +1}`].device}
        id={`device-${index + 1}`} 
        onChange={this.handleChange.bind(this)}>
        </input>

    })


    const mappedSuggestions = lowestLevelTerms.map(lowestLevelTerm => <div><li>{lowestLevelTerm.term.name}</li></div>)

    return <div>
      {/*<h1>{this.props.user.name}</h1>*/}
      <Grid bsClass="container">
        <div className="row">
          <div className="col-4">
            <h1>Untoured Events</h1>
          </div>
          <div className="col-4">
            <h1>2</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <div className="form-group row" >
            <label className="col-2 col-form-label">
              Reaction:
                </label>
            <div className="col-5">
              <input type="text" name="reaction" className="form-control" value={this.props.reaction} onChange={this.fetchData.bind(this)} />
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

import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"
import { addField } from "../actions/dataActions"
import { updateState } from "../actions/dataActions"

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
    let name = 'device-' + (this.props.devices.length + 1)
    this.props.dispatch(addField(name))
  }

  handleChange(event) {
    console.log(event.target)
    this.props.dispatch(updateState(event.target.value, event.target.id))
  }


  render() {
    const { user, lowestLevelTerms, devices } = this.props;
    console.log(lowestLevelTerms)

    // if (!lowestLevelTerms.length) {
    //   return <button onClick={this.fetchData.bind(this)}>load cadvent suggestions</button>
    // }

    const mappedDevices = devices.map((device, index) => {
      return <label>
        {device.name}
        <input type="text" 
        value={this.props.devices[index].device} id={index} 
        onChange={this.handleChange.bind(this)}></input></label>
    })


    const mappedSuggestions = lowestLevelTerms.map(lowestLevelTerm => <li>{lowestLevelTerm.term.name}</li>)

    return <div>
      {/*<h1>{this.props.user.name}</h1>*/}
      <h1>Untoured Events</h1>
      <form onSubmit={this.props.handleSubmit}>
  
          <div className="form-group row" >
            <label className="col-2 col-form-label">
              Reaction:
            </label>
              <div className="col-5">
                <input type="text" name="reaction" value={this.props.reaction} onChange={this.fetchData.bind(this)} />
              </div>
            <label className="col-2 col-form-label">
              Devices:
            </label>
              <div className="col-5">
                {mappedDevices}
              </div>
              <button type="button" value="Submit" className="btn btn-lg" onClick={this.addField.bind(this)}>Add Device</button>
              {/*<div className="col-5">
                <select placeholder="suggestions" className="custom-select">
                  <option defaultValue="Suggestions">Suggestions</option>
                  {
                    this.props.form.suggestions.map(function(suggestion, i){
                      return (
                        <option key={i} value={suggestion.term.name}>{suggestion.term.name} Code: {suggestion.term.code}</option>
                      )
                    })
                  }
                </select>
              </div>*/}
            <button type="button" value="Submit" className="btn btn-lg btn-block submit">Submit</button>
          </div>
        </form>
      
      
      <h3>Low Level Terms</h3>
        <ul>{mappedSuggestions}</ul>
    </div>
  }
}

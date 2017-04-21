import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchData } from "../actions/dataActions"

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

  render() {
    const { user, lowestLevelTerms } = this.props;
    console.log(lowestLevelTerms)

    // if (!lowestLevelTerms.length) {
    //   return <button onClick={this.fetchData.bind(this)}>load cadvent suggestions</button>
    // }

    const mappedSuggestions = lowestLevelTerms.map(lowestLevelTerm => <li>{lowestLevelTerm.term.name}</li>)

    return <div>
      {/*<h1>{this.props.user.name}</h1>*/}
      <h1>Untoured Events</h1>
      <form>
        <input type="text" value={this.props.reaction} onChange={this.fetchData.bind(this)} />
      </form>
      <button onClick={this.fetchData.bind(this)}>load cadvent suggestions</button>
      
      <h3>Low Level Terms</h3>
        <ul>{mappedSuggestions}</ul>
    </div>
  }
}

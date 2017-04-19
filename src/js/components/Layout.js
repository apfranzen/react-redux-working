import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"

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
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})
export default class Layout extends React.Component {
  // this is pulling in the users
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets())
  }

  render() {
    const { user, tweets } = this.props;

    if (!tweets.length) {
      return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
    }

    const mappedTweets = tweets.map(tweet => <li>{tweet.id}</li>)

    return <div>
      <h1>{this.props.user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  }
}

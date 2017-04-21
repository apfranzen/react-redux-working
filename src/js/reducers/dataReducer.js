export default function reducer(state={
    lowestLevelTerms: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_DATA": {
        return {...state, fetching: true}
      }
      case "FETCH_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_DATA_FULFILLED": {
        console.log('state ', state)
        console.log('action ', action)
        return {
          ...state,
          fetching: false,
          fetched: true,
          lowestLevelTerms: action.payload['lowest-level-terms'],
        }
      }
      case "ADD_TWEET": {
        return {
          ...state,
          tweets: [...state.tweets, action.payload],
        }
      }
      case "UPDATE_TWEET": {
        const { id, text } = action.payload
        const newTweets = [...state.tweets]
        const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
        newTweets[tweetToUpdate] = action.payload;

        return {
          ...state,
          tweets: newTweets,
        }
      }
      case "DELETE_TWEET": {
        return {
          ...state,
          tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
        }
      }
    }

    return state
}

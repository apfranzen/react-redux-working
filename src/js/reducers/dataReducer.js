export default function reducer(state={
    lowestLevelTerms: [],
    devices: 
    [
      {
        name: 'device-1',
       device: '' 
      }
    ],
    fetching: false,
    fetched: false,
    error: null,
    fieldDirty: false
  }, action) {

    switch (action.type) {
      case "ADD_FIELD": {
        return {...state, ...{devices : [...state.devices, {name : action.payload}]}};
      }
      case "FIELD_DIRTY": {
        return {...state, fieldDirty: true}
      }
      case "FETCH_DATA": {
        return {...state, fetching: true}
      }
      case "FETCH_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_DATA_FULFILLED": {
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

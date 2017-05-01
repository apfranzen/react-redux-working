export default function reducer(state={
    lowestLevelTerms: [],
    devices: 
    {
     "device-1":
      {
       device: '' 
      }
    },
    reaction: '',
    fetching: false,
    fetched: false,
    error: null,
    inFlight: false
  }, action) {

    switch (action.type) {
      case "SUBMIT_FORM": {
        // todo: send the XHR request to send this
        return {
          ...state,
          inFlight: true
        }
      }

      case "UPDATE_STATE": {
        console.log(action)
        var field = action.id.split("-")[0]
        switch (field) {
          case "reaction": {
            console.log('reaction hit in dataReducer', action)
            return {
              ...state,
              reaction: action.payload
            }
          }
          case "device": {
            console.log('device hit in dataReducer')
            return {
          ...state,
          devices: {
            ...state.devices,
            [action.id]: { device: action.payload }
          }
        }
          }
        }
      }
      
      case "ADD_FIELD": {
        return {
          ...state,
          devices: {
            ...state.devices,
            [action.payload]: { device: '' }
          }
        }
      }
      case "FIELD_DIRTY": {
        return {...state, fieldDirty: true}
      }
      case "TIMEOUT": {
        return {...state, timeout: action.payload}
      }
      case "FIELD_CLEAN": {
        return {...state, fieldDirty: false}
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

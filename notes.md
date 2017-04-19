├── client.min.js
├── index.html
└── js
    ├── actions
    │   ├── queryActions.js // make a call to cadvent endpoint
    │   └── fieldActions.js // export function addField(){} and update the state
    ├── client.js           // wraps layout in provider, which gives react access to the store
    ├── components
    │   └── Layout.js       // pulls in the data and grabs only what is needed
    ├── reducers
    │   ├── index.js        // combines all of the reducers
    │   ├── queryReducer.js // set default vals & switch statement based on action.type ex: action.type = "FETCH_RESULTS"
    │   └── fieldReducer.js // set default vals (devices.length) & switch statement based on action.type
    └── store.js            // this createsStore from redux and applies all of the middleware

State:
devices: [
  {
    field_name: device-1,
    text: content
  },
  {
    field_name: device-2,
    text: content
  }
]


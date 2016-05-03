async-actions
=============

Async action creator for use with `redux` and `redux-thunk`. Uses `whatwg-fetch` and dispatches
`IN_PROGRESS`, `SUCCESS`, and `FAIL` events during the lifecycle of an async request.

`actions.js`
```javascript
import { createAction, makeAsyncActionTypes } from 'async-actions'

export const {
  LIST_USERS,
  CREATE_USER,
} = makeAsyncActionTypes('DoorDash', [
  'LIST_USERS',
  'CREATE_USER',
])

export const listUsers = createAction(LIST_USERS, '/api/users/')
export const createUser = email => createAction(CREATE_USER, '/api/users/', {
  method: 'POST',
  body: {
    email,
  },
})
```

`reducers.js`
```javascript
import { combineReducers } from 'redux'
import {
  LIST_USERS,
  CREATE_USER,
} from './actions'

// highly suggested: using a library like https://github.com/gaearon/normalizr to flatten state
function users(state = [], action) {
  if (action.type === LIST_USERS.SUCCESS) {
    return [...action.response]
  } else if (action.type === CREATE_USER.SUCCESS) {
    return [...state, action.response]
  }

  return state
}

export default combineReducers({
  users,
})
```

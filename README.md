async-actions
=============

Async action creator for use with redux and redux-thunk.

actions.js
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

reducers.js
```javascript
import { combineReducers } from 'redux'
import {
  LIST_USERS,
  CREATE_USER,
} from './actions'

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

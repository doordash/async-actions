import { fetch } from './utils'

export function createAction(actionType, url, options) {
  return dispatch => {
    dispatch({ type: actionType.IN_PROGRESS })

    return fetch(url, options).then(response => {
      dispatch({ type: actionType.SUCCESS, response })
      return response
    }).catch(error => {
      dispatch({ type: actionType.FAIL, error })
      throw error
    })
  }
}

export * from './actionTypes'

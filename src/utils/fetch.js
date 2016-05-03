import 'whatwg-fetch'
import queryString from 'query-string'

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default function fetch(url, options = {}) {
  let { body } = options
  let formattedURL = url

  // format body depending on method
  if (body && (!options.method || options.method === 'GET')) {
    formattedURL = `${url}?${queryString.stringify(body)}`
    body = undefined
  } else if (typeof body === 'object') {
    body = JSON.stringify(body)
  }

  // merge default and provided options
  const formattedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...(defaultOptions.headers || {}),
      ...(options.headers || {}),
    },
    body,
  }

  return window.fetch(url, formattedOptions).then(checkStatus).then(parseJSON)
}

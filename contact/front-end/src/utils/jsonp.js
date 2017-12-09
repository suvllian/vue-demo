export const parseParams = params => {
  let paramArr = []
  const csrfToken = getCsrfToken()
  for (const key in params) {
    paramArr.push(`${key}=${encodeURIComponent(params[key])}`)
  }
  if (csrfToken.length > 1) {
    paramArr.push(`csrf_token=${encodeURIComponent(csrfToken[1])}`)
  }

  return paramArr.join('&')
}

const getCsrfToken = () => {
  const cookies = document.cookie.split(';')
  const csrfString = cookies.filter(cookie => cookie.includes('csrf_token')).join('')
  return csrfString.split('=')
}

export const addParamsToUrl = (url, params) => {
  const paramStr = parseParams(params)

  return url.includes('?') ? `${url}&${paramStr}` : `${url}?${paramStr}`
}

export const jsonp = (url, params = {}) => {
  return new Promise((resolve) => {
    const callback = 'jsonp_' + Math.random().toString(36).substr(2)
    let response
    params.callback = callback

    const script = document.createElement('script')
    script.src = addParamsToUrl(url, params)
    script.type = 'text/javascript'
    script.async = true

    window[callback] = data => {
      response = data
    }

    const handler = event => {
      event.type === 'load' && response ? resolve(response) : resolve(null)
      window[callback] = null
      document.body.removeChild(script)
    }

    script.onload = handler
    script.onerror = handler

    document.body.appendChild(script)
  })
}

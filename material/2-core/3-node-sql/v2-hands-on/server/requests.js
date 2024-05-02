/**
 * Reads the body of a request and parses it as JSON.
 * @param {http.IncomingMessage} req
 * @returns {Promise<unknown>}
 */
export function getJsonBody(req) {
  // The specifics of how to read the body of a request and parse it
  // as JSON go beyond the scope of this exercise.
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body)
        resolve(parsed)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * Our Node server will run on localhost:3000.
 * Our static HTML, CSS and JS files in the public directory
 * are served on some other port, for example localhost:3001.
 *
 * Due to security restrictions, modern browsers try to prevent
 * scripts from making requests to different origins (origin is the
 * "protocol://hostname:port" of a URL - http://localhost:3001).
 *
 * To make sure that the server allows requests from different origins,
 * the browser sends a polite request to the server before making the
 * actual requests it was instructed to make. This polite request is
 * called a "preflight" request.
 *
 * To make sure our server is accessible from the browser, we need to
 * respond to these preflight requests with the appropriate headers.
 *
 * This function sets the necessary headers for cross-origin requests.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @returns {boolean} True if the request was an OPTIONS request
 */
export function isTerminatedCrossOriginRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return true
  }

  return false
}

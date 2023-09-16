interface FetcherInput {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: any
  apiKey?: string
}

const rawFetcher = async (input: FetcherInput): Promise<Response> => {
  const { url, method = 'GET', body, headers, apiKey } = input
  let internalUrl = url

  // If an API key is provided, append it to the URL
  if (apiKey) {
    const urlObj = new URL(url)
    urlObj.searchParams.append('apiKey', apiKey)
    internalUrl = urlObj.toString()
  }

  // Send the request + return the response
  return await fetch(internalUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

/**
 * Utility function to fetch data from the API ginven by the professor
 * @param input The input to the fetcher function
 */
const fetcher = async <T = unknown>(input: FetcherInput): Promise<T> => {
  // Send the request using the raw fetcher
  return await rawFetcher(input).then(res => res.json())
}

export { rawFetcher }

export default fetcher

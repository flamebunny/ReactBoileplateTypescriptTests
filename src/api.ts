interface MoviesItemProps {
  id: string
  title: string
  releaseYear: string
}

export interface MoviesProps  {
  title: string
  description: string
  movies: MoviesItemProps[]
}

const errorCodeWebappVersionMismatch: number = 551

export class ApiServiceError extends Error {
  private response: Response

  constructor(response: Response) {
    super(`Fetch failed. Error code ${response.status}`)
    this.response = response
  }
}

function fetchFromApi(url: string, opts?: RequestInit): Promise<Response> {
  const headers = new Headers()

  const { headers: optionalHeaders, ...options } = opts || { headers: null }

  if (optionalHeaders) {
    for (const key in optionalHeaders) {
      if ((typeof key === 'string') && (typeof optionalHeaders[key] === 'string')) {
        headers.append(`${key}`, optionalHeaders[key])
      }
    }
  }

  // Custom headers can cause CORS check to fail, so only send if URL is relative (same-origin)
  if (isRelativeUrl(url)) {
    addCustomHeaders(headers)
  }

  return window.fetch(url, { credentials: 'same-origin', headers, ...options }).then((response: Response) => {
    if (!response.ok) {
      if (response.status === errorCodeWebappVersionMismatch) {
        window.location.reload(true)
      } else {
        throw new ApiServiceError(response)
      }
    }
    return response
  })

}

function isRelativeUrl(url: string) {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i')
  return (r.test(url) === false)
}

function addCustomHeaders(headers: Headers) {

}

export function fetchJsonFromApi<T>(url: string, opts?: RequestInit): Promise<T> {
  return fetchFromApi(url, opts).then((response: Response) => {
    return response[response.status === 204 ? 'text' : 'json']() as Promise<T>
  })
}

export function getPostParameters<TRequest>(request: TRequest): RequestInit {
  /*
  return {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
  };
  */
  return {}
}

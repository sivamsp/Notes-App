type FetchRequest = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE'
  urlPath: string
  body?: object
}

export async function doFetch<T = {}>(
  req: FetchRequest,
): Promise<{ data: T; statusCode: number }> {
  let response: Response | null = null
  try {
    response = await fetch(`http://localhost:4000/api${req.urlPath}`, {
      method: req.method,
      body: req.body ? JSON.stringify(req.body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  } catch (err) {
    throw {
      urlPath: req.urlPath,
      statusCode: response?.status,
      responseHeaders: {},
      err: `${err}`,
    }
  }

  let data: T
  try {
    data = await response.json()
  } catch (err) {
    throw {
      urlPath: req.urlPath,
      statusCode: response?.status,
      responseHeaders: {},
      err: `${err}`,
    }
  }

  return { data: data, statusCode: response.status }
}

const BASE_URL = `/api`

export const get = async <ResponseType>(endpoint: string): Promise<ResponseType> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'GET',
  })

  return response.json() as ResponseType
}

export const post = async <ResponseType, RequestType>(
  endpoint: string,
  payload: RequestType,
): Promise<ResponseType> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response.json() as ResponseType
}

export const patch = async <ResponseType, RequestType>(
  endpoint: string,
  payload: RequestType,
): Promise<ResponseType> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response.json() as ResponseType
}

export const httpDelete = async <ResponseType>(endpoint: string): Promise<ResponseType> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
  })

  return response.json() as ResponseType
}

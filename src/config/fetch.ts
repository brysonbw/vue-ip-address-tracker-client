type Param = {
  [key: string]: string
}

export interface IFetchOptions {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined
  parameters?: Param
  body?: BodyInit
  config?: RequestInit
}

/**
 * Fetch (wrapper) client
 * @param url
 * @param method
 * @param parameters
 * @param headers
 */
export async function fetchClient ({ url, method = 'GET', parameters, body, config }: IFetchOptions) {
  if (parameters !== undefined) {
    url += searchParamsToString(parameters)
  }
  try {
    const response = await fetch(url, {
      method,
      body,
      headers: {
        ...config?.headers,
      },
      ...config,
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    return json
  } catch (error: any) {
    console.error(error.message)
    return error
  }
}

/**
 * Search params (object) to query string
 * @param paramsObj
 * @param fetchURL
 */
function searchParamsToString (paramsObj: Param, fetchURL: boolean = true): string | URLSearchParams {
  if (typeof paramsObj !== 'object' || Object.keys(paramsObj)?.length === 0) {
    return ''
  }
  const searchParams = new URLSearchParams(paramsObj)
  searchParams.toString()
  return fetchURL ? `?${searchParams}` : searchParams
}

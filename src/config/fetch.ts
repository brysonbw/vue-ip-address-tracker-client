export interface IFetchOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | FormData | Record<string, any>;
  headers?: HeadersInit;
  json?: boolean;
  config?: RequestInit;
}

/**
 * fetch (wrapper) handler/client
 * @param url
 * @param method
 * @param body
 * @param headers
 * @param json
 * @param config
 */
export async function fetchClient ({
  url,
  method = 'GET',
  body,
  headers,
  json = true,
  config,
}: IFetchOptions) {
  // Config/prep body payload
  let payload = body
  if (json && payload !== undefined) {
    if (payload instanceof FormData) {
      console.log('body payload: FormData')
      payload = formDataToJson(payload)
    } else if (typeof payload === 'object') {
      console.log('body payload: Object (Record)')
      payload = objecToJson(payload)
    }
  }
  try {
    const response = await fetch(url, {
      method,
      body: payload as BodyInit,
      headers,
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
function searchParamsToString (
  paramsObj: { [key: string]: string },
  fetchURL: boolean = true
): string | URLSearchParams {
  if (typeof paramsObj !== 'object' || Object.keys(paramsObj)?.length === 0) {
    return ''
  }
  const searchParams = new URLSearchParams(paramsObj)
  searchParams.toString()
  return fetchURL ? `?${searchParams}` : searchParams
}

/**
 * Convert FormData to JSON
 * @param formData
 */
function formDataToJson (formData: FormData): string {
  const dataObject = Object.fromEntries(formData)
  return JSON.stringify(dataObject)
}

/**
 * Convert data (object) to JSON
 * @param data
 */
function objecToJson (data: Record<string, any>) {
  return JSON.stringify(data)
}

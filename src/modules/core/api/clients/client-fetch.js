// import { URL_BASE } from '@/modules/core/constants'

const clientFetch = async (url, options) => {
  // const URL = `${URL_BASE}/${url}`
  // const headers = {
  //   'Content-type': 'application/json; charset=UTF-8',
  // }

  const response = await fetch(url, { ...options })
  return response
}

export { clientFetch }

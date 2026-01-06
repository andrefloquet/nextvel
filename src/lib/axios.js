'use client'

import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
})

// Force XSRF header on every request (only in the browser)
axios.interceptors.request.use((config) => {

  const match = document.cookie.match(/(^|; )XSRF-TOKEN=([^;]*)/)
  const token = match ? match[2] : null

  if (token) {
    config.headers = config.headers ?? {}
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token)
  }

  return config
})

export default axios

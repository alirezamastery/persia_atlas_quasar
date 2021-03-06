import { boot } from 'quasar/wrappers'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios'
import { useGeneralStore } from 'src/stores/general'
import urls from 'src/urls'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

function getCookie(name: string) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

const csrfToken = getCookie('csrftoken')

const baseURL = process.env.API_BASE

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 0,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? `Bearer ${String(localStorage.getItem('access_token'))}`
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
    'X-CSRFToken': csrfToken,
  },
})


axiosInstance.interceptors.request.use(
  function(config) {
    const generalStore = useGeneralStore()
    generalStore.IncrementHttpRequestQueue()
    return config
  },
)

axiosInstance.interceptors.response.use(
  function(response) {
    const generalStore = useGeneralStore()
    generalStore.DecrementHttpRequestQueue()
    return response
  },
  async function(error: AxiosError) {
    const generalStore = useGeneralStore()

    generalStore.DecrementHttpRequestQueue()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const originalRequest: AxiosRequestConfig = error.config
    console.log('in axiosInstance | BEGINNING | error: ', error)

    if (typeof error.response === 'undefined') {
      console.log('axios error.response is undefined', error)
      // store.commit('SET_SNACKBAR', {
      //   key: uuid4(),
      //   color: 'red',
      //   data: error,
      // })
      return Promise.reject(error)
    }

    if (error.response) {
      console.log('in axiosInstance | BEGINNING | error.response.data: ', error.response.data)
      console.log('in axiosInstance | BEGINNING | error.response.status: ', error.response.status)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/'
    ) {
      // window.location.href = '/login/';
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      window.location.href = '/login/'
      return Promise.reject(error)
    }

    if (
      error.response.status === 403
      //&& error.response.data.code === 'token_not_valid'
      //&& error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        console.log(`response.status was ${error.response.status} so we will use refreshToken: `, refreshToken)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        const now = Date.now()
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (tokenParts.exp * 1000 > now) {
          return axiosInstance
            .post(urls.refreshToken, { refresh: refreshToken })
            .then((response: AxiosResponse) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              localStorage.setItem('access_token', response.data.access)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              localStorage.setItem('refresh_token', response.data.refresh)

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access

              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              console.log('error in refresh token part: ', err)
              // window.location.href = '/login/'
            })
        } else {
          console.log('Refresh token is expired', tokenParts, now)
          // throw new Error('refresh_token_expired')
          window.location.href = '/login/'
        }
      } else {
        console.log('in axiosInstance: Refresh token not available. refreshToken is: ', refreshToken)
        window.location.href = '/login/'
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$apiCLient = axiosInstance
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axiosInstance }

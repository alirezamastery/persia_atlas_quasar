import { defineStore } from 'pinia'

const storeID = 'general'


export const useGeneralStore = defineStore({
  id: storeID,
  // state: (): IUser => JSON.parse(localStorage.getItem(storeID) ?? JSON.stringify(User)) as IUser,
  state: () => ({
    httpRequestQueue: 0 as number,
    // sidebarOpen: false as boolean,
    // alerts: [],
    // pendingAlerts: [],
    // snackbars: [],
    // snackbar: null,
    // locale: 'fa' as string,
    // vuetifyRTL: true,
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.httpRequestQueue > 2
    },
  },
  actions: {
    IncrementHttpRequestQueue() {
      this.httpRequestQueue++
    },
    DecrementHttpRequestQueue() {
      this.httpRequestQueue--
      if (this.httpRequestQueue < 0)
        this.httpRequestQueue = 0
    },
    ClearHttpRequestQueue() {
      this.httpRequestQueue = 0
    },
  },
})

export type UserStore = ReturnType<typeof useGeneralStore>

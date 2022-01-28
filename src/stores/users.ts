import { defineStore } from 'pinia'
import { userProfile } from 'src/types/interfaces'
import { useRouter } from 'vue-router'
import router from 'src/router'
import { axiosInstance } from 'boot/axios'

const storeID = 'user'

interface IUser {
  loggedIn: boolean,
}

const User: IUser = {
  loggedIn: false,
}

export { IUser }


export const useUserStore = defineStore({
  id: storeID,
  // state: (): IUser => JSON.parse(localStorage.getItem(storeID) ?? JSON.stringify(User)) as IUser,
  state: () => ({
    user: null as string | boolean | null,
    profile: {
      first_name: null as string | null,
      last_name: null as string | null,
      avatar: null as string | null,
    },
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    },
  },
  actions: {
    Login(user: string | boolean): void {
      this.user = user
    },
    Logout(): void {
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axiosInstance.defaults.headers['Authorization'] = ''
      void router.push({ name: 'Login' })
    },
    SetProfile(payload: userProfile) {
      this.profile = payload
    },
  },
})

export type UserStore = ReturnType<typeof useUserStore>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />

    <Sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Sidebar from 'layouts/Sidebar.vue'
import Header from 'layouts/Header.vue'
import { useUserStore } from 'src/stores/users'
import { useRouter } from 'vue-router'
import { axiosInstance } from 'boot/axios'
import { userProfile } from 'src/types/interfaces'
import urls from 'src/urls'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const userStore = useUserStore()
    const router = useRouter()

    const isAuthenticated = computed(() => userStore.isAuthenticated)
    if (!isAuthenticated.value) {
      axiosInstance.get(urls.userProfile).then(res => {
        console.log('res', res)
        userStore.Login(true)
        userStore.SetProfile(res.data as userProfile)
      }).catch(err => {
        console.log(err)
        void router.push({ name: 'Login' })
      })
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isAuthenticated,
    }
  },
})
</script>

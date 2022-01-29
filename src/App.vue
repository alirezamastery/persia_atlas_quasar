<template>
  <q-layout view="lHh Lpr lFf">

    <q-linear-progress
      v-show="hasHttpRequestWaiting"
      indeterminate
      stripe
      class="fixed z-top"
      color="red"
      :animation-speed="500"
    />

    <Header v-if="showAppLayout" />

    <Sidebar v-if="showAppLayout" />

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
import { useRouter, useRoute } from 'vue-router'
import { axiosInstance } from 'boot/axios'
import { userProfile } from 'src/types/interfaces'
import urls from 'src/urls'
import { useGeneralStore } from 'src/stores/general'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const userStore = useUserStore()
    const generalStore = useGeneralStore()

    const router = useRouter()
    const route = useRoute()

    const hasHttpRequestWaiting = computed(() => generalStore.hasHttpRequestWaiting)

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

    const showAppLayout = computed(() => {
      const noAuthRoutes = ['404', 'Login', 'justRain']
      return isAuthenticated.value && !noAuthRoutes.includes(String(route.name))
    })

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      isAuthenticated,
      showAppLayout,
      hasHttpRequestWaiting
    }
  },
})
</script>

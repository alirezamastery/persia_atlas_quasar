<template>
  <q-layout view="lHh Lpr lFf">
    <Header />

    <Sidebar />

    <q-page-container>
<!--      <router-view />-->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]

import { defineComponent, ref, computed } from 'vue'
import Sidebar from 'layouts/Sidebar.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/users'
import { axiosInstance } from 'boot/axios'
import { userProfile } from 'src/types/interfaces'
import urls from 'src/urls'
import Header from 'src/layouts/Header.vue'

export default defineComponent({
  name: 'MainLayout',
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
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isAuthenticated,
    }
  },
})
</script>

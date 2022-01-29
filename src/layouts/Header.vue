<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title>
        {{ $t('general.siteHeader') }}
      </q-toolbar-title>

      <ThemeToggle />

      <q-btn
        v-if="isAuthenticated"
        color="red"
        @click="handleLogout"
      >
        {{ $t('general.routes.logout') }}
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {mapState} from 'pinia'
import { useUserStore } from '../stores/users'
import {useGeneralStore} from 'src/stores/general'
import { sidebarOpen, generalState } from 'layouts/composables'
import { useQuasar } from 'quasar'
import ThemeToggle from 'layouts/ThemeToggle.vue'

export default {
  name: 'Header',
  components: {
    ThemeToggle
  },
  setup() {
    const q = useQuasar()

    const userStore = useUserStore()
    const router = useRouter()

    const isAuthenticated = computed(() => userStore.isAuthenticated)

    function toggleLeftDrawer() {
      generalState.sideOpen = !generalState.sideOpen
    }

    function handleLogout() {
      void userStore.Logout()
    }

    return {
      sidebarOpen,
      toggleLeftDrawer,
      isAuthenticated,
      handleLogout,
      q
    }
  }
}
</script>

<style scoped>

</style>
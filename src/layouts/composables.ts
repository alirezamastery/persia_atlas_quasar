import { ref, reactive } from 'vue'

export const sidebarOpen = ref(true)

interface state {
  sideOpen: boolean
}

export const generalState = reactive<state>({
  sideOpen: true,
})
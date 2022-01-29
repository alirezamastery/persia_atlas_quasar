<template>
  <q-table
    :title="title"
    :rows="data.items"
    :columns="columns"
    :row-key="itemKey"
    :dense="denseRows"
    :no-data-label="$t('general.noItemsFound')"
    :pagination="paginationOptions"
  >
    <template v-slot:body="props">

      <q-tr :props="props">
        <q-td
          v-for="column in columns"
          :key="column.name"
          :props="props"
        >
          <slot
            :name="`col-${column.name}`"
            v-bind:props="props"
            v-bind:data="data"
          >
            {{ props.row[column.field] }}
          </slot>
        </q-td>
      </q-tr>
    </template>
    <!--    <template-->
    <!--      v-for="(column) in columns"-->
    <!--      v-slot:[`body-cell-${column.name}`]="props"-->
    <!--    >-->
    <!--      <slot-->
    <!--        :name="`col-${column.name}`"-->
    <!--        v-bind:props="props"-->
    <!--        v-bind:data="data"-->
    <!--      >-->
    <!--        {{column.name}}-->
    <!--      </slot>-->
    <!--    </template>-->

  </q-table>
</template>


<script setup lang="ts">
import { ref, reactive, defineEmits, defineProps } from 'vue'
import { axiosInstance } from 'boot/axios'

const props = defineProps({
  title: { type: String, required: true },
  apiRoot: { type: String, required: true },
  columns: { type: Array, required: true },
  editRoute: { type: String, required: true },
  addRoute: { type: String, required: true },
  itemKey: { type: String, required: false, default: 'id' },
  showActions: { type: Boolean, required: false, default: true },
  denseRows: { type: Boolean, required: false, default: true },
  hideSearch: { type: Boolean, required: false, default: false },
  filters: { type: Array, required: false, default: () => ([]) },
})

const emit = defineEmits(['change', 'delete'])

const pageSize = ref(20)
const pageSizeOptions = ref([10, 20, 50, 100])
const page = ref(1)
const queries = ref('')
const totalPaginationVisible = ref(7)
const paginationOptions = ref({
  rowsPerPage: 20,
})
const data = ref({
  items: [],
  count: 0,
  page_count: 0,
  next: null,
  previous: null,
})
const searchPhrase = ref('')
const sideFilterQuery = ref('')

function constructQuery(): string {
  let query = `?${queries.value}&page_size=${pageSize.value}`
  if (searchPhrase.value)
    query += `&search=${searchPhrase.value}`
  if (page.value)
    query += `&page=${page.value}`
  if (sideFilterQuery.value)
    query += sideFilterQuery.value
  console.log('constructQuery', query)
  return query
}

function handleUpdate(): void {
  console.log('handleUpdate')
}

function handlePageSelect(event: number): void {
  console.log('handlePageSelect', event)
  page.value = event
  reFetchData()
}

function reFetchData(): void {
  const url = props.apiRoot + constructQuery()
  axiosInstance.get(url)
    .then(res => {
      console.log('reFetchData | response', res)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data.value = res.data
    })
    .catch(err => {
      console.log('reFetchData | error', err)
    })
}

reFetchData()

</script>

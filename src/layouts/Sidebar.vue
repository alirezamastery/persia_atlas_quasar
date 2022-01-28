<template>
  <q-drawer
    v-model="generalState.sideOpen"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label
        header
      >
        Essential Links
      </q-item-label>

      <template
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <q-separator class="q-mt-md q-mb-xs" />
        <!--          <q-item-section-->
        <!--            v-if="item.icon"-->
        <!--            avatar-->
        <!--          >-->
        <!--            <q-icon :name="item.icon" />-->
        <!--          </q-item-section>-->
        <q-item-section>
          <q-item-label header class="text-weight-bold text-uppercase">
            {{ $t(item.titleI18n) }}
          </q-item-label>
        </q-item-section>

        <q-item
          v-for="(subItem, j) in item.children"
          :key="j"
          :to="{name: subItem.routeName}"
          clickable
          v-ripple
        >
          <q-item-section
            v-if="subItem.icon"
            avatar
          >
            <q-icon :name="subItem.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t(subItem.titleI18n) }}</q-item-label>
          </q-item-section>
        </q-item>

      </template>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { generalState } from 'layouts/composables'
import routesObj from 'src/router/routes'
import { RouteRecordName } from 'vue-router'

interface SidebarRoute {
  routeName: RouteRecordName | undefined,
  titleI18n: unknown,
  permission: unknown,
  icon: unknown,
}

function getRoute(route: string): SidebarRoute {
  return {
    routeName: routesObj[route].name,
    titleI18n: routesObj[route].meta?.titleI18n,
    permission: routesObj[route].meta?.permission || [],
    icon: routesObj[route].meta?.icon,
  }
}

const menuItems = [
  {
    icon: 'warehouse',
    order: 20,
    titleI18n: 'general.routes.products',
    collapsed: false,
    children: [
      getRoute('brandList'),
      getRoute('productTypeList'),
      getRoute('actualProductList'),
      getRoute('productList'),
      // getRoute('productTypeSelectorList'),
      // getRoute('productTypeSelectorValueList'),
      getRoute('variantList'),
    ],
  },
  {
    icon: 'industrial',
    order: 30,
    titleI18n: 'general.routes.robot',
    collapsed: false,
    children: [
      // getRoute('editVariantStatus'),
      // getRoute('invoiceDownload'),
      // getRoute('digiCredentials'),
    ],
  },
  {
    icon: 'calculator',
    order: 40,
    titleI18n: 'acc.accounting',
    collapsed: false,
    children: [
      getRoute('costTypeList'),
      getRoute('costList'),
      getRoute('incomeList'),
      getRoute('productCostList'),
    ],
  },
]
export default {
  name: 'Sidebar',
  setup() {
    return {
      generalState,
      menuItems,
    }
  },
}
</script>

<style scoped>

</style>
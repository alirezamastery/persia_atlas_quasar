import { RouteRecordRaw, RouteRecordName } from 'vue-router'
import routesObj from 'src/router/routes'



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

export default menuItems
export const home = () =>
  import(/* webpackChunkName: "general" */ '../views/home.vue')
export const login = () =>
  import(/* webpackChunkName: "general" */ '../views/auth/Login.vue')

export const actualProductsList = () =>
  import(/* webpackChunkName: "products" */ '../views/products/actualProduct/List.vue')
export const actualProductAddEdit = () =>
  import(/* webpackChunkName: "products" */ '../views/products/actualProduct/AddEdit.vue')

export const brandList = () =>
  import(/* webpackChunkName: "products" */ '../views/products/brand/List.vue')
export const brandAddEdit = () =>
  import(/* webpackChunkName: "products" */ '../views/products/brand/AddEdit.vue')

export const productsList = () =>
  import(/* webpackChunkName: "products" */ '../views/products/product/List.vue')
export const productAddEdit = () =>
  import(/* webpackChunkName: "products" */ '../views/products/product/AddEdit.vue')

export const productTypesList = () =>
  import(/* webpackChunkName: "products" */ '../views/products/productType/List.vue')
export const productTypeAddEdit = () =>
  import(/* webpackChunkName: "products" */ '../views/products/productType/AddEdit.vue')

// export const productTypeSelectorsList = () =>
//   import(/* webpackChunkName: "products" */ '../views/products/productTypeSelector/List.vue')
// export const productTypeSelectorAddEdit = () =>
//   import(/* webpackChunkName: "products" */ '../views/products/productTypeSelector/AddEdit.vue')
//
// export const productTypeSelectorValuesList = () =>
//   import(/* webpackChunkName: "products" */ '../views/products/productTypeSelectorValues/List.vue')
// export const productTypeSelectorValueAddEdit = () =>
//   import(/* webpackChunkName: "products" */ '../views/products/productTypeSelectorValues/AddEdit.vue')

export const variantsList = () =>
  import(/* webpackChunkName: "products" */ '../views/products/variant/List.vue')
export const variantAddEdit = () =>
  import(/* webpackChunkName: "products" */ '../views/products/variant/AddEdit.vue')


// export const editVariantStatus = () =>
//   import(/* webpackChunkName: "robot" */ '../views/robot/variantStatus/EditVariantStatus.vue')
// export const invoiceDownload = () =>
//   import(/* webpackChunkName: "robot" */ '../views/robot/invoice/Download.vue')
// export const digiCredentials = () =>
//   import(/* webpackChunkName: "robot" */ '../views/robot/digiCredentials/DigiCredentials.vue')
// export const scrapeInvoice = () =>
//   import(/* webpackChunkName: "robot" */ '../views/robot/scrapeInvoice/scrape.vue')

export const costList  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/cost/List.vue')
export const costAddEdit  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/cost/AddEdit.vue')

export const costTypeList  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/costType/List.vue')
export const costTypeAddEdit  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/costType/AddEdit.vue')

export const incomeList  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/income/List.vue')
export const incomeAddEdit  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/income/AddEdit.vue')

export const productCostList  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/productCost/List.vue')
export const productCostAddEdit  = () =>
  import(/* webpackChunkName: "accounting" */ '../views/accounting/productCost/AddEdit.vue')
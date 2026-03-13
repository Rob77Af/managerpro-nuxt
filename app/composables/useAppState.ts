import { useLocalStorage } from '@vueuse/core'
import type {
  Product, Client, Exporter, OtherSupplier, GlobalParameters, AppSettings,
  Invoice, PackingListEntry, PackingListHeader, FreightQuote, MerchandiseQuote
} from '~/types'

const TODAY = new Date().toISOString().split('T')[0]

const DEFAULT_PARAMS: GlobalParameters = {
  usdRate: 5.61, freightType: 'collect', importModal: 'sea',
  estimatedFreightUSD: 0, estimatedFreight40USD: 0, lclRateUSDPerCBM: 0,
  airFreightUSDPerKg: 6.00, insuranceUSD: 0, storage: 0, siscomex: 115.67,
  afrmm: 0, brokerFee: 0, thc: 0, localFreight: 0,
  documentIssueFee: 300, scannerInspectionFee: 100, otherExpenses: 0, icmsRate: 18
}

const DEFAULT_SETTINGS: AppSettings = {
  companyName: '', companyDocument: '', companyAddress: '', companyPhone: '',
  companyMobile: '', companyEmail: '', companyContactName: '', currencySymbol: 'R$',
  password: 'admin', theme: 'light',
  storagePreferences: { products: 'local', clients: 'local', exporters: 'local', invoices: 'database', quotes: 'local' },
  customPrimaryColorLight: '#4C6F51', customPrimaryLightestColorLight: '#D6E3D8',
  customPrimaryLighterColorLight: '#91A895', customPrimaryDarkColorLight: '#28422B',
  customGlowColorLight: '#F5C25F', customContrastLightColorLight: '#F7F7F7',
  customHullDarkColor: '#306844', customGlowDarkColor: '#FFBE64',
  customDeepDarkColor: '#142346', customDarkBgDarkColor: '#1A202C',
  customCraneDarkColor: '#BE1E2D', customFontFamily: 'Play',
  lightThemeName: 'Administrativo', darkThemeName: 'Industrial',
}

const DEFAULT_INVOICE: Invoice = {
  id: 'inv-1', exporterId: '', clientId: '',
  date: TODAY, number: '', terms: '', items: [], remarks: ''
}

const DEFAULT_PACKING_HEADER: PackingListHeader = {
  exporterName: '', exporterAddress: '', consigneeName: '', consigneeAddress: '',
  buyerName: '', buyerAddress: '', invoiceNumber: '', invoiceDate: '',
  billOfLading: '', reference: '', buyerReference: '',
  methodOfDispatch: 'SEA', typeOfShipment: 'FCL',
  countryOfOrigin: '', countryOfDestination: 'BRAZIL',
  vesselName: '', voyageNo: '', portOfLoading: '',
  dateOfDeparture: '', portOfDischarge: '', finalDestination: ''
}

export const useAppState = () => {
  const products          = useLocalStorage<Product[]>('venezys_products', [])
  const clients           = useLocalStorage<Client[]>('venezys_clients', [])
  const exporters         = useLocalStorage<Exporter[]>('venezys_exporters', [])
  const otherSuppliers    = useLocalStorage<OtherSupplier[]>('venezys_other_suppliers', [])
  const merchandiseQuotes = useLocalStorage<MerchandiseQuote[]>('venezys_merch_quotes', [])
  const freightQuotes     = useLocalStorage<FreightQuote[]>('venezys_freight_quotes', [])
  const params            = useLocalStorage<GlobalParameters>('venezys_params', DEFAULT_PARAMS)
  const appSettings       = useLocalStorage<AppSettings>('venezys_settings', DEFAULT_SETTINGS)
  const invoice           = useLocalStorage<Invoice>('venezys_current_invoice', DEFAULT_INVOICE)
  const savedInvoices     = useLocalStorage<Invoice[]>('venezys_saved_invoices', [])
  const packingList       = useLocalStorage<PackingListEntry[]>('venezys_packing_list', [])
  const packingListHeader = useLocalStorage<PackingListHeader>('venezys_packing_header', DEFAULT_PACKING_HEADER)

  const resetData = (options: Record<string, boolean>) => {
    if (options.invoices || options.all) {
      savedInvoices.value = []
      invoice.value = { id: crypto.randomUUID(), exporterId: '', clientId: '', date: new Date().toISOString().split('T')[0], number: '', terms: '', items: [], remarks: '' }
    }
    if (options.products || options.all) products.value = []
    if (options.clients || options.all) clients.value = []
    if (options.exporters || options.all) exporters.value = []
    if (options.quotes || options.all) { merchandiseQuotes.value = []; freightQuotes.value = [] }
    if (options.all) { localStorage.clear(); window.location.reload() }
  }

  return {
    products, clients, exporters, otherSuppliers,
    merchandiseQuotes, freightQuotes,
    params, appSettings, invoice, savedInvoices,
    packingList, packingListHeader, resetData,
  }
}

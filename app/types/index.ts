export type StorageTarget = 'local' | 'database';

export interface StoragePreferences {
  products: StorageTarget;
  clients: StorageTarget;
  invoices: StorageTarget;
  quotes: StorageTarget;
  exporters: StorageTarget;
}

export interface Product {
  id: string; code: string; supplierRef: string; description: string;
  detailedDescription: string; ncm: string; iiRate: number; ipiRate: number;
  pisRate: number; cofinsRate: number; icmsRate?: number; originCountry: string;
  supplierName: string; supplierContact: string; length: number; width: number;
  height: number; netWeightKg: number; grossWeightKg: number; material: string;
  certifications: string; unitPriceUSD: number; moq: number; pack: number;
  leadTime: string; imageUrl: string; marketingDescription: string;
  productUrl?: string; category?: string;
}

export interface Client {
  id: string; name: string; document: string; contact: string;
  street: string; city: string; state: string; country: string;
  email?: string; phone?: string; mobilePhone?: string; site?: string; mainProducts?: string;
}

export interface Exporter {
  id: string; name: string; address: string; phone: string;
  mobilePhone?: string; email: string; contactName?: string; site?: string; mainProducts?: string;
}

export type OtherSupplierType = 'freight_forwarder' | 'customs_broker' | 'warehouse' | 'insurer' | 'inspection' | 'other';

export interface OtherSupplier {
  id: string; name: string; type: OtherSupplierType; contact: string; email: string; phone: string;
}

export interface GlobalParameters {
  usdRate: number; freightType: 'prepaid' | 'collect'; importModal: 'sea' | 'air';
  estimatedFreightUSD: number; estimatedFreight40USD: number; lclRateUSDPerCBM: number;
  airFreightUSDPerKg: number; insuranceUSD: number; storage: number; siscomex: number;
  afrmm: number; brokerFee: number; thc: number; localFreight: number;
  documentIssueFee: number; scannerInspectionFee: number; otherExpenses: number; icmsRate: number;
}

export interface AppSettings {
  companyName: string; companyDocument: string; companyAddress: string;
  companyPhone: string; companyMobile?: string; companyEmail: string;
  companyContactName?: string; currencySymbol: string; personalName?: string;
  digitalSignature?: string; password?: string; storagePreferences: StoragePreferences;
  theme?: 'light' | 'dark'; customPrimaryColorLight?: string;
  customPrimaryLightestColorLight?: string; customPrimaryLighterColorLight?: string;
  customPrimaryDarkColorLight?: string; customGlowColorLight?: string;
  customContrastLightColorLight?: string; customHullDarkColor?: string;
  customGlowDarkColor?: string; customDeepDarkColor?: string;
  customDarkBgDarkColor?: string; customCraneDarkColor?: string;
  customFontFamily?: string; lightThemeName?: string; darkThemeName?: string;
}

export interface InvoiceItem extends Product { quantity: number; totalUSD: number; }

export interface PackingListEntry {
  productId: string; quantity: number; netWeightKg: number;
  grossWeightKg: number; volumes: number; dimensions: string;
}

export interface PackingListHeader {
  exporterName: string; exporterAddress: string; consigneeName: string;
  consigneeAddress: string; buyerName: string; buyerAddress: string;
  invoiceNumber: string; invoiceDate: string; billOfLading: string;
  reference: string; buyerReference: string; methodOfDispatch: string;
  typeOfShipment: string; countryOfOrigin: string; countryOfDestination: string;
  vesselName: string; voyageNo: string; portOfLoading: string;
  dateOfDeparture: string; portOfDischarge: string; finalDestination: string;
}

export interface Invoice {
  id: string; type?: 'Quotation' | 'Proforma Invoice' | 'Commercial Invoice';
  exporterId: string; clientId: string; shipToClientId?: string;
  date: string; number: string; terms: string; items: InvoiceItem[]; remarks: string;
  savedPackingList?: PackingListEntry[]; savedPackingListHeader?: PackingListHeader;
  savedParams?: GlobalParameters;
}

export interface MerchandiseQuoteItem { productId: string; targetPriceUSD: number; quantity: number; }
export interface MerchandiseQuote {
  id: string; exporterId: string; date: string;
  status: 'pending' | 'quoted' | 'approved'; items: MerchandiseQuoteItem[]; notes: string;
}

export interface FreightQuote {
  id: string; origin: string; destination: string;
  containerType: '20GP' | '40GP' | '40HC' | 'LCL'; priceUSD: number;
  freeTime: number; frequency: string; carrier: string; validUntil: string; exporterId: string;
}

export interface CalculatedCosts {
  fobTotalUSD: number; freightUSD: number; insuranceUSD: number; cifValueBRL: number;
  merchandiseBRL: number; iiValue: number; ipiValue: number; pisValue: number;
  cofinsValue: number; icmsValue: number; totalTaxes: number; totalExpenses: number;
  totalImportCost: number; totalClearanceCost: number; factor: number;
}

export interface AISuggestedFreightRates {
  estimatedFreightUSD?: number; estimatedFreight40USD?: number;
  lclRateUSDPerCBM?: number; airFreightUSDPerKg?: number; insuranceUSD?: number;
}

export interface AIImportAnalysis {
  product: Partial<Product>;
  supplier: Partial<Exporter>;
  compliance: { ncmCode: string; ncmDescription: string; alerts: string[]; taxes: { ii?: number; ipi?: number; pis?: number; cofins?: number; } }
}

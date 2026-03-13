<template>
  <!-- Landing Page -->
  <LandingPage
    v-if="showLanding"
    @enter="showLanding = false"
    :app-settings="appSettings" />

  <!-- App Content -->
  <NuxtLayout v-else name="default">
    <!-- Registries -->
    <RegistriesTab
      v-if="activeSection === 'registries'"
      :active-sub-tab="activeSubSection"
      :products="products" :clients="clients" :exporters="exporters" :other-suppliers="otherSuppliers"
      :is-from-process="!!navigationOrigin"
      @update:products="products = $event" @update:clients="clients = $event"
      @update:exporters="exporters = $event" @update:other-suppliers="otherSuppliers = $event"
      @return="onRegistriesReturn"
    />

    <!-- Invoice / Simulator -->
    <InvoiceTab
      v-else-if="activeSection === 'invoice'"
      :active-sub-tab="activeSubSection" :invoice="invoice" :saved-invoices="savedInvoices"
      :clients="clients" :products="products" :exporters="exporters" :params="params"
      :packing-list="packingList" :packing-list-header="packingListHeader"
      :app-settings="appSettings" :newly-added-id="lastCreatedId"
      @update:invoice="invoice = $event" @update:saved-invoices="savedInvoices = $event"
      @update:clients="clients = $event" @update:products="products = $event"
      @update:exporters="exporters = $event" @update:params="params = $event"
      @update:packing-list="packingList = $event" @update:packing-list-header="packingListHeader = $event"
      @navigate="activeSubSection = $event"
      @quick-add="(type) => handleNavClick('registries', type, 'invoice')"
      @clear-newly-added="clearLastCreated"
    />

    <!-- Quotes / Mercado -->
    <QuotesTab
      v-else-if="activeSection === 'quotes'"
      :active-sub-tab="activeSubSection" :freight-quotes="freightQuotes" :merchandise-quotes="merchandiseQuotes"
      :products="products" :exporters="exporters"
      @update:freight-quotes="freightQuotes = $event" @update:merchandise-quotes="merchandiseQuotes = $event"
      @select-freight="(p) => params.estimatedFreightUSD = p"
      @quick-add="(type) => handleNavClick('registries', type, 'quotes')"
    />

    <!-- Agenda -->
    <AgendaTab v-else-if="activeSection === 'agenda'" :active-sub-tab="activeSubSection as any" />

    <!-- Eduardo AI -->
    <QueriesTab v-else-if="activeSection === 'queries'" :active-sub-tab="activeSubSection as any" @update:products="products = $event" />

    <!-- Settings -->
    <template v-else-if="activeSection === 'configs'">
      <CorporateSettings v-if="activeSubSection === 'corporate'" :settings="appSettings" @update:settings="appSettings = $event" />
      <AppearanceSettings v-else-if="activeSubSection === 'appearance'" :settings="appSettings" @update:settings="appSettings = $event" />
      <SecuritySettings v-else-if="activeSubSection === 'security'" :settings="appSettings" @update:settings="appSettings = $event" />
      <DataManagementSettings v-else-if="activeSubSection === 'privacy'" :settings="appSettings" @update:settings="appSettings = $event" @reset-data="resetData" />
      <GlossaryTab v-else-if="activeSubSection === 'glossary'" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation'
import { useAppState } from '~/composables/useAppState'
import type { SectionId } from '~/composables/useNavigation'

const {
  activeSection, activeSubSection, showLanding, navigationOrigin, lastCreatedId,
  handleNavClick, clearLastCreated
} = useNavigation()

const {
  products, clients, exporters, otherSuppliers,
  merchandiseQuotes, freightQuotes, params, appSettings,
  invoice, savedInvoices, packingList, packingListHeader,
  resetData
} = useAppState()

const onRegistriesReturn = (payload?: { id: string; type: string }) => {
  if (payload) lastCreatedId.value = payload
  handleNavClick('invoice' as SectionId, 'details')
  navigationOrigin.value = null
}
</script>

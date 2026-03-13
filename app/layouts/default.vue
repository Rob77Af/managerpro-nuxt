<template>
  <div class="min-h-screen bg-port-contrast-light dark:bg-port-dark flex flex-col md:flex-row font-sans transition-colors duration-300">
    <!-- Mobile Header -->
    <div class="md:hidden bg-white dark:bg-port-deep border-b border-gray-200 dark:border-white/10 p-4 flex justify-between items-center sticky top-0 z-50">
      <Ship class="h-6 w-6 text-port-primary dark:text-port-hull" />
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 text-gray-500 dark:text-port-light">
        <X v-if="isMobileMenuOpen" />
        <Menu v-else />
      </button>
    </div>

    <!-- Sidebar -->
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 bg-white dark:bg-port-deep border-r border-gray-100 dark:border-white/5 transform transition-all duration-300 ease-in-out flex flex-col w-64',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
      <!-- Brand -->
      <div class="h-20 flex items-center px-6 border-b border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-port-dark/20">
        <div class="flex items-center gap-3 cursor-pointer" @click="showLanding = true">
          <Ship class="h-8 w-8 text-port-primary dark:text-port-hull" />
          <span class="font-black text-gray-900 dark:text-port-light text-xl tracking-tighter uppercase">ManagerPro</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-8 flex flex-col gap-3 overflow-y-auto no-scrollbar">
        <div v-for="menu in menuStructure" :key="menu.id" class="flex flex-col">
          <button
            @click="toggleSection(menu.id as any)"
            :class="[
              'w-full flex items-center justify-between p-3.5 rounded-xl transition-all',
              activeSection === menu.id
                ? 'bg-port-primary text-white shadow-xl'
                : 'text-gray-400 dark:text-port-light/50 hover:text-gray-900 dark:hover:text-port-light hover:bg-gray-50 dark:hover:bg-white/5'
            ]"
          >
            <div class="flex items-center gap-3">
              <component :is="getIcon(menu.icon)" class="h-5 w-5" />
              <span :class="['text-xs font-black uppercase tracking-[0.15em]', activeSection === menu.id ? 'text-white' : 'text-gray-900 dark:text-port-light']">
                {{ menu.label }}
              </span>
            </div>
            <ChevronRight :class="['w-4 h-4 transition-transform', isExpanded(menu.id) ? 'rotate-90' : '']" />
          </button>

          <!-- Sub items -->
          <div :class="['ml-11 flex flex-col gap-1 overflow-hidden transition-all duration-300', isExpanded(menu.id) ? 'max-h-80 mt-3 opacity-100' : 'max-h-0 opacity-0']">
            <button
              v-for="sub in menu.items"
              :key="sub.id"
              @click="navigateTo(menu.id as any, sub.id)"
              :class="[
                'block w-full text-left py-2 text-[10px] font-black uppercase tracking-widest transition-colors',
                activeSection === menu.id && activeSubSection === sub.id
                  ? 'text-port-primary dark:text-port-glow'
                  : 'text-gray-900 dark:text-port-light hover:text-port-primary dark:hover:text-port-glow'
              ]"
            >
              {{ sub.label }}
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 md:ml-64 p-4 md:p-10 h-screen overflow-y-auto bg-port-contrast-light dark:bg-port-dark transition-colors duration-300">
      <div class="max-w-6xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Ship, Menu, X, ChevronRight, Calculator, Database, Search, Clock, UserCheck, Settings } from 'lucide-vue-next'
import { useNavigation, menuStructure } from '~/composables/useNavigation'
import { useAppState } from '~/composables/useAppState'
import { useTheme } from '~/composables/useTheme'

const { activeSection, activeSubSection, expandedSection, showLanding, isMobileMenuOpen, toggleSection, navigateTo } = useNavigation()
const { appSettings } = useAppState()

useTheme(appSettings)

const isExpanded = (id: string) => expandedSection.value === id

const ICON_MAP: Record<string, any> = { Calculator, Database, Search, Clock, UserCheck, Settings }
const getIcon = (name: string) => ICON_MAP[name] || Calculator
</script>

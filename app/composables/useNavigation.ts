export type SectionId = 'invoice' | 'registries' | 'quotes' | 'queries' | 'configs' | 'glossary' | 'agenda'

export const useNavigation = () => {
  const activeSection    = useState<SectionId>('activeSection', () => 'invoice')
  const activeSubSection = useState<string>('activeSubSection', () => 'details')
  const expandedSection  = useState<SectionId | null>('expandedSection', () => null)
  const showLanding      = useState<boolean>('showLanding', () => true)
  const navigationOrigin = useState<string | null>('navigationOrigin', () => null)
  const lastCreatedId    = useState<{ id: string; type: string } | null>('lastCreatedId', () => null)
  const isMobileMenuOpen = useState<boolean>('isMobileMenuOpen', () => false)

  const DEFAULT_SUB: Record<string, string> = {
    invoice: 'details', registries: 'products', quotes: 'freight',
    queries: 'ncm', configs: 'corporate', agenda: 'cashflow',
  }

  const toggleSection = (section: SectionId) => {
    if (expandedSection.value === section) {
      expandedSection.value = null
    } else {
      expandedSection.value = section
      activeSection.value = section
      activeSubSection.value = DEFAULT_SUB[section] || ''
    }
  }

  const navigateTo = (section: SectionId, subSection: string, origin?: string) => {
    activeSection.value = section
    activeSubSection.value = subSection
    expandedSection.value = section
    if (origin) navigationOrigin.value = origin
    else if (section !== 'registries') navigationOrigin.value = null
    if (typeof window !== 'undefined' && window.innerWidth < 768) isMobileMenuOpen.value = false
  }

  const handleNavClick = (section: SectionId, subSection?: string, origin?: string) => {
    if (subSection) navigateTo(section, subSection, origin)
    else toggleSection(section)
  }

  const clearLastCreated = () => { lastCreatedId.value = null }

  return {
    activeSection, activeSubSection, expandedSection,
    showLanding, navigationOrigin, lastCreatedId, isMobileMenuOpen,
    handleNavClick, toggleSection, navigateTo, clearLastCreated,
  }
}

export const menuStructure = [
  { id: 'invoice', label: 'Simulador', icon: 'Calculator', items: [{ id: 'list', label: 'Lista de Processos' }, { id: 'details', label: 'Calculo Rapido' }] },
  { id: 'registries', label: 'Cadastros', icon: 'Database', items: [{ id: 'products', label: 'Produtos' }, { id: 'clients', label: 'Clientes' }, { id: 'exporters', label: 'Fornecedores' }] },
  { id: 'quotes', label: 'Mercado', icon: 'Search', items: [{ id: 'freight', label: 'Fretes' }, { id: 'merchandise', label: 'Mercadorias' }] },
  { id: 'agenda', label: 'Agenda', icon: 'Clock', items: [{ id: 'cashflow', label: 'Financeira' }, { id: 'productflow', label: 'Cargas' }] },
  { id: 'queries', label: 'Eduardo AI', icon: 'UserCheck', items: [{ id: 'ncm', label: 'NCM & Fiscal' }, { id: 'news', label: 'Noticias Comex' }] },
  { id: 'configs', label: 'Configuracoes', icon: 'Settings', items: [{ id: 'corporate', label: 'Dados Corporativos' }, { id: 'appearance', label: 'Interface & Estilo' }, { id: 'security', label: 'Seguranca & IA' }, { id: 'privacy', label: 'Backup & Reset' }, { id: 'glossary', label: 'Dicionario Comex' }] },
]

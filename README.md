# ManagerPro — Comércio Exterior

**Plataforma de simulação de custos aduaneiros com Eduardo AI (Gemini).**

Construída com Nuxt 4 + Vue 3 + Tailwind CSS.

## Stack
- **Framework:** Nuxt 4 / Vue 3 (Composition API + `<script setup>`)
- **Estilização:** Tailwind CSS v3 com design system customizado
- **IA:** Google Gemini via `@google/genai` — Eduardo, consultor de Comex
- **Estado:** `useLocalStorage` do VueUse para persistência client-side

## Módulos Principais
| Módulo | Descrição |
|---|---|
| Simulador | Cálculo de custos de importação (FOB → CIF → DI) |
| Cadastros | CRUD de Produtos, Clientes e Fornecedores |
| Mercado | Cotações de frete e mercadorias |
| Eduardo AI | Consulta NCM, notícias Comex, análise de fornecedores |
| Agenda | Fluxo financeiro e de cargas |
| Configurações | Dados corporativos, aparência e segurança |

## Início Rápido
```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com sua GEMINI_API_KEY

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

## Variáveis de Ambiente
| Variável | Descrição |
|---|---|
| `GEMINI_API_KEY` | Chave do Google AI Studio (gemini.google.com) |

import { GoogleGenAI } from '@google/genai'
import type { AISuggestedFreightRates, AIImportAnalysis } from '~/types'

const getClient = () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.geminiApiKey
  if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env')
  return new GoogleGenAI({ apiKey })
}

const EDUARDO = `Voce e o Eduardo, consultor senior de comercio exterior. Seja direto, profissional e termine com "Insight do Eduardo:" com um conselho estrategico.`

const cleanJSON = (text: string) => {
  try {
    let c = text.replace(/```json/g, '').replace(/```/g, '')
    const a = c.indexOf('{'), b = c.lastIndexOf('}')
    if (a !== -1 && b !== -1) c = c.substring(a, b + 1)
    return JSON.parse(c)
  } catch { return {} }
}

export const consultGemini = async (query: string, type: 'ncm' | 'news' | 'general'): Promise<string> => {
  try {
    const ai = getClient()
    let prompt = query
    if (type === 'ncm') prompt = `Eduardo, analise a classificacao NCM deste produto: "${query}".`
    else if (type === 'news') prompt = `Eduardo, quais as noticias de Comex sobre: "${query}"?`
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { systemInstruction: EDUARDO, tools: [{ googleSearch: {} }] },
    })
    return response.text || 'Nao consegui processar sua duvida agora.'
  } catch {
    return 'Conexao instavel. Eduardo esta offline momentaneamente.'
  }
}

export const checkAiHealth = async (): Promise<{ status: 'online' | 'offline'; latency: number }> => {
  const start = Date.now()
  try {
    const ai = getClient()
    const response = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: 'ping' })
    if (response.text) return { status: 'online', latency: Date.now() - start }
    return { status: 'offline', latency: 0 }
  } catch { return { status: 'offline', latency: 0 } }
}

export const extractProductFromText = async (text: string): Promise<any> => {
  const ai = getClient()
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `Eduardo, converta em JSON de produto: ${text}`,
    config: { systemInstruction: EDUARDO + '\nRetorne APENAS o JSON.', responseMimeType: 'application/json' },
  })
  return JSON.parse(response.text || '{}')
}

export const getFreightSuggestions = async (modal: 'sea' | 'air'): Promise<AISuggestedFreightRates> => {
  const ai = getClient()
  const prompt = modal === 'sea'
    ? 'Eduardo, taxas medias frete maritimo Asia-Brasil (Santos) para container 20\', 40\' HC e LCL por CBM em USD.'
    : 'Eduardo, taxa media frete aereo por kg (Asia-Brasil GRU) em USD.'
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: { systemInstruction: EDUARDO + '\nRetorne APENAS o JSON.', responseMimeType: 'application/json', tools: [{ googleSearch: {} }] },
  })
  return cleanJSON(response.text || '{}') as AISuggestedFreightRates
}

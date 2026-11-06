// Helper de API (padrão da Aula 07): um único lugar com fetch.
// BASE_URL vazio porque o proxy do Vite (vite.config.js) repassa /tasks
// para o backend na porta 3000. Assim não precisa de CORS.
const BASE_URL = ''

// Erro que carrega o status HTTP junto com a mensagem
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function requisicao(caminho, { headers, ...opcoes } = {}) {
  const res = await fetch(BASE_URL + caminho, {
    ...opcoes, // method, body e signal (AbortController) passam por aqui
    headers: { 'Content-Type': 'application/json', ...headers }, // merge de headers
  })

  if (res.status === 204) return null // DELETE não devolve corpo

  const dados = await res.json()

  // O Zod devolve uma lista de erros; o errorHandler devolve um texto só.
  if (!res.ok) throw new ApiError([].concat(dados.erro).join(', '), res.status)

  return dados
}

export const apiGet = (caminho, opcoes) => requisicao(caminho, opcoes)

export const apiPost = (caminho, corpo, opcoes) =>
  requisicao(caminho, { ...opcoes, method: 'POST', body: JSON.stringify(corpo) })

export const apiPut = (caminho, corpo, opcoes) =>
  requisicao(caminho, { ...opcoes, method: 'PUT', body: JSON.stringify(corpo) })

export const apiDelete = (caminho, opcoes) =>
  requisicao(caminho, { ...opcoes, method: 'DELETE' })

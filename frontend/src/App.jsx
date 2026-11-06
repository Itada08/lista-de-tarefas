import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from './api'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import Filter from './components/Filter'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('todas')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [recarregar, setRecarregar] = useState(0) // muda para refazer a busca

  // Busca a lista ao abrir, quando o filtro muda e depois de cada ação.
  useEffect(() => {
    const controller = new AbortController()

    async function carregar() {
      try {
        setCarregando(true)
        setErro('')
        const query = filter === 'todas' ? '' : `?status=${filter}`
        const dados = await apiGet(`/tasks${query}`, { signal: controller.signal })
        setTasks(dados)
      } catch (e) {
        if (e.name === 'AbortError') return // requisição cancelada, não é erro
        setErro(e.message)
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controller.abort() // cancela se o filtro mudar ou a tela sair
  }, [filter, recarregar])

  // Executa a ação, mostra o erro se falhar e recarrega a lista.
  async function executar(acao) {
    try {
      setErro('')
      await acao()
      setRecarregar((n) => n + 1)
    } catch (e) {
      setErro(e.message)
    }
  }

  const criar = (dados) => executar(() => apiPost('/tasks', dados))
  const editar = (id, dados) => executar(() => apiPut(`/tasks/${id}`, dados))
  const alternar = (task) =>
    executar(() => apiPut(`/tasks/${task.id}`, { concluida: !task.concluida }))
  const excluir = (id) => executar(() => apiDelete(`/tasks/${id}`))

  return (
    <main className="container">
      <h1>Lista de Tarefas</h1>

      <TaskForm onSubmit={criar} />
      <Filter value={filter} onChange={setFilter} />

      {erro && <p className="error" role="alert">{erro}</p>}
      {carregando && <p className="empty">Carregando...</p>}

      <ul className="list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={alternar}
            onEdit={editar}
            onDelete={excluir}
          />
        ))}
      </ul>

      {!carregando && !erro && tasks.length === 0 && (
        <p className="empty">Nenhuma tarefa por aqui. Adicione a primeira acima.</p>
      )}
    </main>
  )
}

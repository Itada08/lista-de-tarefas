import { useState } from 'react'

export default function TaskForm({ onSubmit }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ titulo, descricao })
    setTitulo('')
    setDescricao('')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Título"
        aria-label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        placeholder="Descrição (opcional)"
        aria-label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button type="submit" className="primary">Adicionar tarefa</button>
    </form>
  )
}

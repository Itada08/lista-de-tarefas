import { useState } from 'react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [titulo, setTitulo] = useState(task.titulo)
  const [descricao, setDescricao] = useState(task.descricao)

  function save() {
    onEdit(task.id, { titulo, descricao })
    setEditing(false)
  }

  function cancel() {
    setTitulo(task.titulo)
    setDescricao(task.descricao)
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="item editing">
        <input value={titulo} aria-label="Título" onChange={(e) => setTitulo(e.target.value)} />
        <input value={descricao} aria-label="Descrição" onChange={(e) => setDescricao(e.target.value)} />
        <div className="actions">
          <button className="primary" onClick={save}>Salvar</button>
          <button onClick={cancel}>Cancelar</button>
        </div>
      </li>
    )
  }

  return (
    <li className="item">
      <div className={task.concluida ? 'text done' : 'text'}>
        <strong>{task.titulo}</strong>
        {task.descricao && <p>{task.descricao}</p>}
      </div>
      <div className="actions">
        <button onClick={() => onToggle(task)}>
          {task.concluida ? 'Reabrir' : 'Concluir'}
        </button>
        <button onClick={() => setEditing(true)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>Excluir</button>
      </div>
    </li>
  )
}

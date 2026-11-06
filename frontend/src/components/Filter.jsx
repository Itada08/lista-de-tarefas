// "valor" é o que o backend entende em ?status=
const options = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'pendentes', texto: 'Pendentes' },
  { valor: 'concluidas', texto: 'Concluídas' },
]

export default function Filter({ value, onChange }) {
  return (
    <div className="filter">
      {options.map((opt) => (
        <button
          key={opt.valor}
          className={value === opt.valor ? 'active' : ''}
          aria-pressed={value === opt.valor}
          onClick={() => onChange(opt.valor)}
        >
          {opt.texto}
        </button>
      ))}
    </div>
  )
}

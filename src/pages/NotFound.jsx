import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <span>No entiendo qué mondá estás buscando 🤔</span>
      <br />
      <Link to="/">Regresa al home</Link>

    </div>

  )
}

export default NotFound
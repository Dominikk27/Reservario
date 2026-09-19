import { useState } from 'react'

import './App.css'
import ClientForm from './components/form/clientForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ClientForm />
    </>
  )
}

export default App

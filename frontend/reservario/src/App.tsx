import { useState } from 'react'

import './App.css'
import ClientForm from './components/form/clientForm'


import Login from './components/login/Login'
import AdminPanel from './components/admin/AdminPanel'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login />
    <AdminPanel />
    <ClientForm />
    </>
  )
}

export default App

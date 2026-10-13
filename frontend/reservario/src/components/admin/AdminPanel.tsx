import React, {useState} from 'react'


import Sidebar from './Sidebar/Sidebar'
import Dashboard from './Dashboard/Dashboard'

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');


  return (
    <div className='w-full  min-h-screen flex flex-row bg-slate-50'>
        <Sidebar activeTab={activeTab}
                 onTabChange={setActiveTab}/>
        <main className="min-w-0 flex-1">
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Kalendár' && <div>Kalendár</div>}
        {activeTab === 'Objednávky' && <div>Objednávky</div>}
        {activeTab === 'Nastavenia účtu' && <div>Nastavenia účtu</div>}
        {activeTab === 'Používatelia' && <div>Používatelia</div>}
      </main>
    </div>
  )
}

export default AdminPanel

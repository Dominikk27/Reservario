import React, {useState} from 'react'
import { FiLogOut } from "react-icons/fi";

type SideBarProps = {
    activeTab: string,
    onTabChange: (tab: string) => void
}

const Sidebar = ({ activeTab, onTabChange}: SidebarProps) => {
    

    const menuTabs = [
        'Dashboard',
        'Kalendár',
        'Objednávky',
        'Nastavenia účtu',
        'Používatelia'
    ]


  return (
    <div className='hidden md:block min-h-screen'>
        <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r">
            {/* LOGO */}
            <div className="px-2 pb-6 pt-8">
                <h1 className='text-3xl font-extrabold tracking-tight text-slate-900'>Book<span className='text-amber-500'>io</span></h1>
                {/* PREVÁDZKA */}
                <div className="mt-8 rounded-xl  border border-amber-100 bg-amber-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
                        Prevádzka
                    </p>
                    <h3 className="mt-1 font-semibold text-slate-900">
                        Salon Nitra
                    </h3>
                </div>
            </div>

            {/* NAVIGATION */}
            <nav aria-label='Navigačný panel'
                 className='flex-1'>
                <p className='mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400'>Správa prevádzky</p>
                <div className="flex flex-col gap-2 pl-4">
                    {menuTabs.map((item) => {
                        const isActive = activeTab === item;
                        return (
                            <button type='button'
                                    onClick={() => onTabChange(item)}
                                    className={`flex items-center gap-3 
                                                py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                                                ${isActive 
                                                    ? 'pl-4 bg-amber-50 text-amber-900 rounded-l-lg' 
                                                    : 'px-4 text-slate-600 hover:bg-slate-100 rounded-l-lg hover:text-slate-900'}`}>                  
                                <span aria-hidden="true" 
                                      className='h-2 w-2 shrink-0 rounded-full bg-amber-300'>
                                </span>
                                {item}
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* PROFIL */}
            <div className="mt-8 border-t border-slate-100 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <img
                        src="/assets/admin/avatar.avif"
                        alt="Profilová fotografia"
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <h3 className='truncate text-sm font-semibold text-slate-500'>Jano Mrkvička</h3>
                        <p className='text-xs text-slate-500'>Personál</p>
                    </div>
                    <div className="buttonContainer">
                        <button type='button'
                                className='px-2 py-2 rounded-lg bg-amber-100'>
                            <FiLogOut />
                        </button>
                    </div>
                </div>
            </div>

            {/* VERSOION */}
            <div className="mt-1 mb-1 px-2">
                <p className='text-xs  text-slate-500'>version: 1.0.1</p>
            </div>
        </aside>
    </div>
  )
}

export default Sidebar

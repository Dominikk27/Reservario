import React, { useState, useEffect } from 'react'

interface CardData {
  time: string;
}

interface CardProps {
  timeData: CardData;
  checked: boolean;
  onChange: () => void;
}

const TimeCard = ({timeData, checked, onChange}: CardProps) => {
  return (
    <label className='cursor-pointer'>
      <input 
        type="radio"
        name='personal'
        checked={checked}
        onChange={onChange}
        className='sr-only' />
        <div className={`
          rounded-lg border px-2 py-2
          ${checked ? 'border-amber-400 bg-amber-50' : ''}
        `}>
          <div className="flex justify-between items-start">
            <div className="flex-col">
              <p className='text-xl font-bold'>{timeData.time}</p>
            </div>
          </div>
      </div>
    </label>
  )
}

export default TimeCard

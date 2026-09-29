import React from 'react'

import type { Service } from '../../../types/service';

interface CardProps {
  cardData: Service;
  checked: boolean;
  onChange: () => void;
}

const Card = ({ cardData, checked, onChange }: CardProps ) => {
  return (
    <label className='cursor-pointer'>
      <input 
        type="radio"
        name='service'
        checked={checked}
        onChange={onChange}
        className='sr-only' />
        <div className={`
          rounded-lg border px-2 py-2
          ${checked ? 'border-amber-400 bg-amber-50' : ''}
        `}>
          <div className="flex justify-between items-start">
            <div className="flex-col">
              <p className='text-xl font-bold'>{cardData.name}</p>
              <p className='text-xs font-bold'>{cardData.duration_minutes} min</p>
            </div>
            <div className="flex">
              {cardData.price} €
            </div>
          </div>
      </div>
    </label>
  )
}

export default Card

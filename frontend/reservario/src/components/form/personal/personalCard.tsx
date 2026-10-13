import React from 'react'


interface CardData {
  first_name: string;
  last_name: string;
}

interface CardProps {
  personalData: CardData;
  checked: boolean;
  onChange: () => void;
}

const PersonalCard = ({ personalData, onChange, checked }: CardProps) => {
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
              <p className='text-xl font-bold'>{personalData.first_name} {personalData.last_name  }</p>
              <a href="https://linkedin.com">HH</a>
            </div>
          </div>
      </div>
    </label>
  )
}

export default PersonalCard

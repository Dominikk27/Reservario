import React, {useState} from 'react'



const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const [currentDate, setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const monthName = currentDate.toLocaleDateString("sk-SK", {
        month: "long",
        year: "numeric"
    });

    const nameOfDay = [
        "Po",
        "Ut",
        "St",
        "Št",
        "Pi",
        "So",
        "Ne"
    ]

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate()

    const days = []
    for (let i = 0; i < daysInMonth; i++){
        days.push(i + 1);
    }

    const changeMonth = (amount: number) =>{
        setCurrentDate(
            new Date(
                currentYear,
                currentMonth + amount,
                1
            )
        );
    }


        
    return (
        <div className="w-full flex flex-col gap-3 border rounded-2xl overflow-hidden">
            <div className="flex justify-between py-3 bg-amber-200 px-2 rounded-t-xl w-full">
                <button onClick={() => changeMonth(-1)}>Späť</button>
                <p className='font-bold'>{monthName}</p>
                <button onClick={() => changeMonth(1)}>Ďalej</button>
            </div>
            <div className='grid grid-cols-7 gap-2 text-center px-3 pt-2 pb-4'>
                {nameOfDay.map((dayName) => (
                    <div key={dayName}>
                        {dayName}
                    </div>
                ))}
                {days.map(day => (
                    <label
                        key={day}>
                            <input 
                                type='radio'
                                name='day'
                                checked={selectedDay === day}
                                onChange={() => setSelectedDay(day)}
                                className='sr-only'
                            />
                            <div className={`
                                select-none aspect-square grid place-items-center rounded-lg cursor-pointer
                                ${selectedDay === day ? 'bg-amber-400' : ''}
                            `}>
                                {day}
                            </div>
                            
                        </label>
                ))}
                </div>
        </div>
    )
}

export default Calendar

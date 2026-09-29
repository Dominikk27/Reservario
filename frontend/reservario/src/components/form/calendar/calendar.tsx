import React, {useState, useEffect} from 'react'

import type { WorkingHours } from '../../../types/workingHours';


interface CalendarProps {
    workingHours: WorkingHours[];
    selectedDay: Date | null;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
}


const Calendar = ({ workingHours, selectedDay, setSelectedDay }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    useEffect(() => {
        setSelectedDay(null);
    }, [workingHours]);
    

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


    const firstDayOfMonth = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    const startOffset = (firstDayOfMonth + 6) % 7;

    const daysInPreviousMonth = new Date(
        currentYear,
        currentMonth,
        0
    ).getDate();

    return (
        <div className="w-full flex flex-col gap-3 border rounded-2xl overflow-hidden">
            <div className="flex justify-between py-3 bg-amber-200 px-2 rounded-t-xl w-full">
                <button type="button" onClick={() => changeMonth(-1)}>Späť</button>
                <p className='font-bold'>{monthName}</p>
                <button type="button" onClick={() => changeMonth(1)}>Ďalej</button>
            </div>
            <div className='grid grid-cols-7 gap-2 text-center px-3 pt-2 pb-4'>
                {nameOfDay.map((dayName) => (
                    <div key={dayName}>
                        {dayName}
                    </div>
                ))}
                {Array.from({ length: startOffset }).map((_, index) => {
                    const day = daysInPreviousMonth - startOffset + index + 1;

                    return (
                        <div
                            key={`prev-${day}`}
                            className="select-none aspect-square grid place-items-center text-gray-300"
                        >
                            {day}
                        </div>
                    );
                })}
                {days.map(day => {
                    const date = new Date(currentYear, currentMonth, day);
                    const dayOfWeek = date.getDay();
                    //console.log(day, dayOfWeek);

                    const isSelected =
                        selectedDay?.getTime() === date.getTime();
                    
                    const isWorkingDay = workingHours.some(
                        work => work.day_of_week === dayOfWeek
                    );

                    //console.log(day, dayOfWeek, isWorkingDay);

                    return(
                        <label
                            key={day}>
                            <input 
                                type='radio'
                                name='day'
                                checked={isSelected}
                                onChange={() => setSelectedDay(date)}
                                disabled={!isWorkingDay}
                                className='sr-only'
                            />
                            <div className={`
                                select-none aspect-square grid place-items-center rounded-lg cursor-pointer
                                ${
                                    isSelected
                                        ? 'bg-amber-400'
                                        : isWorkingDay
                                            ? 'bg-lime-200'
                                            : 'text-gray-300'
                                }
                            `}>
                                {day}
                            </div>
                                
                        </label>
                    );
                })}
                </div>
        </div>
    )
}

export default Calendar

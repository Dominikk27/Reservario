import React, {useState, useEffect} from 'react'
import Card from './services/card'
import PersonalCard from './personal/personalCard';

import Calendar from './calendar/calendar';
import TimeCard from './calendar/time';
import ClientDataForm from './clientDetails/clientForm';


import type { Service } from '../../types/service';
import type { Personal } from '../../types/personal';
import type { WorkingHours, TimeData } from '../../types/workingHours';

const ClientForm = () => {

    const [selectedService, setSelectedService] = useState<string>()
    const [selectedPerson, setSelectedPerson] = useState<number>()
    const [selectedTime, setSelectedTime] = useState<string>()
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const [services, setServices] = useState<Service[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/getServices")
        .then(res => res.json())
        .then(data => setServices(data))
    }, []);

    const [personal, setPersonal] = useState<Personal[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/getPersonal")
        .then(res => res.json())
        .then(data => setPersonal(data))
    }, []);


    const [workingHours, setWorkingHours] = useState<(WorkingHours[])>([]);
    useEffect(() =>{
        if (selectedPerson === undefined) {
            setWorkingHours([]);
            return;
        }

        fetch(`http://localhost:3000/api/working-hours/${selectedPerson}`)
            .then(res => res.json())
            .then(data => setWorkingHours(data));
    }, [selectedPerson]);

    const selectedWorkingHours = workingHours.find(
        work => work.day_of_week === selectedDay?.getDay()
    );

    const selectedServiceData = services.find(
        service => service.name === selectedService
    );

    const serviceDuration = selectedServiceData?.duration_minutes ?? 0;

    //console.log("Selected date:", selectedDay);
    //console.log("Selected working hours:", selectedWorkingHours);

    const timeData: TimeData[] = [];

    if (selectedWorkingHours){
        const [startHour, startMinute] = selectedWorkingHours.start_time
            .split(":")
            .map(Number);
        
        
        const [endHour, endMinute] = selectedWorkingHours.end_time
            .split(":")
            .map(Number)

        //console.log(startHour, startMinute);
        //console.log(endHour, endMinute);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        for(
            let minutes = startTotalMinutes;
            minutes + serviceDuration <= endTotalMinutes;
            minutes += 15
        ) {

            const reservationEnd = minutes + serviceDuration;

            const isDuringBreak = selectedWorkingHours.breaks.some(workBreak => {
                const [breakStartHour, breakStartMinute] = workBreak.start_time
                    .split(":")
                    .map(Number);
                
                const [breakEndHour, breakEndMinute] = workBreak.end_time
                    .split(":")
                    .map(Number);
                
                const breakStart = breakStartHour * 60 + breakStartMinute;
                const breakEnd = breakEndHour * 60 + breakEndMinute;

                return minutes <= breakEnd  && reservationEnd >= breakStart;
            });

            if (isDuringBreak) {
                continue;
            }

            const hour = Math.floor(minutes / 60);
            const minute = minutes % 60;

            const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2,"0")}`;

            timeData.push({
                id: minutes,
                time: formattedTime
            });
        }

        
    }


    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !selectedPerson ||
            !selectedServiceData ||
            !selectedDay ||
            !selectedTime
        ) {
            console.log("Vyplň všetky polia!");
            return;
        }

        try{
            const year = selectedDay.getFullYear();
            const month = String(selectedDay.getMonth() + 1).padStart(2, "0");
            const day = String(selectedDay.getDate()).padStart(2, "0");

            const reservation = `${year}-${month}-${day}T${selectedTime}:00`;

            const reservationData = {
                personal: selectedPerson,
                serviceId: selectedServiceData.id,
                reservationTermin: reservation,
                client: clientData
            };

            console.log(reservationData);
            

            const response = await fetch(
                `http://localhost:3000/api/sendReservation`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reservationData)
                }
            );

            if(!response.ok){
                console.error("Failed to make reservation!");
                return;
            }

        } catch (err){
            console.error("Failed to create reservation: ", err);
        }
    };


    return (
        <div className='container max-w-[75rem] mx-auto flex justify-center items-center min-h-screen'>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col bg-white px-4 py-4 gap-3 rounded-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="banner overflow-hidden rounded-4xl relative">
                        <img src="../../assets/banner/salon.jpg" alt="Banner Image" className='blur-xs grayscale'/>
                        <h3 className='absolute inset-0 flex items-center justify-center text-8xl font-bold text-amber-200'>Book Me :)</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 content-start">
                        {personal.map((person) => (
                            <PersonalCard
                                key={person.id}
                                personalData={person}
                                checked={selectedPerson === person.id}
                                onChange={() => {
                                setSelectedPerson(
                                    selectedPerson === person.id
                                    ? undefined
                                    : person.id
                                )
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                         {services.map((service) => (
                            <Card
                                key={service.id}
                                cardData={service}
                                checked={selectedService === service.name}
                                onChange={() => {
                                    setSelectedService(
                                        selectedService === service.name
                                            ? undefined
                                            : service.name
                                    )
                                }}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 py-2 gap-2">
                        <div className="col-span-1 calendar">
                            <Calendar 
                                workingHours={workingHours}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                            />
                        </div>
                        <div className="termins col-span-1 sm:col-span-2">
                            <div className="grid grid-cols-4 gap-2">
                                {timeData.map((time) => (
                                    <TimeCard 
                                        key={time.id}
                                        timeData={time}
                                        checked={selectedTime === time.time}
                                        onChange={() => {
                                            setSelectedTime(
                                                selectedTime === time.time
                                                ? undefined
                                                : time.time
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="col-span-1 sm:col-span-2 mt-2">
                                <ClientDataForm 
                                    clientData={clientData}
                                    setClientData={setClientData}/>
                            </div>
                        </div>
                        <button type="submit" className='col-span-1 sm:col-span-3 text-center px-2 py-1 border bg-amber-100'>
                            Rezervovať
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ClientForm

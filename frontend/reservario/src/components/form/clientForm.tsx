import React, {useState} from 'react'
import Card from './services/card'
import PersonalCard from './personal/personalCard';

import Calendar from './calendar/calendar';
import TimeCard from './calendar/time';
import ClientDataForm from './clientDetails/clientForm';

const ClientForm = () => {

    const services = [
        {
            id: 1,
            name: "Haircut",
            duration: "30 min",
            price: 32
        },
        {
            id: 2,
            name: "Beard",
            duration: "20 min",
            price: 20
        },
        {
            id: 3,
            name: "Hair + Beard",
            duration: "45 min",
            price: 45
        }
        ];

    const personal = [
        {
            id: 1,
            name: "person 1",
        },
        {
            id: 2,
            name: "person 2",
        },
        {
            id: 3,
            name: "person 3",
        },
        {
            id: 4,
            name: "person 4",
        }
    ];

    const timeData = [
        {
            id: 1,
            time: "13:00",
        },
        {
            id: 2,
            time: "14:00",
        },
        {
            id: 3,
            time: "15:00",
        },
        {
            id: 4,
            time: "16:00",
        }
    ];

    const [selectedServices, setSelectedServices] = useState<number>()
    const [selectedPerson, setSelectedPerson] = useState<number>()
    const [selectedTime, setSelectedTime] = useState<number>()

    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({
            personal: selectedPerson,
            service: selectedServices,
            time: selectedTime,
            client: clientData
        })
    }


    return (
        <div className='container max-w-[75rem] mx-auto flex justify-center items-center h-screen'>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col bg-white px-4 py-4 gap-3 rounded-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="banner overflow-hidden rounded-4xl relative">
                        <img src="../../assets/banner/salon.jpg" alt="Banner Image" className='blur-xs grayscale'/>
                        <h3 className='absolute inset-0 flex items-center justify-center text-8xl font-bold text-amber-200'>Book Me :)</h3>
                    </div>
                    <div className="flex flex-col gap-2">
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
                                checked={selectedServices === service.id}
                                onChange={() => {
                                    setSelectedServices(
                                        selectedServices === service.id
                                            ? undefined
                                            : service.id
                                    )
                                }}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 py-2 gap-2">
                        <div className="col-span-1 calendar">
                            <Calendar />
                        </div>
                        <div className="termins col-span-1 sm:col-span-2">
                            <div className="grid grid-cols-4 gap-2">
                                {timeData.map((time) => (
                                    <TimeCard 
                                        key={time.id}
                                        timeData={time}
                                        checked={selectedTime === time.id}
                                        onChange={() => {
                                            setSelectedTime(
                                                selectedTime === time.id
                                                ? undefined
                                                : time.id
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

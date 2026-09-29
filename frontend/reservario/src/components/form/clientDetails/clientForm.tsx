import React from 'react'

interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ClientProps {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
}


const ClientDataForm = ({ clientData,setClientData }: ClientProps) => {
  return (
    <div className='flex flex-col gap-2 mt-3'>
        <h3>Kontaktné údaje</h3>
        <div className="flex gap-2">
            <input 
                type="text" 
                name="fname" 
                id="fname" 
                placeholder='Janko'  
                value={clientData.firstName}
                onChange={(e) =>
                    setClientData({
                        ...clientData,
                        firstName: e.target.value
                    })
                }
                className='px-1 py-2 border rounded-lg flex-1'
            />
            <input 
                type="text" 
                name="lname" 
                id="lname" 
                placeholder='Mrkvička' 
                value={clientData.lastName}
                onChange={(e) =>
                    setClientData({
                        ...clientData,
                        lastName: e.target.value
                    })
                }
                className='px-1 py-2 border rounded-lg flex-1'/>
        </div>
        <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='jankomrkvicka@mail.com' 
            value={clientData.email}
            onChange={(e) =>
                setClientData({
                    ...clientData,
                    email: e.target.value
                })
            }
            className='px-1 py-2 border rounded-lg flex-1'
            />
        <input 
            type="tel" 
            name="phone" 
            placeholder='+421912345678'
            value={clientData.phone}
            onChange={(e) =>
                setClientData({
                    ...clientData,
                    phone: e.target.value
                })
            }
            className='px-1 py-2 border rounded-lg flex-1'
        />
    </div>
  )
}

export default ClientDataForm

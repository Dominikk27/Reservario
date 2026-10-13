import { FaCalendarAlt } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { GrFormNextLink } from "react-icons/gr";


const Dashboard = () => {

    const reservations = [
        {
            id: 1,
            time: '09:00',
            client: 'Ján Novák',
            service: 'Strihanie',
            employee: 'Jožo',
            duration: 30,
            status: 'Dokončená',
        },
        {
            id: 2,
            time: '10:00',
            client: 'Peter Horváth',
            service: 'Strihanie + brada',
            employee: 'Jožo',
            duration: 75,
            status: 'Potvrdená',
        },
        {
            id: 3,
            time: '11:30',
            client: 'Martin Kováč',
            service: 'Úprava brady',
            employee: 'Fero',
            duration: 15,
            status: 'Potvrdená',
        },
    ]

  return (
    <main className="min-w-0">
        <div className="topBar flex gap-3 w-full border-b-1 border-slate-800 px-5 py-5 bg-white">
            <button className=''>
                <FiSidebar className='text-xl w-5 h-5'/>
            </button>
            <p className='text-slate-900'>Administration \ <span className='text-amber-500 font-medium'>Dashboard</span></p>
        </div>
        <div className="flex-1 px-4 py-6 lg:px-2 lg:py-8 max-w-[85rem] mx-auto">
            <header className="mb-8">
                <p className="text-sm text-slate-500">Prehľad</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    Vitaj späť, Jožo
                </h2>
                <div className="flex mt-3 justify-between">
                    <p className='text-xs'>Všetko pripravené pre ďalší skvelý deň.</p>
                    <div className="dateBox flex gap-3 rounded-md bg-white border border-slate-500 text-slate-500 px-2 py-1">
                        <FaCalendarAlt className='w-3'/>
                        <p className='text-xs'>Útorok, 13.Oktober</p>
                    </div>
                </div>
            </header>

            <section className="flex flex-col">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="w-auto shrink-0 py-4 px-4 flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
                        <p className='text-md tracking-wide flex gap-5'>Dnešné objednávky <span><FaCalendarAlt className='text-xl'/></span></p>
                        <h2 className='text-5xl font-semibold'>3</h2>
                    </div>

                    <div className="w-auto shrink-0 py-4 px-4 flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
                        <p className='text-md tracking-wide flex gap-5'>Dnešné objednávky <span><FaCalendarAlt className='text-xl'/></span></p>
                        <h2 className='text-5xl font-semibold'>3</h2>
                    </div>

                    <div className="w-auto shrink-0 py-4 px-4 flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
                        <p className='text-md tracking-wide flex gap-5'>Dnešné objednávky <span><FaCalendarAlt className='text-xl'/></span></p>
                        <h2 className='text-5xl font-semibold'>3</h2>
                    </div>

                    <div className="w-auto shrink-0 py-4 px-4 flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
                        <p className='text-md tracking-wide flex gap-5'>Dnešné objednávky <span><FaCalendarAlt className='text-xl'/></span></p>
                        <h2 className='text-5xl font-semibold'>3</h2>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
                    {/* DNEŠNÉ REZERVÁCIE */}
                    <div className="min-w-0 xl:col-span-3">
                        <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                            Dnešné objednávky
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                            {reservations.length} rezervácie
                            </p>
                        </div>

                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                        >
                            Kalendár
                            <GrFormNextLink className="-rotate-45 text-xl" />
                        </button>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                <th scope="col" className="px-4 py-3">Čas</th>
                                <th scope="col" className="px-4 py-3">Klient</th>
                                <th scope="col" className="px-4 py-3">Služba</th>
                                <th scope="col" className="px-4 py-3">Pracovník</th>
                                <th scope="col" className="px-4 py-3">Stav</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {reservations.map((reservation) => (
                                <tr
                                    key={reservation.id}
                                    className="transition-colors hover:bg-slate-50"
                                >
                                    <td className="whitespace-nowrap px-4 py-4">
                                    <p className="font-semibold text-slate-900">
                                        {reservation.time}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {reservation.duration} min
                                    </p>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">
                                    {reservation.client}
                                    </td>

                                    <td className="px-4 py-4 text-slate-600">
                                    {reservation.service}
                                    </td>

                                    <td className="px-4 py-4 text-slate-600">
                                    {reservation.employee}
                                    </td>

                                    <td className="px-4 py-4">
                                    <span
                                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                                        reservation.status === 'Dokončená'
                                            ? 'bg-slate-100 text-slate-600'
                                            : 'bg-emerald-50 text-emerald-700'
                                        }`}
                                    >
                                        {reservation.status}
                                    </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>

                        {reservations.length === 0 && (
                            <p className="px-4 py-10 text-center text-sm text-slate-500">
                            Na dnes nemáš žiadne rezervácie.
                            </p>
                        )}
                        </div>
                    </div>

                    {/* PRAVÝ STĹPEC */}
                    <div className="flex flex-col gap-6">
                        <div className="w-full">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Nové rezervácie
                            </h3>
                            <p className="text-xs text-slate-500">3 prichádzajúce rezervácie</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="bg-white px-3 py-2 border border-slate-200 rounded-lg flex flex-col">
                                <p className="font-semibold">13.Marec 13:00 <span className="text-xs font-normal">(Pondelok)</span></p>
                                <div className="border-b border-b-slate-200"></div>
                                <h3 className="font-semibold ">Jozef Ignac</h3>
                                <p>Strih</p>
                                <div className="flex gap-3 w-full">
                                    <button className="flex-1 px-3 py-1 rounded-lg border-slate-200 bg-slate-200">Potvrdiť</button>
                                    <button className="flex-1 px-3 py-1 rounded-lg border border-slate-200">Zamietnuť</button>
                                </div>
                            </div>

                            <div className="bg-white px-3 py-2 border border-slate-200 rounded-lg flex flex-col">
                                <p className="font-semibold">13.Marec 13:00 <span className="text-xs font-normal">(Pondelok)</span></p>
                                <div className="border-b border-b-slate-200"></div>
                                <h3 className="font-semibold ">Jozef Ignac</h3>
                                <p>Strih</p>
                                <div className="flex gap-3 w-full">
                                    <button className="flex-1 px-3 py-1 rounded-lg border-slate-200 bg-slate-200">Potvrdiť</button>
                                    <button className="flex-1 px-3 py-1 rounded-lg border border-slate-200">Zamietnuť</button>
                                </div>
                            </div>

                            <div className="bg-white px-3 py-2 border border-slate-200 rounded-lg flex flex-col">
                                <p className="font-semibold">13.Marec 13:00 <span className="text-xs font-normal">(Pondelok)</span></p>
                                <div className="border-b border-b-slate-200"></div>
                                <h3 className="font-semibold ">Jozef Ignac</h3>
                                <p>Strih</p>
                                <div className="flex gap-3 w-full">
                                    <button className="flex-1 px-3 py-1 rounded-lg border-slate-200 bg-slate-200">Potvrdiť</button>
                                    <button className="flex-1 px-3 py-1 rounded-lg border border-slate-200">Zamietnuť</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </section>
        </div>
    </main>
  )
}

export default Dashboard
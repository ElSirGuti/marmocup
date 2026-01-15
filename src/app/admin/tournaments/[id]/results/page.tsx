"use client";
import { useEffect, useState, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import Navbar from "@/components/Navbar";
import Link from 'next/link';

// Types
interface Driver {
    id: string;
    name: string;
    team: string;
    car_number: string;
    steam_id: string;
}

interface Result {
    id: string;
    driver_id: string;
    position: number;
    qualifying_position: number;
    best_lap_time: string;
    total_time: string;
    gap_to_leader: string;
    status: string;
    points: number;
    incidents: number;
}

export default function TournamentResults({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [tournament, setTournament] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'drivers' | 'results'>('results');

    // Drivers State
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [editingDriver, setEditingDriver] = useState<Partial<Driver> | null>(null);

    // Results State
    const [selectedRound, setSelectedRound] = useState<number | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [isEditingResults, setIsEditingResults] = useState(false);
    const [uploadType, setUploadType] = useState<'manual' | 'json' | null>(null);

    useEffect(() => {
        fetchTournamentData();
    }, [id]);

    useEffect(() => {
        if (selectedRound !== null) {
            fetchResults(selectedRound);
        }
    }, [selectedRound]);

    const fetchTournamentData = async () => {
        const { data: tData } = await supabase.from('tournaments').select('*').eq('id', id).single();
        if (tData) setTournament(tData);

        const { data: dData } = await supabase.from('tournament_drivers').select('*').eq('tournament_id', id).order('name');
        if (dData) setDrivers(dData);

        setLoading(false);
    };

    const fetchResults = async (roundIdx: number) => {
        const { data } = await supabase.from('tournament_results')
            .select('*')
            .eq('tournament_id', id)
            .eq('round_index', roundIdx)
            .order('position', { ascending: true });
        setResults(data || []);
    };

    // --- Driver Management ---
    const handleSaveDriver = async () => {
        if (!editingDriver?.name) return;

        const payload = {
            tournament_id: id,
            name: editingDriver.name,
            team: editingDriver.team || '',
            car_number: editingDriver.car_number || '',
            steam_id: editingDriver.steam_id || ''
        };

        if (editingDriver.id) {
            await supabase.from('tournament_drivers').update(payload).eq('id', editingDriver.id);
        } else {
            await supabase.from('tournament_drivers').insert([payload]);
        }
        setEditingDriver(null);
        fetchTournamentData();
    };

    const handleDeleteDriver = async (driverId: string) => {
        if (!confirm('Eliminar piloto? Se borrarán sus resultados asociados.')) return;
        await supabase.from('tournament_drivers').delete().eq('id', driverId);
        fetchTournamentData();
    };

    // --- Results Management ---
    const handleSaveManualResult = async (result: Partial<Result>) => {
        // Logic to verify driver exists or create on fly? For now assume driver exists in dropdown
        if (!result.driver_id || selectedRound === null) return;

        const payload = {
            tournament_id: id,
            round_index: selectedRound,
            driver_id: result.driver_id,
            position: result.position,
            qualifying_position: result.qualifying_position,
            best_lap_time: result.best_lap_time,
            total_time: result.total_time,
            gap_to_leader: result.gap_to_leader,
            status: result.status,
            points: result.points,
            incidents: result.incidents
        };

        const { error } = await supabase.from('tournament_results').upsert(payload, { onConflict: 'tournament_id, round_index, driver_id' });
        if (error) alert('Error: ' + error.message);
        else fetchResults(selectedRound);
    };

    // Quick Add Driver for manual results (simple select)
    const [newResultEntry, setNewResultEntry] = useState<Partial<Result>>({ position: 1, status: 'Finished', points: 0 });

    const handleQuickAddResult = async () => {
        if (!newResultEntry.driver_id) return alert('Selecciona un piloto');
        await handleSaveManualResult(newResultEntry);
        setNewResultEntry({ ...newResultEntry, position: (newResultEntry.position || 0) + 1, driver_id: '', points: 0 });
    };

    const handleDeleteResult = async (resultId: string) => {
        await supabase.from('tournament_results').delete().eq('id', resultId);
        if (selectedRound !== null) fetchResults(selectedRound);
    };

    // --- UI Render ---

    if (loading) return <div className="text-white text-center pt-32">Cargando...</div>;
    if (!tournament) return <div className="text-white text-center pt-32">Torneo no encontrado</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#080808] pt-32 pb-12">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#222] pb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Link href="/admin/tournaments" className="text-gray-500 hover:text-white transition-colors">
                                    <i className="fas fa-arrow-left"></i> Volver
                                </Link>
                                <span className="text-gray-600">/</span>
                                <span className="text-[#FF5E1A] font-bold tracking-widest text-xs uppercase">RESULTADOS</span>
                            </div>
                            <h1 className="text-4xl font-extrabold text-white uppercase tracking-tight">{tournament.title}</h1>
                        </div>
                        <div className="flex bg-[#121212] p-1 rounded-lg border border-[#333]">
                            <button
                                onClick={() => setActiveTab('results')}
                                className={`px-6 py-2 rounded-md text-sm font-bold uppercase transition-all ${activeTab === 'results' ? 'bg-[#FF5E1A] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <i className="fas fa-flag-checkered mr-2"></i> Rondas & Resultados
                            </button>
                            <button
                                onClick={() => setActiveTab('drivers')}
                                className={`px-6 py-2 rounded-md text-sm font-bold uppercase transition-all ${activeTab === 'drivers' ? 'bg-[#FF5E1A] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <i className="fas fa-users mr-2"></i> Pilotos ({drivers.length})
                            </button>
                        </div>
                    </div>

                    {/* DRIVERS TAB */}
                    {activeTab === 'drivers' && (
                        <div className="bg-[#121212] rounded-2xl border border-[#222] overflow-hidden animate-fadeIn">
                            <div className="p-6 border-b border-[#222] flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">Lista de Inscritos</h3>
                                <button onClick={() => setEditingDriver({})} className="bg-[#white] text-black bg-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#ccc]">
                                    + Agregar Piloto
                                </button>
                            </div>

                            {editingDriver && (
                                <div className="p-6 bg-[#1a1a1a] border-b border-[#333] grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Nombre</label>
                                        <input className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white outline-none focus:border-[#FF5E1A]"
                                            value={editingDriver.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} placeholder="Nombre del piloto" autoFocus />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Equipo</label>
                                        <input className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white outline-none focus:border-[#FF5E1A]"
                                            value={editingDriver.team || ''} onChange={e => setEditingDriver({ ...editingDriver, team: e.target.value })} placeholder="Team Name" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Dorsal</label>
                                            <input className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white outline-none focus:border-[#FF5E1A]"
                                                value={editingDriver.car_number || ''} onChange={e => setEditingDriver({ ...editingDriver, car_number: e.target.value })} placeholder="#" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase block mb-1">ID (Steam/iR)</label>
                                            <input className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white outline-none focus:border-[#FF5E1A]"
                                                value={editingDriver.steam_id || ''} onChange={e => setEditingDriver({ ...editingDriver, steam_id: e.target.value })} placeholder="ID" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveDriver} className="flex-1 bg-[#FF5E1A] text-white py-2 rounded font-bold hover:bg-[#e05016]">Guardar</button>
                                        <button onClick={() => setEditingDriver(null)} className="px-3 py-2 border border-[#333] text-white rounded hover:bg-[#222]">X</button>
                                    </div>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="bg-[#080808] text-xs uppercase font-bold text-gray-500 border-b border-[#222]">
                                        <tr>
                                            <th className="px-6 py-4">Piloto</th>
                                            <th className="px-6 py-4">Equipo</th>
                                            <th className="px-6 py-4 text-center">Inscrito</th>
                                            <th className="px-6 py-4 text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#222]">
                                        {drivers.map(driver => (
                                            <tr key={driver.id} className="hover:bg-[#1a1a1a] transition-colors">
                                                <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                                                    <span className="bg-[#222] text-[#FF5E1A] text-xs px-2 py-0.5 rounded border border-[#333]">#{driver.car_number || '?'}</span>
                                                    {driver.name}
                                                </td>
                                                <td className="px-6 py-4">{driver.team || '-'}</td>
                                                <td className="px-6 py-4 text-center text-xs opacity-50">{driver.steam_id || 'N/A'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => setEditingDriver(driver)} className="text-blue-400 hover:text-white mr-3"><i className="fas fa-pen"></i></button>
                                                    <button onClick={() => handleDeleteDriver(driver.id)} className="text-red-500 hover:text-white"><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {drivers.length === 0 && (
                                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-600">No hay pilotos inscritos aun.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* RESULTS TAB */}
                    {activeTab === 'results' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">

                            {/* ROUNDS LIST */}
                            <div className="lg:col-span-1 space-y-4">
                                {(tournament.rounds_config || []).map((round: any, idx: number) => (
                                    <div
                                        key={idx}
                                        onClick={() => { setSelectedRound(idx); setUploadType(null); }}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden ${selectedRound === idx ? 'bg-[#1a1a1a] border-[#FF5E1A] shadow-[0_0_20px_rgba(255,94,26,0.1)]' : 'bg-[#121212] border-[#222] hover:border-[#444]'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-black uppercase tracking-widest ${selectedRound === idx ? 'text-[#FF5E1A]' : 'text-gray-500'}`}>ROUND {idx + 1}</span>
                                            {selectedRound === idx && <span className="w-2 h-2 rounded-full bg-[#FF5E1A] animate-pulse"></span>}
                                        </div>
                                        <div className="text-white font-bold text-lg leading-tight mb-1">{round.track}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-2">
                                            <i className="far fa-calendar"></i> {round.date || 'TBA'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* RESULTS ACTION AREA */}
                            <div className="lg:col-span-2 bg-[#121212] rounded-2xl border border-[#222] min-h-[500px] flex flex-col">
                                {selectedRound === null ? (
                                    <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center p-10">
                                        <i className="fas fa-trophy text-6xl mb-4"></i>
                                        <p className="text-xl font-bold">Selecciona una ronda</p>
                                        <p>Para ver o cargar resultados</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* HEADER OF SELECTED ROUND */}
                                        <div className="p-6 border-b border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#151515]">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white mb-1">Resultados Ronda {selectedRound + 1}</h2>
                                                <p className="text-gray-400 text-sm">{tournament.rounds_config[selectedRound]?.track} - {tournament.rounds_config[selectedRound]?.date}</p>
                                            </div>

                                            {!uploadType && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => setUploadType('manual')} className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-lg text-sm font-bold border border-[#333] transition-colors">
                                                        <i className="fas fa-edit mr-2"></i> Manual
                                                    </button>
                                                    {tournament.platform === 'iRacing' ? (
                                                        <button onClick={() => setUploadType('json')} className="px-4 py-2 bg-[#FF5E1A] hover:bg-[#e05016] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#FF5E1A]/20 transition-all">
                                                            <i className="fas fa-file-upload mr-2"></i> Subir JSON
                                                        </button>
                                                    ) : (
                                                        <div className="tooltip" data-tip="Solo disponible para iRacing">
                                                            <button disabled className="px-4 py-2 bg-[#1a1a1a] text-gray-600 rounded-lg text-sm font-bold border border-[#222] cursor-not-allowed">
                                                                <i className="fas fa-file-code mr-2"></i> JSON (Dev)
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {uploadType && (
                                                <button onClick={() => setUploadType(null)} className="text-sm text-gray-500 hover:text-white underline">Cancelar Edición</button>
                                            )}
                                        </div>

                                        {/* CONTENT AREA */}
                                        <div className="p-6 flex-1 bg-[#121212]">

                                            {/* --- UPLOAD: JSON --- */}
                                            {uploadType === 'json' && (
                                                <div className="border-2 border-dashed border-[#333] rounded-xl p-10 text-center hover:border-[#FF5E1A] transition-colors cursor-pointer bg-[#151515]">
                                                    <i className="fas fa-cloud-upload-alt text-5xl text-[#333] mb-4"></i>
                                                    <h3 className="text-white font-bold text-lg mb-2">Arrastra tu archivo JSON de iRacing</h3>
                                                    <p className="text-gray-500 text-sm mb-6">El sistema procesará automáticamente las posiciones y tiempos.</p>
                                                    <input type="file" className="hidden" id="json-upload" />
                                                    <label htmlFor="json-upload" className="px-6 py-2 bg-[#222] text-white rounded-full font-bold cursor-pointer hover:bg-[#333]">Seleccionar Archivo</label>
                                                </div>
                                            )}

                                            {/* --- UPLOAD: MANUAL --- */}
                                            {uploadType === 'manual' && (
                                                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] mb-6 animate-slideDown">
                                                    <h4 className="text-[#FF5E1A] font-bold text-sm mb-4 uppercase">Agregar Resultado Individual</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                                                        <div className="relative">
                                                            <label className="text-[10px] text-gray-500 font-bold absolute -top-1.5 left-2 bg-[#1a1a1a] px-1">POS</label>
                                                            <input type="number" className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white text-sm"
                                                                value={newResultEntry.position} onChange={e => setNewResultEntry({ ...newResultEntry, position: parseInt(e.target.value) })} />
                                                        </div>
                                                        <div className="md:col-span-2 relative">
                                                            <label className="text-[10px] text-gray-500 font-bold absolute -top-1.5 left-2 bg-[#1a1a1a] px-1">PILOTO</label>
                                                            <select className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white text-sm"
                                                                value={newResultEntry.driver_id || ''} onChange={e => setNewResultEntry({ ...newResultEntry, driver_id: e.target.value })}
                                                            >
                                                                <option value="">Seleccionar...</option>
                                                                {drivers.map(d => <option key={d.id} value={d.id}>{d.name} (#{d.car_number})</option>)}
                                                            </select>
                                                        </div>
                                                        <div className="relative">
                                                            <label className="text-[10px] text-gray-500 font-bold absolute -top-1.5 left-2 bg-[#1a1a1a] px-1">PUNTOS</label>
                                                            <input type="number" className="w-full bg-[#080808] border border-[#333] p-2 rounded text-white text-sm"
                                                                value={newResultEntry.points} onChange={e => setNewResultEntry({ ...newResultEntry, points: parseInt(e.target.value) })} />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                                        <input className="bg-[#080808] border border-[#333] p-2 rounded text-white text-sm" placeholder="Best Lap (1:30.500)"
                                                            value={newResultEntry.best_lap_time || ''} onChange={e => setNewResultEntry({ ...newResultEntry, best_lap_time: e.target.value })} />
                                                        <input className="bg-[#080808] border border-[#333] p-2 rounded text-white text-sm" placeholder="Total Time / Gap"
                                                            value={newResultEntry.gap_to_leader || ''} onChange={e => setNewResultEntry({ ...newResultEntry, gap_to_leader: e.target.value })} />
                                                        <select className="bg-[#080808] border border-[#333] p-2 rounded text-white text-sm"
                                                            value={newResultEntry.status || 'Finished'} onChange={e => setNewResultEntry({ ...newResultEntry, status: e.target.value })}
                                                        >
                                                            <option value="Finished">Terminado</option>
                                                            <option value="DNF">DNF (Retirado)</option>
                                                            <option value="DNS">DNS (No Salió)</option>
                                                            <option value="DSQ">DSQ (Descalificado)</option>
                                                        </select>
                                                    </div>
                                                    <button onClick={handleQuickAddResult} className="w-full py-2 bg-[#FF5E1A] text-white font-bold rounded hover:bg-[#e05016]">Guardar Resultado</button>
                                                </div>
                                            )}

                                            {/* --- RESULTS TABLE --- */}
                                            {results.length > 0 ? (
                                                <div className="overflow-hidden rounded-xl border border-[#333]">
                                                    <table className="w-full text-left text-sm text-gray-400">
                                                        <thead className="bg-[#1a1a1a] text-xs uppercase font-bold text-white">
                                                            <tr>
                                                                <th className="px-4 py-3 text-center w-12">Pos</th>
                                                                <th className="px-4 py-3">Piloto</th>
                                                                <th className="px-4 py-3 text-right">Tiempo/Gap</th>
                                                                <th className="px-4 py-3 text-right">Pts</th>
                                                                <th className="px-4 py-3 text-right w-12"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-[#222] bg-[#080808]">
                                                            {results.map((res, i) => {
                                                                const driver = drivers.find(d => d.id === res.driver_id);
                                                                return (
                                                                    <tr key={res.id} className="hover:bg-[#151515]">
                                                                        <td className={`px-4 py-3 text-center font-bold ${res.position === 1 ? 'text-[#FFD700]' :
                                                                                res.position === 2 ? 'text-[#C0C0C0]' :
                                                                                    res.position === 3 ? 'text-[#CD7F32]' : 'text-white'
                                                                            }`}>
                                                                            {res.position}
                                                                        </td>
                                                                        <td className="px-4 py-3 text-white">
                                                                            <div className="font-bold">{driver?.name || 'Desconocido'}</div>
                                                                            <div className="text-xs text-gray-500">{driver?.team}</div>
                                                                        </td>
                                                                        <td className="px-4 py-3 text-right font-mono text-xs">
                                                                            {res.gap_to_leader || res.total_time || '-'}
                                                                        </td>
                                                                        <td className="px-4 py-3 text-right font-bold text-[#FF5E1A]">
                                                                            {res.points}
                                                                        </td>
                                                                        <td className="px-4 py-3 text-right">
                                                                            <button onClick={() => handleDeleteResult(res.id)} className="text-[#333] hover:text-red-500 transition-colors">
                                                                                <i className="fas fa-times"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                !uploadType && (
                                                    <div className="text-center py-20 opacity-40">
                                                        <p>No hay resultados cargados aún.</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                .animate-slideDown { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </>
    );
}

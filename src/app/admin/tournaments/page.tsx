"use client";
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase/client';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/utils/AdminContext';
import Link from 'next/link';

// --- Types & Constants ---
const SCORING_PRESETS: { [key: string]: number[] } = {
    'F1': [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
    'MotoGP': [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    'IndyCar': [50, 40, 35, 32, 30, 28, 26, 24, 22, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5],
    'IMSA': [350, 320, 300, 280, 260, 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110]
};

interface RoundConfig {
    date: string;
    track: string;
    time: string;
    image_url: string;
    multiplier: number;
    format: {
        practice: string;
        qualy: string;
        race: string;
    };
    // result_submission_type removed from here as per user request
}

const DEFAULT_ROUND: RoundConfig = {
    date: '',
    track: 'To Be Announced',
    time: '21:00',
    image_url: '',
    multiplier: 1,
    format: { practice: '10m', qualy: '15m', race: '45m' }
};

export default function AdminTournaments() {
    const { admin, loading: adminLoading } = useAdmin();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const roundFileInputRef = useRef<HTMLInputElement>(null);

    const [tournaments, setTournaments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'scoring' | 'calendar'>('details');

    // Round Image Upload State
    const [activeRoundIndex, setActiveRoundIndex] = useState<number | null>(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'upcoming',
        image_url: '',
        start_date: '',
        platform: 'Assetto Corsa',
        info_link: '',
        register_link: '',
        scoring_type: 'F1',
        scoring_points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
        round_count: 5,
        rounds: [] as RoundConfig[]
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!adminLoading && !admin) router.push('/admin');
        if (admin) fetchTournaments();
    }, [admin, adminLoading, router]);

    const fetchTournaments = async () => {
        const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
        if (data) setTournaments(data);
        setLoading(false);
    };

    // --- Format Helpers ---
    const parseRaceFormat = (val: string) => {
        if (!val) return { type: 'laps', value: '' };
        // Simple heuristic: if contains 'm' or 'min', it's time. Else (or valid number) it's laps.
        if (val.toLowerCase().includes('m')) return { type: 'time', value: val.replace(/[^0-9]/g, '') };
        return { type: 'laps', value: val.replace(/[^0-9]/g, '') };
    };

    // --- Actions ---

    const handleCreate = () => {
        setEditingId(null);
        resetForm();
        setView('create');
        setActiveTab('details');
    };

    const handleBack = () => {
        setView('list');
        resetForm();
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        const mappedRounds = (item.rounds_config || []).map((r: any) => ({
            date: r.date || '',
            track: r.track || '',
            time: r.time || '21:00',
            image_url: r.image_url || '',
            multiplier: r.multiplier !== undefined ? r.multiplier : 1,
            format: r.format || { practice: '10m', qualy: '15m', race: '45m' }
        }));
        setForm({
            title: item.title,
            description: item.description || '',
            status: item.status,
            image_url: item.image_url,
            start_date: item.start_date || '',
            platform: item.platform || 'Assetto Corsa',
            info_link: item.info_link || '',
            register_link: item.register_link || '',
            scoring_type: item.scoring_system?.type || 'F1',
            scoring_points: item.scoring_system?.points || SCORING_PRESETS['F1'],
            round_count: item.rounds_config?.length || 5,
            rounds: mappedRounds
        });
        setView('edit');
        setActiveTab('details');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este torneo?')) return;
        await supabase.from('tournaments').delete().eq('id', id);
        fetchTournaments();
    };

    const resetForm = () => {
        setForm({
            title: '', description: '', status: 'upcoming', image_url: '',
            start_date: '', platform: 'Assetto Corsa', info_link: '', register_link: '',
            scoring_type: 'F1', scoring_points: SCORING_PRESETS['F1'],
            round_count: 5, rounds: []
        });
    };

    // --- Field Updates ---

    const handleScoringChange = (type: string) => {
        if (type === 'Custom') {
            setForm(prev => ({ ...prev, scoring_type: 'Custom' }));
        } else {
            setForm(prev => ({ ...prev, scoring_type: type, scoring_points: SCORING_PRESETS[type] }));
        }
    };

    const handleRoundCountChange = (count: number) => {
        const newRounds = [...form.rounds];
        if (count > newRounds.length) {
            for (let i = newRounds.length; i < count; i++) {
                newRounds.push({ ...DEFAULT_ROUND });
            }
        } else {
            newRounds.length = count;
        }
        setForm(prev => ({ ...prev, round_count: count, rounds: newRounds }));
    };

    const handleRoundUpdate = (index: number, field: keyof RoundConfig, value: any) => {
        const newRounds = [...form.rounds];
        newRounds[index] = { ...newRounds[index], [field]: value };
        setForm(prev => ({ ...prev, rounds: newRounds }));
    };

    const handleRoundFormatUpdate = (index: number, field: 'practice' | 'qualy' | 'race', value: string) => {
        const newRounds = [...form.rounds];
        newRounds[index] = {
            ...newRounds[index],
            format: { ...newRounds[index].format, [field]: value }
        };
        setForm(prev => ({ ...prev, rounds: newRounds }));
    };

    // Special handler for Race Duration (Type + Value)
    const handleRaceDurationUpdate = (index: number, type: 'laps' | 'time', val: string) => {
        const rawVal = val.replace(/[^0-9]/g, '');
        const suffix = type === 'time' ? 'm' : ' Vueltas';
        const finalStr = rawVal ? `${rawVal}${suffix}` : '';
        handleRoundFormatUpdate(index, 'race', finalStr);
    };

    // --- Image Uploads ---

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage.from('tournaments').upload(fileName, file);

        if (error) {
            alert('Error: ' + error.message);
        } else {
            const publicUrl = supabase.storage.from('tournaments').getPublicUrl(fileName).data.publicUrl;
            setForm(prev => ({ ...prev, image_url: publicUrl }));
        }
        setUploading(false);
    };

    const handleRoundImageClick = (index: number) => {
        setActiveRoundIndex(index);
        roundFileInputRef.current?.click();
    };

    const handleRoundImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeRoundIndex === null || !e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);
        const fileName = `round_${Date.now()}_${activeRoundIndex}_${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage.from('tournaments').upload(fileName, file);
        if (error) {
            alert('Error: ' + error.message);
        } else {
            const publicUrl = supabase.storage.from('tournaments').getPublicUrl(fileName).data.publicUrl;
            handleRoundUpdate(activeRoundIndex, 'image_url', publicUrl);
        }
        setUploading(false);
        if (roundFileInputRef.current) roundFileInputRef.current.value = '';
        setActiveRoundIndex(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title: form.title,
            description: form.description,
            status: form.status,
            image_url: form.image_url || '/img/tournaments/default.jpg',
            start_date: form.start_date || null,
            platform: form.platform,
            info_link: form.info_link,
            register_link: form.register_link,
            scoring_system: { type: form.scoring_type, points: form.scoring_points },
            rounds_config: form.rounds,
            total_rounds: form.round_count
        };

        if (editingId) {
            await supabase.from('tournaments').update(payload).eq('id', editingId);
        } else {
            await supabase.from('tournaments').insert([payload]);
        }
        handleBack();
        fetchTournaments();
    };

    if (loading || adminLoading) return <div className="text-white text-center pt-24">Cargando...</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#080808] pb-12" style={{ paddingTop: '180px' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <input type="file" ref={roundFileInputRef} onChange={handleRoundImageUpload} className="hidden" accept="image/*" />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-12 sm:mb-16">
                        <div>
                            <span className="text-[#FF5E1A] font-bold tracking-widest text-xs sm:text-sm uppercase">ADMINISTRACIÓN</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 uppercase">Gestión de Torneos</h2>
                        </div>
                        {view === 'list' ? (
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                                <Link href="/admin/dashboard" className="btn-outline flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#333] text-white hover:bg-[#222] transition-colors font-bold">
                                    <i className="fas fa-arrow-left"></i> Dashboard
                                </Link>
                                <button onClick={handleCreate} className="btn-main flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-[#FF5E1A] hover:text-white transition-all shadow-lg hover:shadow-[#FF5E1A]/40 text-base sm:text-lg">
                                    <i className="fas fa-plus"></i> Nuevo Torneo
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleBack} className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#333] text-white hover:bg-[#222] transition-colors font-bold">
                                <i className="fas fa-arrow-left"></i> Volver al listado
                            </button>
                        )}
                    </div>

                    {/* LIST VIEW */}
                    {view === 'list' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                            {tournaments.map((item) => (
                                <div key={item.id} className="bg-[#121212] rounded-3xl overflow-hidden border border-[#222] group hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                                    <div className="h-56 relative">
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                                        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.status === 'active' ? 'bg-[#39FF14] text-black' :
                                            item.status === 'completed' ? 'bg-red-600 text-white' :
                                                'bg-[#333] text-white'
                                            }`}>
                                            {item.status === 'active' ? 'En Curso' : item.status === 'completed' ? 'Finalizado' : 'Próximamente'}
                                        </span>
                                        <span className="absolute bottom-4 left-4 text-white text-xs bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest font-bold">
                                            {item.platform}
                                        </span>
                                    </div>
                                    <div className="p-8">
                                        <h4 className="text-2xl font-bold text-white mb-6 leading-tight">{item.title}</h4>
                                        <div className="flex gap-3">
                                            <Link href={`/admin/tournaments/${item.id}/results`} className="flex-1 bg-[#222] text-white text-center py-3 rounded-xl hover:bg-[#FF5E1A] hover:text-white transition-colors text-sm font-bold uppercase tracking-wide border border-[#333]">
                                                <i className="fas fa-list-ol mr-2"></i> Resultados
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="w-12 flex items-center justify-center bg-[#222] text-[#ff4444] rounded-xl hover:bg-[#330000] border border-[#333] transition-colors">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <button onClick={() => handleEdit(item)} className="w-12 flex items-center justify-center bg-[#222] text-white rounded-xl hover:bg-white hover:text-black border border-[#333] transition-colors">
                                                <i className="fas fa-pen"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tournaments.length === 0 && <p className="text-gray-500 col-span-full text-center py-20 text-xl">No hay torneos creados aún.</p>}
                        </div>
                    )}

                    {/* CREATE / EDIT VIEW */}
                    {view !== 'list' && (
                        <div className="bg-[#121212]/90 backdrop-blur-xl border border-[#333] rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl mt-8 lg:mt-12">
                            {/* TABS HEADER */}
                            <div className="flex border-b border-[#333] mb-16 overflow-x-auto">
                                {[
                                    { id: 'details', label: '1. Información y Diseño', icon: 'fa-info-circle' },
                                    { id: 'scoring', label: '2. Reglas y Puntuación', icon: 'fa-trophy' },
                                    { id: 'calendar', label: '3. Calendario y Rondas', icon: 'fa-calendar-alt' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`pb-5 px-8 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'border-[#FF5E1A] text-white' : 'border-transparent text-[#666] hover:text-[#aaa]'}`}
                                    >
                                        <i className={`fas ${tab.icon} text-lg`}></i> {tab.label}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="min-h-[600px] flex flex-col gap-16">
                                {/* TAB 1: DETAILS */}
                                {activeTab === 'details' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-16 animate-fadeIn">
                                        <div className="space-y-14">
                                            <div>
                                                <label className="block text-[#888] text-xs font-bold uppercase tracking-wider mb-4">Título del Torneo</label>
                                                <input required className="w-full bg-[#080808] border border-[#333] text-white p-6 rounded-2xl focus:border-[#FF5E1A] outline-none transition-all text-xl placeholder-gray-700 focus:bg-black" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ej. Copa Mazda MX5" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                                <div>
                                                    <label className="block text-[#888] text-xs font-bold uppercase tracking-wider mb-4">Estado</label>
                                                    <div className="relative">
                                                        <select className="w-full bg-[#080808] border border-[#333] text-white p-6 rounded-2xl outline-none appearance-none focus:border-[#FF5E1A] transition-colors cursor-pointer text-lg" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                                            <option value="upcoming">Próximamente</option>
                                                            <option value="active">En Curso</option>
                                                            <option value="completed">Finalizado</option>
                                                        </select>
                                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                            <i className="fas fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[#888] text-xs font-bold uppercase tracking-wider mb-4">Plataforma</label>
                                                    <div className="relative">
                                                        <select className="w-full bg-[#080808] border border-[#333] text-white p-6 rounded-2xl outline-none appearance-none focus:border-[#FF5E1A] transition-colors cursor-pointer text-lg" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                                                            <option value="Assetto Corsa">Assetto Corsa</option>
                                                            <option value="iRacing">iRacing</option>
                                                        </select>
                                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                            <i className="fas fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[#888] text-xs font-bold uppercase tracking-wider mb-4">Fecha de Inicio</label>
                                                <input type="date" className="w-full bg-[#080808] border border-[#333] text-white p-6 rounded-2xl outline-none focus:border-[#FF5E1A] transition-colors text-lg" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="space-y-14">
                                            <div>
                                                <label className="block text-[#888] text-xs font-bold uppercase tracking-wider mb-4">Imagen de Portada</label>
                                                <div className="relative group w-full h-[320px] bg-[#080808] border-2 border-dashed border-[#2a2a2a] rounded-3xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#FF5E1A] transition-colors" onClick={() => fileInputRef.current?.click()}>
                                                    {form.image_url ? (
                                                        <>
                                                            <img src={form.image_url} alt="Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                <span className="bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20 text-white font-bold">Cambiar Imagen</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center text-gray-600 group-hover:text-[#FF5E1A] transition-colors">
                                                            <i className="fas fa-cloud-upload-alt text-5xl mb-4"></i>
                                                            <p className="font-bold uppercase tracking-widest text-sm">{uploading ? 'Subiendo...' : 'Click para subir imagen'}</p>
                                                            <p className="text-xs mt-2 opacity-50">Recomendado: 1920x1080</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                                <input placeholder="Link Discord / Info" className="bg-[#080808] border border-[#333] text-white p-6 rounded-2xl outline-none text-lg focus:border-[#FF5E1A] transition-colors" value={form.info_link} onChange={(e) => setForm({ ...form, info_link: e.target.value })} />
                                                <input placeholder="Link Registro" className="bg-[#080808] border border-[#333] text-white p-6 rounded-2xl outline-none text-lg focus:border-[#FF5E1A] transition-colors" value={form.register_link} onChange={(e) => setForm({ ...form, register_link: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: SCORING */}
                                {activeTab === 'scoring' && (
                                    <div className="animate-fadeIn">
                                        <div className="mb-8 flex flex-wrap gap-3">
                                            {Object.keys(SCORING_PRESETS).map(s => (
                                                <button key={s} type="button" onClick={() => handleScoringChange(s)} className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${form.scoring_type === s ? 'bg-[#FF5E1A] text-white shadow-lg shadow-[#FF5E1A]/20' : 'bg-[#222] text-gray-400 hover:text-white hover:bg-[#333]'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                            <button type="button" onClick={() => handleScoringChange('Custom')} className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${form.scoring_type === 'Custom' ? 'bg-[#FF5E1A] text-white shadow-lg shadow-[#FF5E1A]/20' : 'bg-[#222] text-gray-400 hover:text-white hover:bg-[#333]'}`}>
                                                Custom
                                            </button>
                                        </div>

                                        <div className="bg-[#080808] p-8 rounded-3xl border border-[#333]">
                                            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4">
                                                {form.scoring_points.map((points, idx) => (
                                                    <div key={idx} className="relative">
                                                        <span className="absolute -top-2 -left-1 bg-[#222] text-[#888] text-[10px] px-2 py-0.5 rounded border border-[#333] font-mono">P{idx + 1}</span>
                                                        <input type="number" value={points} onChange={(e) => {
                                                            const val = parseInt(e.target.value) || 0;
                                                            const newPoints = [...form.scoring_points];
                                                            newPoints[idx] = val;
                                                            setForm({ ...form, scoring_points: newPoints });
                                                        }} className="w-full bg-[#151515] border border-[#333] text-white text-center py-3 rounded-lg focus:border-[#FF5E1A] outline-none font-bold text-lg" />
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => setForm({ ...form, scoring_points: [...form.scoring_points, 0] })} className="bg-[#151515] border border-dashed border-[#444] text-[#444] hover:text-[#FF5E1A] hover:border-[#FF5E1A] rounded-lg flex items-center justify-center text-2xl transition-all group">
                                                    <i className="fas fa-plus group-hover:scale-110 transition-transform"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: CALENDAR */}
                                {activeTab === 'calendar' && (
                                    <div className="animate-fadeIn">
                                        <div className="flex items-center gap-4 mb-8 bg-[#080808] p-4 rounded-2xl border border-[#333] inline-flex">
                                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Cantidad de Rondas:</span>
                                            <input type="number" min="1" max="50" value={form.round_count} onChange={(e) => handleRoundCountChange(parseInt(e.target.value))} className="w-20 bg-[#181818] border border-[#333] text-white text-center py-2 rounded-lg focus:border-[#FF5E1A] outline-none font-bold text-lg" />
                                        </div>

                                        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                                            {form.rounds.map((round, idx) => {
                                                const raceFormat = parseRaceFormat(round.format?.race);

                                                return (
                                                    <div key={idx} className="bg-[#151515] p-6 rounded-2xl border border-[#333] flex flex-col md:flex-row gap-6 items-start hover:border-[#444] transition-colors">
                                                        {/* Round Image Helper */}
                                                        <div
                                                            onClick={() => handleRoundImageClick(idx)}
                                                            className="w-full md:w-32 h-32 flex-shrink-0 bg-[#080808] border border-dashed border-[#444] rounded-xl overflow-hidden cursor-pointer hover:border-[#FF5E1A] relative group transition-colors"
                                                            title="Cambiar imagen de ronda"
                                                        >
                                                            {round.image_url ? (
                                                                <>
                                                                    <img src={round.image_url} className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                        <i className="fas fa-camera text-white text-xl"></i>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 group-hover:text-[#FF5E1A]">
                                                                    <i className="fas fa-image mb-2 text-xl"></i>
                                                                    <span className="text-[10px] uppercase font-bold">Subir IMG</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1 space-y-4 w-full">
                                                            <div className="flex justify-between items-center bg-[#0a0a0a] p-3 rounded-xl border border-[#222]">
                                                                <h4 className="text-[#FF5E1A] font-extrabold text-lg tracking-widest pl-2">ROUND {idx + 1}</h4>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs text-gray-500 font-bold uppercase hidden sm:inline">Multiplicador:</span>
                                                                    <select value={round.multiplier} onChange={(e) => handleRoundUpdate(idx, 'multiplier', parseFloat(e.target.value))} className="bg-[#1a1a1a] text-xs text-white px-3 py-1.5 rounded-lg border border-[#333] outline-none focus:border-[#FF5E1A] font-bold">
                                                                        <option value={1}>1x (Normal)</option>
                                                                        <option value={1.5}>1.5x</option>
                                                                        <option value={2}>2x (Doble)</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                                                <input type="date" value={round.date} onChange={(e) => handleRoundUpdate(idx, 'date', e.target.value)} className="sm:col-span-3 bg-[#080808] border border-[#333] text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF5E1A] outline-none" />
                                                                <input type="time" value={round.time} onChange={(e) => handleRoundUpdate(idx, 'time', e.target.value)} className="sm:col-span-2 bg-[#080808] border border-[#333] text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF5E1A] outline-none" />
                                                                <input type="text" placeholder="Nombre del Circuito" value={round.track} onChange={(e) => handleRoundUpdate(idx, 'track', e.target.value)} className="sm:col-span-7 bg-[#080808] border border-[#333] text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF5E1A] outline-none font-bold" />
                                                            </div>

                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="relative pt-2">
                                                                    <label className="absolute top-0 left-2 bg-[#151515] px-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">PRACTICA</label>
                                                                    <input type="text" value={round.format?.practice} onChange={(e) => handleRoundFormatUpdate(idx, 'practice', e.target.value)} className="w-full bg-[#080808] border border-[#333] text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF5E1A] outline-none" />
                                                                </div>
                                                                <div className="relative pt-2">
                                                                    <label className="absolute top-0 left-2 bg-[#151515] px-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">CLASIF.</label>
                                                                    <input type="text" value={round.format?.qualy} onChange={(e) => handleRoundFormatUpdate(idx, 'qualy', e.target.value)} className="w-full bg-[#080808] border border-[#333] text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF5E1A] outline-none" />
                                                                </div>

                                                                {/* RACE CONFIGURATION: LAPS or TIME */}
                                                                <div className="relative pt-2">
                                                                    <div className="flex bg-[#080808] border border-[#333] rounded-xl overflow-hidden focus-within:border-[#FF5E1A] h-[46px]">
                                                                        <label className="absolute top-0 left-2 bg-[#151515] px-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider z-10">CARRERA</label>
                                                                        <select
                                                                            value={raceFormat.type}
                                                                            onChange={(e) => handleRaceDurationUpdate(idx, e.target.value as 'laps' | 'time', raceFormat.value)}
                                                                            className="bg-[#111] text-xs text-gray-400 px-2 border-r border-[#333] outline-none appearance-none cursor-pointer hover:text-white pt-2 font-bold uppercase"
                                                                        >
                                                                            <option value="laps">Vueltas</option>
                                                                            <option value="time">Tiempo</option>
                                                                        </select>
                                                                        <input
                                                                            type="number"
                                                                            value={raceFormat.value}
                                                                            onChange={(e) => handleRaceDurationUpdate(idx, raceFormat.type as 'laps' | 'time', e.target.value)}
                                                                            className="w-full bg-transparent text-white text-sm px-3 pt-1 outline-none font-bold"
                                                                            placeholder="0"
                                                                        />
                                                                        <span className="text-gray-600 text-xs flex items-center pr-3 pt-1 font-bold">
                                                                            {raceFormat.type === 'time' ? 'MIN' : 'VTS'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-16 flex gap-6 pt-10 border-t border-[#333]">
                                    <button type="button" onClick={handleBack} className="px-8 py-4 rounded-2xl border border-[#333] text-white hover:bg-[#222] font-bold tracking-wide transition-colors">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="flex-1 bg-[#FF5E1A] text-white font-extrabold text-lg py-4 rounded-2xl hover:bg-[#E05016] transition-all shadow-xl shadow-[#FF5E1A]/20 transform hover:-translate-y-1" disabled={uploading}>
                                        {editingId ? 'Guardar Cambios' : 'Crear Torneo'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
                .btn-main { background: var(--c-white); color: var(--c-black); }
                .btn-main:hover { background: var(--c-orange); color: white; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
                /* Mobile responsive improvements */
                @media (max-width: 640px) {
                    .min-h-screen { padding-top: 120px !important; }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                    }
                }
                
                @media (max-width: 768px) {
                    .overflow-x-auto {
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                    }
                    .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}

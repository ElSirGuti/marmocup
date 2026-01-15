"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

type Tournament = {
    id: string;
    title: string;
    description: string;
    status: string;
    image_url: string;
    start_date: string;
    races_count: number;
    platform: string;
    info_link: string;
    register_link: string;
};

export default function Tournaments() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        async function fetchTournaments() {
            const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
            if (data) setTournaments(data);
        }
        fetchTournaments();
    }, []);

    return (
        <section id="torneos" className="section">
            <div className="container">
                <div style={{ marginBottom: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <span style={{ color: 'var(--c-orange)', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>CHAMPIONSHIPS</span>
                        <h2 style={{ fontSize: '4rem', marginTop: '20px', lineHeight: '1.1', fontWeight: '900' }}>ACTIVE SEASONS</h2>
                    </div>
                    {/* Decorative Line */}
                    <div style={{ height: '2px', width: '30%', background: 'var(--c-light-grey)', marginBottom: '25px' }} className="hidden-mobile"></div>
                </div>

                <div className="bento-grid-tournaments">
                    {tournaments.map((torneo, index) => {
                        /* Fix: Use simpler grid logic to avoid hydration mismatch and alignment issues */
                        const isMain = index === 0;
                        return (
                            <div className={`bento-item ${isMain ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'}`} key={torneo.id}>
                                {/* Background Image */}
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                                    <Image
                                        src={torneo.image_url}
                                        alt={torneo.title}
                                        fill
                                        style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                                        className="bg-hover"
                                    />
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)'
                                    }}></div>
                                </div>

                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 1, padding: isMain ? '60px' : '50px', marginTop: 'auto', width: '100%' }}>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                                        <span style={{
                                            background: torneo.status === 'active' ? 'var(--c-accent)' : '#555',
                                            color: torneo.status === 'active' ? 'black' : 'white',
                                            fontWeight: 'bold',
                                            padding: '8px 18px',
                                            borderRadius: '8px',
                                            fontSize: '0.7rem',
                                            letterSpacing: '1.5px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {torneo.status === 'active' ? 'En Curso' : torneo.status === 'completed' ? 'Finalizado' : 'Próximamente'}
                                        </span>
                                        <span style={{
                                            background: 'white',
                                            color: 'black',
                                            fontWeight: 'bold',
                                            padding: '8px 18px',
                                            borderRadius: '8px',
                                            fontSize: '0.7rem',
                                            letterSpacing: '1.5px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {torneo.platform}
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: isMain ? '3rem' : '2.2rem',
                                        marginBottom: '30px',
                                        lineHeight: '1.1',
                                        fontWeight: '900'
                                    }}>{torneo.title}</h3>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderTop: '2px solid rgba(255,255,255,0.2)',
                                        paddingTop: '30px',
                                        marginTop: '30px'
                                    }}>
                                        <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: '500' }}>Starts: {new Date(torneo.start_date).toLocaleDateString()}</span>
                                        <a href={torneo.info_link} target="_blank" className="btn-link" style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>
                                            Join Championship <i className="fas fa-arrow-right" style={{ fontSize: '0.9rem', marginLeft: '10px' }}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx global>{`
                .bento-grid-tournaments {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 50px;
                    grid-auto-rows: minmax(450px, auto);
                }
                .bento-item:hover .bg-hover { transform: scale(1.05); }
                @media (max-width: 768px) {
                    .bento-grid-tournaments {
                        gap: 30px;
                        grid-auto-rows: minmax(400px, auto);
                    }
                    .bento-item { 
                        grid-column: span 12 !important; 
                        min-height: 400px; 
                    }
                    .hidden-mobile { display: none !important; }
                }
            `}</style>
        </section>
    );
}

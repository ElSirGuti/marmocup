"use client";
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from '@/utils/supabase/client';

export default function Calendario() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
            if (data) setEvents(data);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--c-black)' }}>
                <div className="section-header">
                    <h2 className="section-title">RACING CALENDAR</h2>
                    <p className="section-subtitle">Temporada 2026</p>
                </div>

                <div className="container" style={{ maxWidth: '900px' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <div className="loading-spinner" style={{
                                width: '40px', height: '40px',
                                border: '3px solid rgba(255, 94, 26, 0.3)',
                                borderTop: '3px solid var(--c-orange)',
                                borderRadius: '50%',
                                margin: '0 auto 20px',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            <p style={{ color: '#888' }}>Sincronizando calendario...</p>
                        </div>
                    ) : events.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <i className="far fa-calendar-times" style={{ fontSize: '4rem', color: '#333', marginBottom: '20px' }}></i>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No hay carreras programadas</h3>
                            <p style={{ color: '#666' }}>El calendario de la temporada 2026 se anunciará pronto.</p>
                            <div style={{ marginTop: '30px' }}>
                                <a href="/" className="btn-link">Volver al Inicio</a>
                            </div>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', borderLeft: '2px solid var(--c-light-grey)', paddingLeft: '40px' }}>
                            {events.map((event, index) => (
                                <div key={event.id} style={{ marginBottom: '60px', position: 'relative' }}>
                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute', left: '-49px', top: '0',
                                        width: '16px', height: '16px',
                                        background: index === 0 ? 'var(--c-orange)' : 'var(--c-black)',
                                        border: `2px solid ${index === 0 ? 'var(--c-orange)' : '#444'}`,
                                        borderRadius: '50%',
                                        zIndex: 1
                                    }}></div>

                                    <div style={{
                                        background: '#121212',
                                        borderRadius: '20px',
                                        padding: '30px',
                                        border: '1px solid #222',
                                        display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px',
                                        position: 'relative'
                                    }}>
                                        {/* Content */}
                                        <div>
                                            <div style={{
                                                color: 'var(--c-orange)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px'
                                            }}>
                                                ROUND {index + 1}
                                            </div>
                                            <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{event.title}</h3>
                                            <p style={{ color: '#888', marginBottom: '20px' }}><i className="fas fa-flag-checkered" style={{ marginRight: '10px' }}></i> {event.track}</p>

                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                <span style={{ background: '#222', padding: '5px 15px', borderRadius: '5px', fontSize: '0.9rem' }}>
                                                    <i className="far fa-calendar"></i> {new Date(event.date).toLocaleDateString()}
                                                </span>
                                                <span style={{ background: '#222', padding: '5px 15px', borderRadius: '5px', fontSize: '0.9rem' }}>
                                                    <i className="far fa-clock"></i> {event.time_gmt4}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button disabled className="btn-main" style={{ padding: '10px 20px', fontSize: '0.9rem', opacity: 0.5, cursor: 'not-allowed' }}>
                                                Info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <style jsx global>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}

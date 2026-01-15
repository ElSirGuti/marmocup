"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { getSiteConfig } from '@/utils/config';

export default function LiveStream() {
    const [videoId, setVideoId] = useState('Ql-xFaRZmIo'); // Default fallback
    const [isActive, setIsActive] = useState(false);
    const [upcomingRaces, setUpcomingRaces] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            // Fetch Config
            const config = await getSiteConfig();
            if (config.live_stream_id) setVideoId(config.live_stream_id);
            if (config.live_stream_active === 'true') setIsActive(true);

            // Fetch Upcoming Races (Next 3)
            const { data: races } = await supabase
                .from('calendar_events')
                .select('*')
                .gte('date', new Date().toISOString().split('T')[0]) // Date >= Today
                .order('date', { ascending: true })
                .limit(2);

            if (races) setUpcomingRaces(races);
        }
        fetchData();
    }, []);

    return (
        <section id="live" className="section" style={{ padding: '0 0 100px 0', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
            <div className="container">
                <div style={{ background: '#121212', padding: '40px', borderRadius: '20px', border: '1px solid #222', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                width: '10px', height: '10px',
                                background: isActive ? '#39FF14' : 'red',
                                borderRadius: '50%',
                                boxShadow: isActive ? '0 0 10px #39FF14' : '0 0 5px red'
                            }}></div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
                                {isActive ? 'LIVE BROADCAST' : 'LATEST BROADCAST'}
                            </h3>
                        </div>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '10px' }}>
                            <iframe
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--c-white)' }}>UPCOMING <span style={{ color: 'var(--c-orange)' }}>RACES</span></h3>

                        {upcomingRaces.length === 0 ? (
                            <p style={{ color: '#666' }}>No hay carreras programadas próximamente.</p>
                        ) : (
                            <ul style={{ listStyle: 'none' }}>
                                {upcomingRaces.map((race, i) => (
                                    <li key={i} style={{
                                        marginBottom: '15px', padding: '20px', background: '#080808',
                                        borderLeft: '3px solid var(--c-orange)', display: 'flex', flexDirection: 'column', gap: '5px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#888' }}>
                                            <span>{new Date(race.date).toLocaleDateString()}</span>
                                            <span>{race.time_gmt4}</span>
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{race.title}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#555' }}>{race.track}</div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <a href="/calendario" className="btn-link" style={{ marginTop: '20px', display: 'inline-block' }}>Ver todo el calendario</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

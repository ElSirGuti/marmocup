"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HallOfFame() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--c-black)' }}>
                <div className="section-header">
                    <h2 className="section-title">HALL OF FAME</h2>
                    <p className="section-subtitle">Leyendas de la pista</p>
                </div>

                <div className="container">
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'
                    }}>
                        {/* Placeholder Cards for Legends */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} style={{
                                background: '#121212', borderRadius: '20px', overflow: 'hidden', border: '1px solid #222'
                            }}>
                                <div style={{ height: '250px', background: '#1a1a1a', position: 'relative' }}>
                                    {/* Image Placeholder */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        opacity: 0.3, background: `linear-gradient(45deg, #000, #333)`
                                    }}></div>
                                </div>
                                <div style={{ padding: '30px' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>LEGEND NAME</h3>
                                    <p style={{ color: 'var(--c-orange)', fontWeight: 'bold', marginBottom: '15px' }}>CHAMPION 2025</p>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                        Dominador absoluto de la temporada, marcando récords en 5 circuitos consecutivos.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

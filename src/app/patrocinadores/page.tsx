"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Patrocinadores() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--c-black)' }}>
                <div className="section-header">
                    <h2 className="section-title">OUR PARTNERS</h2>
                    <p className="section-subtitle">Impulsando la competición</p>
                </div>

                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px',
                        alignItems: 'center', marginTop: '60px'
                    }}>
                        {/* Sponsor Logos Placeholders */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} style={{
                                padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s'
                            }} className="sponsor-card">
                                <span style={{ color: '#555', fontSize: '1.2rem', fontWeight: 'bold' }}>LOGO {item}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '80px', padding: '60px', background: 'var(--c-orange)', borderRadius: '24px', color: 'black' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>¿QUIERES PATROCINAR?</h3>
                        <p style={{ maxWidth: '600px', margin: '0 auto 30px', fontWeight: '500' }}>
                            Únete a la liga de simracing con mayor crecimiento. Conecta tu marca con miles de apasionados del automovilismo.
                        </p>
                        <button style={{
                            background: 'black', color: 'white', border: 'none', padding: '15px 40px',
                            fontSize: '1rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer'
                        }}>
                            CONTÁCTANOS
                        </button>
                    </div>
                </div>

                <style jsx global>{`
               .sponsor-card:hover { background: rgba(255,255,255,0.05) !important; transform: scriptY(-5px); }
           `}</style>
            </div>
            <Footer />
        </>
    );
}

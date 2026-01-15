"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Resultados() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '180px', minHeight: '100vh', background: 'var(--c-black)' }}>
                <div className="section-header">
                    <h2 className="section-title">RACE RESULTS</h2>
                    <p className="section-subtitle">Clasificaciones y tiempos oficiales</p>
                </div>

                <div className="container">
                    <div style={{
                        background: '#121212',
                        borderRadius: '20px',
                        padding: '60px',
                        textAlign: 'center',
                        border: '1px solid #222'
                    }}>
                        <i className="fas fa-trophy" style={{ fontSize: '5rem', color: '#222', marginBottom: '30px' }}></i>
                        <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Data Center In Progress</h3>
                        <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto 40px' }}>
                            Estamos conectando la telemetría en tiempo real. Pronto podrás ver las tablas de posiciones, tiempos por vuelta y estadísticas detalladas de cada piloto.
                        </p>
                        <button className="btn-main" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            Próximamente
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

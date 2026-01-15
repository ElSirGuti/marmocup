"use client";
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { useAdmin } from '@/utils/AdminContext';

export default function AdminDashboard() {
    const { admin, logout, loading } = useAdmin();

    if (loading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Cargando...</div>;
    if (!admin) return null; // Context handles redirect

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--c-black)', paddingBottom: '50px' }}>
                <div className="container">

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem' }}>DASHBOARD</h2>
                            <p style={{ color: '#888' }}>Bienvenido, <span style={{ color: 'var(--c-orange)' }}>{admin.full_name}</span> ({admin.username})</p>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Link href="/admin/profile" style={{
                                background: '#222', color: 'white', padding: '10px 20px',
                                borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <i className="fas fa-user-circle"></i> Mi Perfil
                            </Link>
                            <button onClick={logout} style={{
                                background: 'transparent', border: '1px solid #333', color: '#888',
                                padding: '10px 20px', borderRadius: '50px', cursor: 'pointer'
                            }}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    {/* Modules Grid */}
                    <div className="bento-grid">

                        {/* Module: Site Config */}
                        <div className="bento-item" style={{ gridColumn: 'span 4', padding: '30px', background: '#121212' }}>
                            <div style={{
                                width: '50px', height: '50px', background: '#222', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                            }}>
                                <i className="fas fa-sliders-h" style={{ color: 'var(--c-orange)', fontSize: '1.2rem' }}></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>HOME & LIVE</h3>
                            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
                                Edita la imagen principal, video en vivo y configuración general.
                            </p>
                            <Link href="/admin/config" className="btn-main" style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                Configurar
                            </Link>
                        </div>

                        {/* Module: Team */}
                        <div className="bento-item" style={{ gridColumn: 'span 4', padding: '30px', background: '#121212' }}>
                            <div style={{
                                width: '50px', height: '50px', background: '#222', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                            }}>
                                <i className="fas fa-users" style={{ color: 'var(--c-orange)', fontSize: '1.2rem' }}></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>TEAM</h3>
                            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
                                Gestiona los pilotos y miembros del staff.
                            </p>
                            <Link href="/admin/team" className="btn-main" style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                Gestionar
                            </Link>
                        </div>

                        {/* Module: Tournaments */}
                        <div className="bento-item" style={{ gridColumn: 'span 4', padding: '30px', background: '#121212' }}>
                            <div style={{
                                width: '50px', height: '50px', background: '#222', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                            }}>
                                <i className="fas fa-trophy" style={{ color: 'var(--c-orange)', fontSize: '1.2rem' }}></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>TOURNAMENTS</h3>
                            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
                                Crea nuevos campeonatos y actualiza resultados.
                            </p>
                            <Link href="/admin/tournaments" className="btn-main" style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                Gestionar
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

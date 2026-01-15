"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { useAdmin } from '@/utils/AdminContext';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function AdminProfile() {
    const { admin, login, loading } = useAdmin();
    const [form, setForm] = useState({
        full_name: '',
        username: '',
        new_password: '',
        confirm_password: ''
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (admin) {
            setForm(prev => ({ ...prev, full_name: admin.full_name, username: admin.username }));
        }
    }, [admin]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (form.new_password && form.new_password !== form.confirm_password) {
            setMessage({ text: 'Las contraseñas no coinciden.', type: 'error' });
            return;
        }

        setSaving(true);

        const { data: success, error } = await supabase.rpc('update_admin_profile', {
            p_id: admin?.id,
            p_full_name: form.full_name,
            p_username: form.username,
            p_new_password: form.new_password || null
        });

        setSaving(false);

        if (error || !success) {
            setMessage({ text: 'Error al actualizar. Es posible que el usuario ya exista.', type: 'error' });
        } else {
            setMessage({ text: 'Perfil actualizado exitosamente.', type: 'success' });
            // Update context
            if (admin) {
                login({ ...admin, full_name: form.full_name, username: form.username });
                setForm(prev => ({ ...prev, new_password: '', confirm_password: '' })); // Clear password fields
            }
        }
    };

    if (loading || !admin) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Cargando...</div>;

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--c-black)', paddingBottom: '50px' }}>
                <div className="container" style={{ maxWidth: '600px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem' }}>Mi Perfil</h2>
                        <Link href="/admin/dashboard" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-arrow-left"></i> Dashboard
                        </Link>
                    </div>

                    {message.text && (
                        <div style={{
                            padding: '15px',
                            background: message.type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(57, 255, 20, 0.1)',
                            color: message.type === 'error' ? 'red' : '#39FF14',
                            borderRadius: '8px', marginBottom: '20px'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <div className="glass" style={{ padding: '30px' }}>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Nombre Completo</label>
                                <input
                                    className="input-dark"
                                    value={form.full_name}
                                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Usuario</label>
                                <input
                                    className="input-dark"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                />
                            </div>

                            <div style={{ borderTop: '1px solid #333', margin: '10px 0' }}></div>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Dejar en blanco para mantener la contraseña actual.</p>

                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={form.new_password}
                                    onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={form.confirm_password}
                                    onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                />
                            </div>

                            <button type="submit" className="btn-main" disabled={saving} style={{ justifyContent: 'center', marginTop: '10px' }}>
                                {saving ? 'Guardando...' : 'Actualizar Perfil'}
                            </button>
                        </form>
                    </div>
                </div>
                <style jsx global>{`
                    .btn-outline {
                        background: transparent; border: 1px solid #333; color: white;
                        padding: 8px 15px; border-radius: 8px; cursor: pointer; text-decoration: none;
                        transition: all 0.2s;
                    }
                    .btn-outline:hover { border-color: white; }
                `}</style>
            </div>
        </>
    );
}

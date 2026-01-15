"use client";
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase/client';
import { getSiteConfig, updateSiteConfig } from '@/utils/config';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/utils/AdminContext';
import Link from 'next/link';

export default function AdminConfig() {
    const { admin, loading: adminLoading } = useAdmin();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        hero_bg_image: '',
        live_stream_id: '',
        live_stream_active: 'false'
    });

    useEffect(() => {
        if (!adminLoading && !admin) {
            router.push('/admin');
        } else if (admin) {
            init();
        }
    }, [admin, adminLoading, router]);

    const init = async () => {
        const config = await getSiteConfig();
        setForm(prev => ({ ...prev, ...config }));
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        const fileName = `hero-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage.from('site-assets').upload(fileName, file);

        if (error) {
            alert('Error subiendo imagen: ' + error.message);
        } else {
            const publicUrl = supabase.storage.from('site-assets').getPublicUrl(fileName).data.publicUrl;
            setForm(prev => ({ ...prev, hero_bg_image: publicUrl }));
        }
        setUploading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        // Save one by one
        await updateSiteConfig('hero_bg_image', form.hero_bg_image);
        await updateSiteConfig('live_stream_id', form.live_stream_id);
        await updateSiteConfig('live_stream_active', form.live_stream_active);

        setSaving(false);
        setMessage('Configuración guardada exitosamente.');
    };

    if (loading || adminLoading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Cargando...</div>;

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--c-black)', paddingBottom: '50px' }}>
                <div className="container" style={{ maxWidth: '600px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem' }}>Site Configuration</h2>
                        <Link href="/admin/dashboard" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-arrow-left"></i> Dashboard
                        </Link>
                    </div>

                    {message && <div style={{ padding: '15px', background: 'rgba(57, 255, 20, 0.1)', color: '#39FF14', borderRadius: '8px', marginBottom: '20px' }}>{message}</div>}

                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                        {/* HERO SECTION */}
                        <div className="glass" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--c-orange)' }}>Hero Section</h3>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Imagen de Fondo</label>

                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" disabled={uploading}>
                                        {uploading ? 'Subiendo...' : 'Subir Imagen'}
                                    </button>
                                    <input
                                        type="text"
                                        value={form.hero_bg_image}
                                        onChange={(e) => setForm({ ...form, hero_bg_image: e.target.value })}
                                        placeholder="O pegar URL aquí..."
                                        style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                    />
                                </div>
                                {form.hero_bg_image && (
                                    <img src={form.hero_bg_image} alt="Hero Preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }} />
                                )}
                            </div>
                        </div>

                        {/* LIVE STREAM SECTION */}
                        <div className="glass" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--c-orange)' }}>Live Stream</h3>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>YouTube Video ID</label>
                                <input
                                    type="text"
                                    value={form.live_stream_id}
                                    onChange={(e) => setForm({ ...form, live_stream_id: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#080808', border: '1px solid #333', color: 'white' }}
                                />
                                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>Ejemplo: Para `youtube.com/watch?v=Ql-xFaRZmIo`, el ID es `Ql-xFaRZmIo`.</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    id="liveActive"
                                    checked={form.live_stream_active === 'true'}
                                    onChange={(e) => setForm({ ...form, live_stream_active: e.target.checked ? 'true' : 'false' })}
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <label htmlFor="liveActive" style={{ color: '#ccc' }}>Mostrar indicador "EN VIVO" (Punto Verde)</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-main"
                            disabled={saving}
                            style={{ justifyContent: 'center' }}
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>

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

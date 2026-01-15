"use client";
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase/client';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAdmin } from '@/utils/AdminContext';
import Link from 'next/link';

const SOCIAL_PLATFORMS = {
    instagram: { prefix: 'instagram.com/', icon: 'instagram', placeholder: 'usuario' },
    twitter: { prefix: 'x.com/', icon: 'twitter', placeholder: 'usuario' }, // Updated to X.com as requested for consistency, though user said X
    linkedin: { prefix: 'linkedin.com/in/', icon: 'linkedin', placeholder: 'usuario' },
    github: { prefix: 'github.com/', icon: 'github', placeholder: 'usuario' },
    facebook: { prefix: 'facebook.com/', icon: 'facebook-f', placeholder: 'usuario' }
};

export default function AdminTeam() {
    const { admin, loading: adminLoading } = useAdmin();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [form, setForm] = useState({
        name: '',
        nickname: '',
        role: '',
        image_url: '/img/team/default.jpg',
        social_links: { instagram: '', twitter: '', linkedin: '', github: '', facebook: '' } as Record<string, string>
    });

    // Helper to extract username from URL
    const extractUsername = (url: string, prefix: string) => {
        if (!url) return '';
        // If it contains the prefix, remove it. If it's a full URL, try to strip protocol too.
        let clean = url.replace('https://', '').replace('http://', '').replace('www.', '');
        if (clean.startsWith(prefix)) return clean.replace(prefix, '');
        return clean; // Fallback if format is different
    };

    useEffect(() => {
        if (!adminLoading && !admin) {
            router.push('/admin');
        } else if (admin) {
            fetchMembers();
        }
    }, [admin, adminLoading, router]);

    const fetchMembers = async () => {
        const { data: teamData } = await supabase.from('team_members').select('*').order('display_order', { ascending: true });
        if (teamData) setMembers(teamData);
        setLoading(false);
    };

    const handleEdit = (member: any) => {
        setEditingId(member.id);

        // Parse existing socials to extract usernames
        const parsedSocials: any = { instagram: '', twitter: '', linkedin: '', github: '', facebook: '' };
        if (member.social_links) {
            Object.keys(SOCIAL_PLATFORMS).forEach(key => {
                const url = member.social_links[key];
                // @ts-ignore
                if (url) parsedSocials[key] = extractUsername(url, SOCIAL_PLATFORMS[key].prefix);
            });
        }

        setForm({
            name: member.name,
            nickname: member.nickname || '',
            role: member.role,
            image_url: member.image_url,
            social_links: parsedSocials
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este miembro?')) return;
        await supabase.from('team_members').delete().eq('id', id);
        fetchMembers();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage.from('team-assets').upload(fileName, file);

        if (error) {
            alert('Error subiendo imagen: ' + error.message);
        } else {
            const publicUrl = supabase.storage.from('team-assets').getPublicUrl(fileName).data.publicUrl;
            setForm(prev => ({ ...prev, image_url: publicUrl }));
        }
        setUploading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reconstruct full URLs
        const finalSocials: any = {};
        Object.keys(SOCIAL_PLATFORMS).forEach(key => {
            if (form.social_links[key]) {
                // @ts-ignore
                finalSocials[key] = `https://${SOCIAL_PLATFORMS[key].prefix}${form.social_links[key]}`;
            }
        });

        const payload = {
            name: form.name,
            nickname: form.nickname,
            role: form.role,
            image_url: form.image_url,
            social_links: finalSocials
        };

        if (editingId) {
            await supabase.from('team_members').update(payload).eq('id', editingId);
        } else {
            await supabase.from('team_members').insert([payload]);
        }

        resetForm();
        fetchMembers();
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({
            name: '', nickname: '', role: '', image_url: '/img/team/default.jpg',
            social_links: { instagram: '', twitter: '', linkedin: '', github: '', facebook: '' }
        });
    };

    if (loading || adminLoading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Cargando...</div>;

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--c-black)', paddingBottom: '50px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem' }}>Team Management</h2>
                        <Link href="/admin/dashboard" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-arrow-left"></i> Dashboard
                        </Link>
                    </div>

                    {/* FORM */}
                    <div className="glass" style={{ padding: '30px', marginBottom: '40px', border: '1px solid var(--c-orange)' }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--c-orange)' }}>{editingId ? 'Editar Miembro' : 'Agregar Nuevo Miembro'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre</label>
                                <input required className="input-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Nickname</label>
                                <input className="input-dark" value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })} style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Rol</label>
                                <input required className="input-dark" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ width: '100%' }} />
                            </div>

                            {/* Image Upload */}
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Imagen de Perfil</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                                    <span style={{ fontSize: '0.9rem', color: '#888', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {form.image_url}
                                    </span>
                                </div>
                                {form.image_url && <img src={form.image_url} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px', border: '2px solid #333' }} />}
                            </div>

                            <h4 style={{ gridColumn: 'span 2', marginTop: '15px', borderBottom: '1px solid #333', paddingBottom: '5px', color: '#ccc' }}>Redes Sociales</h4>

                            {/* Advanced Socials */}
                            {Object.entries(SOCIAL_PLATFORMS).map(([key, config]) => (
                                <div key={key} style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', textTransform: 'capitalize' }}>
                                        <i className={`fab fa-${config.icon}`} style={{ width: '20px' }}></i> {key}
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#080808', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                                        <span style={{ padding: '10px 15px', background: '#222', color: '#888', fontSize: '0.9rem', borderRight: '1px solid #333' }}>
                                            {config.prefix}
                                        </span>
                                        <input
                                            className="input-transparent"
                                            placeholder={config.placeholder}
                                            value={form.social_links[key] ?? ''}
                                            onChange={(e) => setForm({ ...form, social_links: { ...form.social_links, [key]: e.target.value } })}
                                            style={{ flex: 1, padding: '10px', border: 'none', background: 'transparent', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" className="btn-main" style={{ flex: 1, justifyContent: 'center' }}>
                                    {editingId ? 'Actualizar Miembro' : 'Crear Miembro'}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetForm} className="btn-link" style={{ background: '#333' }}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* LIST */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {members.map((member) => (
                            <div key={member.id} style={{
                                background: '#121212', padding: '20px', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #333'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <img src={member.image_url} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{member.name} <span style={{ color: 'var(--c-orange)', fontSize: '0.9rem' }}>{member.nickname}</span></h4>
                                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{member.role}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEdit(member)} style={{ padding: '8px 15px', background: '#333', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDelete(member.id)} style={{ padding: '8px 15px', background: '#300', border: 'none', color: 'red', borderRadius: '5px', cursor: 'pointer' }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <style jsx global>{`
                    .btn-outline {
                        background: transparent; border: 1px solid #333; color: white;
                        padding: 8px 15px; border-radius: 8px; cursor: pointer; text-decoration: none;
                        transition: all 0.2s;
                    }
                    .btn-outline:hover { border-color: white; }
                    .input-dark {
                        background: #080808;
                        border: 1px solid #333;
                        color: white;
                        padding: 10px;
                        border-radius: 8px;
                    }
                `}</style>
            </div>
        </>
    );
}

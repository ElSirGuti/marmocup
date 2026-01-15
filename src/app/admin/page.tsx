"use client";
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { useAdmin } from '@/utils/AdminContext';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useAdmin();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Call RPC 'admin_login'
        const { data: user, error: rpcError } = await supabase.rpc('admin_login', {
            p_username: username,
            p_password: password
        });

        if (rpcError) {
            setError("Error de conexión: " + rpcError.message);
            setLoading(false);
            return;
        }

        if (!user) {
            setError("Usuario o contraseña incorrectos.");
            setLoading(false);
        } else {
            // Success
            login(user); // Updates context and redirects
        }
    };

    return (
        <>
            <Navbar />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--c-black)',
                padding: '20px'
            }}>
                <div style={{
                    background: '#121212',
                    padding: '60px 40px',
                    width: '100%',
                    maxWidth: '450px',
                    borderRadius: '24px',
                    border: '1px solid #222',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '10px', fontSize: '2rem' }}>ADMIN ACCESS</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>SimRacing League Management</p>

                    {error && (
                        <div style={{
                            background: 'rgba(255, 0, 0, 0.1)',
                            color: 'red',
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username (e.g. pansobao)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '1px solid #333',
                                    background: '#080808',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '1px solid #333',
                                    background: '#080808',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-main"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Enter Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

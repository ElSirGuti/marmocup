"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav style={{
            position: 'fixed',
            top: '20px',
            left: 0,
            width: '100%',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px'
        }}>
            <div style={{
                background: 'rgba(18, 18, 18, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50px',
                padding: '10px 30px',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                maxWidth: '1200px',
                width: '100%',
                justifyContent: 'space-between'
            }}>

                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/img/Marmo-Cup-logo.png"
                        alt="Logo"
                        width={80}
                        height={50}
                        style={{ height: '40px', width: 'auto' }}
                    />
                </Link>

                {/* Links (Desktop) */}
                <div style={{ display: 'flex', gap: '30px' }} className="hidden-mobile">
                    {['Torneos', 'Equipo', 'Calendario', 'Resultados'].map((item) => {
                        const href = `/${item.toLowerCase().replace(' ', '-')}`;
                        const isHomeLink = item === 'Torneos' || item === 'Equipo';
                        const finalHref = isHomeLink ? `/#${item.toLowerCase()}` : href;

                        return (
                            <Link
                                key={item}
                                href={finalHref}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: 'white',
                                    opacity: 0.8
                                }}
                                className="hover-bright"
                            >
                                {item}
                            </Link>
                        )
                    })}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link href="/admin" style={{
                        padding: '8px 20px',
                        background: 'var(--c-white)',
                        color: 'black',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-display)'
                    }} className="hidden-mobile">
                        LOGIN
                    </Link>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="show-mobile"
                        style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}
                    >
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute', top: '80px', left: '20px', right: '20px',
                    background: '#121212', borderRadius: '20px', padding: '30px',
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {['Inicio', 'Torneos', 'Equipo', 'Calendario', 'Resultados'].map(item => (
                        <Link
                            key={item}
                            href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}

            <style jsx>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .show-mobile { display: block !important; }
        }
        .hover-bright:hover { opacity: 1 !important; color: var(--c-orange) !important; }
      `}</style>
        </nav>
    );
}

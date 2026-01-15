"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer style={{ background: '#050505', borderTop: '1px solid #111', padding: '80px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>

                    {/* Brand */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <Image
                            src="/img/marmo-cup-logo-blanco.png"
                            alt="Marmo Cup"
                            width={120}
                            height={80}
                            style={{ height: '60px', width: 'auto', marginBottom: '20px' }}
                        />
                        <p style={{ color: '#888', maxWidth: '300px', lineHeight: '1.6' }}>
                            La liga de simracing más emocionante de Venezuela y Latinoamérica. Compite al más alto nivel.
                        </p>
                    </div>

                    {/* Columns */}
                    {[
                        {
                            title: 'Competición', links: [
                                { name: 'Reglamento', href: 'https://docs.google.com/document/d/1fSERwISlpEPo9QvXLnzuVkL1iVXr8M5p2F3tk3O01n0/edit?tab=t.0', ext: true },
                                { name: 'Calendario', href: '/calendario' },
                                { name: 'Resultados', href: '/resultados' },
                                { name: 'Salón de la Fama', href: '/hall-of-fame' }
                            ]
                        },
                        {
                            title: 'Comunidad', links: [
                                { name: 'Discord', href: 'https://discord.gg/Afvhvh8fn2', ext: true },
                                { name: 'YouTube', href: 'https://www.youtube.com/@MarmoChampionships', ext: true },
                                { name: 'Instagram', href: 'https://www.instagram.com/marmochampionships/', ext: true },
                                { name: 'Patrocinadores', href: '/patrocinadores' }
                            ]
                        }
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>{col.title}</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {col.links.map(link => (
                                    <li key={link.name} style={{ marginBottom: '10px' }}>
                                        <Link
                                            href={link.href}
                                            target={link.ext ? '_blank' : undefined}
                                            style={{ color: '#666', fontSize: '0.9rem' }}
                                            className="hover-white"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div style={{ borderTop: '1px solid #111', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                    <p style={{ color: '#444', fontSize: '0.8rem' }}>© 2026 Marmo Cup. Todos los derechos reservados.</p>
                    <p style={{ color: '#444', fontSize: '0.8rem' }}>
                        Desarrollado con <span style={{ color: 'var(--c-orange)' }}>♥</span> por Andrés Gutiérrez (Pan Sobao)
                    </p>
                </div>
            </div>
            <style jsx>{`
                .hover-white:hover { color: white !important; }
            `}</style>
        </footer>
    );
}

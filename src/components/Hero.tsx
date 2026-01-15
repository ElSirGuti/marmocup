"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteConfig } from "@/utils/config";

export default function Hero() {
    const [bgImage, setBgImage] = useState('/img/slide-1.jpg');
    const [title, setTitle] = useState({ main: 'BORN TO RACE', sub: 'FORCED TO WIN' });

    useEffect(() => {
        async function fetchConfig() {
            const config = await getSiteConfig();
            if (config.hero_bg_image) setBgImage(config.hero_bg_image);
            // Could parse title from config if we wanted fully dynamic text, sticking to image for now as requested
        }
        fetchConfig();
    }, []);

    return (
        <section style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background with darker overlay */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4) contrast(1.1)',
                zIndex: -2,
                transition: 'background-image 0.5s ease-in-out'
            }}></div>

            {/* Gradient Overlay for style */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #080808 100%)',
                zIndex: -1
            }}></div>

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <p style={{
                    color: 'var(--c-orange)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    marginBottom: '20px',
                    textTransform: 'uppercase'
                }}>
                    Marmo Cup SimRacing League 2026 Season
                </p>

                <h1 className="title-display" style={{ marginBottom: '30px' }}>
                    {title.main} <br />
                    <span className="outlined">{title.sub}</span>
                </h1>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
                    <Link href="/#torneos" className="btn-main">
                        Competir ahora <i className="fas fa-arrow-right"></i>
                    </Link>
                    <Link href="https://discord.gg/Afvhvh8fn2" target="_blank" className="btn-main" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <i className="fab fa-discord"></i> Discord
                    </Link>
                </div>
            </div>

            {/* Decorative Bottom Fade */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px',
                background: 'linear-gradient(to top, var(--c-black), transparent)'
            }}></div>
        </section>
    );
}

"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

type TeamMember = {
    id: string;
    name: string;
    nickname: string | null;
    role: string;
    quote: string;
    image_url: string;
    social_links: any;
};

export default function Team() {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        async function fetchTeam() {
            const { data } = await supabase.from('team_members').select('*').order('display_order', { ascending: true });
            if (data) setMembers(data);
        }
        fetchTeam();
    }, []);

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'facebook': return 'fab fa-facebook-f';
            case 'linkedin': return 'fab fa-linkedin-in';
            case 'twitter': return 'fab fa-x-twitter'; // Modern FontAwesome X icon
            default: return `fab fa-${platform}`;
        }
    };

    return (
        <section id="team" className="section" style={{ background: '#121212' }}>
            <div className="container">
                <h2 style={{ fontSize: '10vw', opacity: 0.05, position: 'absolute', top: '20px', left: 0, width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
                    BEHIND THE SCENES
                </h2>

                <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative' }}>
                    <span style={{ color: 'var(--c-orange)', fontWeight: 'bold' }}>STAFF</span>
                    <h2 style={{ fontSize: '3rem' }}>THE TEAM</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2px', // Tight gap for "strip" effect
                    background: '#222', // Border color essentially
                    padding: '2px',
                    border: '1px solid #333'
                }}>
                    {members.map((member) => (
                        <div key={member.id} style={{
                            background: '#080808',
                            padding: '40px 20px',
                            textAlign: 'center',
                            transition: 'background 0.3s'
                        }} className="team-strip">
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px',
                                border: '2px solid #333',
                                position: 'relative'
                            }}>
                                <Image
                                    src={member.image_url}
                                    alt={member.name}
                                    fill
                                    style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                                    className="member-img"
                                />
                            </div>

                            <h3 style={{ fontSize: '1.2rem', color: 'white' }}>{member.name}</h3>
                            {member.nickname && <p style={{ color: 'var(--c-orange)', fontSize: '0.8rem', fontWeight: 'bold' }}>{member.nickname}</p>}
                            <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '10px' }}>{member.role}</p>

                            <div style={{ marginTop: '20px', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s' }} className="socials">
                                {member.social_links && Object.entries(member.social_links).map(([platform, url]) => (
                                    <a href={url as string} target="_blank" key={platform} style={{ margin: '0 5px', color: 'white' }}>
                                        <i className={getIcon(platform)}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx global>{`
          .team-strip:hover { background: #161616 !important; }
          .team-strip:hover .member-img { filter: grayscale(0) !important; }
          .team-strip:hover .socials { opacity: 1; transform: translateY(0); }
      `}</style>
        </section>
    );
}

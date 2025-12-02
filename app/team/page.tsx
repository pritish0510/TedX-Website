'use client';

import { useEffect } from 'react';
import NextImage from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Helper to generate member objects
const createMember = (name: string, role: string, imagePath: string) => ({
    name,
    role,
    image: imagePath
});

const teamSections = [
    {
        title: 'Core Organizing Team',
        members: [
            createMember('', 'Lead Organizer', '/images/leads/6.png'),
            createMember('', 'Co-Organizer', '/images/leads/1.png'),
            createMember('', 'Curator', '/images/leads/2.png'),
            createMember('', 'Technical Head', '/images/leads/5.png'),
            createMember('', 'Head of Operations', '/images/leads/4.png'),
            createMember('', 'Head of Marketing', '/images/leads/6.png'), // Note: Image 6 used twice in user snippet, keeping as is
            createMember('', 'Head of Design', '/images/leads/7.png'),
            createMember('', 'Head of Production', '/images/leads/8.png'),
        ]
    },
    {
        title: 'Curation & Technical',
        members: [
            createMember('Member 1', 'Curation Team', '/images/members/1.png'),
            createMember('Member 2', 'Curation Team', '/images/members/2.png'),
            createMember('Member 3', 'Technical Team', '/images/members/3.png'),
            createMember('Member 4', 'Technical Team', '/images/members/4.png'),
            createMember('Member 5', 'Web Development', '/images/members/5.png'),
            createMember('Member 6', 'Web Development', '/images/members/6.png'),
        ]
    },
    {
        title: 'Design & Media',
        members: [
            createMember('Member 7', 'Design Team', '/images/members/7.png'),
            createMember('Member 8', 'Design Team', '/images/members/8.png'),
            createMember('Member 9', 'Video Editing', '/images/members/9.png'),
            createMember('Member 10', 'Video Editing', '/images/members/10.png'),
            createMember('Member 11', 'Social Media', '/images/members/11.png'),
            createMember('Member 12', 'Social Media', '/images/members/12.png'),
        ]
    },
    {
        title: 'Operations & Logistics',
        members: [
            createMember('Member 13', 'Operations', '/images/members/13.png'),
            createMember('Member 14', 'Operations', '/images/members/14.png'),
            createMember('Member 15', 'Logistics', '/images/members/15.png'),
            createMember('Member 16', 'Logistics', '/images/members/16.png'),
            createMember('Member 17', 'Hospitality', '/images/members/17.png'),
            createMember('Member 18', 'Hospitality', '/images/members/18.png'),
        ]
    },
    {
        title: 'Sponsorship & Marketing',
        members: [
            createMember('Member 19', 'Sponsorship', '/images/members/19.png'),
            createMember('Member 20', 'Sponsorship', '/images/members/20.png'),
            createMember('Member 21', 'Marketing', '/images/members/21.png'),
            createMember('Member 22', 'Marketing', '/images/members/22.png'),
            createMember('Member 23', 'Public Relations', '/images/members/23.png'),
            createMember('Member 24', 'Public Relations', '/images/members/24.png'),
        ]
    }
];

export default function TeamPage() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo('.team-hero-title',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );

            // Section Animations
            const sections = document.querySelectorAll('.team-section');
            sections.forEach((section) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 bg-transparent">
                {/* Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-24 text-center">
                    <h1 className="team-hero-title heading-xl">
                        Our <span className="text-[#EB0028] border-b-4 border-yellow-500">Team</span>
                    </h1>
                    <p className="body-text text-lg sm:text-xl max-w-2xl mx-auto">
                        The passionate minds behind TED<sup>x</sup> <span className="text-white">SRMIST Delhi NCR</span>. Dedicated to bringing ideas worth spreading to our community.
                    </p>
                </section>

                {/* Team Sections */}
                <div className="space-y-16 sm:space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {teamSections.map((section, index) => {
                        const isCoreTeam = index === 0;

                        return (
                            <section key={index} className="team-section">
                                <h2 className="text-3xl sm:text-4xl font-bold text-[#EB0028] mb-8 sm:mb-12 border-l-4 border-yellow-500 pl-4">
                                    {section.title}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                                    {section.members.map((member, mIndex) => (
                                        <div
                                            key={mIndex}
                                            className={`group bg-neutral-900 p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] border border-neutral-800 hover:border-teal-400 relative overflow-hidden ${isCoreTeam ? 'aspect-[4/5]' : ''}`}
                                        >
                                            <div className="aspect-[4/5] overflow-hidden relative">
                                                <NextImage
                                                    src={member.image}
                                                    alt={member.role}
                                                    fill
                                                    className={`object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 ${isCoreTeam ? 'brightness-90 group-hover:brightness-100' : ''}`}
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                />
                                            </div>

                                            <div className="p-5">
                                                {member.name && <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>}
                                                <p className="text-yellow-500 font-medium text-xs uppercase tracking-wider">{member.role}</p>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#EB0028] transition-all duration-300 group-hover:w-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}

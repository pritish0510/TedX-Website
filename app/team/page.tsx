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

// Organizers (displayed at top)
const organizers = [
    createMember('', 'Lead Organizer', '/images/leads/6.png'),
    createMember('', 'Co-Organizer', '/images/leads/1.png'),
];

// Teams with Lead and Members structure
const teams = [
    {
        title: 'Curation Team',
        lead: createMember('', 'Curator', '/images/leads/2.png'),
        members: [
            createMember('Prisha', 'Curation Team', '/images/members/11.png'),
            createMember('Vatsalya', 'Curation Team', '/images/members/9.png'),
            createMember('Palak', 'Curation Team', '/images/members/10.png'),
            createMember('Karmanya', 'Curation Team', '/images/members/12.png'),
        ]
    },
    {
        title: 'Design',
        lead: createMember('', 'Head of Design', '/images/leads/7.png'),
        members: [
            createMember('Gagandeep', 'Design Team', '/images/members/14.png'),
            createMember('Pranjal', 'Design Team', '/images/members/13.png'),
        ]
    },
    {
        title: 'Production',
        lead: createMember('', 'Head of Production', '/images/leads/4.png'),
        members: [
            createMember('Ankit', 'Production', '/images/members/20.png'),
            createMember('Shivansh', 'Production', '/images/members/21.png'),
            createMember('Kaarnik', 'Production', '/images/members/19.png'),
        ]
    },
    {
        title: 'Management',
        lead: createMember('', 'Head of Management', '/images/leads/3.png'),
        members: [
            createMember('Ishita', 'Management', '/images/members/7.png'),
            createMember('Ashwin', 'Management', '/images/members/1.png'),
            createMember('Jyotsna', 'Management', '/images/members/2.png'),
            createMember('Abhinav', 'Management', '/images/members/3.png'),
            createMember('Vanshika', 'Management', '/images/members/4.png'),
            createMember('Adarsh', 'Management', '/images/members/5.png'),
            createMember('Ishanya', 'Management', '/images/members/6.png'),
            createMember('Aryan', 'Management', '/images/members/8.png'),
        ]
    },
    {
        title: 'Technical Team',
        lead: createMember('', 'Technical Head', '/images/leads/5.png'),
        members: [
            createMember('Utsav', 'Technical Team', '/images/members/18.png'),
            createMember('Pritish', 'Technical Team', '/images/members/15.png'),
            createMember('Vandita', 'Web Development', '/images/members/16.png'),
            createMember('T.S Hari', 'Web Development', '/images/members/17.png'),
        ]
    },
    {
        title: 'Visual Media',
        lead: createMember('', 'Visual Media Head', '/images/leads/8.png'),
        members: [
            createMember('Dhruv', 'Visual Media', '/images/members/22.png'),
            createMember('Anushka', 'Visual Media', '/images/members/24.png'),
            createMember('Apoor', 'Visual Media', '/images/members/23.png'),
        ]
    },
];

export default function TeamPage() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo('.team-hero-title',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );

            // Organizers Animation
            gsap.fromTo('.organizer-card',
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.organizers-section',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Team Sections Animation
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

                {/* Organizers Section */}
                <section className="organizers-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 sm:mb-32">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 sm:mb-16">
                        Leadership
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
                        {organizers.map((organizer, index) => (
                            <div
                                key={index}
                                className="organizer-card group bg-neutral-900 border-2 border-[#EB0028] transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,0,40,0.3)] hover:-translate-y-2"
                            >
                                <div className="aspect-[3/4] overflow-hidden relative">
                                    <NextImage
                                        src={organizer.image}
                                        alt={organizer.role}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-6 text-center bg-gradient-to-t from-neutral-950 to-neutral-900">
                                    <h3 className="text-2xl sm:text-3xl font-black text-[#EB0028] mb-2 uppercase tracking-tight">
                                        {organizer.role}
                                    </h3>
                                    {organizer.name && <p className="text-white text-lg">{organizer.name}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Teams Section */}
                <div className="space-y-16 sm:space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {teams.map((team, index) => (
                        <section key={index} className="team-section">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#EB0028] mb-8 border-l-4 border-yellow-500 pl-4">
                                {team.title}
                            </h2>

                            {/* Desktop & Tablet Layout */}
                            <div className="hidden md:flex gap-6 lg:gap-8">
                                {/* Team Lead - Left Side */}
                                <div className="flex-shrink-0 w-64 lg:w-72">
                                    <div className="group bg-neutral-900 border border-neutral-800 hover:border-[#EB0028] transition-all duration-300 hover:shadow-[0_0_20px_rgba(235,0,40,0.2)]">
                                        <div className="aspect-[3/4] overflow-hidden relative">
                                            <NextImage
                                                src={team.lead.image}
                                                alt={team.lead.role}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                sizes="300px"
                                            />
                                        </div>
                                        <div className="p-4 bg-neutral-950">
                                            <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider text-center">
                                                Team Lead
                                            </p>
                                            <p className="text-white font-semibold text-center mt-1">
                                                {team.lead.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Members - Right Side (Horizontal Scroll) */}
                                <div className="flex-1 overflow-hidden">
                                    <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-[#EB0028] scrollbar-track-neutral-800">
                                        <div className="flex gap-4 lg:gap-6">
                                            {team.members.map((member, mIndex) => (
                                                <div
                                                    key={mIndex}
                                                    className="flex-shrink-0 w-48 lg:w-56 group bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:-translate-y-1"
                                                >
                                                    <div className="aspect-[3/4] overflow-hidden relative">
                                                        <NextImage
                                                            src={member.image}
                                                            alt={member.role}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                            sizes="250px"
                                                        />
                                                    </div>
                                                    <div className="p-3">
                                                        {member.name && <h4 className="text-sm font-bold text-white mb-1">{member.name}</h4>}
                                                        <p className="text-yellow-500 font-medium text-xs uppercase tracking-wider">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Layout */}
                            <div className="md:hidden space-y-6">
                                {/* Team Lead */}
                                <div className="max-w-sm mx-auto">
                                    <div className="group bg-neutral-900 border-2 border-[#EB0028] transition-all duration-300">
                                        <div className="aspect-[3/4] overflow-hidden relative">
                                            <NextImage
                                                src={team.lead.image}
                                                alt={team.lead.role}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                sizes="(max-width: 640px) 100vw, 400px"
                                            />
                                        </div>
                                        <div className="p-4 bg-neutral-950 text-center">
                                            <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider">
                                                Team Lead
                                            </p>
                                            <p className="text-white font-semibold mt-1">
                                                {team.lead.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Members - Horizontal Scroll */}
                                <div>
                                    <p className="text-neutral-400 text-sm mb-3 text-center">Team Members (Swipe to see more →)</p>
                                    <div className="overflow-x-auto pb-4">
                                        <div className="flex gap-4 px-2">
                                            {team.members.map((member, mIndex) => (
                                                <div
                                                    key={mIndex}
                                                    className="flex-shrink-0 w-40 group bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300"
                                                >
                                                    <div className="aspect-[3/4] overflow-hidden relative">
                                                        <NextImage
                                                            src={member.image}
                                                            alt={member.role}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0"
                                                            sizes="160px"
                                                        />
                                                    </div>
                                                    <div className="p-3">
                                                        {member.name && <h4 className="text-xs font-bold text-white mb-1 truncate">{member.name}</h4>}
                                                        <p className="text-yellow-500 font-medium text-xs uppercase tracking-wider truncate">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

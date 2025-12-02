'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Speakers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const speakersRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // 3D Title Animation
      gsap.fromTo(titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3D Speaker Cards Animation
      const speakerCards = speakersRef.current?.children;
      if (speakerCards) {
        gsap.fromTo(speakerCards,
          {
            y: 120,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: speakersRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const speakers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Positive Psychology Researcher',
      topic: 'The Science of Happiness: What Research Tells Us',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading researcher in positive psychology and wellbeing science, with over 15 years of experience in happiness research.',
      tags: ['Happiness', 'Psychology', 'Wellbeing'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Raj Patel',
      role: 'Mindfulness Coach & Social Entrepreneur',
      topic: 'Building Happy Communities Through Mindful Living',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Founder of multiple NGOs focused on community wellbeing and mindfulness, impacting over 100,000 lives through happiness initiatives.',
      tags: ['Mindfulness', 'Community', 'Social Impact'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Work-Life Balance Expert',
      topic: 'Finding Joy in Professional Life: The Future of Happy Workplaces',
      image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Pioneer in workplace happiness research, developing breakthrough solutions for employee wellbeing and satisfaction.',
      tags: ['Work-Life Balance', 'Employee Wellbeing', 'Happiness'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Dr. Arjun Mehta',
      role: 'Neuroscientist & Author',
      topic: 'The Happy Brain: Neuroscience of Joy and Contentment',
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Renowned neuroscientist studying the brain mechanisms of happiness and joy, bestselling author on positive neuroscience.',
      tags: ['Neuroscience', 'Happiness', 'Brain Science'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Maya Krishnan',
      role: 'Educational Happiness Advocate',
      topic: 'Joyful Learning: Transforming Education Through Happiness',
      image: 'https://images.pexels.com/photos/3211476/pexels-photo-3211476.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Building next-generation learning platforms focused on joyful education and student wellbeing for millions worldwide.',
      tags: ['Education', 'Student Wellbeing', 'Joyful Learning'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Adventure Therapy Specialist',
      topic: 'Finding Happiness Through Adventure and Exploration',
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading specialist in adventure therapy, helping people find happiness and purpose through outdoor experiences and exploration.',
      tags: ['Adventure Therapy', 'Mental Health', 'Happiness'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="speakers" ref={sectionRef} className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 sm:top-40 left-5 sm:left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-[#EB0028] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-5 sm:right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#5EEAD4] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={titleRef} className="heading-lg">
            Meet Our <span className="text-[#EB0028]">Speakers</span>
          </h2>
          <p className="body-text max-w-4xl mx-auto px-2">
            Get ready to be inspired by visionary leaders, innovative thinkers, and change-makers
            who are shaping the future across diverse fields.
          </p>
        </div>

        {/* Speakers Grid */}
        <div ref={speakersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {speakers.map((speaker, index) => (
            <Card
              key={index}
              className="group bg-neutral-900 border border-neutral-800 overflow-hidden hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 hover:border-teal-400 rounded-none hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2 sm:space-x-3">
                    <a
                      href={speaker.social.linkedin}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 flex items-center justify-center text-[#EB0028] hover:bg-white hover:scale-110 transition-all duration-300 rounded-none"
                    >
                      <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                    <a
                      href={speaker.social.twitter}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 flex items-center justify-center text-[#EB0028] hover:bg-white hover:scale-110 transition-all duration-300 rounded-none"
                    >
                      <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </a>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{speaker.name}</h3>
                  <p className="text-yellow-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">{speaker.role}</p>
                </div>

                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-200 mb-3 sm:mb-4 line-clamp-2">
                  {speaker.topic}
                </h4>

                <p className="text-neutral-400 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                  {speaker.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {speaker.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      className="bg-neutral-900 text-teal-400 border border-teal-400/30 hover:bg-teal-400 hover:text-neutral-900 transition-all duration-300 text-xs px-2 py-1 rounded-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Speakers Coming */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <div className="bg-neutral-900 border border-[#EB0028] p-6 sm:p-8 md:p-12 rounded-none text-white hover:shadow-[0_0_20px_rgba(235,0,40,0.3)] transition-all duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">More Amazing Speakers Coming Soon!</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 text-neutral-200">
              We're curating an incredible lineup of speakers. Stay tuned for more announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, Target, Zap } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Title Animation with 3D effect
      gsap.fromTo(titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Description animation
      gsap.fromTo(descriptionRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Mission section animation
      gsap.fromTo(missionRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovative Ideas',
      description: 'Discover groundbreaking concepts that challenge conventional thinking and inspire new possibilities.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Inspiring Speakers',
      description: 'Learn from visionary leaders, entrepreneurs, and change-makers who are shaping our future.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Focused Learning',
      description: 'Engage with curated content designed to expand your perspective and drive meaningful action.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Transformative Experience',
      description: 'Join a community of forward-thinkers and experience ideas that can change your world.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-transparent relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-[#EB0028] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-[#5EEAD4] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={titleRef} className="heading-lg">
            About <span className="text-[#EB0028]">TEDx</span> & <span className="text-teal-400">Elysium</span>
          </h2>
          <p ref={descriptionRef} className="body-text max-w-4xl mx-auto px-2">
            TEDx events are independently organized TED-like gatherings that bring communities together
            to share ideas worth spreading. Our event at SRMIST NCR Ghaziabad focuses on the science of happiness,
            wellbeing, and positive psychology, aiming to inspire innovation, foster creativity, and spark
            meaningful conversations about what truly makes us happy and fulfilled.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300 rounded-none hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:-translate-y-2"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-neutral-950 text-[#EB0028] mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-500 rounded-none border border-[#EB0028]">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TEDx Mission */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div ref={missionRef} className="bg-neutral-900 border border-[#EB0028] p-6 sm:p-8 md:p-12 lg:p-16 rounded-none hover:shadow-[0_0_30px_rgba(235,0,40,0.2)] transition-all duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
              <span className="text-[#EB0028]">Divine Mission</span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              To create a platform where brilliant minds converge to share transformative ideas,
              inspire action, and build a community of innovators who are passionate about making
              a positive impact on society. We believe that when great ideas meet great people,
              extraordinary things happen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { gsap } from 'gsap';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const eventDate = new Date('2026-01-21T09:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, []);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1 });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
      gsap.fromTo('.countdown-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, stagger: 0.1, ease: 'power2.out' });

      const buttons = document.querySelectorAll('.elysium-btn');
      buttons.forEach((button) => {
        const btn = button as HTMLElement;
        btn.addEventListener('mouseenter', () => gsap.to(btn, { boxShadow: '0 0 20px rgba(94, 234, 212, 0.4)', y: -2, duration: 0.3 }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { boxShadow: 'none', y: 0, duration: 0.3 }));
      });
    });

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative min-h-screen pt-32 flex items-center justify-center overflow-hidden">
        <div className="text-center animate-pulse">
          <div className="h-16 bg-neutral-900 w-64 mx-auto mb-4 rounded"></div>
          <div className="h-8 bg-neutral-900 w-48 mx-auto rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen pt-24 md:pt-32 lg:pt-40 flex items-center justify-center overflow-hidden">
      {/* zoom and above */}

      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="hero-title heading-xl text-[#EB0028]">
            TED<sup className="text-[#EB0028] text-3xl md:text-5xl ml-1">x</sup>{' '}
            <span className="text-white">SRMIST Delhi NCR</span>
          </h1>
          <p className="hero-subtitle body-text text-xl font-medium mt-6">
            Theme: <span className="text-white font-bold">Elysium</span> (Mystical Dark Paradise)
          </p>
        </div>

        {/* Rest unchanged */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-neutral-200">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#EB0028]" />
            <span className="text-sm sm:text-base md:text-lg font-bold">January 21, 2026</span>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-neutral-200">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#EB0028]" />
            <span className="text-sm sm:text-base md:text-lg font-bold">10:00 AM</span>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-neutral-200">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#EB0028]" />
            <span className="text-sm sm:text-base md:text-lg font-bold">SRM Auditorium</span>
          </div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-neutral-200">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#EB0028]" />
            <span className="text-sm sm:text-base md:text-lg font-bold">200+ Attendees</span>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">
            Event Starts In
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div
                key={item.label}
                className="countdown-card bg-neutral-900 border border-neutral-800 p-3 sm:p-4 md:p-6 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 rounded-none"
              >
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 font-mono">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-neutral-400 uppercase tracking-wider font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="#register"
            className="elysium-btn w-full sm:w-auto bg-[#EB0028] hover:bg-[#c71b23] text-white px-8 py-4 text-lg font-bold transition-all duration-300 text-center rounded-none"
          >
            Enter Elysium
          </a>
          <a
            href="#about"
            className="elysium-btn w-full sm:w-auto border-2 border-neutral-800 bg-neutral-900 hover:border-teal-400 text-white px-8 py-4 text-lg font-bold transition-all duration-300 text-center rounded-none"
          >
            Discover Paradise
          </a>
        </div>
      </div>
    </section>
  );
}
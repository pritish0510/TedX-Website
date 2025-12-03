'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Speakers from '@/components/Speakers';
import Schedule from '@/components/Schedule';
import Registration from '@/components/Registration';
import Sponsors from '@/components/Sponsors';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
    
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((element) => {
        element.addEventListener('mouseleave', () => {
          gsap.to(element, { x: 0, y: 0, duration: 0.3 });
        });
        element.addEventListener('mousemove', (e) => {
          const mouseEvent = e as MouseEvent;
          const rect = (element as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * 0.1, y: y * 0.1, duration: 0.3 });
        });
      });

     
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Registration />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
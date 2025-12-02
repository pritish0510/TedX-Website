'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#speakers', label: 'Speakers' },
    { href: '/#schedule', label: 'Schedule' },
    { href: '/team', label: 'Team' },
    { href: '/#sponsors', label: 'Sponsors' },
    { href: '/#contact', label: 'Contact' },
  ];

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.to(menuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          display: 'block',
        });
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          display: 'none',
        });
      }
    }
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/95 backdrop-blur-md shadow-2xl border-b border-neutral-800' : 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800'
      }`}>
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-[#EB0028] font-sans tracking-tighter">
              TED<sup>x</sup>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 xl:ml-10 flex items-baseline space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[#EB0028] px-2 xl:px-4 py-2 text-sm xl:text-base font-bold transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#EB0028] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              className="bg-[#EB0028] hover:bg-[#c71b23] text-white px-6 py-2 text-sm xl:text-base font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] border-none rounded-none"
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-[#EB0028]/20 p-2 rounded-none"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className="lg:hidden bg-black/70 border-t border-neutral-800 overflow-hidden hidden backdrop-blur-md"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="px-3 xs:px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#EB0028] block px-3 xs:px-4 py-3 text-sm xs:text-base font-bold hover:bg-neutral-900 transition-all duration-300 border-l-2 border-transparent hover:border-[#EB0028]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 xs:px-4 py-4">
              <Button
                className="bg-[#EB0028] hover:bg-[#c71b23] text-white w-full py-3 text-sm xs:text-base font-bold rounded-none hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
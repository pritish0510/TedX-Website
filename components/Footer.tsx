'use client';

import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950/95 backdrop-blur-md text-neutral-400 section-padding border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 font-sans tracking-tighter text-white">
                TED<sup className="text-[#EB0028]">x</sup> <span className="text-white">SRMIST Delhi NCR</span>
              </h3>
              <p className="text-neutral-200 text-lg sm:text-xl mb-4 sm:mb-6 font-medium">
                Happiness & Ideas Worth Spreading
              </p>
              <p className="text-neutral-400 leading-relaxed text-sm sm:text-base md:text-lg">
                An independently organized TED event bringing together brilliant minds to share
                transformative ideas about happiness, wellbeing, and what truly matters in life.
                Join us for an inspiring journey of joy, innovation, and meaningful conversations.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 md:space-x-6">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-900 flex items-center justify-center text-yellow-500 hover:text-white hover:bg-[#EB0028] transition-all duration-300 rounded-none"
                  aria-label={label}
                >
                  <Icon size={16} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: 'About TEDx', href: '#about' },
                { label: 'Speakers', href: '#speakers' },
                { label: 'Schedule', href: '#schedule' },
                { label: 'Register', href: '#register' },
                { label: 'Sponsors', href: '#sponsors' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-[#EB0028] transition-colors duration-300 text-sm sm:text-base md:text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">Contact Info</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#EB0028] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-neutral-200 text-sm sm:text-base md:text-lg">tedxsrmistdelhincr@gmail.com</p>
                </div>
              </div>

              <div>
                <p className="text-neutral-200 text-sm sm:text-base md:text-lg">
                  SRM Institute of Science and Technology,<br />
                  Delhi-Meerut Road,
                  Modinagar, Ghaziabad District,<br />
                  Uttar Pradesh, 201204.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <p className="text-neutral-400 mb-1 sm:mb-2 font-medium text-xs sm:text-sm">Event Date:</p>
                <p className="text-[#EB0028] font-bold text-sm sm:text-base md:text-lg">January 21, 2026</p>
                <p className="text-neutral-400 text-xs sm:text-sm md:text-base">10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-neutral-400 text-center md:text-left">
              <p className="text-xs sm:text-sm">© 2025 TED<sup>x</sup> SRMIST NCR Ghaziabad. All rights reserved.</p>
              <p className="mt-1 text-xs sm:text-sm">
                This independent TED<sup>x</sup> event is operated under license from TED.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-neutral-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
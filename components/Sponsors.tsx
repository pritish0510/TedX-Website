'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { jsPDF } from 'jspdf';
import { Loader2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Sponsors = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          y: 80,
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
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Sponsor carousel animation
      const carousel = carouselRef.current;
      if (carousel) {
        const logos = carousel.children;

        // Initial setup for logos
        gsap.set(logos, { scale: 0.9, opacity: 0.7 });

        // Infinite horizontal scroll
        gsap.to(carousel, {
          x: -carousel.scrollWidth / 2,
          duration: 40,
          repeat: -1,
          ease: 'none',
        });

        // Enhanced hover effects
        Array.from(logos).forEach((logo) => {
          const element = logo as HTMLElement;
          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              scale: 1.1,
              opacity: 1,
              rotationY: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              scale: 0.9,
              opacity: 0.7,
              rotationY: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }

      // CTA section animation
      gsap.fromTo(ctaRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadDeck = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 25;

      const addHeader = () => {
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text('TEDxSRMIST Delhi NCR | Theme: Elysium', 20, 15);
        doc.setDrawColor(235, 0, 40);
        doc.setLineWidth(0.5);
        doc.line(20, 18, pageWidth - 20, 18);
      };

      const resetY = () => { y = 35; };
      const checkPageBreak = (neededSpace: number = 40) => {
        if (y > pageHeight - neededSpace) {
          doc.addPage();
          addHeader();
          resetY();
        }
      };

      // Page 1 - Title Page
      addHeader();
      doc.setFontSize(48);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(235, 0, 40);
      doc.text('Sponsorship', pageWidth / 2, 90, { align: 'center' });
      doc.text('Proposal', pageWidth / 2, 110, { align: 'center' });

      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.text('TEDxSRMIST Delhi NCR', pageWidth / 2, 140, { align: 'center' });

      doc.setFontSize(18);
      doc.setTextColor(150, 150, 150);
      doc.text('Theme: Elysium — A Mystical Dark Paradise', pageWidth / 2, 155, { align: 'center' });

      // Page 2 - Introduction
      doc.addPage();
      addHeader();
      resetY();

      doc.setFontSize(24);
      doc.setTextColor(235, 0, 40);
      doc.setFont('helvetica', 'bold');
      doc.text('About the Event', 20, y);
      y += 15;

      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      const introText = `TEDxSRMIST Delhi NCR is an independently organized TED event dedicated to spreading ideas worth sharing. Our upcoming edition, themed "Elysium", explores the concept of a mystical dark paradise — a journey through innovation, creativity, and human connection in the shadows of brilliance.

Join us in creating an unforgettable experience for thinkers, dreamers, and change-makers.`;
      doc.text(doc.splitTextToSize(introText, pageWidth - 40), 20, y);
      y += 50;

      checkPageBreak();

      // Why Partner
      doc.setFontSize(20);
      doc.setTextColor(235, 0, 40);
      doc.text('Why Partner with Us?', 20, y);
      y += 12;

      const benefits = [
        'Brand alignment with innovation & thought leadership',
        'High-visibility exposure to 500+ attendees + online audience',
        'Association with a globally respected platform',
        'Networking with industry leaders, students & influencers',
        'CSR & community impact recognition'
      ];

      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      benefits.forEach((benefit) => {
        doc.text(`• ${benefit}`, 25, y);
        y += 8;
      });

      // Sponsorship Tiers
      doc.addPage();
      addHeader();
      resetY();

      doc.setFontSize(24);
      doc.setTextColor(235, 0, 40);
      doc.text('Sponsorship Tiers', 20, y);
      y += 15;

      const tiers = [
        { name: 'Title Partner', amount: 'Exclusive', color: '#FFD700' },
        { name: 'Diamond Partner', amount: '₹3,00,000+', color: '#E5E7EB' },
        { name: 'Platinum Partner', amount: '₹2,00,000+', color: '#9CA3AF' },
        { name: 'Gold Partner', amount: '₹1,00,000+', color: '#FCD34D' },
        { name: 'Silver Partner', amount: '₹50,000+', color: '#94A3B8' },
      ];

      tiers.forEach((tier) => {
        checkPageBreak(60);
        doc.setFontSize(16);
        doc.setTextColor(tier.color === '#FFD700' ? 255 : 255, tier.color === '#FFD700' ? 215 : 255, tier.color === '#FFD700' ? 0 : 255);
        doc.setFont('helvetica', 'bold');
        doc.text(tier.name, 20, y);

        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(tier.amount, pageWidth - 40, y, { align: 'right' });
        y += 8;
      });

      // Compliance Note
      doc.addPage();
      addHeader();
      resetY();

      doc.setFontSize(18);
      doc.setTextColor(235, 0, 40);
      doc.text('TEDx Sponsorship Guidelines', 20, y);
      y += 12;

      doc.setFontSize(11);
      doc.setTextColor(120, 120, 120);
      const guidelines = [
        'Sponsors have no influence over speaker selection or content',
        'No sponsor presentations from the stage',
        'Logos displayed only in designated sponsor areas',
        'All sponsorships comply with official TEDx rules'
      ];
      guidelines.forEach((g) => {
        doc.text(`• ${g}`, 20, y);
        y += 7;
      });

      y += 15;
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('This independent TEDx event is operated under license from TED.', 20, y);

      // Final Page - Contact + Small Cover Image
      doc.addPage();
      addHeader();
      resetY();

      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text('Let’s Create Something Extraordinary', 20, y);
      y += 15;

      doc.setFontSize(14);
      doc.setTextColor(200, 200, 200);
      doc.text('Get in touch:', 20, y);
      y += 10;

      doc.setFontSize(12);
      doc.setTextColor(100, 180, 255);
      doc.text('sponsors@tedxsrmist.edu.in', 20, y);
      y += 8;
      doc.setTextColor(255, 255, 255);
      doc.text('+91 98765 43210', 20, y);

      // Add small cover image in bottom-right corner
      try {
        const img = new Image();
        img.src = '/sponsor/ELYSIUM 2026 (2).png';
        await new Promise((resolve) => { img.onload = resolve; });

        const imgSize = 50;
        const x = pageWidth - imgSize - 15;
        const yPos = pageHeight - imgSize - 15;
        doc.addImage(img, 'PNG', x, yPos, imgSize, imgSize);
      } catch (err) {
        console.warn('Cover image not found for PDF');
      }

      // Save
      doc.save('TEDxSRMIST_DelhiNCR_Sponsorship_Proposal_2026.pdf');

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const sponsors = [
    {
      name: 'TechCorp',
      logo: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'title',
    },
    {
      name: 'InnovateHub',
      logo: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'presenting',
    },
    {
      name: 'FutureTech',
      logo: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'gold',
    },
    {
      name: 'CloudSystems',
      logo: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'silver',
    },
    {
      name: 'DataMind',
      logo: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'bronze',
    },
    {
      name: 'AI Solutions',
      logo: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'partner',
    },
    {
      name: 'Green Energy Co',
      logo: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'partner',
    },
    {
      name: 'EduTech Plus',
      logo: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200',
      tier: 'partner',
    },
  ];

  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  const getTierSize = (tier: string) => {
    switch (tier) {
      case 'title': return 'w-48 h-24';
      case 'presenting': return 'w-40 h-20';
      case 'gold': return 'w-32 h-16';
      case 'silver': return 'w-28 h-14';
      case 'bronze': return 'w-24 h-12';
      default: return 'w-20 h-10';
    }
  };

  return (
    <section id="sponsors" ref={sectionRef} className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={titleRef} className="heading-lg">
            Our <span className="text-[#EB0028]">Sponsors</span>
          </h2>
          <p className="body-text max-w-3xl mx-auto px-2">
            We&apos;re grateful to our amazing sponsors and partners who make this event possible
            and share our vision of spreading ideas worth sharing.
          </p>
        </div>

        {/* Sponsor Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 hover:pause"
            style={{ width: 'calc(200% + 2rem)' }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.name}-${index}`}
                className={`flex-shrink-0 ${getTierSize(sponsor.tier)} bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center p-2 sm:p-3 transform-gpu hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]`}
              >
                <span className="text-neutral-200 font-semibold text-xs sm:text-sm text-center">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="text-center">
          <Card ref={ctaRef} className="bg-neutral-900 border border-[#EB0028] text-white p-6 sm:p-8 md:p-12 hover:scale-105 transition-all duration-300 transform-gpu rounded-none hover:shadow-[0_0_30px_rgba(235,0,40,0.2)]">
            <CardContent className="p-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Become a Sponsor</h3>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 text-neutral-200">
                Join us in spreading ideas worth sharing and connect with innovators,
                entrepreneurs, and thought leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:sponsors@tedxsrmist.edu.in"
                  className="bg-[#EB0028] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-none font-semibold hover:bg-[#c41e0f] transition-all duration-300 hover:shadow-[0_0_20px_rgba(235,0,40,0.4)]"
                >
                  Partner with Us
                </a>
                <button
                  onClick={handleDownloadDeck}
                  disabled={isDownloading}
                  className="border-2 border-neutral-200 text-neutral-200 px-6 sm:px-8 py-3 sm:py-4 rounded-none font-semibold hover:bg-neutral-200 hover:text-neutral-900 transition-all duration-300 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">↓</span> Download Deck
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
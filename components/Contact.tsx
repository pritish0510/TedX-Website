'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader as Loader2, Mail, Phone, MapPin, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

type FormData = yup.InferType<typeof schema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

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

      // Form and info cards animation
      gsap.fromTo([formRef.current, infoRef.current],
        {
          y: 100,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        reset();
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 sm:top-40 left-10 sm:left-40 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-[#EB0028] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-10 sm:right-40 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-[#5EEAD4] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={titleRef} className="heading-lg">
            Get in <span className="text-[#EB0028]">Touch</span>
          </h2>
          <p className="body-text max-w-4xl mx-auto px-2">
            Have questions about the event? Want to get involved? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Form and Contact Information - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          {/* Contact Form */}
          <Card ref={formRef} className="bg-neutral-900 border border-neutral-800 hover:border-[#EB0028] transition-all duration-300 rounded-none">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Send us a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-neutral-200">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Your name"
                      className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                    />
                    {errors.name && (
                      <p className="text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-neutral-200">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs sm:text-sm font-medium text-neutral-200">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    {...register('subject')}
                    placeholder="What's this about?"
                    className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                  />
                  {errors.subject && (
                    <p className="text-xs sm:text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm font-medium text-neutral-200">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us more..."
                    rows={6}
                    className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                  />
                  {errors.message && (
                    <p className="text-xs sm:text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#EB0028] hover:bg-[#c41e0f] text-white py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-none hover:shadow-[0_0_20px_rgba(235,0,40,0.4)] transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card ref={infoRef} className="bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300 rounded-none">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Contact Information</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-neutral-950 border border-[#EB0028] flex items-center justify-center flex-shrink-0 rounded-none">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#EB0028]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">Email</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base">tedxsrmistdelhincr@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-neutral-950 border border-[#EB0028] flex items-center justify-center flex-shrink-0 rounded-none">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#EB0028]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">Phone</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base">+91 7048950618</p>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base">+91 80520899831</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-neutral-950 border border-[#EB0028] flex items-center justify-center flex-shrink-0 rounded-none">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#EB0028]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">Address</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base">
                      SRM Institute of Science and Technology,<br />
                      Delhi-Meerut Road,
                      Modinagar, Ghaziabad District,<br />
                      Uttar Pradesh, 201204.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-neutral-950 border border-[#EB0028] flex items-center justify-center flex-shrink-0 rounded-none">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#EB0028]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">Office Hours</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base">
                      Monday - Friday: 9:20 AM - 4:00 PM<br />
                      Saturday - Sunday:  Closed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map - Full Width */}
        <Card className="bg-neutral-900 border border-neutral-800 hover:border-teal-400 transition-all duration-300 rounded-none">
          <CardContent className="p-0">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.388804727159!2d77.5347658753647!3d28.797485275574996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf51f5aadb701%3A0x39add03eb3926d26!2sSRM%20Institute%20of%20Science%20and%20Technology%20Delhi%20NCR%20Campus!5e0!3m2!1sen!2sin!4v1764656660021!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-none"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
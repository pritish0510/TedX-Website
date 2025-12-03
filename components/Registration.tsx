'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader as Loader2, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits'),
  role: yup.string().required('Please select your role'),
  message: yup.string().required('Please tell us why you want to attend').min(10, 'Please provide at least 10 characters'),
});

type FormData = yup.InferType<typeof schema>;

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
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
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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

      // Form animation
      gsap.fromTo(formRef.current,
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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        reset();
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering. Check your email for confirmation.",
        });
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="register" ref={sectionRef} className="section-padding bg-transparent">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-6 sm:p-8 shadow-xl bg-neutral-900 border border-teal-400 rounded-none">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-400 rounded-none flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-900" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Registration Successful!</h2>
            <p className="text-base sm:text-lg text-neutral-200 mb-6">
              Thank you for registering for TED<sup>x</sup> SRMIST NCR Ghaziabad. We&apos;ve sent a confirmation email with all the event details.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-[#EB0028] hover:bg-[#c41e0f] text-white px-6 py-2 rounded-none"
            >
              Register Another Person
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="register" ref={sectionRef} className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#EB0028] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#5EEAD4] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 ref={titleRef} className="heading-lg">
            Register for <span className="text-[#EB0028]">TED<sup>x</sup></span> <span className="text-teal-400">Happiness</span>
          </h2>
          <p className="body-text max-w-4xl mx-auto px-2">
            Secure your spot at this transformative event focused on happiness and wellbeing. Registration is free but spaces are limited.
          </p>
        </div>

        <Card ref={formRef} className="bg-neutral-900 border border-neutral-800 hover:border-[#EB0028] transition-all duration-300 rounded-none">
          <CardHeader className="bg-[#EB0028] text-white rounded-none">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center py-3 sm:py-4">Event Registration</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-neutral-200">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your full name"
                  className="w-full bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                />
                {errors.name && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-neutral-200">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className="w-full bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-neutral-200">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter your phone number"
                  className="w-full bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                />
                {errors.phone && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-medium text-neutral-200">
                  Role *
                </Label>
                <Select onValueChange={(value) => setValue('role', value)}>
                  <SelectTrigger className="w-full bg-neutral-950 border-neutral-800 text-white focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-medium text-neutral-200">
                  Why do you want to attend TED<sup>x</sup> SRMIST Delhi NCR? *
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Tell us what excites you about this event and what you hope to gain..."
                  rows={4}
                  className="w-full bg-neutral-950 border-neutral-800 text-white placeholder-gray-500 focus:border-[#EB0028] focus:ring-[#EB0028] text-sm sm:text-base rounded-none"
                />
                {errors.message && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#EB0028] hover:bg-[#c41e0f] text-white py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-none hover:shadow-[0_0_20px_rgba(94,234,212,0.4)] transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register for Free'
                )}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-neutral-950 border border-teal-400 rounded-none">
              <p className="text-xs sm:text-sm text-teal-400">
                <strong>Note:</strong> Registration is completely free. You&apos;ll receive a confirmation email with event details and your entry pass. Please register early as seats are limited.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Registration;
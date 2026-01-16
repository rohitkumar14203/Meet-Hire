import React from 'react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "MeetHire completely transformed our hiring process. We reduced our time-to-hire by 60% and found incredible talent! The AI matching is phenomenal and saved us weeks of manual screening.",
    name: "Sarah Johnson",
    title: "HR Director at TechCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    company: "TechCorp",
    rating: 5
  },
  {
    quote: "As a job seeker, I found the platform incredibly intuitive. I landed my dream job within 2 weeks of signing up! The one-click apply feature and real-time notifications made all the difference.",
    name: "Michael Chen",
    title: "Senior Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    company: "Google",
    rating: 5
  },
  {
    quote: "The interview scheduling feature is a game-changer. No more back-and-forth emails—everything is seamless. Calendar integration and automatic reminders are brilliant!",
    name: "Emily Rodriguez",
    title: "Recruitment Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    company: "Microsoft",
    rating: 5
  },
  {
    quote: "Best job portal I've used. The AI recommendations were spot-on, and the application process was so smooth. Found my current role through MeetHire and couldn't be happier!",
    name: "David Park",
    title: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    company: "Figma",
    rating: 5
  },
  {
    quote: "We've hired 50+ employees through MeetHire in just 6 months. The quality of candidates and the platform features are outstanding. Best investment we've made for our recruiting.",
    name: "Lisa Thompson",
    title: "CEO at StartupXYZ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    company: "StartupXYZ",
    rating: 5
  },
  {
    quote: "The candidate management tools saved us countless hours every week. Analytics dashboard helps us track everything. Highly recommend for any growing company looking to scale hiring!",
    name: "James Wilson",
    title: "Head of Talent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    company: "Amazon",
    rating: 5
  },
  {
    quote: "Being able to track all my applications in one place is amazing. The status updates and interview prep resources helped me stay organized throughout my job search journey.",
    name: "Priya Sharma",
    title: "Marketing Specialist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    company: "HubSpot",
    rating: 5
  },
  {
    quote: "As an interviewer, I love the structured guides and evaluation scorecards. Makes the process so much more efficient and helps us make better hiring decisions consistently.",
    name: "Robert Martinez",
    title: "Engineering Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    company: "Meta",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved By{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              50,000+ Professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of companies and candidates who trust MeetHire for their hiring needs
          </p>
        </motion.div>

        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="normal"
            pauseOnHover={true}
            className="py-4"
          />
        </div>
      </div>
    </section>
  );
};

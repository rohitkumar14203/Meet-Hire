import React from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const people = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Senior HR Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    designation: "Tech Recruiter",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    id: 3,
    name: "Emma Davis",
    designation: "Talent Director",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  {
    id: 4,
    name: "Alex Kumar",
    designation: "Hiring Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  }
];

export const HeroSection = () => {
  const [stats] = React.useState({
    jobs: 10247,
    candidates: 52341,
    companies: 5128
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#4f46e5"
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"/>
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"/>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="flex flex-col items-center text-center">
          {/* Animated Tooltips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-indigo-200/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Trusted by top recruiters</span>
              <div className="flex ml-2">
                <AnimatedTooltip items={people} />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Find Your Dream Job or
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Candidate
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Connect talented professionals with leading companies. Streamline your hiring process or accelerate your career journey with our AI-powered platform.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-4xl mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl shadow-xl backdrop-blur-xl bg-white/80 border border-slate-200">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-slate-50 border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-sm">
                <Briefcase className="h-5 w-5 text-slate-600" />
                <Input
                  placeholder="Job title, keyword, or company"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-900 placeholder:text-slate-400"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-slate-50 border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-sm">
                <MapPin className="h-5 w-5 text-slate-600" />
                <Input
                  placeholder="City, state, or remote"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <Button size="lg" className="md:w-auto w-full gap-2 font-semibold px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30">
                <Search className="h-5 w-5" />
                Search Jobs
              </Button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Link to="/login">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-white text-slate-900 flex items-center gap-2 px-8 py-4 text-lg font-semibold shadow-lg"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </HoverBorderGradient>
            </Link>
            <Link to="#jobs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm">
                Browse Jobs
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-3xl w-full"
          >
            <div className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/60 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stats.jobs.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Active Jobs</div>
            </div>
            <div className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/60 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stats.candidates.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Candidates</div>
            </div>
            <div className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/60 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stats.companies.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Companies</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

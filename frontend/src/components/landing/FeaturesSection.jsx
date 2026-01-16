import React from 'react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Zap,
  Target,
  MessageSquare,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: "AI-Powered Job Matching",
    description: "Our intelligent algorithms analyze thousands of data points to match candidates with their ideal positions. Skills, experience, culture fit, salary expectations, and career goals are all considered to ensure perfect matches every time.",
    icon: Target,
    className: "md:col-span-2",
    stats: "95% match accuracy",
    details: [
      "Smart skill matching",
      "Culture fit analysis", 
      "Salary optimization",
      "Career path alignment"
    ]
  },
  {
    title: "Real-Time Collaboration",
    description: "Stay connected with instant messaging, video calls, and notifications. Communicate seamlessly with candidates, hiring managers, and interviewers throughout the entire process.",
    icon: MessageSquare,
    className: "md:col-span-1",
    stats: "< 1min response time",
    details: [
      "Instant messaging",
      "Video interviews",
      "Push notifications",
      "Team collaboration"
    ]
  },
  {
    title: "Smart Analytics",
    description: "Track application metrics, conversion rates, and hiring pipeline performance with comprehensive analytics dashboard and detailed reports.",
    icon: BarChart3,
    className: "md:col-span-1",
    stats: "50+ metrics tracked",
    details: [
      "Pipeline analytics",
      "Conversion tracking",
      "Performance reports",
      "Custom dashboards"
    ]
  },
  {
    title: "Automated Interview Scheduling",
    description: "Eliminate scheduling conflicts with our intelligent calendar integration. Automatically coordinate availability across multiple stakeholders, send reminders, and handle rescheduling with ease.",
    icon: Calendar,
    className: "md:col-span-2",
    stats: "85% time saved",
    details: [
      "Calendar sync",
      "Auto-scheduling",
      "Smart reminders",
      "Timezone handling"
    ]
  },
  {
    title: "Advanced Candidate Management",
    description: "Organize, filter, and evaluate candidates with powerful tools. Create custom pipelines, add tags, score candidates, and collaborate with your team on hiring decisions.",
    icon: Users,
    className: "md:col-span-1",
    stats: "10K+ candidates managed",
    details: [
      "Custom pipelines",
      "Smart filtering",
      "Candidate scoring",
      "Team notes & feedback"
    ]
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption, SOC 2 compliance, and GDPR ready. Your data is protected with multi-layer security, regular audits, and secure cloud infrastructure.",
    icon: Shield,
    className: "md:col-span-1",
    stats: "99.9% uptime",
    details: [
      "256-bit encryption",
      "SOC 2 certified",
      "GDPR compliant",
      "Regular security audits"
    ]
  },
  {
    title: "Lightning Performance",
    description: "Built with cutting-edge technology for instant load times and smooth interactions. Optimized infrastructure ensures your hiring never slows down.",
    icon: Zap,
    className: "md:col-span-1",
    stats: "< 100ms load time",
    details: [
      "CDN powered",
      "Real-time updates",
      "Mobile optimized",
      "Offline support"
    ]
  },
];

const team = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Senior Recruiter",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Michael Chen", 
    designation: "Hiring Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "HR Director",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  },
  {
    id: 4,
    name: "David Park",
    designation: "Talent Acquisition",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <AnimatedTooltip items={team} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Hire Smarter
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 5,000+ companies worldwide. Powerful features designed to streamline your recruitment process.
          </p>
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={
                <div className="flex items-center justify-between">
                  <span>{feature.title}</span>
                  <span className="text-xs font-normal text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
              }
              description={
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {feature.details.map((detail, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-xs bg-background/50 px-2 py-1 rounded-md border border-border">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              }
              header={
                <div className="flex items-center justify-center h-full min-h-[180px] bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <feature.icon className="h-16 w-16 text-primary relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              }
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

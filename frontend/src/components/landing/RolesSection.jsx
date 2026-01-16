import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Building, Users, ArrowRight, CheckCircle2, TrendingUp, Clock, Target } from 'lucide-react';
import { motion } from 'motion/react';

const roles = [
  {
    title: "For Job Seekers",
    description: "Discover opportunities that match your skills and aspirations. Apply with ease and track your applications in real-time.",
    icon: UserCircle,
    gradient: "from-blue-600 to-cyan-600",
    stats: [
      { label: "Active Jobs", value: "10,000+", icon: TrendingUp },
      { label: "Avg. Response", value: "24 hours", icon: Clock },
    ],
    features: [
      "Browse thousands of job listings",
      "AI-powered job recommendations",
      "One-click applications",
      "Application status tracking",
      "Resume builder & tips",
      "Salary insights & trends"
    ],
    cta: "Start Your Journey"
  },
  {
    title: "For HR Professionals",
    description: "Streamline your recruitment process with powerful tools to post jobs, manage candidates, and schedule interviews.",
    icon: Building,
    gradient: "from-purple-600 to-pink-600",
    stats: [
      { label: "Time Saved", value: "70%", icon: Target },
      { label: "Fill Rate", value: "85%", icon: TrendingUp },
    ],
    features: [
      "Post unlimited job listings",
      "Advanced candidate filtering",
      "Application management system",
      "Interview scheduling",
      "Analytics & insights",
      "Team collaboration tools"
    ],
    cta: "Hire Top Talent"
  },
  {
    title: "For Interviewers",
    description: "Conduct structured interviews with comprehensive candidate profiles and evaluation tools at your fingertips.",
    icon: Users,
    gradient: "from-orange-600 to-red-600",
    stats: [
      { label: "Interviews", value: "500+/mo", icon: TrendingUp },
      { label: "Quality Score", value: "4.8/5", icon: Target },
    ],
    features: [
      "Structured interview guides",
      "Candidate profile reviews",
      "Collaborative feedback",
      "Interview recordings",
      "Evaluation scorecards",
      "Real-time scheduling"
    ],
    cta: "Join as Interviewer"
  }
];

export const RolesSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built For{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for a job, hiring talent, or conducting interviews—we've got you covered with specialized tools for each role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border hover:border-primary/50 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader className="relative">
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${role.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl mb-3">{role.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>

                  <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t">
                    {role.stats.map((stat, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="flex items-center gap-1 mb-1">
                          <stat.icon className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                        </div>
                        <span className="text-lg font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button className="w-full group/btn">
                    <span>{role.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

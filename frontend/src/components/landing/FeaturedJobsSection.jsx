import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, DollarSign, Users, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Link } from 'react-router-dom';

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=3b82f6",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    tags: ["React", "TypeScript", "Tailwind"],
    posted: "2 days ago",
    applicants: 45,
    description: "Lead development of next-gen web applications with cutting-edge technologies."
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DH&backgroundColor=8b5cf6",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    tags: ["Figma", "UI/UX", "Prototyping"],
    posted: "1 day ago",
    applicants: 32,
    description: "Shape user experiences for millions of users across web and mobile platforms."
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSystems",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=CS&backgroundColor=10b981",
    location: "New York, NY",
    type: "Contract",
    salary: "$100k - $150k",
    tags: ["AWS", "Docker", "Kubernetes"],
    posted: "3 days ago",
    applicants: 28,
    description: "Build and maintain scalable cloud infrastructure serving global customers."
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SX&backgroundColor=f59e0b",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $160k",
    tags: ["Node.js", "React", "MongoDB"],
    posted: "1 week ago",
    applicants: 52,
    description: "Join a fast-growing startup building innovative solutions for modern businesses."
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AI&backgroundColor=ec4899",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $200k",
    tags: ["Python", "TensorFlow", "PyTorch"],
    posted: "4 days ago",
    applicants: 67,
    description: "Develop cutting-edge AI models that power intelligent automation systems."
  },
  {
    id: 6,
    title: "Senior Backend Engineer",
    company: "DataFlow Systems",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DF&backgroundColor=06b6d4",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $190k",
    tags: ["Go", "PostgreSQL", "Microservices"],
    posted: "5 days ago",
    applicants: 41,
    description: "Architect robust backend systems handling millions of requests per day."
  },
];

export const FeaturedJobsSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Job Openings
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover 10,000+ opportunities from leading companies worldwide. Your dream job awaits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border hover:border-primary/50 h-full flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="mb-2">{job.type}</Badge>
                      <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 font-medium">
                        <Building2 className="h-3.5 w-3.5" />
                        {job.company}
                      </CardDescription>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="font-medium text-foreground">{job.salary}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {job.posted}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {job.applicants} applicants
                    </div>
                  </div>

                  <Link to="/login">
                    <Button className="w-full group/btn">
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline">
            Browse All Jobs
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Globe, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                MeetHire
              </span>
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-sm">
              Connecting talented professionals with leading companies through innovative recruitment solutions. Trusted by 50,000+ users worldwide.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                SOC 2 Certified
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                GDPR Compliant
              </Badge>
            </div>

            <div className="flex gap-3 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="mailto:support@meethire.com" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>San Francisco, CA 94103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span>www.meethire.com</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#features" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Integrations</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">API</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Changelog</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Press Kit</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Partners</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Documentation</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Help Center</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Community</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Status</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Security</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} MeetHire, Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

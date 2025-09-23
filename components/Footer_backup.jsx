"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Heart, 
  Github, 
  Twitter, 
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

export function Footer() {
  const footerLinks = {
    platform: [
      { key: 'Games', href: '/games' },
      { key: 'Leaderboard', href: '/leaderboard' },
      { key: 'Progress', href: '/progress' },
      { key: 'Achievements', href: '/achievements' }
    ],
    resources: [
      { key: 'About', href: '/about' },
      { key: 'Help', href: '/help' },
      { key: 'Contact', href: '/contact' },
      { key: 'FAQ', href: '/faq' }
    ],
    legal: [
      { key: 'Privacy', href: '/privacy' },
      { key: 'Terms', href: '/terms' },
      { key: 'Cookies', href: '/cookies' },
      { key: 'Accessibility', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ruralstem-saga',
      icon: Github
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ruralstemsaga',
      icon: Twitter
    },
    {
      name: 'Email',
      href: 'mailto:contact@ruralstemsaga.org',
      icon: Mail
    }
  ];

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="ml-2 text-xl font-bold text-primary">
                  RuralSTEM Saga
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Empowering rural students with gamified STEM education through interactive learning experiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Odisha, India</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@ruralstemsaga.org</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 XXX-XXX-XXXX</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Platform
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.key}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Language Notice */}
              <div className="mt-6 p-3 bg-accent rounded-lg">
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>Available in English, Hindi & Odia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
              <span>
                © 2024 RuralSTEM Saga. All rights reserved.
              </span>
              <span className="hidden sm:block">|</span>
              <div className="flex items-center">
                <span className="mr-1">Made with</span>
                <Heart className="h-4 w-4 text-red-500 mx-1" />
                <span className="ml-1">for rural education</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button key={social.name} variant="ghost" size="sm" asChild>
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Government Notice */}
          <div className="mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                A project under Smart India Hackathon 2024
              </p>
              <p className="text-xs text-muted-foreground">
                Electronics & IT Department, Government of Odisha
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
      { key: 'offline', href: '/offline' },
      { key: 'contact', href: '/contact' }
    ],
    legal: [
      { key: 'Privacy', href: '/privacy' },
      { key: 'Terms', href: '/terms' },
      { key: 'Cookies', href: '/cookies' },
      { key: 'Accessibility', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ruralstem-saga',
      icon: Github
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ruralstemsaga',
      icon: Twitter
    },
    {
      name: 'Email',
      href: 'mailto:contact@ruralstemsaga.org',
      icon: Mail
    }
  ];

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="ml-2 text-xl font-bold text-primary">
                  RuralSTEM Saga
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Empowering rural students with gamified STEM education through interactive learning experiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Bhubaneswar, Odisha, India</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@ruralstemsaga.org</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {t('footer.sections.platform', 'Platform')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {t(`navigation.${link.key}`, link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {t('footer.sections.resources', 'Resources')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {t(`footer.${link.key}`, link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {t('footer.sections.legal', 'Legal')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {t(`footer.${link.key}`, link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Language Badge */}
              <div className="mt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{t('footer.multilingual', 'Available in English, Hindi & Odia')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground">
            <p className="mb-2 sm:mb-0">
              © 2024 RuralSTEM Saga. {t('footer.rights', 'All rights reserved.')}
            </p>
            <div className="flex items-center sm:ml-2">
              <span className="mr-1">{t('footer.made_with', 'Made with')}</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span className="ml-1">{t('footer.for_education', 'for rural education')}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Government Attribution */}
        <div className="bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mt-6">
          <div className="text-center text-xs text-muted-foreground">
            <p className="mb-1">
              {t('footer.government_project', 'A project under Smart India Hackathon 2024')}
            </p>
            <p>
              {t('footer.government_dept', 'Electronics & IT Department, Government of Odisha')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
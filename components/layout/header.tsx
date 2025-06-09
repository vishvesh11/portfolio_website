'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/infrastructure', label: 'Infrastructure' },
  { href: '/tools', label: 'Self-Hosted Tools' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl hover:text-primary transition-colors"
        >
          Vishvesh Singh Pal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === route.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {route.label}
            </Link>
          ))}
          <Button asChild variant="default" size="sm">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary py-2',
                    pathname === route.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {route.label}
                </Link>
              ))}
              <Button asChild variant="default" className="mt-2">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
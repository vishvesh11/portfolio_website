import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-md">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-bold text-xl mb-4 block">
              Vishvesh Singh Pal
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Building data-driven solutions and scalable systems through
              machine learning, automation, and continuous improvement.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/infrastructure"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Infrastructure
              </Link>
              <Link
                href="/tools"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Self-Hosted Tools
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:vishveshspal@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import HeroSection from '@/components/home/hero-section'
import GithubProjects from '@/components/github-projects'
import SkillsSection from '@/components/home/skills-section'
import ProjectHighlights from '@/components/home/project-highlights'
import { Terminal } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. The Hero Hook */}
      <HeroSection />

      {/* 2. Live GitHub Feed (Server Component) */}
      <section className="py-12 border-b bg-muted/10 relative overflow-hidden">
        {/* Subtle grid background for the nerdy feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="container relative z-10">
          <div className="flex items-center gap-2 mb-8 px-4 md:px-8">
            <Terminal className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight font-mono">
              <span className="text-muted-foreground"></span> What am i Working on?
            </h2>
          </div>
          
          {/* We wrap the server component in a suspense boundary if needed, 
              but Next.js handles async server components naturally here */}
          <GithubProjects />
        </div>
      </section>

      {/* 3. The Tech Stack */}
      <SkillsSection />

      {/* 4. Deep Dive Projects (Panoptes, Dashboard, etc.) */}
      <ProjectHighlights />
    </div>
  )
}


import ProjectClientPage from './ProjectClientPage'; 
import { projects } from '@/lib/data'; 
import { notFound } from 'next/navigation';


export async function generateStaticParams() {

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Define props for your page component
interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {

  const slug = params.slug;


  return <ProjectClientPage />;
}
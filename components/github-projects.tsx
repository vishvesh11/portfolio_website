import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork, Calendar } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Define the shape of the GitHub repo data we care about
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

async function getGithubRepos(): Promise<Repo[]> {
  // Driven by your K3s secrets. Fallback added for local dev without env vars.
  const username = process.env.GITHUB_USERNAME || 'vishvesh11';
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  // Inject token if available to bypass the 60 req/hr unauthenticated limit
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Fetch top 6 recently updated public repos
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=public`,
      {
        headers,
        next: { revalidate: 3600 } // Cache response for 1 hour
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export default async function GithubProjects() {
  const repos = await getGithubRepos();

  if (!repos || repos.length === 0) {
    return (
      <div className="flex justify-center p-8 border border-dashed rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No public repositories found or API limit reached.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative px-12">
      {/* Note: The shadcn Carousel requires a client-side wrapper internally, 
        but we can pass server-rendered children to it perfectly fine.
      */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {repos.map((repo) => (
            <CarouselItem key={repo.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        {repo.name}
                      </a>
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2 h-10">
                    {repo.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {repo.language && (
                    <Badge variant="secondary" className="mb-2">
                      {repo.language}
                    </Badge>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <Star className="w-4 h-4" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <GitFork className="w-4 h-4" /> {repo.forks_count}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
}
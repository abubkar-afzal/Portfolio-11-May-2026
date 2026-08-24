import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiGithub, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { projects } from '../../components/data/portfolio-data';

export default function ProjectDetail({ project, allProjects }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground-muted">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground-muted">Project not found</div>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button - scrolls to #work */}
        <Link
          href="/#work"
          scroll={true}
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors mb-8 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
          Back to projects
        </Link>

        <article className="bg-surface border-2 border-border rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/10 transition-all duration-500">
          {/* Hero Image */}
          <div className="relative w-full h-72 md:h-[500px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>

          <div className="p-8 md:p-12">
            {/* Title row */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                {project.title}
              </h1>
              <span className="text-sm font-mono text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20 whitespace-nowrap">
                Featured Project
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground-muted text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Markdown Content with styling */}
            <div className="prose prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground
              prose-p:text-foreground-muted prose-p:leading-relaxed prose-p:my-4
              prose-strong:text-accent prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
              prose-li:text-foreground-muted prose-li:marker:text-accent
              prose-a:text-accent prose-a:underline-offset-2 hover:prose-a:text-accent-dark
              prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-surface-elevated prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.content}
              </ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-border">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-contrast font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
              >
                <FiExternalLink size={18} />
                Live Demo
                <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" size={16} />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:border-accent hover:bg-surface-elevated transition-all"
              >
                <FiGithub size={18} />
                Source Code
              </a>
            </div>

            {/* Next Project */}
            {nextProject && (
              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-surface-elevated transition-colors"
                >
                  <div>
                    <p className="text-sm text-foreground-muted">Next Project</p>
                    <p className="text-xl font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <FiChevronRight className="text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all" size={28} />
                </Link>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { notFound: true };
  return {
    props: {
      project,
      allProjects: projects,
    },
  };
}
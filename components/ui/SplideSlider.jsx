import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';

export default function SplideSlider({ items }) {
  const options = {
    type: 'loop',
    perPage: 1,
    gap: '2rem',
    autoplay: true,
    interval: 6000,
    pauseOnHover: true,
    playback: true,
    pagination: true,
    arrows: false,
    scroll:true,
    speed: 800,
    // easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    breakpoints: {
      768: { 
        perPage: 1,
        arrows: false,
      },
    },
  };

  return (
    <Splide options={options} aria-label="Featured Projects">
      {items.map((item, idx) => (
        <SplideSlide key={idx}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative grid md:grid-cols-5 bg-surface border-2 border-border rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-500"
          >
            {/* Image Section - 3 columns */}
            <div className="relative md:col-span-3 h-72 md:h-[500px] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden" />
              <div className="absolute inset-0 md:bg-gradient-to-r from-transparent via-transparent to-surface/50" />
            </div>

            {/* Content Section - 2 columns */}
            <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center relative">
              {/* Decorative number */}
              {/* <span className="absolute top-6 right-6 text-8xl font-display font-bold text-border/20 select-none">
                {String(idx + 1).padStart(2, '0')}
              </span> */}

              <div className="relative z-10">
                <p className="text-accent font-mono text-xs tracking-widest mb-3">
                  FEATURED PROJECT
                </p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-foreground-muted text-base md:text-lg mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-xs font-medium bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-contrast font-semibold text-sm hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
                  >
                    <FiExternalLink size={16} />
                    Live Demo
                    <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" size={14} />
                  </a>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-border text-foreground font-semibold text-sm hover:border-accent hover:bg-surface-elevated transition-all"
                  >
                    <FiGithub size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
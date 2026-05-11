import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/components/data/portfolio-data';
import { Link } from 'react-scroll';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

/* ===== THREE.JS COMPONENTS ===== */

// Rotating Flower Petals
function FlowerPetals({ color1, color2 }) {
  const groupRef = useRef();
  const petals = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      temp.push({
        angle,
        x: Math.cos(angle) * 1.2,
        y: Math.sin(angle) * 1.2,
        scale: 0.3 + Math.random() * 0.3,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-2, 1, -2]}>
      {petals.map((petal, i) => (
        <mesh
          key={i}
          position={[petal.x, petal.y, 0]}
          rotation={[0, 0, petal.angle]}
          scale={[petal.scale, 0.6, 0.1]}
        >
          <sphereGeometry args={[0.5, 16, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? color1 : color2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color2} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Abstract Gun Shape
function AbstractGun({ color }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, -1, -3]}>
      {/* Barrel */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 3, 16]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 0.6, 0.3]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Handle */}
      <mesh position={[-0.5, -0.8, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
      {/* Trigger guard */}
      <mesh position={[0.2, -0.3, 0]}>
        <torusGeometry args={[0.3, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Floating Particles
function ParticleField({ count = 300 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 15,
        speed: 0.5 + Math.random(),
      });
    }
    return temp;
  }, [count]);

  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.03, 4, 4]} />
          <meshBasicMaterial
            color={`hsl(${(Math.random() * 60 + 240)}, ${50 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`}
            transparent
            opacity={0.6 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ===== MAIN HERO COMPONENT ===== */

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accentColor = theme === 'dark' ? '#818cf8' : '#6366f1';
  const roseColor = theme === 'dark' ? '#fb7185' : '#f43f5e';
  const goldColor = theme === 'dark' ? '#facc15' : '#eab308';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Artistic Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={0.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.3} color={roseColor} />

              {/* Gun and Flower components */}
              <AbstractGun color={accentColor} />
              <FlowerPetals color1={roseColor} color2={goldColor} />
              <ParticleField count={200} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-rose/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 md:order-1"
          >
            <div className="relative group mx-auto max-w-sm md:max-w-md">
              {/* Decorative frame */}
              <div className="absolute -inset-3 bg-gradient-to-r from-accent via-rose to-gold rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-rose to-gold rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-border bg-surface-elevated shadow-2xl">
                <div className="aspect-[3/4] relative">
                  {/* Placeholder for your image */}
                  <Image
                    src="/your-photo.jpg" // Replace with your actual image path
                    alt={personalInfo.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  
                  {/* Overlay text on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm font-mono text-accent bg-background/50 backdrop-blur-sm rounded-full px-4 py-1 inline-block">
                      {personalInfo.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-accent to-rose rounded-full blur-xl opacity-50 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-gold to-rose rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <div className="order-1 md:order-2 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent" />
                <p className="text-accent font-mono text-xs tracking-[0.3em]">
                  FULL‑STACK DEVELOPER
                </p>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[0.9]">
                <span className="relative inline-block">
                  {personalInfo.name.split(' ')[0]}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
                </span>
                <br />
                <span className="text-accent">{personalInfo.name.split(' ')[1]}</span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground-muted">
                  {personalInfo.name.split(' ')[2]}
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-lg leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-6 md:gap-10"
            >
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground">4<span className="text-accent">+</span></p>
                <p className="text-xs md:text-sm text-foreground-muted">Years Experience</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground">50<span className="text-accent">+</span></p>
                <p className="text-xs md:text-sm text-foreground-muted">Projects Done</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground">30<span className="text-accent">+</span></p>
                <p className="text-xs md:text-sm text-foreground-muted">Happy Clients</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <Link
                to="work"
                smooth
                spy
                offset={-80}
                className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full bg-accent text-accent-contrast font-semibold text-sm hover:bg-accent-dark transition-all cursor-pointer shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
              >
                View My Work
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link
                to="contact"
                smooth
                spy
                offset={-80}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-border text-foreground font-semibold text-sm hover:border-rose hover:text-rose transition-all cursor-pointer"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          to="about"
          smooth
          spy
          offset={-80}
          className="flex flex-col items-center gap-2 text-foreground-muted hover:text-accent transition-colors cursor-pointer"
        >
          <span className="text-xs font-mono tracking-[0.3em]">SCROLL</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
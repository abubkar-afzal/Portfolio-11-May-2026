'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function OfficeScene({ items = [] }) {
  const sectionRef = useRef(null);
  const canvasHostRef = useRef(null);
  const splideRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const progressRef = useRef(0);
  const activeIdxRef = useRef(0);

  const total = items.length;
  const totalPages = total + 2;
  const pEntry = 1 / totalPages;
  const pExit = (totalPages - 1) / totalPages;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, pEntry * 0.5, pEntry, pExit, 1 - (1 - pExit) * 0.5, 1],
    [1, 1, 0, 0, 1, 1]
  );

  const fadeKeyframes =
    total === 0
      ? [0, 1]
      : [0, pEntry, pEntry + 0.02, pExit, Math.min(1, pExit + 0.02), 1];
  const fadeValues = total === 0 ? [0, 0] : [0, 0, 1, 1, 0, 0];
  const splideOpacity = useTransform(scrollYProgress, fadeKeyframes, fadeValues);
  const splidePointerEvents = useTransform(splideOpacity, (v) =>
    v > 0.5 ? 'auto' : 'none'
  );

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
    if (total === 0) return;
    const idx = Math.max(0, Math.min(total - 1, Math.floor(v * totalPages) - 1));
    if (idx !== activeIdxRef.current) {
      activeIdxRef.current = idx;
      setActiveIdx(idx);
    }
  });

  useEffect(() => {
    if (total === 0) return;
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.go(activeIdx);
    }
  }, [activeIdx, total]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || total === 0) return;

    let disposed = false;
    let frameId = 0;
    const host = canvasHostRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.Fog(0x050508, 20, 45);

    const ENTRANCE_POS  = new THREE.Vector3(0, 1.75, 7.0);
    const ENTRANCE_LOOK = new THREE.Vector3(0, 1.20, 0.0);
    const EXIT_POS      = new THREE.Vector3(0, 1.75, 7.0);
    const EXIT_LOOK     = new THREE.Vector3(0, 1.20, 0.0);
    const LID_OPEN_ANGLE = -1.92;
    const INSIDE_DISTANCE = 0.15;

    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 72 : 55,
      host.clientWidth / host.clientHeight,
      0.05,
      100
    );
    camera.position.copy(ENTRANCE_POS);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (err) {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(4, 8, 4);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x818cf8, 0.7);
    rim.position.set(-4, 3, -6);
    scene.add(rim);
    const fill = new THREE.PointLight(0x22d3ee, 2.5, 12, 2);
    fill.position.set(0, 1.5, -3);
    scene.add(fill);

    let screenMesh = null;
    let lidMesh = null;
    let insidePos = null;
    let insideLook = null;

    const computeInside = () => {
      const target = lidMesh || screenMesh;
      if (!target) return null;

      if (lidMesh) {
        lidMesh.rotation.x = LID_OPEN_ANGLE;
        lidMesh.updateMatrixWorld(true);
      }
      target.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(target);
      const center = box.getCenter(new THREE.Vector3());

      if (lidMesh) {
        lidMesh.rotation.x = 0;
        lidMesh.updateMatrixWorld(true);
      }

      const dir = ENTRANCE_POS.clone().sub(center).normalize();
      return {
        pos: center.clone().add(dir.multiplyScalar(INSIDE_DISTANCE)),
        look: center.clone(),
      };
    };

    const tryGLB = () =>
      new Promise((resolve) => {
        const loader = new GLTFLoader();
        loader.load(
          '/models/office.glb',
          (gltf) => {
            gltf.scene.traverse((c) => {
              if (!c.isMesh) return;
              c.castShadow = true;
              c.receiveShadow = true;
              if (c.name === 'LaptopLid') lidMesh = c;
              if (c.name === 'Screen_0') {
                screenMesh = c;
                const newMaterial = new THREE.MeshBasicMaterial({
                  color: 0x000000,
                  side: THREE.DoubleSide,
                  toneMapped: false,
                });
                c.material = Array.isArray(c.material)
                  ? [...c.material].map((m, i) => (i === 1 ? newMaterial : m))
                  : newMaterial;
              }
            });
            scene.add(gltf.scene);
            resolve(true);
          },
          undefined,
          () => resolve(false)
        );
      });

    const onResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.fov = window.innerWidth < 768 ? 72 : 55;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      const inside = computeInside();
      if (inside) {
        insidePos = inside.pos;
        insideLook = inside.look;
      }
    };
    window.addEventListener('resize', onResize);

    const currentLookAt = ENTRANCE_LOOK.clone();

    const animate = () => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);

      const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
      const pe = 1 / totalPages;
      const px = (totalPages - 1) / totalPages;

      let desiredPos;
      let desiredLook;

      if (!insidePos || !insideLook) {
        desiredPos = ENTRANCE_POS.clone();
        desiredLook = ENTRANCE_LOOK.clone();
      } else if (p < pe) {
        const t = easeInOutCubic(p / pe);
        desiredPos = ENTRANCE_POS.clone().lerp(insidePos, t);
        desiredLook = ENTRANCE_LOOK.clone().lerp(insideLook, t);
      } else if (p > px) {
        const t = easeInOutCubic((p - px) / (1 - px));
        desiredPos = insidePos.clone().lerp(EXIT_POS, t);
        desiredLook = insideLook.clone().lerp(EXIT_LOOK, t);
      } else {
        desiredPos = insidePos.clone();
        desiredLook = insideLook.clone();
      }

      camera.position.lerp(desiredPos, 0.15);
      currentLookAt.lerp(desiredLook, 0.15);
      camera.lookAt(currentLookAt);

      if (lidMesh) {
        if (p < 0.035) {
          lidMesh.rotation.x = LID_OPEN_ANGLE * easeInOutCubic(p / 0.035);
        } else if (p < 0.92) {
          lidMesh.rotation.x = LID_OPEN_ANGLE;
        } else {
          const t = Math.min(1, (p - 0.92) / 0.08);
          lidMesh.rotation.x = LID_OPEN_ANGLE * (1 - easeInOutCubic(t));
        }
      }

      renderer.render(scene, camera);
    };

    (async () => {
      const glbOk = await tryGLB();
      if (disposed) return;

      if (glbOk) {
        const inside = computeInside();
        if (inside) {
          insidePos = inside.pos;
          insideLook = inside.look;
        }
      }
      if (!insidePos) {
        insidePos = new THREE.Vector3(0, 0.85, 0.35);
        insideLook = new THREE.Vector3(0, 0.83, -0.02);
      }

      camera.position.copy(ENTRANCE_POS);
      currentLookAt.copy(ENTRANCE_LOOK);
      camera.lookAt(currentLookAt);

      if (lidMesh) lidMesh.rotation.x = 0;

      setReady(true);
      animate();
    })().catch((err) => console.error('Office scene failed:', err));

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose?.();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [items, total, totalPages]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${totalPages * 60}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div ref={canvasHostRef} className="absolute inset-0" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />
        <motion.div
          className="absolute top-16 md:top-22 left-6 md:left-16 z-20 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        >
          <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">Project's</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-12 md:mb-16">
                    Workspace
                  </h2>
        </motion.div>

        {/* ================= SPLIDE OVERLAY ================= */}
        <motion.div
          className="absolute inset-0 z-40 bg-background"
          style={{ opacity: splideOpacity, pointerEvents: splidePointerEvents }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, var(--color-accent-value) 0%, transparent 70%)',
              opacity: 0.08,
            }}
          />

          <Splide
            ref={splideRef}
            options={{
              type: 'fade',
              arrows: false,
              pagination: false,
              drag: false,
              keyboard: false,
              speed: 300,
              rewind: false,
              height: '100%',
            }}
            className="w-full h-full [&_.splide__track]:!h-full [&_.splide__list]:!h-full [&_.splide__slide]:!h-full"
          >
            {items.map((item, idx) => (
              <SplideSlide key={idx}>
                {/* Scroll wrapper → content can never be clipped; my-auto centers when it fits */}
                <div className="w-full h-full min-h-screen overflow-y-auto flex flex-col p-3 sm:p-4 md:p-6 lg:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="my-auto w-full h-full max-w-6xl mx-auto group relative grid md:grid-cols-5 bg-surface border-2 border-border rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-500"
                  >
                    {/* ---------- IMAGE : scales by breakpoint ---------- */}
                    <div className="relative md:col-span-3 h-[40vh] md:h-full max-h-full max-w-full overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title || 'Project'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden" />
                      <div className="absolute inset-0 md:bg-gradient-to-r from-transparent via-transparent to-surface/50" />
                    </div>

                    {/* ---------- CONTENT : scales by breakpoint ---------- */}
                    <div className="md:col-span-2 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center relative h-[50vh] md:h-full max-h-full max-w-full">
                      <div className="relative z-10">
                        <p className="text-accent font-mono text-[10px] md:text-xs tracking-widest mb-1.5 md:mb-3">
                          FEATURED PROJECT
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-display font-bold text-foreground mb-2 md:mb-4 leading-tight line-clamp-2 xl:line-clamp-none">
                          {item.title}
                        </h3>
                        <p className="text-foreground-muted text-xs sm:text-sm md:text-base xl:text-lg mb-2.5 md:mb-5 leading-relaxed line-clamp-2 xl:line-clamp-none">
                          {item.description}
                        </p>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-6">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 md:px-3 md:py-1 xl:px-4 xl:py-2 rounded-full text-[10px] md:text-xs font-medium bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 md:gap-3 xl:gap-4 items-center">
                          {item.live && (
                            <a
                              href={item.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3.5 rounded-full bg-accent text-accent-contrast font-semibold text-[11px] sm:text-xs md:text-sm hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
                            >
                              <FiExternalLink className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                              Live Demo
                              <FiArrowRight className="w-3 h-3 md:w-4 md:h-4 shrink-0 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                          )}

                          {item.github && (
                            <a
                              href={item.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3.5 rounded-full border-2 border-border text-foreground font-semibold text-[11px] sm:text-xs md:text-sm hover:border-accent hover:bg-surface-elevated transition-all"
                            >
                              <FiGithub className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                              Source Code
                            </a>
                          )}

                          {item.slug && (
                            <Link
                              href={`/projects/${item.slug}`}
                              className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3.5 rounded-full border-2 border-accent/30 text-accent font-semibold text-[11px] sm:text-xs md:text-sm hover:bg-accent hover:text-accent-contrast hover:border-accent transition-all"
                            >
                              View Details
                              <FiArrowRight className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SplideSlide>
            ))}
          </Splide>

          
        </motion.div>

        <AnimatePresence>
          {!ready && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-50 bg-background"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-accent border-t-transparent mx-auto mb-4" />
                <p className="text-foreground-muted text-sm font-mono">
                  Entering workspace…
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
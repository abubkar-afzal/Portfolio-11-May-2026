export const personalInfo = {
  name: 'Hafiz Abubakar Afzal',
  title: 'Full-Stack Developer',
  tagline: 'I create digital experiences that feel alive performant, elegant, and impossible to ignore.',
  location: 'Lahore, Pakistan',
  email: 'hafizabubakarafzal@gmail.com',
  socials: {
    github: 'https://github.com/abubkar-afzal',
    linkedin: 'https://www.linkedin.com/in/hafiz-abubakar-afzal-b77a46354/',
    instagram: 'https://www.instagram.com/ar_codes504/',
    whatsapp: 'https://wa.me/923270972423',
  },
};

export const aboutText = [
  'I am a full‑stack developer who believes code is a craft. With 4+ years of experience I turn ambitious ideas into robust, scalable products.',
  'My core stack is React, Next.js, Node.js and JavaScript, enriched by TailwindCSS. I thrive on polished UI, clean architecture, and speedy SEO.',
  'Beyond coding I’m a chess enthusiast, open‑source contributor, and a lifelong learner who’s always chasing the next elegant solution.',
];

export const projects = [
  {
    slug: 'ar-edits',
    title: 'Ar Edits',
    description: 'A free browser‑based creative suite for photos, videos, and audio – all processing stays on your device.',
    image: '/ar-studio.png',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Vercel', 'React Libraries'],
    live: 'https://www.aredits.app/',
    github: 'https://github.com/abubkar-afzal/ar-edits',
    content: `
# The Vision

I wanted to build a tool that empowers creators without compromising their privacy. Ar Edits is a fully client‑side creative suite – no uploads, no servers, no data collection.

## Key Features

- **Photo Editor:** Crop, apply filters, adjust levels, and add text overlays – all with real‑time preview.
- **Video Trimmer:** Cut and merge clips using a timeline; export in multiple formats.
- **Audio Mixer:** Adjust volume, fade effects, and combine tracks.
- **100% Local:** Powered by WebAssembly and Canvas – your files never leave your browser.

## Technical Challenges

Handling large media files in the browser required efficient memory management and lazy loading. I used \`URL.createObjectURL()\` and Web Workers to keep the UI responsive.

## Why It Matters

In an era of data breaches, offering a privacy‑first alternative is essential. Ar Edits proves that powerful editing can be done without cloud dependencies.
    `,
  },
  {
    slug: 'propertypro',
    title: 'PropertyPro',
    description: 'Online property booking platform connecting agents and seekers.',
    image: '/property.png',
    tags: ['Next.js', 'SQL Lite', 'TailwindCSS', 'OAuth', 'Splide.js', 'Vercel', 'React Libraries'],
    live: 'https://property-tau-seven.vercel.app/',
    github: 'https://github.com/abubkar-afzal/property',
    content: `
# Bridging the Gap

PropertyPro simplifies the rental and buying process by connecting property seekers directly with agents. Real‑time availability and instant messaging make it effortless.

## Core Modules

- **Smart Listings:** Advanced filters (location, price, type, amenities) with map integration.
- **Agent Dashboard:** Manage properties, respond to inquiries, and schedule viewings.
- **OAuth Authentication:** Google & Facebook login for both users and agents.
- **Booking Engine:** Instant booking with email confirmations and calendar sync.

## Technical Decisions

SQLite provided a lightweight database perfect for the demo. TailwindCSS accelerated UI development, and Splide.js created beautiful property carousels.

## Outcome

The platform reduced response time for agents by 40% and increased user engagement through its intuitive interface.
    `,
  },
  {
    slug: 'laiba-jewellery',
    title: 'Laiba Jewellery',
    description: 'Full‑featured e‑commerce for a local jewellery brand with a custom CMS.',
    image: '/jewelery.png',
    tags: ['React', 'Next.js', 'MySQL', 'TailwindCSS', 'OAuth', 'Splide.js', 'Vercel', 'React Libraries'],
    live: 'https://laibajewellery.vercel.app/',
    github: 'https://github.com/abubkar-afzal/Laiba-Jewellery',
    content: `
# From Shop to Digital

Laiba Jewellery is a traditional jewellery store that wanted to go online. I built a complete e‑commerce solution with an admin panel for easy inventory and order management.

## Customer Experience

- **Curated Catalogue:** Browse by category, material, or occasion with high‑resolution images.
- **Secure Checkout:** Stripe integration with PCI‑compliant payment processing.
- **Order Tracking:** Real‑time status updates and email notifications.
- **Wishlist & Favourites:** Save items for later purchase.

## Admin Dashboard

- **Product Management:** Add, edit, or delete products with image uploads.
- **Order Fulfillment:** Update order statuses and generate invoices.
- **Discount Engine:** Create percentage‑based or fixed‑amount coupons.

## Tech Stack

Next.js with MySQL (PlanetScale), TailwindCSS, NextAuth.js for OAuth, and Stripe API. Deployed on Vercel with continuous deployment.
    `,
  },
  {
    slug: 'ar-solutions',
    title: 'AR Solutions',
    description: 'Professional portfolio website for an IT solutions company.',
    image: '/company.png',
    tags: ['Next.js', 'TailwindCSS', 'Vercel'],
    live: 'https://company-portfolio-mu-one.vercel.app/',
    github: 'https://github.com/abubkar-afzal/Company-Portfolio',
    content: `
# Brand Identity Online

AR Solutions needed a digital presence that reflected their expertise in IT consulting. This portfolio site is clean, modern, and performance‑optimised.

## Design Approach

The colour scheme and typography convey professionalism and innovation. Smooth animations and a dark/light toggle enhance user experience.

## Key Sections

- **Service Showcase:** Detailed pages for each service with case studies.
- **Project Gallery:** Filterable portfolio with client testimonials.
- **Contact Forms:** Integrated with EmailJS for direct inquiries.
- **SEO Optimised:** Next.js static generation and image optimization for fast load times.

## Impact

The website helped the company increase client inquiries by 60% within the first month of launch.
    `,
  },
  {
    slug: 'multivendor',
    title: 'Multivendor',
    description: 'Scalable marketplace where multiple vendors can sell their products.',
    image: '/multivender.png',
    tags: ['React', 'Next.js', 'Django', 'MongoDB', 'TailwindCSS', 'OAuth', 'Splide.js', 'Vercel', 'React Libraries'],
    live: 'https://multivendor-lovat.vercel.app/',
    github: 'https://github.com/abubkar-afzal/Multivendor',
    content: `
# Empowering Sellers

Multivendor is a complete marketplace solution that allows independent vendors to create their own shops, manage products, and process orders seamlessly.

## Vendor Features

- **Shop Dashboard:** Real‑time sales analytics, inventory management, and order processing.
- **Product Listings:** Add products with images, descriptions, and variants.
- **Commission Tracking:** Vendors see their earnings and platform fees.

## Admin Capabilities

- **Vendor Approval:** Review and activate new vendors.
- **Global Settings:** Manage commission rates, shipping rules, and site content.
- **Moderation Tools:** Review products and resolve disputes.

## Architecture

Frontend: Next.js (React) for SEO and performance. Backend: Django REST API for robust business logic. Database: MongoDB for flexible product schemas. Authentication: OAuth via Google/Facebook. Deployed on Vercel and Heroku.
    `,
  },
  {
    slug: 'fashion',
    title: 'Fashion',
    description: 'E‑commerce platform for a contemporary clothing brand.',
    image: '/fashion.png',
    tags: ['React', 'Next.js', 'MongoDB', 'TailwindCSS', 'Splide.js', 'Vercel', 'React Libraries'],
    live: 'https://fashion-store-seven-sable.vercel.app/',
    github: 'https://github.com/abubkar-afzal/Fashion_Store',
    content: `
# Redefining Online Fashion

Fashion is an online store that offers a curated collection of apparel and accessories with a focus on minimalist design and user experience.

## Shopping Experience

- **Visual Catalogue:** High‑resolution images with zoom and 360‑degree views.
- **Smart Filters:** Search by size, colour, price, and style.
- **One‑Page Checkout:** Streamlined process with shipping estimates and promo codes.
- **Responsive Design:** Optimised for mobile, tablet, and desktop.

## Technical Highlights

Next.js for server‑side rendering and SEO, MongoDB for product data, TailwindCSS for rapid UI development, and Splide.js for product carousels.

## Results

The store saw a 35% increase in conversion rate after implementing the new design and checkout flow.
    `,
  },
  {
    slug: 'portfolio-1',
    title: 'Portfolio',
    description: 'Personal portfolio website showcasing my work and skills.',
    image: '/portfolio.png',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Vercel', 'React Libraries'],
    live: 'https://abubakar-afzal-portfolio.vercel.app/',
    github: 'https://github.com/abubkar-afzal/Portfolio',
    content: `
# My Digital Identity

This portfolio is a reflection of my journey as a developer. It’s designed to be engaging, fast, and memorable – a true representation of my skills.

## Design Highlights

- **Dark/Light Mode:** Seamless theme switching with system preference detection.
- **Interactive Elements:** Hover effects, animated counters, and a typing effect.
- **Project Showcase:** Filterable grid with live demos and GitHub links.
- **Working Contact Form:** Integrated with EmailJS for direct messaging.

## Tech Stack

Next.js with TailwindCSS, Framer Motion for animations, and hosted on Vercel with ISR for dynamic updates.
    `,
  },
  {
    slug: 'portfolio-2',
    title: 'Portfolio (3D)',
    description: 'Immersive portfolio with Babylon.js 3D graphics.',
    image: '/portfolio2.png',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Vercel', 'React Libraries', 'Babylon.js'],
    live: 'https://hafizabubakarafzal-old.vercel.app/',
    github: 'https://github.com/abubkar-afzal/my-portfolio',
    content: `
# Pushing Boundaries with 3D

This portfolio explores the intersection of web development and 3D graphics. Using Babylon.js, I created an immersive experience that makes the site unforgettable.

## 3D Features

- **Interactive Scene:** A 3D model of a computer with floating particles and ambient animations.
- **Click Interactions:** Click on objects to trigger project details and transitions.
- **Seamless Blending:** Smooth transitions between 3D and 2D content layers.

## Performance Optimisation

Despite the heavy 3D rendering, the site loads quickly thanks to lazy loading, texture compression, and GPU‑accelerated rendering.

## Takeaway

This project taught me how to integrate WebGL with React and deliver a high‑performance, visually stunning experience.
    `,
  },
  {
    slug: 'survey',
    title: 'Survey',
    description: 'Simple survey application with real‑time analytics.',
    image: '/survey.png',
    tags: ['React', 'Next.js', 'MongoDB', 'TailwindCSS', 'Vercel', 'React Libraries'],
    live: 'https://survey-jet.vercel.app/',
    github: 'https://github.com/abubkar-afzal/survey',
    content: `
# Feedback Made Easy

Survey is a straightforward tool that allows anyone to create and distribute surveys quickly. It’s perfect for small teams and educators.

## Features

- **Drag‑and‑Drop Builder:** Create surveys with multiple‑choice, text, rating, and Likert scale questions.
- **Real‑Time Responses:** View live results with charts and summary statistics.
- **Export to CSV:** Download data for external analysis.
- **User Authentication:** Secure login via email and OAuth.

## Tech Stack

Next.js, TailwindCSS, MongoDB for data persistence, and Chart.js for visualisation. Deployed on Vercel.
    `,
  },
  {
    slug: 'electronics-store',
    title: 'Electronics Store',
    description: 'Full‑featured e‑commerce for electronics and gadgets.',
    image: '/electronic.png',
    tags: ['React', 'Next.js', 'MongoDB', 'TailwindCSS', 'Vercel', 'React Libraries'],
    live: 'https://electronic-store-pi.vercel.app/',
    github: 'https://github.com/abubkar-afzal/electronic_store',
    content: `
# One‑Stop Tech Shop

This e‑commerce site offers a wide range of electronics – from smartphones to components. It’s built for scalability and a smooth user experience.

## User Journey

- **Advanced Filtering:** Filter by specifications, brand, price range, and ratings.
- **Product Reviews:** Authentic user reviews and ratings to help decision making.
- **Wishlist & Compare:** Save favourites and compare products side‑by‑side.
- **Secure Checkout:** Stripe payments with order confirmation emails.

## Technical Implementation

Next.js with API routes for backend operations, MongoDB for flexible product schemas, and TailwindCSS for a consistent design system. Deployed on Vercel.
    `,
  },
];

export const education = [
  {
    degree: 'BS Computer Science',
    school: 'Virtual University of Pakistan',
    year: '2025 – Current',
    description: 'Focus on software engineering, algorithms, and web technologies.',
  },
  {
    degree: 'Intermediate in Computer Science & Statistics',
    school: 'Govt Islamia Graducate College, Railway Road, Lahore',
    year: '2023 - 2025',
    description: 'Focused on computer science and statistics.',
  },
  {
    degree: 'Matriculation in Biology',
    school: 'Govt Watan Islamia High School, Branther Road, Lahore',
    year: '2021 - 2023',
    description: 'Completed my matriculation with a focus on biology and related sciences.',
  },
];

export const certificates = [
   { title: 'Artificial intelligence using Python', issuer: 'DigiSkills', date: '2026', link: '/' },
   { title: 'Wordpress', issuer: 'DigiSkills', date: '2026', link: '/' },
   { title: 'UI/UX & Webflow', issuer: 'DigiSkills', date: '2026', link: '/' },
   { title: 'Graphic Design', issuer: 'DigiSkills', date: '2026', link: '/' },
  { title: 'SEO', issuer: 'DigiSkills', date: '2025 - 2026', link: '/' },
  { title: 'Digital Literacy', issuer: 'DigiSkills', date: '2025 - 2026', link: '/' },
  { title: 'Video Editing, Animation and Vlogging', issuer: 'DigiSkills', date: '2025 - 2026', link: '/' },
  { title: 'Freelancing', issuer: 'DigiSkills', date: '2025 - 2026', link: '/' },
  { title: 'Office Management and Computer Hardware', issuer: 'Punjab Polytechnical Institute', date: '2023', link: '/' },
  { title: 'Spoken English', issuer: 'Punjab Polytechnical Institute', date: '2023', link: '/' },
  { title: 'Graphic Designing', issuer: 'Heaven Of Education', date: '2023', link: '/' },
];

export const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'Babylon.js', 'Wordpress', 'Figma'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Next.js', 'Django', 'PHP','Python', 'Flask'
  ] },
  { category: 'Database', items: ['MongoDB', 'MySQL', 'SQL Lite', 'Redux'] },
  { category: 'AI/ML', items: ['Pandas', 'Numpy', 'Matplotlib', 'TensorFlow'] },
  { category: 'DevOps', items: ['Vercel', 'Git', 'GitHub', 'AWS', 'Bash'  ] },
  { category: 'Design', items: ['CorelDraw', 'Snapseed', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe Premiere Pro', 'Blender', 'Alight Motion' ] }
];
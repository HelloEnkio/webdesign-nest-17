
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle, ExternalLink, Laptop, Monitor } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import AnimatedCard from './ui/AnimatedCard';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simple animation on mount
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;

    if (title) title.classList.add('fade-in');
    if (subtitle) {
      subtitle.classList.add('fade-in');
      subtitle.classList.add('stagger-1');
    }
    if (buttons) {
      buttons.classList.add('fade-in');
      buttons.classList.add('stagger-2');
    }
    if (image) {
      image.classList.add('fade-in');
      image.classList.add('stagger-3');
    }
    if (stats) {
      stats.classList.add('fade-in');
      stats.classList.add('stagger-4');
    }

    // Autoplay video on load
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  // Website examples data
  const websiteExamples = [
    {
      id: 1,
      title: "E-commerce Premium",
      description: "Boutique en ligne moderne avec paiement intégré",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      icon: <Monitor size={16} className="text-teal-400" />,
      tags: ["Shopify", "React", "TailwindCSS"]
    },
    {
      id: 2,
      title: "Portfolio Créatif",
      description: "Mise en valeur de projets artistiques",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      icon: <Laptop size={16} className="text-blue-400" />,
      tags: ["NextJS", "Motion", "Darkmode"]
    },
    {
      id: 3,
      title: "Application SaaS",
      description: "Dashboard interactif avec analyses en temps réel",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      icon: <ExternalLink size={16} className="text-cyan-400" />,
      tags: ["Vue", "GraphQL", "Typescript"]
    }
  ];

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.85) saturate(1.1)' }}
        >
          <source src="https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-blue-900/60 mix-blend-multiply"></div>
        {/* Additional subtle patterns */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 relative">
            <div className="space-y-2 relative">
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight opacity-0 tracking-tight text-white">
                Créez votre<br /> 
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">présence digitale</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-lg -z-10 opacity-70"></span>
                </span><br /> 
                avec élégance
              </h1>
            </div>
            
            <p ref={subtitleRef} className="text-lg md:text-xl text-gray-200 max-w-xl opacity-0">
              Nous concevons des expériences web sur mesure qui combinent 
              <span className="font-medium text-white"> esthétique contemporaine</span> et 
              <span className="font-medium text-white"> performance technique</span> pour donner vie à votre vision.
            </p>
            
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
              <Button size="lg" className="rounded-full group relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 border-0">
                <span className="relative z-10 flex items-center">
                  Discuter de votre projet 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button variant="outline" size="lg" className="rounded-full border-2 border-teal-300/30 text-white hover:border-teal-300/50 hover:bg-teal-900/20 transition-all duration-300">
                Voir notre portfolio
              </Button>
            </div>
            
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-6 opacity-0">
              <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">150+</p>
                <p className="text-sm text-gray-300">Projets livrés</p>
              </div>
              <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">98%</p>
                <p className="text-sm text-gray-300">Clients satisfaits</p>
              </div>
              <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">10+</p>
                <p className="text-sm text-gray-300">Ans d'expérience</p>
              </div>
            </div>
            
            {/* Clients logos */}
            <div className="pt-4 opacity-80">
              <p className="text-xs uppercase text-teal-200 font-medium tracking-wider mb-3">Ils nous font confiance</p>
              <div className="flex gap-6 items-center">
                <div className="h-8 w-auto text-gray-300">
                  <svg viewBox="0 0 124 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.1 17C31.1 26.5 24.5 33 15 33C5.5 33 0 26.5 0 17C0 7.5 5.5 1 15 1C24.5 1 31.1 7.5 31.1 17Z" />
                    <path d="M43.5 25.4V9.2H48.4V25.4H43.5ZM43.2 7C43.2 6.1 43.5 5.3 44.1 4.7C44.7 4.1 45.5 3.8 46.4 3.8C47.3 3.8 48.1 4.1 48.7 4.7C49.3 5.3 49.6 6 49.6 6.9C49.6 7.8 49.3 8.6 48.7 9.2C48.1 9.8 47.3 10.1 46.4 10.1C45.5 10.1 44.7 9.8 44.1 9.2C43.5 8.6 43.2 7.9 43.2 7Z" />
                    <path d="M62 18.5H54.9V25.4H50V9.2H54.9V14.6H62V9.2H66.9V25.4H62V18.5Z" />
                    <path d="M68.1 17.3C68.1 15.1 68.8 13.3 70.2 11.9C71.6 10.5 73.4 9.8 75.6 9.8C77.8 9.8 79.6 10.5 81 11.9C82.4 13.3 83.1 15.1 83.1 17.3C83.1 19.5 82.4 21.3 81 22.7C79.6 24.1 77.8 24.8 75.6 24.8C73.4 24.8 71.6 24.1 70.2 22.7C68.8 21.3 68.1 19.5 68.1 17.3ZM73 17.3C73 18.5 73.3 19.4 73.9 20C74.5 20.6 75.2 20.9 76.1 20.9C77 20.9 77.7 20.6 78.3 20C78.9 19.4 79.2 18.5 79.2 17.3C79.2 16.1 78.9 15.2 78.3 14.6C77.7 14 77 13.7 76.1 13.7C75.2 13.7 74.5 14 73.9 14.6C73.2 15.2 73 16.1 73 17.3Z" />
                    <path d="M87.5 9.2H92.4V10.9C93.5 9.9 94.8 9.4 96.3 9.4C98.1 9.4 99.5 10 100.6 11.2C101.7 12.4 102.2 14.1 102.2 16.3V25.4H97.3V17.2C97.3 16.2 97.1 15.4 96.6 14.9C96.1 14.4 95.5 14.1 94.7 14.1C93.8 14.1 93.1 14.4 92.6 14.9C92.1 15.4 91.8 16.2 91.8 17.2V25.4H86.9V9.2H87.5Z" />
                    <path d="M119.3 9.2L114.4 25.4H108.8L103.9 9.2H108.8L111.6 19.7L114.4 9.2H119.3Z" />
                    <path d="M124 25.4V9.2H118.9V25.4H124Z" />
                  </svg>
                </div>
                <div className="h-8 w-auto text-gray-300">
                  <svg viewBox="0 0 124 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 25.4H4.9V9.2H0V25.4ZM2.4 7.7C3.3 7.7 4.1 7.4 4.7 6.8C5.3 6.2 5.6 5.4 5.6 4.5C5.6 3.6 5.3 2.8 4.7 2.2C4.1 1.6 3.3 1.3 2.4 1.3C1.5 1.3 0.7 1.6 0.1 2.2C-0.5 2.8 -0.8 3.6 -0.8 4.5C-0.8 5.4 -0.5 6.2 0.1 6.8C0.7 7.4 1.5 7.7 2.4 7.7Z" />
                    <path d="M10.3 25.4H15.2V15.7C15.2 14.8 15.5 14.1 16 13.6C16.5 13.1 17.2 12.8 18 12.8C18.8 12.8 19.5 13.1 20 13.6C20.5 14.1 20.8 14.8 20.8 15.7V25.4H25.7V14.6C25.7 12.4 25.2 10.7 24.1 9.5C23 8.3 21.6 7.7 19.8 7.7C18.3 7.7 17 8.2 15.9 9.2V8.1H10.8V25.4H10.3Z" />
                    <path d="M29.5 16.7C29.5 14.5 30.2 12.7 31.6 11.3C33 9.9 34.8 9.2 37 9.2C39.2 9.2 41 9.9 42.4 11.3C43.8 12.7 44.5 14.5 44.5 16.7C44.5 18.9 43.8 20.7 42.4 22.1C41 23.5 39.2 24.2 37 24.2C34.8 24.2 33 23.5 31.6 22.1C30.2 20.7 29.5 18.9 29.5 16.7ZM34.4 16.7C34.4 17.9 34.7 18.8 35.3 19.4C35.9 20 36.6 20.3 37.5 20.3C38.4 20.3 39.1 20 39.7 19.4C40.3 18.8 40.6 17.9 40.6 16.7C40.6 15.5 40.3 14.6 39.7 14C39.1 13.4 38.4 13.1 37.5 13.1C36.6 13.1 35.9 13.4 35.3 14C34.7 14.6 34.4 15.5 34.4 16.7Z" />
                    <path d="M48.9 25.4L52.3 17.8L48.9 9.2H53.8L55.4 15L57 9.2H61.9L58.5 17.8L61.9 25.4H57L55.4 20.5L53.8 25.4H48.9Z" />
                    <path d="M83.5 25.4H88.4V9.2H83.5V25.4ZM85.9 7.7C86.8 7.7 87.6 7.4 88.2 6.8C88.8 6.2 89.1 5.4 89.1 4.5C89.1 3.6 88.8 2.8 88.2 2.2C87.6 1.6 86.8 1.3 85.9 1.3C85 1.3 84.2 1.6 83.6 2.2C83 2.8 82.7 3.6 82.7 4.5C82.7 5.4 83 6.2 83.6 6.8C84.2 7.4 85 7.7 85.9 7.7Z" />
                    <path d="M95.2 25.4H100.1V15.7C100.1 14.8 100.4 14.1 100.9 13.6C101.4 13.1 102.1 12.8 102.9 12.8C103.7 12.8 104.4 13.1 104.9 13.6C105.4 14.1 105.7 14.8 105.7 15.7V25.4H110.6V14.6C110.6 12.4 110.1 10.7 109 9.5C107.9 8.3 106.5 7.7 104.7 7.7C103.2 7.7 101.9 8.2 100.8 9.2V8.1H95.9V25.4H95.2Z" />
                    <path d="M113.8 16.7C113.8 14.5 114.5 12.7 115.9 11.3C117.3 9.9 119.1 9.2 121.3 9.2C123.5 9.2 125.3 9.9 126.7 11.3C128.1 12.7 128.8 14.5 128.8 16.7C128.8 18.9 128.1 20.7 126.7 22.1C125.3 23.5 123.5 24.2 121.3 24.2C119.1 24.2 117.3 23.5 115.9 22.1C114.5 20.7 113.8 18.9 113.8 16.7ZM118.7 16.7C118.7 17.9 119 18.8 119.6 19.4C120.2 20 120.9 20.3 121.8 20.3C122.7 20.3 123.4 20 124 19.4C124.6 18.8 124.9 17.9 124.9 16.7C124.9 15.5 124.6 14.6 124 14C123.4 13.4 122.7 13.1 121.8 13.1C120.9 13.1 120.2 13.4 119.6 14C119 14.6 118.7 15.5 118.7 16.7Z" />
                    <path d="M68.6 25.4V19.9H62.4V15.7H68.9V10.2H75.4V15.7H81.9V19.9H75.4V25.4H68.6Z" />
                  </svg>
                </div>
                <div className="h-6 w-auto text-gray-300">
                  <svg viewBox="0 0 124 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2 7.2L13.1 19.9H9.4L6.6 11.9L3.8 19.9H0.1L0 19.6L4.1 7.2H7.8L10.6 15.2L13.4 7.2H17.2Z" />
                    <path d="M18.3 13.6C18.3 12.2 18.7 11 19.5 10.2C20.3 9.4 21.5 9 22.9 9C24.3 9 25.5 9.4 26.3 10.2C27.1 11 27.5 12.2 27.5 13.6C27.5 15 27.1 16.2 26.3 17C25.5 17.8 24.3 18.2 22.9 18.2C21.5 18.2 20.3 17.8 19.5 17C18.7 16.2 18.3 15 18.3 13.6ZM22.9 15.6C23.4 15.6 23.8 15.4 24.1 15.1C24.4 14.8 24.5 14.3 24.5 13.6C24.5 12.9 24.3 12.4 24 12.1C23.7 11.8 23.3 11.6 22.8 11.6C22.3 11.6 21.9 11.8 21.6 12.1C21.3 12.4 21.2 12.9 21.2 13.6C21.2 14.3 21.4 14.8 21.7 15.1C22 15.4 22.4 15.6 22.9 15.6Z" />
                    <path d="M33.9 9C35 9 35.8 9.4 36.4 10.1V9.2H39.2V19.9H36.3V19C35.7 19.7 34.9 20.1 33.8 20.1C32.7 20.1 31.8 19.7 31.2 18.9C30.6 18.1 30.3 17 30.3 15.6V13.5C30.3 12.1 30.6 11 31.2 10.2C31.8 9.4 32.7 9 33.9 9ZM35 17.4C35.5 17.4 35.9 17.2 36.2 16.9C36.5 16.6 36.6 16 36.6 15.3V13.8C36.6 13.1 36.4 12.6 36.1 12.3C35.8 12 35.4 11.8 34.9 11.8C34.4 11.8 34 12 33.7 12.3C33.4 12.6 33.3 13.1 33.3 13.8V15.3C33.3 16 33.5 16.5 33.8 16.9C34.1 17.3 34.5 17.4 35 17.4Z" />
                    <path d="M45.3 9C46.7 9 47.7 9.4 48.5 10.1C49.3 10.8 49.7 11.9 49.7 13.3V14.6H43.1C43.1 15.3 43.3 15.8 43.6 16.1C43.9 16.4 44.4 16.6 45 16.6C45.6 16.6 46 16.5 46.3 16.3C46.6 16.1 46.7 15.8 46.7 15.4H49.7C49.6 16.6 49.1 17.5 48.3 18.1C47.5 18.7 46.4 19 45 19C43.5 19 42.3 18.6 41.5 17.8C40.7 17 40.3 15.8 40.3 14.2V13.8C40.3 12.3 40.7 11.1 41.5 10.3C42.3 9.5 43.5 9 45.3 9ZM45.2 11.5C44.7 11.5 44.3 11.6 44 11.9C43.7 12.2 43.5 12.6 43.3 13.2H46.8C46.8 12.6 46.6 12.2 46.3 11.9C46 11.6 45.6 11.5 45.2 11.5Z" />
                    <path d="M54.8 5.2V19.9H51.8V5.2H54.8Z" />
                    <path d="M56.6 7.2H59.6V9.2H61.2V11.8H59.6V16.1C59.6 16.5 59.7 16.8 59.8 16.9C59.9 17 60.2 17.1 60.6 17.1H61.2V19.9H59.6C58.4 19.9 57.6 19.7 57.1 19.2C56.6 18.7 56.4 18 56.4 16.9V11.8H55.3V9.2H56.5V7.2H56.6Z" />
                    <path d="M62.5 13.6C62.5 12.2 62.9 11 63.7 10.2C64.5 9.4 65.7 9 67.1 9C68.5 9 69.7 9.4 70.5 10.2C71.3 11 71.7 12.2 71.7 13.6C71.7 15 71.3 16.2 70.5 17C69.7 17.8 68.5 18.2 67.1 18.2C65.7 18.2 64.5 17.8 63.7 17C62.9 16.2 62.5 15 62.5 13.6ZM67.1 15.6C67.6 15.6 68 15.4 68.3 15.1C68.6 14.8 68.7 14.3 68.7 13.6C68.7 12.9 68.5 12.4 68.2 12.1C67.9 11.8 67.5 11.6 67 11.6C66.5 11.6 66.1 11.8 65.8 12.1C65.5 12.4 65.4 12.9 65.4 13.6C65.4 14.3 65.6 14.8 65.9 15.1C66.2 15.4 66.6 15.6 67.1 15.6Z" />
                    <path d="M76.9 15.3V16.9C76.9 17.4 77.3 17.6 78 17.6C78.7 17.6 79.1 17.4 79.1 16.9V9.2H82.1V16.9C82.1 17.7 81.8 18.3 81.2 18.8C80.6 19.3 79.7 19.5 78.5 19.5C77.3 19.5 76.4 19.3 75.8 18.8C75.2 18.3 74.9 17.7 74.9 16.9V15.3C74.9 14.6 74.7 14.1 74.4 13.8C74.1 13.5 73.6 13.3 73 13.3H72.5V9.2H73C73.6 9.2 74.1 9 74.4 8.7C74.7 8.4 74.9 7.9 74.9 7.2V5.6C74.9 4.8 75.2 4.2 75.8 3.7C76.4 3.2 77.3 3 78.5 3C79.7 3 80.6 3.2 81.2 3.7C81.8 4.2 82.1 4.8 82.1 5.6V13.4H79.1V5.6C79.1 5.1 78.7 4.9 78 4.9C77.3 4.9 76.9 5.1 76.9 5.6V7.2C76.9 7.7 76.5 7.9 75.8 7.9C75.1 7.9 74.7 8.1 74.7 8.6V13.9C74.7 14.4 75.1 14.6 75.8 14.6C76.5 14.7 76.9 14.9 76.9 15.3Z" />
                    <path d="M87.9 19.9V5.2H96.5V8.1H91.3V11H96.2V13.9H91.3V17H96.5V19.9H87.9Z" />
                    <path d="M100.3 5.2V19.9H96.9V5.2H100.3Z" />
                    <path d="M110.9 9C112 9 112.8 9.4 113.4 10.1V9.2H116.2V19.9H113.3V19C112.7 19.7 111.9 20.1 110.8 20.1C109.7 20.1 108.8 19.7 108.2 18.9C107.6 18.1 107.3 17 107.3 15.6V13.5C107.3 12.1 107.6 11 108.2 10.2C108.8 9.4 109.7 9 110.9 9ZM112 17.4C112.5 17.4 112.9 17.2 113.2 16.9C113.5 16.6 113.6 16 113.6 15.3V13.8C113.6 13.1 113.4 12.6 113.1 12.3C112.8 12 112.4 11.8 111.9 11.8C111.4 11.8 111 12 110.7 12.3C110.4 12.6 110.3 13.1 110.3 13.8V15.3C110.3 16 110.5 16.5 110.8 16.9C111.1 17.3 111.5 17.4 112 17.4Z" />
                    <path d="M117.4 5.2H120.4V7.2H117.4V5.2ZM117.4 9.2H120.4V19.9H117.4V9.2Z" />
                    <path d="M126 9C127.4 9 128.5 9.4 129.3 10.1C130.1 10.8 130.5 11.9 130.5 13.3V14.6H124C124 15.3 124.2 15.8 124.5 16.1C124.8 16.4 125.3 16.6 125.9 16.6C126.5 16.6 126.9 16.5 127.2 16.3C127.5 16.1 127.6 15.8 127.6 15.4H130.6C130.5 16.6 130 17.5 129.2 18.1C128.4 18.7 127.3 19 125.9 19C124.4 19 123.2 18.6 122.4 17.8C121.6 17 121.2 15.8 121.2 14.2V13.8C121.2 12.3 121.6 11.1 122.4 10.3C123.2 9.5 124.4 9 126 9ZM126 11.4C125.5 11.4 125.1 11.5 124.8 11.8C124.5 12.1 124.3 12.5 124.1 13.1H127.6C127.6 12.5 127.4 12.1 127.1 11.8C126.9 11.6 126.5 11.4 126 11.4Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image area with website examples carousel */}
          <div ref={imageRef} className="relative opacity-0 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl perspective">
            {/* Glassmorphism container */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-blue-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-white/10"></div>
            
            {/* Interactive floating elements */}
            <div className="absolute bottom-12 left-6 w-48 h-48 glass-morphism p-5 rounded-2xl shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-teal-500/20 backdrop-blur-lg bg-white/10 border border-white/20">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Design UI/UX</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-2">
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-teal-500 rounded-full"></div>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-5/6 bg-cyan-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xs text-gray-300">Progress</div>
                  <div className="text-xs font-semibold text-white">75%</div>
                </div>
              </div>
            </div>
            
            {/* Code snippet floating element */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-5 glass-morphism p-3 rounded-lg backdrop-blur-lg bg-gray-900/80 shadow-xl text-xs font-mono text-gray-200 w-44 transition-transform duration-500 hover:translate-x-1 border border-gray-700/50">
              <div className="mb-1 text-teal-400">.design-section {"{"}</div>
              <div className="pl-3 mb-1"><span className="text-blue-400">display:</span> flex;</div>
              <div className="pl-3 mb-1"><span className="text-blue-400">align-items:</span> center;</div>
              <div className="pl-3 mb-1"><span className="text-blue-400">justify-content:</span> space-between;</div>
              <div>{"}"}</div>
            </div>
            
            {/* Website examples carousel */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
              <Carousel className="w-full">
                <CarouselContent>
                  {websiteExamples.map((example) => (
                    <CarouselItem key={example.id}>
                      <AnimatedCard className="p-0 overflow-hidden border border-white/20 shadow-xl bg-black/30 backdrop-blur-md">
                        <div className="relative group">
                          <img 
                            src={example.image} 
                            alt={example.title}
                            className="w-full h-44 object-cover brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform group-hover:translate-y-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-white/20 backdrop-blur-sm p-1 rounded-md">
                                {example.icon}
                              </div>
                              <h3 className="text-white font-semibold text-lg">{example.title}</h3>
                            </div>
                            <p className="text-gray-200 text-sm mb-3">{example.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              {example.tags.map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs py-1 px-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/10 text-white border-white/20 hover:bg-white/20" />
                <CarouselNext className="right-2 bg-white/10 text-white border-white/20 hover:bg-white/20" />
              </Carousel>
            </div>
            
            {/* Small device preview with mockup */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="absolute right-6 top-10 glass-morphism p-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl transition-transform duration-500 hover:translate-x-1 hover:translate-y-1 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Site Responsif</div>
                      <div className="text-xs text-gray-300">Compatible tous écrans</div>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-white/10 backdrop-blur-xl border-white/20 text-white">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Design Responsive</h4>
                    <p className="text-xs text-gray-300">
                      Nos designs s'adaptent parfaitement à tous les formats d'écrans et appareils pour une expérience utilisateur optimale.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

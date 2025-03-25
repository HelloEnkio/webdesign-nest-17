
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import HeroWebsiteExample, { getWebsiteExamples } from './HeroWebsiteExample';

const HeroShowcase: React.FC<{ className: string }> = ({ className }) => {
  const websiteExamples = getWebsiteExamples();

  return (
    <div className={`${className} h-[400px] md:h-[500px] lg:h-auto relative`}>
      {/* Main showcase container */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-900/40 to-teal-900/40 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
        {/* Website examples carousel */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-10">
          <Carousel className="w-full">
            <CarouselContent>
              {websiteExamples.map((example) => (
                <HeroWebsiteExample key={example.id} example={example} />
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/10 text-white border-white/20 hover:bg-white/20" />
            <CarouselNext className="right-2 bg-white/10 text-white border-white/20 hover:bg-white/20" />
          </Carousel>
        </div>
        
        {/* Code snippet */}
        <div className="absolute bottom-10 right-4 p-3 rounded-lg backdrop-blur-lg bg-black/80 shadow-xl text-xs font-mono text-gray-200 w-44 border border-teal-900/70 z-20">
          <div className="mb-1 text-teal-300">.design-section {"{"}</div>
          <div className="pl-3 mb-1"><span className="text-cyan-300">display:</span> flex;</div>
          <div className="pl-3 mb-1"><span className="text-cyan-300">align-items:</span> center;</div>
          <div className="pl-3 mb-1"><span className="text-cyan-300">justify-content:</span> space-between;</div>
          <div>{"}"}</div>
        </div>
        
        {/* Site Responsive badge */}
        <div className="absolute top-10 right-4 p-4 rounded-xl backdrop-blur-lg bg-teal-900/30 border border-teal-500/30 shadow-xl z-20">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white">
              <CheckCircle size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Site Responsif</div>
              <div className="text-xs text-gray-200">Compatible tous écrans</div>
            </div>
          </div>
        </div>
        
        {/* Design UI/UX floating card */}
        <div className="absolute bottom-28 left-4 w-48 p-5 rounded-2xl shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-teal-500/30 backdrop-blur-lg bg-gradient-to-br from-teal-900/60 to-blue-900/60 border border-teal-500/20 z-10">
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
              <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-teal-500 rounded-full"></div>
              </div>
              <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-5/6 bg-cyan-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="text-xs text-gray-200">Progress</div>
              <div className="text-xs font-semibold text-white">75%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;

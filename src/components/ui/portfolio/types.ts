
export interface SlideData {
  title: string;
  src: string;
  category: string;
  description?: string;
  landingPageContent?: React.ReactNode;
  autoScroll?: boolean;
}

export interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

export interface PortfolioCarouselProps {
  slides: SlideData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

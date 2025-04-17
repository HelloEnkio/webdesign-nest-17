
/**
 * Utility functions for navigation that don't rely on React hooks
 * These can be safely used in event handlers and non-hook contexts
 */

export const scrollToSectionById = (
  sectionId: string, 
  isHomePage: boolean,
  navigate?: (path: string) => void
) => {
  // If not on home page and navigate function provided, use it
  if (!isHomePage && navigate) {
    navigate(`/#${sectionId}`);
    return;
  }

  // If on home page, scroll to the section
  document.documentElement.classList.add('smooth-scroll');
  
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    window.history.pushState(null, document.title, `#${sectionId}`);
  }
  
  setTimeout(() => {
    document.documentElement.classList.remove('smooth-scroll');
  }, 1000);
};

export const scrollToTop = (
  isHomePage: boolean,
  navigate?: (path: string) => void
) => {
  // If not on home page and navigate function provided, use it
  if (!isHomePage && navigate) {
    navigate('/');
    return;
  }

  // If on home page, scroll to top
  document.documentElement.classList.add('smooth-scroll');
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    document.documentElement.classList.remove('smooth-scroll');
  }, 1000);
  
  window.history.pushState(null, document.title, window.location.pathname);
};

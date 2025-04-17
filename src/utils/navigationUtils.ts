
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
  
  // Always update URL hash, regardless of whether the section is found
  // This ensures the hash is updated even when the target section is being lazy-loaded
  if (sectionId) {
    window.history.replaceState(null, document.title, `#${sectionId}`);
  }
  
  // After updating the URL, attempt to scroll to the section if it exists
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.log(`Section with id '${sectionId}' not found in DOM yet (possibly due to lazy loading)`);
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
  
  // Always update the URL to remove the hash, regardless of scroll success
  window.history.replaceState(null, document.title, window.location.pathname);
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    document.documentElement.classList.remove('smooth-scroll');
  }, 1000);
};

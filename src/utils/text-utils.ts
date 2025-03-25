
/**
 * Splits text into characters with support for unicode and emojis
 */
export const splitIntoCharacters = (text: string): string[] => {
  // Fallback for browsers that don't support Intl.Segmenter
  return Array.from(text);
};

/**
 * Prepares text elements for animation based on splitting strategy
 */
export const prepareTextElements = (
  text: string, 
  splitBy: "words" | "characters" | "lines" | string
): { characters: string[], needsSpace: boolean }[] => {
  if (splitBy === "characters") {
    const words = text.split(" ");
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }));
  }
  
  // For other splitting strategies
  const elements = splitBy === "words" 
    ? text.split(" ") 
    : splitBy === "lines" 
      ? text.split("\n") 
      : text.split(splitBy);
      
  return elements.map((el, i, arr) => ({
    characters: [el],
    needsSpace: i !== arr.length - 1,
  }));
};

/**
 * Calculates stagger delay for text animation
 */
export const getStaggerDelay = (
  index: number, 
  totalChars: number, 
  staggerFrom: "first" | "last" | "center" | number | "random",
  staggerDuration: number
): number => {
  if (staggerFrom === "first") return index * staggerDuration;
  if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
  if (staggerFrom === "center") {
    const center = Math.floor(totalChars / 2);
    return Math.abs(center - index) * staggerDuration;
  }
  if (staggerFrom === "random") {
    const randomIndex = Math.floor(Math.random() * totalChars);
    return Math.abs(randomIndex - index) * staggerDuration;
  }
  return Math.abs((staggerFrom as number) - index) * staggerDuration;
};

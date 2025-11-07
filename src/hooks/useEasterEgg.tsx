import { useEffect, useState } from 'react';

export const useEasterEgg = (sequence: string) => {
  const [isActive, setIsActive] = useState(false);
  const [inputSequence, setInputSequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only track letters, ignore special keys
      if (e.key.length === 1) {
        setInputSequence((prev) => {
          const newSequence = (prev + e.key.toLowerCase()).slice(-sequence.length);
          if (newSequence === sequence.toLowerCase()) {
            setIsActive(true);
          }
          return newSequence;
        });
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [sequence]);

  const reset = () => {
    setIsActive(false);
    setInputSequence('');
  };

  return { isActive, reset };
};

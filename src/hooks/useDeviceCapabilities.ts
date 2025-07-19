import { useState, useEffect } from 'react';

export function useEnableAnimations() {
  const [enableEffects, setEnableEffects] = useState(false);
  useEffect(() => {
    const mem = (navigator as any).deviceMemory ?? 4;
    if (mem >= 4 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnableEffects(true);
    }
  }, []);
  return enableEffects;
}

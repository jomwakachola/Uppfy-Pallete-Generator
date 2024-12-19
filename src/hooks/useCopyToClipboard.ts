import { useState, useCallback } from 'react';

export function useCopyToClipboard(duration = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }, [duration]);

  return { copied, copy };
}
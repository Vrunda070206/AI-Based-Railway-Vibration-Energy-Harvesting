import { useEffect, useState } from 'react';

export function useRealTime(interval: number = 30000) {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(Date.now());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return timestamp;
}

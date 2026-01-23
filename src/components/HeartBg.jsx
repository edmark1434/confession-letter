import React, { useMemo } from 'react';

const HeartBg = ({ count = 20 }) => { // Increased default count from 10 to 20
  // Memoize the random values so they don't regenerate on every re-render
  const hearts = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      // Increased size range from (15-45px) to (30-70px)
      size: `${30 + Math.random() * 40}px`,
      // Reduced delay from (0-5s) to (0-3s) for a faster show-up
      delay: `${Math.random() * 3}s`,
      // Reduced duration from (15-25s) to (8-15s) for faster movement
      duration: `${8 + Math.random() * 7}s`
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <ul className="hearts">
        {hearts.map((heart) => (
          <li
            key={heart.id}
            style={{
              left: heart.left,
              width: heart.size,
              height: heart.size,
              animationDelay: heart.delay,
              animationDuration: heart.duration
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default HeartBg;
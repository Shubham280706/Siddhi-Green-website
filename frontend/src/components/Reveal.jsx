import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const directionMap = {
  up: { x: 0, y: 56 },
  down: { x: 0, y: -56 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 },
};

export const Reveal = ({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  duration = 1.15,
  direction = 'up',
  distance,
  once = true,
  start = 'top 86%',
  end,
  scale = 0.965,
  blur = 14,
  ...props
}) => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const baseDirection = directionMap[direction] ?? directionMap.up;
    const axisOffset = distance ?? 56;
    const initialX =
      baseDirection.x === 0 ? 0 : Math.sign(baseDirection.x) * axisOffset;
    const initialY =
      baseDirection.y === 0 ? 0 : Math.sign(baseDirection.y) * axisOffset;

    const context = gsap.context(() => {
      gsap.set(element, {
        autoAlpha: 0,
        x: initialX,
        y: initialY,
        scale,
        filter: `blur(${blur}px)`,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity, filter',
      });

      gsap.to(element, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        delay: delay / 1000,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, element);

    return () => context.revert();
  }, [blur, delay, direction, distance, duration, end, once, scale, start]);

  return (
    <Component
      ref={elementRef}
      className={`gsap-reveal ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

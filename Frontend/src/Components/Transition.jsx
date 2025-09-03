import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Transition = ({ trigger }) => {
  const transitionRef1 = useRef(null);
  const transitionRef2 = useRef(null);

  useEffect(() => {
    if (trigger) {
      // Kill any existing animations on these elements
      gsap.killTweensOf(transitionRef1.current);
      gsap.killTweensOf(transitionRef2.current);
      gsap.set(transitionRef1.current, { display: 'block' });
      gsap.set(transitionRef2.current, { display: 'block' });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(transitionRef1.current, { display: 'none' });
          gsap.set(transitionRef2.current, { display: 'none' });
        }
      });
      // Second div (orange) animation at 0s
      tl.to(transitionRef2.current, {
        duration: 1.7,
        y: '-100vh',
        ease: 'expo.inOut'
      }, 0)
      // First div (black) animation at 0.6s
      .to(transitionRef1.current, {
        duration: 1.7,
        y: '-100vh',
        ease: 'expo.inOut'
      }, 0)
      // First div (black) slides back at 2.5s
      .to(transitionRef1.current, {
        duration: 2,
        y: '0',
        ease: 'expo.inOut'
      }, 1.4)
      // Second div (orange) slides back at 2.6s
      .to(transitionRef2.current, {
        duration: 2,
        y: '0',
        ease: 'expo.inOut'
      }, 1.5);
    }
  }, [trigger]);

  return (
    <>
      <div
        ref={transitionRef1}
        className="fixed bottom-[-100vh] left-0 w-full h-full bg-foreground z-[51] pointer-events-none"
      ></div>
      <div
        ref={transitionRef2}
        className="fixed  overflow-hidden tracking-tighter leading-0 text-center font-bold text-[50vh] bottom-[-100vh] left-0 w-full h-full bg-brand z-50 pointer-events-none"
      >
        $%#!$!%@^!%#^!%^&
      </div>
    </>
  );
};

export default Transition;

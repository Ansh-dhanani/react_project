import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Button = ({ variant = 'primary', size = 'medium', children, className = '', icon, ...props }) => {
  const buttonRef = useRef(null);
  const baseClasses = 'flex font-poppins outline-none overflow-hidden rounded-sm tracking-tighter leading-5 font-medium transition-colors duration-200 transform -translate-y-[0.8px]';

  const sizeClasses = {
    small: 'h-6 px-[0.5rem] py-[0.15rem] text-[0.9rem]',
    medium: 'h-7 px-[0.6rem] py-[0.2rem] text-[1rem]',
    large: 'h-8 px-[0.7rem] py-[0.25rem] text-[1.1rem]',
  };

  const gapSizes = {
    small: 'gap-[1px]',
    medium: 'gap-[1.5px]',
    large: 'gap-[2px]',
  };

  const iconSizes = {
    small: 'w-3 h-4',
    medium: 'w-4 h-5',
    large: 'w-5 h-6',
  };

  const yValues = {
    small: -16,
    medium: -18,
    large: 0,
  };

  const variants = {
    primary: 'bg-brand text-black uppercase hover:bg-brand-deep ',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 ',
    outline: 'border border-brand text-brand hover:bg-brand hover:text-white ',
    fullword: 'bg-brand text-black uppercase hover:bg-brand-deep ',
    backdrop: 'backdrop-blur-md border border-brand text-brand flex items-center justify-center hover:bg-brand hover:text-white',
    gradient: 'bg-gradient-to-r from-brand to-brand-dark text-white hover:from-brand-dark hover:to-brand-deep',
  };

  const variantClasses = variants[variant] || variants.primary;

  useEffect(() => {
    if (buttonRef.current) {
      const originalChars = buttonRef.current.querySelectorAll('.original-char');
      const hoverChars = buttonRef.current.querySelectorAll('.hover-char');

      gsap.set(hoverChars, { y: 18 });

      const handleMouseEnter = () => {
        gsap.to(originalChars, {
          y: yValues[size],
          duration: 0.4,
          stagger: 0.08,
          ease: "sine.inOut",
        });
      gsap.to(hoverChars, {
        y: yValues[size] + 2,
        duration: 0.4,
        stagger: 0.08,
        ease: 'sine.inOut'
      });
      };

      const handleMouseLeave = () => {
        gsap.to(originalChars, {
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'sine.inOut'
        });
        gsap.to(hoverChars, {
          y: 23,
          duration: 0.4,
          stagger: 0.08,
          ease: 'sine.inOut'
        });
      };

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [size]);

  const renderText = (text, className) => {
    if (typeof text === 'string') {
      return text.split(' ').map((word, index, array) => (
        <span key={index} className={className}>
          {word}{index < array.length - 1 ? ' ' : ''}
        </span>
      ));
    }
    return text;
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${sizeClasses[size]} ${gapSizes[size]} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className={`mr-[0.6px] mt-[-0.5px] ${iconSizes[size]}`}>{icon}</span>}
      <span className="relative ">
        <div className="mt-[-0.5px]">{renderText(children, "original-char relative inline-block")}</div>
        <div className="absolute inset-0 mt-[1rem] -z-10 ">
          {renderText(children, "hover-char   relative inline-block")}
        </div>
      </span>
    </button>
  );
};

export default Button;

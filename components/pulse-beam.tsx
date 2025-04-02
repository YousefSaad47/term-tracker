'use client';

import { motion } from 'motion/react';

const grad = {
  initial: {
    x1: '40%',
    x2: '50%',
    y1: '160%',
    y2: '180%',
  },
  animate: {
    x1: '0%',
    x2: '10%',
    y1: '-40%',
    y2: '-20%',
  },
};

export const PulseBeams = () => {
  return (
    <div className="absolute right-0 bottom-0">
      <SVGs />
    </div>
  );
};

export const SVGs = () => {
  return (
    <svg
      width="858"
      height="434"
      viewBox="0 0 858 434"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      <path
        d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="url(#grad)"
      />

      <defs>
        <motion.linearGradient
          variants={grad}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            repeatDelay: 0,
            delay: 2,
          }}
          id="grad"
        >
          <GradientColors />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
const GradientColors = () => {
  return (
    <>
      <stop stopColor="#18CCFC" stopOpacity="0"></stop>
      <stop stopColor="#18CCFC"></stop>
      <stop offset="0.325" stopColor="#6344F5"></stop>
      <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
    </>
  );
};

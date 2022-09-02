import React from 'react';
import { style, keyframes } from 'typestyle';

const preloaderStyle = style({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: '9999',
  overflow: 'hidden',
  background: '#fff',

  $nest: {
    '&::before': {
      content: `''`,
      position: 'fixed !important',
      top: 'calc(50% - 50px)',
      left: 'calc(50% - 50px)',
      border: '6px solid #17a2b8',
      borderTopColor: '#fff',
      borderBottomColor: '#fff',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationName: keyframes({
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      }),
    },
  },
});

const Preloader = () => {
  return <div className={`${preloaderStyle}`}></div>;
};

export default Preloader;

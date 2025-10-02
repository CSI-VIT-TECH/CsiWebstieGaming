'use client'
import React, { useEffect, useRef, useState } from 'react';

const ScrollFrameAnimation = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  
  // Configuration
  const TOTAL_FRAMES = 82;
  const SCROLL_SPEED = 15; // Fixed scroll speed per wheel event
  const THROTTLE_MS = 1 ; // ~60fps throttling
  const MAX_SCROLL_POSITION = TOTAL_FRAMES * 100; // Total scroll distance
  
  // Generate frame paths
  const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const frameNumber = String(i + 1).padStart(3, '0');
    return `/ezgif-split/ezgif-frame-${frameNumber}.jpg`;
  });
  
  const [currentFrame, setCurrentFrame] = useState(0);

  // Calculate and update current frame based on scroll position
  const updateFrame = () => {
    const progress = scrollPositionRef.current / MAX_SCROLL_POSITION;
    const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
    const clampedFrame = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));
    
    if (clampedFrame !== currentFrame) {
      setCurrentFrame(clampedFrame);
      
      // Update image src directly for better performance
      if (imageRef.current) {
        imageRef.current.src = frames[clampedFrame];
      }
    }
  };

  // Throttled frame update function
  const throttledUpdateFrame = () => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current >= THROTTLE_MS) {
      lastUpdateTimeRef.current = now;
      updateFrame();
    }
  };

  // Wheel event handler with locked scroll speed
  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Get wheel delta (normalize for different browsers/devices)
    const delta = event.deltaY || event.detail || event.wheelDelta;
    const normalizedDelta = Math.sign(delta);
    
    // Update scroll position with fixed speed
    scrollPositionRef.current += normalizedDelta * SCROLL_SPEED;
    
    // Clamp scroll position to bounds
    scrollPositionRef.current = Math.max(0, Math.min(scrollPositionRef.current, MAX_SCROLL_POSITION));
    
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Schedule throttled frame update
    animationFrameRef.current = requestAnimationFrame(throttledUpdateFrame);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add wheel event listener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add touch events for mobile support
    let touchStartY = 0;
    
    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };
    
    const handleTouchMove = (event) => {
      event.preventDefault();
      const touchCurrentY = event.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      
      // Simulate wheel event with touch delta
      const normalizedDelta = Math.sign(deltaY);
      scrollPositionRef.current += normalizedDelta * SCROLL_SPEED * 0.5; // Slower for touch
      scrollPositionRef.current = Math.max(0, Math.min(scrollPositionRef.current, MAX_SCROLL_POSITION));
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(throttledUpdateFrame);
      
      touchStartY = touchCurrentY;
    };
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initialize first frame
    updateFrame();

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ 
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'none' // Prevent default touch behaviors
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main frame image */}
        <img
          ref={imageRef}
          src={frames[0]}
          alt={`Frame ${currentFrame + 1}`}
          className="max-w-full max-h-full object-contain"
          style={{ 
            pointerEvents: 'none',
            userSelect: 'none',
            draggable: false
          }}
        />
        
        {/* Frame counter and progress */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg font-mono">
          <div className="text-sm">
            Frame: {currentFrame + 1} / {TOTAL_FRAMES}
          </div>
          <div className="text-xs mt-1 opacity-70">
            Progress: {Math.round((scrollPositionRef.current / MAX_SCROLL_POSITION) * 100)}%
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-4 right-4 w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ 
              width: `${(scrollPositionRef.current / MAX_SCROLL_POSITION) * 100}%` 
            }}
          />
        </div>
        
        {/* Instructions */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          <div className="text-sm font-medium">Scroll to control animation</div>
          <div className="text-xs mt-1 opacity-70">Locked scroll speed for precise frame control</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollFrameAnimation;

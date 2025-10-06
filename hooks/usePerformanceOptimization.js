// Performance utilities for ScrollFrameAnimation
// hooks/usePerformanceOptimization.js

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for optimized scroll handling with RAF throttling
 * Prevents excessive scroll event firing and ensures 60fps performance
 */
export const useOptimizedScroll = (callback, deps = []) => {
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const callbackRef = useRef(callback);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  const throttledCallback = useCallback((event) => {
    const now = performance.now();
    
    // Throttle to 60fps (16.67ms)
    if (now - lastTimeRef.current >= 16.67) {
      lastTimeRef.current = now;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        callbackRef.current(event);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

/**
 * Hook for smooth value interpolation using easing functions
 * Provides buttery smooth animations similar to Apple's interfaces
 */
export const useSmoothInterpolation = (targetValue, options = {}) => {
  const {
    duration = 0.15,
    easing = 'easeOutCubic',
    onUpdate = () => {},
    precision = 0.01
  } = options;

  const currentValueRef = useRef(targetValue);
  const rafRef = useRef(null);

  const easingFunctions = {
    linear: (t) => t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  const animate = useCallback(() => {
    const distance = targetValue - currentValueRef.current;
    
    if (Math.abs(distance) > precision) {
      const easingFunc = easingFunctions[easing] || easingFunctions.easeOutCubic;
      const step = distance * duration;
      
      currentValueRef.current += step;
      onUpdate(currentValueRef.current);
      
      rafRef.current = requestAnimationFrame(animate);
    } else {
      currentValueRef.current = targetValue;
      onUpdate(currentValueRef.current);
    }
  }, [targetValue, duration, easing, onUpdate, precision]);

  useEffect(() => {
    animate();
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return currentValueRef.current;
};

/**
 * High-performance image preloader with batch loading and progress tracking
 * Optimized for large image sequences without blocking the main thread
 */
export const useImagePreloader = (imageUrls, options = {}) => {
  const {
    batchSize = 10,
    onProgress = () => {},
    onComplete = () => {},
    onError = () => {},
  } = options;

  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);

  const loadImageBatch = useCallback(async (startIndex, endIndex) => {
    const promises = [];
    
    for (let i = startIndex; i < Math.min(endIndex, imageUrls.length); i++) {
      promises.push(new Promise((resolve) => {
        const img = new Image();
        
        // Performance optimizations
        img.decoding = 'async';
        img.loading = 'eager';
        
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCountRef.current++;
          
          const progress = (loadedCountRef.current / imageUrls.length) * 100;
          onProgress(progress, loadedCountRef.current, imageUrls.length);
          
          if (loadedCountRef.current === imageUrls.length) {
            onComplete(imagesRef.current);
          }
          
          resolve(img);
        };
        
        img.onerror = (error) => {
          loadedCountRef.current++;
          onError(error, imageUrls[i]);
          resolve(null);
        };
        
        img.src = imageUrls[i];
      }));
    }
    
    return Promise.all(promises);
  }, [imageUrls, onProgress, onComplete, onError]);

  const loadAllImages = useCallback(async () => {
    imagesRef.current = new Array(imageUrls.length);
    loadedCountRef.current = 0;
    
    // Load first batch immediately
    await loadImageBatch(0, batchSize);
    
    // Load remaining batches with small delays
    let currentBatch = 1;
    while (currentBatch * batchSize < imageUrls.length) {
      // Small delay to prevent blocking
      await new Promise(resolve => setTimeout(resolve, 50));
      await loadImageBatch(currentBatch * batchSize, (currentBatch + 1) * batchSize);
      currentBatch++;
    }
  }, [imageUrls, batchSize, loadImageBatch]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      loadAllImages();
    }
  }, [loadAllImages]);

  return {
    images: imagesRef.current,
    loadedCount: loadedCountRef.current,
    isComplete: loadedCountRef.current === imageUrls.length,
    progress: (loadedCountRef.current / imageUrls.length) * 100
  };
};

/**
 * Viewport intersection observer for performance optimization
 * Pauses expensive operations when elements are not visible
 */
export const useIntersectionObserver = (elementRef, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    onIntersect = () => {},
    onLeave = () => {},
  } = options;

  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasIntersecting = isIntersectingRef.current;
          isIntersectingRef.current = entry.isIntersecting;
          
          if (entry.isIntersecting && !wasIntersecting) {
            onIntersect(entry);
          } else if (!entry.isIntersecting && wasIntersecting) {
            onLeave(entry);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold, rootMargin, onIntersect, onLeave]);

  return isIntersectingRef.current;
};

/**
 * High-DPI canvas optimization hook
 * Ensures crisp rendering on retina and high-DPI displays
 */
export const useHighDPICanvas = (canvasRef, width, height) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Set actual size in memory (scaled for high-DPI)
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    
    // Scale the drawing context back down
    context.scale(pixelRatio, pixelRatio);
    
    // Set CSS size to maintain correct display size
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Optimize context settings
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    return () => {
      // Cleanup if needed
      context.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [width, height]);
};

/**
 * Memory management hook for large image sequences
 * Implements smart caching and cleanup to prevent memory leaks
 */
export const useImageMemoryManager = (images, maxCacheSize = 100) => {
  const cacheRef = useRef(new Map());
  const usageRef = useRef(new Map());

  const getImage = useCallback((index) => {
    if (!images[index]) return null;
    
    // Update usage tracking
    usageRef.current.set(index, Date.now());
    
    // Return cached image if available
    if (cacheRef.current.has(index)) {
      return cacheRef.current.get(index);
    }
    
    // Add to cache
    cacheRef.current.set(index, images[index]);
    
    // Cleanup old cache entries if over limit
    if (cacheRef.current.size > maxCacheSize) {
      const sortedByUsage = Array.from(usageRef.current.entries())
        .sort((a, b) => a[1] - b[1]);
      
      const toRemove = sortedByUsage.slice(0, cacheRef.current.size - maxCacheSize);
      toRemove.forEach(([key]) => {
        cacheRef.current.delete(key);
        usageRef.current.delete(key);
      });
    }
    
    return images[index];
  }, [images, maxCacheSize]);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    usageRef.current.clear();
  }, []);

  return { getImage, clearCache, cacheSize: cacheRef.current.size };
};
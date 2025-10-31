"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useId, useCallback, useMemo } from "react";
import { Gemini, Midjourney, N8n, OpenAI, Claude, DeepSeek, DeepMind, Flux, Mistral, OpenChat, Qwen, Cursor, GithubCopilot, LangChain, MCP, Replit } from '@lobehub/icons';
import useSound from 'use-sound';

// Icon component type for better type safety
type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

// Default content arrays - stable references
const DEFAULT_ICONS: IconComponent[] = [OpenAI, Claude.Color, Gemini.Color, Midjourney, N8n.Color, DeepSeek.Color, DeepMind.Color, Flux, Mistral.Color, OpenChat.Color, Qwen.Color, Cursor, GithubCopilot, LangChain.Color, MCP, Replit.Color];
const DEFAULT_HOVER_ICONS: IconComponent[] = [OpenAI, Claude.Color, Gemini.Color, Midjourney, N8n.Color, DeepSeek.Color, DeepMind.Color, Flux, Mistral.Color, OpenChat.Color, Qwen.Color, Cursor, GithubCopilot, LangChain.Color, MCP, Replit.Color];

interface InteractiveAnimatedGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  numAnimatedSquares?: number;
  animationDuration?: number;
  maxOpacity?: number;
  enableHover?: boolean;
  hoverTransitionDuration?: number;
  icons?: IconComponent[];
  hoverIcons?: IconComponent[];
  className?: string;
  baseSquareClassName?: string;
  animatedSquareClassName?: string;
}

interface AnimatedSquare {
  id: number;
  x: number;
  y: number;
  icon: IconComponent;
}

export function InteractiveAnimatedGridPattern({
  width = 40,
  height = 40,
  squares = [20, 12], // Reduced from [24, 24] to [20, 12] = 240 instead of 576 elements
  numAnimatedSquares = 15, // Reduced from 20 to 15
  animationDuration = 3,
  maxOpacity = 0.6,
  enableHover = true,
  hoverTransitionDuration = 200,
  icons = DEFAULT_ICONS,
  hoverIcons = DEFAULT_HOVER_ICONS,
  className,
  baseSquareClassName,
  animatedSquareClassName,
  // Filter out props that shouldn't be passed to DOM
  hoverPersistDuration,
  avoidHoverZones,
  maxIconsPerSquare,
  emojis,
  hoverEmojis,
  animationDelay,
  ...props
}: InteractiveAnimatedGridPatternProps & {
  hoverPersistDuration?: number;
  avoidHoverZones?: boolean;
  maxIconsPerSquare?: number;
  emojis?: string[];
  hoverEmojis?: string[];
  animationDelay?: number;
}) {
  const id = useId();
  const [horizontal, vertical] = squares;
  const [animatedSquares, setAnimatedSquares] = useState<AnimatedSquare[]>([]);
  const [hoveredSquares, setHoveredSquares] = useState<Set<number>>(new Set());
  const [restartKey, setRestartKey] = useState(0);
  const hoverTimeoutRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  
  // Professional audio management - sound engineering approach
  const lastSoundTimeRef = useRef<number>(0);
  const soundThrottleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const SOUND_THROTTLE_MS = 100; // Minimum 200ms between sounds for clarity
  
  // Sound effect for hover
  const [playHoverSound] = useSound('/sounds/boop-silvio.mp3', { 
    volume: 0.008,
    onload: () => {
      // Sound is loaded and ready
      setSoundUnlocked(true);
    }
  });

  // Global audio unlock system - unlocks on ANY user interaction
  useEffect(() => {
    const unlockAudioGlobally = () => {
      if (!soundUnlocked) {
        // Try to play a silent sound to unlock audio context
        try {
          playHoverSound();
          setSoundUnlocked(true);
        } catch {
          // Ignore errors, will try again on next interaction
        }
      }
    };

    // Listen for various user interactions to unlock audio
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    
    events.forEach(event => {
      document.addEventListener(event, unlockAudioGlobally, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, unlockAudioGlobally);
      });
    };
  }, [soundUnlocked, playHoverSound]);

  // Generate random position
  const getRandomPosition = useCallback(() => ({
    x: Math.floor(Math.random() * horizontal),
    y: Math.floor(Math.random() * vertical),
  }), [horizontal, vertical]);

  // Generate random icon
  const getRandomIcon = useCallback((): IconComponent => {
    const iconArray = icons.length > 0 ? icons : DEFAULT_ICONS;
    return iconArray[Math.floor(Math.random() * iconArray.length)]!;
  }, [icons]);

  // Create animated squares
  const createAnimatedSquares = useCallback(() => {
    return Array.from({ length: numAnimatedSquares }, (_, i) => {
      const { x, y } = getRandomPosition();
      return {
        id: i,
        x,
        y,
        icon: getRandomIcon(),
      };
    });
  }, [numAnimatedSquares, getRandomPosition, getRandomIcon]);

  // Update square position after animation
  const updateSquarePosition = useCallback((squareId: number) => {
    setAnimatedSquares(prev => prev.map(square => 
      square.id === squareId 
        ? { ...square, ...getRandomPosition(), icon: getRandomIcon() }
        : square
    ));
  }, [getRandomPosition, getRandomIcon]);

  // Professional audio throttling system - prevents audio clipping and ensures clean playback
  const playThrottledSound = useCallback(() => {
    if (!soundUnlocked) return;
    
    const now = Date.now();
    const timeSinceLastSound = now - lastSoundTimeRef.current;
    
    // Clear any pending throttled sound
    if (soundThrottleTimeoutRef.current) {
      clearTimeout(soundThrottleTimeoutRef.current);
      soundThrottleTimeoutRef.current = null;
    }
    
    if (timeSinceLastSound >= SOUND_THROTTLE_MS) {
      // Enough time has passed, play immediately
      lastSoundTimeRef.current = now;
      playHoverSound();
    } else {
      // Schedule sound to play after throttle period
      const remainingTime = SOUND_THROTTLE_MS - timeSinceLastSound;
      soundThrottleTimeoutRef.current = setTimeout(() => {
        lastSoundTimeRef.current = Date.now();
        playHoverSound();
        soundThrottleTimeoutRef.current = null;
      }, remainingTime);
    }
  }, [soundUnlocked, playHoverSound]);

  // Unlock audio on first interaction
  // const unlockAudio = useCallback(() => {
  //   if (!soundUnlocked) {
  //     lastSoundTimeRef.current = Date.now();
  //     playHoverSound();
  //     setSoundUnlocked(true);
  //   }
  // }, [soundUnlocked, playHoverSound]);

  // Handle hover with professional audio management
  const handleSquareHover = useCallback((index: number, isEntering: boolean) => {
    // Clear existing timeout
    const existingTimeout = hoverTimeoutRef.current.get(index);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      hoverTimeoutRef.current.delete(index);
    }

    if (isEntering) {
      // Play sound with throttling (audio will be unlocked globally)
      playThrottledSound();
      setHoveredSquares(prev => new Set([...prev, index]));
    } else {
      // Delay removal for smoother UX
      const timeoutId = setTimeout(() => {
        setHoveredSquares(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        hoverTimeoutRef.current.delete(index);
      }, 300);
      hoverTimeoutRef.current.set(index, timeoutId);
    }
  }, [playThrottledSound]);

  // Initialize animated squares
  useEffect(() => {
    if (numAnimatedSquares > 0) {
      setAnimatedSquares(createAnimatedSquares());
    }
  }, [numAnimatedSquares, createAnimatedSquares]);

  // Restart animations when window becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && numAnimatedSquares > 0) {
        setRestartKey(prev => prev + 1);
        setAnimatedSquares(createAnimatedSquares());
      }
    };

    const handleFocus = () => {
      if (numAnimatedSquares > 0) {
        setTimeout(() => {
          setRestartKey(prev => prev + 1);
          setAnimatedSquares(createAnimatedSquares());
        }, 200);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [numAnimatedSquares, createAnimatedSquares]);

  // Periodic animation health check (fallback) - ensures animations never stop
  useEffect(() => {
    if (numAnimatedSquares === 0) return;

    const healthCheckInterval = setInterval(() => {
      // Only restart if page is visible and has been idle for a while
      if (!document.hidden) {
        setRestartKey(prev => prev + 1);
        setAnimatedSquares(createAnimatedSquares());
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(healthCheckInterval);
  }, [numAnimatedSquares, createAnimatedSquares]);

  // Cleanup timeouts and audio throttling
  useEffect(() => {
    const timeoutMap = hoverTimeoutRef.current;
    return () => {
      // Clear all hover timeouts
      timeoutMap.forEach(timeout => clearTimeout(timeout));
      timeoutMap.clear();
      
      // Clear audio throttle timeout
      if (soundThrottleTimeoutRef.current) {
        clearTimeout(soundThrottleTimeoutRef.current);
        soundThrottleTimeoutRef.current = null;
      }
    };
  }, []);

  const gridWidth = width * horizontal;
  const gridHeight = height * vertical;

  // Memoize grid squares to prevent unnecessary re-renders
  const gridSquares = useMemo(() => {
    if (!enableHover) return [];
    return Array.from({ length: horizontal * vertical }, (_, index) => {
      const x = (index % horizontal) * width;
      const y = Math.floor(index / horizontal) * height;
      return { index, x, y };
    });
  }, [horizontal, vertical, width, height, enableHover]);

  // Memoize hover icons to prevent recreation
  const memoizedHoverIcons = useMemo(() => {
    return hoverIcons.length > 0 ? hoverIcons : DEFAULT_HOVER_ICONS;
  }, [hoverIcons]);

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <svg
        width={gridWidth}
        height={gridHeight}
        className="absolute inset-0 h-full w-full"
        {...props}
      >
        {/* Grid pattern */}
        <defs>
          <pattern
            id={`${id}-grid`}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />

        {/* Interactive hover squares - optimized with memoized data */}
        {gridSquares.map(({ index, x, y }) => {
          const isHovered = hoveredSquares.has(index);
          
          return (
            <rect
              key={`base-${index}`}
              x={x}
              y={y}
              width={width}
              height={height}
              className={cn(
                "stroke-transparent cursor-pointer transition-all duration-300",
                isHovered ? "fill-current opacity-30" : "fill-transparent opacity-0",
                baseSquareClassName,
              )}
              onMouseEnter={() => handleSquareHover(index, true)}
              onMouseLeave={() => handleSquareHover(index, false)}
              rx={2}
            />
          );
        })}

        {/* Animated squares */}
        {animatedSquares.map((square, index) => (
          <motion.rect
            key={`animated-${restartKey}-${square.x}-${square.y}-${square.id}`}
            width={width}
            height={height}
            x={square.x * width}
            y={square.y * height}
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration: animationDuration,
              repeat: 1,
              delay: index * 0.15,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            onAnimationComplete={() => updateSquarePosition(square.id)}
            className={cn("drop-shadow-sm", animatedSquareClassName)}
            rx={2}
          />
        ))}
      </svg>

      {/* Hover content - optimized to only render hovered squares */}
      {gridSquares
        .filter(({ index }) => hoveredSquares.has(index))
        .map(({ index, x, y }) => {
          const HoverIcon = memoizedHoverIcons[index % memoizedHoverIcons.length];
          
          return (
            <div
              key={`hover-${index}`}
              className="absolute pointer-events-none flex items-center justify-center transition-all ease-out opacity-100 scale-125 z-10"
              style={{
                left: x,
                top: y,
                width: width,
                height: height,
                transitionDuration: `${hoverTransitionDuration}ms`,
              }}
            >
              {React.createElement(HoverIcon!, {
                size: Math.min(width, height) * 0.5,
                className: "text-white drop-shadow-xl"
              })}
            </div>
          );
        })}

      {/* Animated content */}
      {animatedSquares.map((square, index) => {
        const Icon = square.icon;
        return (
          <motion.div
            key={`content-${restartKey}-${square.x}-${square.y}-${square.id}`}
            className="absolute pointer-events-none flex items-center justify-center"
            style={{
              left: square.x * width,
              top: square.y * height,
              width: width,
              height: height,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.15 + 0.2,
              duration: 0.3,
              ease: "backOut",
            }}
          >
            <Icon 
              size={Math.min(width, height) * 0.6}
              className="text-white drop-shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
} 
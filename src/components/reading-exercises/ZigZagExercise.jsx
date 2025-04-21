import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, Tooltip, Paper } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const ZigZagExercise = ({ 
  speed = 440,
  timer = 60,
  isStarted = false,
  isPaused = false,
  isFinished = false,
  theme = "Light",
  fontSize = "Medium",
  fontType = "GoogleSans",
  direction = "horizontal" 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [position, setPosition] = useState(0);
  
  // Calculate speed factor from the input speed (WPM)
  const getSpeedFactor = () => {
    // Map speed from 100-1000 to 0.5-5
    return 0.5 + (speed - 100) * (4.5 / 900);
  };
  
  // Reset position when exercise finishes
  useEffect(() => {
    if (isFinished) {
      setPosition(0); // Reset to starting position
    }
  }, [isFinished]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawZigZag(ctx, position);
    };
    
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  // Draw the zigzag path
  const drawZigZag = (ctx, currentPosition) => {
    if (!ctx) return;
    
    const { width, height } = ctx.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const padding = 30;
    const zigzagWidth = direction === "horizontal" ? width - (padding * 2) : height - (padding * 2);
    const zigzagHeight = direction === "horizontal" ? height - (padding * 2) : width - (padding * 2);
    const numberOfZigzags = 4;
    const zigzagStep = zigzagWidth / (numberOfZigzags * 2);
    
    // Set zigzag line style
    ctx.strokeStyle = '#FF8C00'; // Orange color
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Start position
    let startX = direction === "horizontal" ? padding : padding;
    let startY = direction === "horizontal" ? padding : padding;
    
    if (direction === "horizontal") {
      // Draw horizontal zigzag
      ctx.moveTo(startX, startY);
      
      for (let i = 0; i < numberOfZigzags; i++) {
        // Draw zigzag segment (up)
        ctx.lineTo(startX + zigzagStep, startY + zigzagHeight);
        startX += zigzagStep;
        
        // Draw zigzag segment (down)
        ctx.lineTo(startX + zigzagStep, startY);
        startX += zigzagStep;
      }
    } else {
      // Draw vertical zigzag
      ctx.moveTo(startX, startY);
      
      for (let i = 0; i < numberOfZigzags; i++) {
        // Draw zigzag segment (right)
        ctx.lineTo(startX + zigzagHeight, startY + zigzagStep);
        startY += zigzagStep;
        
        // Draw zigzag segment (left)
        ctx.lineTo(startX, startY + zigzagStep);
        startY += zigzagStep;
      }
    }
    
    ctx.stroke();
    
    // Calculate position on the zigzag
    if (direction === "horizontal") {
      const totalPathLength = zigzagWidth;
      const pathPosition = (currentPosition * totalPathLength) % totalPathLength;
      let x = 0;
      let y = 0;
      let currentPathLength = 0;
      
      // Calculate the position along the path
      for (let i = 0; i < numberOfZigzags; i++) {
        const segmentLength = zigzagStep;
        
        // First segment (up)
        if (currentPathLength <= pathPosition && pathPosition < currentPathLength + segmentLength) {
          const t = (pathPosition - currentPathLength) / segmentLength;
          x = padding + i * 2 * zigzagStep + t * zigzagStep;
          y = padding + t * zigzagHeight;
          break;
        }
        currentPathLength += segmentLength;
        
        // Second segment (down)
        if (currentPathLength <= pathPosition && pathPosition < currentPathLength + segmentLength) {
          const t = (pathPosition - currentPathLength) / segmentLength;
          x = padding + i * 2 * zigzagStep + zigzagStep + t * zigzagStep;
          y = padding + zigzagHeight - t * zigzagHeight;
          break;
        }
        currentPathLength += segmentLength;
      }
      
      // Draw the moving dot
      ctx.fillStyle = '#000000'; // Black dot
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const totalPathLength = zigzagWidth;
      const pathPosition = (currentPosition * totalPathLength) % totalPathLength;
      let x = 0;
      let y = 0;
      let currentPathLength = 0;
      
      // Calculate the position along the path
      for (let i = 0; i < numberOfZigzags; i++) {
        const segmentLength = zigzagStep;
        
        // First segment (right)
        if (currentPathLength <= pathPosition && pathPosition < currentPathLength + segmentLength) {
          const t = (pathPosition - currentPathLength) / segmentLength;
          x = padding + t * zigzagHeight;
          y = padding + i * 2 * zigzagStep + t * zigzagStep;
          break;
        }
        currentPathLength += segmentLength;
        
        // Second segment (left)
        if (currentPathLength <= pathPosition && pathPosition < currentPathLength + segmentLength) {
          const t = (pathPosition - currentPathLength) / segmentLength;
          x = padding + zigzagHeight - t * zigzagHeight;
          y = padding + i * 2 * zigzagStep + zigzagStep + t * zigzagStep;
          break;
        }
        currentPathLength += segmentLength;
      }
      
      // Draw the moving dot
      ctx.fillStyle = '#000000'; // Black dot (changed to match horizontal)
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  // Animation loop
  useEffect(() => {
    if (!isStarted || isPaused || isFinished) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    let startTime = null;
    let lastTime = 0;
    const speedFactor = getSpeedFactor();
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      
      lastTime = elapsedTime;
      
      // Update position based on speed
      setPosition(prev => prev + 0.001 * speedFactor);
      
      // Continue animation only if not paused
      if (isStarted && !isPaused && !isFinished) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isStarted, isPaused, isFinished, speed]);
  
  // Draw whenever position changes or direction changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawZigZag(ctx, position);
    }
  }, [position, direction]);
  
  // Get background color based on theme
  const getBackgroundColor = () => {
    switch(theme) {
      case "Dark": return "#222";
      case "Sepia": return "#f8f4e5";
      default: return "#fff";
    }
  };
  
  // Get text color based on theme
  const getTextColor = () => {
    return theme === "Dark" ? "#fff" : "#333";
  };
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: getBackgroundColor(),
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Box sx={{
        flex: 1,
        p: 2,
        position: 'relative'
      }}>
        <Box 
          sx={{
            width: '100%',
            height: '100%',
            border: '1px solid #ddd',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <canvas 
            ref={canvasRef} 
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: getBackgroundColor()
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ZigZagExercise;
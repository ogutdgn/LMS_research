import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import SettingsPopup from './SettingsPopup';

// title = "ZigZag",
// exerciseComponent,
// hasSound = false,
// availableSettings = {
//   speed: true,
//   duration: true,
//   direction: true,
//   wordCount: false,
//   articleDifficulty: false,
//   countdown: false,
//   theme: false,
//   fontSize: false,
//   fontType: false,
//   highlightColor: false
// },
// defaultTimer = 60, // Changed default to 1 minute
// defaultSpeed = 440

const ExerciseLayout = ({
  title = "Not Found",
  exerciseComponent,
  hasSound = false,
  availableSettings = {
    speed: true,
    duration: true,
    direction: true,
    wordCount: false,
    articleDifficulty: false,
    countdown: false,
    theme: false,
    fontSize: false,
    fontType: false,
    highlightColor: false
  },
  defaultTimer = 60, // Changed default to 1 minute
  defaultSpeed = 440
}) => {
    // title = "asmdfklasnfaklsjfn"
  const theme = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [timer, setTimer] = useState(defaultTimer);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [settings, setSettings] = useState({
    speed: defaultSpeed,
    wordCount: 3,
    selectedTheme: "Light",
    fontSize: "Medium",
    fontType: "GoogleSans",
    highlightColor: "Blue",
    articleDifficulty: "Hard",
    countdown: false,
    direction: "horizontal",
    duration: defaultTimer // Add duration setting
  });
  const [timerInterval, setTimerInterval] = useState(null);

  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle settings dialog
  const toggleSettings = () => {
    if (!isStarted || isPaused) {
      setShowSettings(!showSettings);
    }
  };

  // Handle settings changes
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });

    // Update timer when duration is changed
    if (setting === 'duration') {
      setTimer(value);
    }
  };

  // Handle start/pause/resume
  const handleExerciseControl = () => {
    if (isFinished) {
      // Reset exercise
      setIsFinished(false);
      setTimer(settings.duration);
      setIsStarted(true);
      setIsPaused(false);
    } else if (!isStarted) {
      // Start the exercise
      setIsStarted(true);
      setIsPaused(false);
    } else if (isPaused) {
      // Resume the exercise
      setIsPaused(false);
    } else {
      // Pause the exercise
      setIsPaused(true);
    }
  };

  // Timer management
  useEffect(() => {
    if (isStarted && !isPaused) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsStarted(false);
            setIsFinished(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setTimerInterval(interval);

      return () => clearInterval(interval);
    } else if (isPaused && timerInterval) {
      clearInterval(timerInterval);
    }
  }, [isStarted, isPaused]);

  // Reset timer if defaultTimer changes
  useEffect(() => {
    setTimer(defaultTimer);
    setSettings(prev => ({
      ...prev,
      duration: defaultTimer
    }));
  }, [defaultTimer]);

  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #ddd'
      }}>
        <Typography variant="h6" component="div" sx={{
          color: '#4682B4',
          fontWeight: 'bold',
          fontSize: '1.3rem'
        }}>
          AccelRead<sup>®</sup>
        </Typography>

        <Typography variant="body1" component="div">
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            disabled={!hasSound}
            title={hasSound ? "Toggle sound" : "No sound for this exercise"}
            sx={{ opacity: hasSound ? 1 : 0.5 }}
          >
            {hasSound ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          <IconButton 
            onClick={toggleSettings}
            disabled={isStarted && !isPaused} // Disable settings button during exercise
            sx={{ opacity: (isStarted && !isPaused) ? 0.5 : 1 }}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        pb: '15%' // Add bottom padding for 15% of space
      }}>
        <Box sx={{
          width: '100%',
          height: '100%', // Height reduced to leave bottom space
          display: 'flex',
          flexDirection: 'column',
          p: 0,
          position: 'relative'
        }}>
          {/* Main exercise container */}
          <Box sx={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '100%',
            border: 'none',
            overflow: 'hidden',
            mx: 'auto',
            my: 2,
          }}>
            {/* Exercise content area */}
            <Box sx={{
              width: 'calc(100% - 250px)', // Make room for the sidebar
              height: '100%',
              position: 'relative',
            }}>
              {/* Exercise component */}
              {exerciseComponent && React.cloneElement(exerciseComponent, {
                speed: settings.speed,
                timer,
                isStarted,
                isPaused,
                isFinished,
                theme: settings.selectedTheme,
                fontSize: settings.fontSize,
                fontType: settings.fontType,
                highlightColor: settings.highlightColor,
                direction: settings.direction || "horizontal"
              })}
            </Box>

            {/* Sidebar - Positioned at right side of the exercise container */}
            <Box
              sx={{
                width: '250px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* Show timer and control button in sidebar */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2
              }}>
                <Typography variant="caption" color="text.secondary">
                  Remaining Time
                </Typography>
                <Typography variant="h4" sx={{ my: 2 }}>
                  {formatTime(timer)}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleExerciseControl}
                  startIcon={!isStarted || isFinished ? <PlayArrowIcon /> : isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                  sx={{
                    minWidth: '120px',
                    borderRadius: '4px',
                    mt: 2
                  }}
                >
                  {isFinished ? "Restart" : !isStarted ? "Start" : isPaused ? "Resume" : "Pause"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Settings Dialog */}
      <SettingsPopup
        open={showSettings}
        onClose={toggleSettings}
        settings={settings}
        availableSettings={availableSettings}
        onSettingChange={handleSettingChange}
      />
    </Box>
  );
};

export default ExerciseLayout;
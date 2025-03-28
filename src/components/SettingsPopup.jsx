import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  Box, 
  Typography, 
  Button, 
  Slider,
  FormControlLabel,
  Checkbox,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Styled components
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '4px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  }
}));

const ColorButton = styled(Button)(({ color }) => ({
  minWidth: '36px',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: color,
  margin: '0 4px',
  '&:hover': {
    backgroundColor: color,
    opacity: 0.8,
  }
}));

const FontButton = styled(Button)(({ theme }) => ({
  minWidth: '40px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  margin: '0 4px',
  border: '1px solid #ddd',
  '&.active': {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light,
  }
}));

const SettingsPopup = ({ 
  open, 
  onClose,
  settings,
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
  onSettingChange
}) => {
  const {
    speed,
    wordCount,
    selectedTheme,
    fontSize,
    fontType,
    highlightColor,
    articleDifficulty,
    countdown,
    direction,
    duration
  } = settings;

  // Handle speed change
  const handleSpeedChange = (event, newValue) => {
    onSettingChange('speed', newValue);
  };

  // Handle duration change
  const handleDurationChange = (event, newValue) => {
    onSettingChange('duration', newValue);
  };

  // Handle word count change
  const handleWordCountChange = (event, newValue) => {
    onSettingChange('wordCount', newValue);
  };

  // Handle theme change
  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      onSettingChange('selectedTheme', newTheme);
    }
  };

  // Handle font size change
  const handleFontSizeChange = (size) => {
    onSettingChange('fontSize', size);
  };

  // Handle font type change
  const handleFontTypeChange = (font) => {
    onSettingChange('fontType', font);
  };

  // Handle highlight color change
  const handleHighlightColorChange = (color) => {
    onSettingChange('highlightColor', color);
  };

  // Handle article difficulty change
  const handleArticleDifficultyChange = (event, newValue) => {
    const difficultyMap = {
      1: "Easy",
      2: "Medium", 
      3: "Hard"
    };
    onSettingChange('articleDifficulty', difficultyMap[newValue]);
  };

  // Handle countdown change
  const handleCountdownChange = (event) => {
    onSettingChange('countdown', event.target.checked);
  };

  // Handle direction change
  const handleDirectionChange = (event, newDir) => {
    if (newDir !== null) {
      onSettingChange('direction', newDir);
    }
  };

  // Colors for the highlight color buttons
  const colorOptions = [
    { name: "Blue", hex: "#4682B4" },
    { name: "Red", hex: "#FF0000" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Pink", hex: "#FF69B4" },
    { name: "Green", hex: "#00FF00" }
  ];

  // Font types available
  const fontOptions = ["GoogleSans", "Arial", "Times", "Roboto"];

  // Count the number of visible settings
  const visibleSettingsCount = Object.values(availableSettings).filter(Boolean).length;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { 
          borderRadius: 2,
          width: '800px'  // Fixed width for consistency
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Settings <InfoOutlinedIcon sx={{ ml: 1, fontSize: '1rem' }} />
        </Box>
        <Button onClick={onClose} color="inherit" sx={{ p: 0 }}>
          Close <CloseIcon sx={{ ml: 1 }} />
        </Button>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pb: 4 }}>
        <Grid container spacing={4}>
          {/* Speed Setting */}
          {availableSettings.speed && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography id="speed-slider">Speed</Typography>
                <Typography>{speed}</Typography>
              </Box>
              <Slider
                min={100}
                max={1000}
                value={speed}
                onChange={handleSpeedChange}
                aria-labelledby="speed-slider"
                marks={[
                  { value: 100, label: 'Slow' },
                  { value: 1000, label: 'Fast' }
                ]}
              />
            </Grid>
          )}
          
          {/* Duration Setting */}
          {availableSettings.duration && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography id="duration-slider">Duration (seconds)</Typography>
                <Typography>{duration}</Typography>
              </Box>
              <Slider
                min={10}
                max={300}
                step={5}
                value={duration}
                onChange={handleDurationChange}
                aria-labelledby="duration-slider"
                marks={[
                  { value: 10, label: '10s' },
                  { value: 60, label: '1m' },
                  { value: 120, label: '2m' },
                  { value: 300, label: '5m' }
                ]}
              />
            </Grid>
          )}
          
          {/* Direction Setting */}
          {availableSettings.direction && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Direction</Typography>
                <Typography>{direction === "horizontal" ? "Horizontal" : "Vertical"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                  value={direction}
                  exclusive
                  onChange={handleDirectionChange}
                  aria-label="direction selection"
                  size="small"
                  sx={{ width: '100%' }}
                >
                  <StyledToggleButton value="horizontal" sx={{ flex: 1 }}>Horizontal</StyledToggleButton>
                  <StyledToggleButton value="vertical" sx={{ flex: 1 }}>Vertical</StyledToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>
          )}
          
          {/* Word Count Setting */}
          {availableSettings.wordCount && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography id="word-count-slider">Word Count</Typography>
                <Typography>{wordCount}</Typography>
              </Box>
              <Slider
                min={1}
                max={10}
                value={wordCount}
                onChange={handleWordCountChange}
                aria-labelledby="word-count-slider"
                marks={[
                  { value: 1, label: '1' },
                  { value: 10, label: '10' }
                ]}
              />
            </Grid>
          )}
          
          {/* Article Difficulty Setting */}
          {availableSettings.articleDifficulty && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography id="difficulty-slider">Article Difficulty</Typography>
                <Typography>{articleDifficulty}</Typography>
              </Box>
              <Slider
                min={1}
                max={3}
                value={articleDifficulty === "Easy" ? 1 : articleDifficulty === "Medium" ? 2 : 3}
                onChange={handleArticleDifficultyChange}
                aria-labelledby="difficulty-slider"
                marks={[
                  { value: 1, label: 'Easy' },
                  { value: 2, label: 'Medium' },
                  { value: 3, label: 'Hard' }
                ]}
              />
            </Grid>
          )}
          
          {/* Theme Setting */}
          {availableSettings.theme && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Theme</Typography>
                <Typography>{selectedTheme}</Typography>
              </Box>
              <ToggleButtonGroup
                value={selectedTheme}
                exclusive
                onChange={handleThemeChange}
                aria-label="theme selection"
                size="small"
                sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
              >
                <StyledToggleButton value="Light" sx={{ flex: 1 }}>Light</StyledToggleButton>
                <StyledToggleButton value="Dark" sx={{ flex: 1 }}>Dark</StyledToggleButton>
                <StyledToggleButton value="Sepia" sx={{ flex: 1 }}>Sepia</StyledToggleButton>
              </ToggleButtonGroup>
            </Grid>
          )}
          
          {/* Font Size Setting */}
          {availableSettings.fontSize && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Font Size</Typography>
                <Typography>{fontSize}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {["Small", "Medium", "Large", "X-Large"].map((size, index) => (
                  <FontButton 
                    key={size}
                    className={fontSize === size ? 'active' : ''}
                    onClick={() => handleFontSizeChange(size)}
                    sx={{ fontSize: `${14 + (index * 2)}px` }}
                  >
                    Aa
                  </FontButton>
                ))}
              </Box>
            </Grid>
          )}
          
          {/* Font Type Setting */}
          {availableSettings.fontType && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Font Type</Typography>
                <Typography>{fontType}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {fontOptions.map(font => (
                  <FontButton 
                    key={font}
                    className={fontType === font ? 'active' : ''}
                    onClick={() => handleFontTypeChange(font)}
                    sx={{ 
                      fontFamily: font === "GoogleSans" ? "sans-serif" : font 
                    }}
                  >
                    Aa
                  </FontButton>
                ))}
              </Box>
            </Grid>
          )}
          
          {/* Highlight Color Setting */}
          {availableSettings.highlightColor && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Highlight Color</Typography>
                <Typography>{highlightColor}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {colorOptions.map(color => (
                  <ColorButton 
                    key={color.name}
                    color={color.hex}
                    variant={highlightColor === color.name ? 'contained' : 'outlined'}
                    onClick={() => handleHighlightColorChange(color.name)}
                    sx={{
                      border: highlightColor === color.name ? '2px solid #333' : '1px solid #ddd'
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}
          
          {/* Countdown Setting */}
          {availableSettings.countdown && (
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={countdown}
                    onChange={handleCountdownChange}
                  />
                }
                label="Countdown before starting exercise"
              />
            </Grid>
          )}

          {/* If there are no settings available, show a message */}
          {visibleSettingsCount === 0 && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No settings available for this exercise.
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPopup;
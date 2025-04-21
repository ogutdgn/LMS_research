import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton, 
  Typography, 
  Paper, 
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dışarıdan gelen mock data kullanılacak, burada import ediyoruz
import { 
  fastReadingExercises, 
  fastReadingWorkouts, 
  fastReadingTests, 
  routes, 
  basePath 
} from '../components/mockData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleItemClick = (tabIndex, item) => {
    let path;
    switch (tabIndex) {
      case 0: // Egzersizler
        path = `${basePath}${routes.exercises}/${item.urlName}`;
        break;
      case 1: // Çalışmalar
        path = `${basePath}${routes.workouts}/${item.urlName}`;
        break;
      case 2: // Testler
        path = `${basePath}${routes.tests}/${item.urlName}`;
        break;
      default:
        path = basePath;
    }
    navigate(path);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleChange} 
            aria-label="exercise tabs"
            variant="fullWidth"
            sx={{ 
              backgroundColor: 'primary.main',
              '& .MuiTab-root': { 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 'medium',
                fontSize: '0.95rem',
                transition: 'all 0.2s'
              },
              '& .Mui-selected': { 
                color: 'white', 
                fontWeight: 'bold',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            TabIndicatorProps={{ 
              style: { 
                backgroundColor: 'white',
                height: 3
              } 
            }}
          >
            <Tab label="HIZLI OKUMA EGZERSİZLERİ" {...a11yProps(0)} />
            <Tab label="HIZLI OKUMA ÇALIŞMALARI" {...a11yProps(1)} />
            <Tab label="HIZLI OKUMA TESTİ" {...a11yProps(2)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            Göz karme, aktif görme alanını genişletme, hızlı odaklanma gibi yeteneklerin geliştirilmesine yönelik hazırlanmış egzersizlere göz atın.
          </Typography>
          <List sx={{ width: '100%' }}>
            {fastReadingExercises.map((exercise) => (
              <Paper 
                key={exercise.id}
                elevation={1} 
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <ListItem 
                  alignItems="flex-start"
                  disablePadding
                >
                  <ListItemButton onClick={() => handleItemClick(0, exercise)}>
                    <ListItemText
                      primary={exercise.title}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondary={exercise.description}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" paragraph>
            Okuma metinleri üzerinde ritmik göz hareketleri ile okuma yeteneğini kazanabilmek için oluşturulmuş çalışmalara göz atın.
          </Typography>
          <List sx={{ width: '100%' }}>
            {fastReadingWorkouts.map((workout) => (
              <Paper 
                key={workout.id}
                elevation={1} 
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <ListItem 
                  alignItems="flex-start"
                  disablePadding
                >
                  <ListItemButton onClick={() => handleItemClick(1, workout)}>
                    <ListItemText
                      primary={workout.title}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondary={workout.description}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph>
            2 farklı kütüphane üzerinde bulunan 93 metin içerisinden dilediğiniz metin ile okuma hızınızı ölçebilmenizi sağlayan hızlı okuma testi sayfasına göz atın.
          </Typography>
          <List sx={{ width: '100%' }}>
            {fastReadingTests.map((test) => (
              <Paper 
                key={test.id}
                elevation={1} 
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <ListItem 
                  alignItems="flex-start"
                  disablePadding
                >
                  <ListItemButton onClick={() => handleItemClick(2, test)}>
                    <ListItemText
                      primary={test.title}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondary={test.description}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        </TabPanel>
      </Paper>
    </Container>
  );
}
import React from 'react';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;

// import React from 'react';
// import ExerciseLayout from './components/ExerciseLayout';
// import ZigZagExercise from './components/ZigZagExercise';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// const App = () => {
//   // Define a basic theme
//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#4682B4', // AccelRead blue
//         light: '#E6F0FF',
//       },
//       secondary: {
//         main: '#FF8C00', // Orange for the zigzag line
//       },
//       background: {
//         default: '#FFFFFF',
//         paper: '#FFFFFF',
//       },
//     },
//     typography: {
//       fontFamily: '"Roboto", "Arial", sans-serif',
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: 'none',
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
      // <ExerciseLayout
      //   title="ZigZag"
      //   exerciseComponent={<ZigZagExercise />}
      //   hasSound={false}
      //   availableSettings={{
      //     speed: true,     // Enable speed setting
      //     duration: true,  // Enable duration setting
      //     direction: true, // Enable direction setting
      //     wordCount: false,
      //     articleDifficulty: false,
      //     countdown: false,
      //     theme: false,
      //     fontSize: false,
      //     fontType: false,
      //     highlightColor: false
      //   }}
      //   defaultTimer={60}   // Default 1 minute
      //   defaultSpeed={440}
      // />
//     </ThemeProvider>
//   );
// };

// export default App;
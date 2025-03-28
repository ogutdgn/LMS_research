import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpeedReadingTest from '../components/reading-tests/speed-reading-test/SpeedReadingTest';
import DotEyeExercise from '../components/reading-exercises/13-dot-eye/DotEyeExercise';
import ZigZagExercise from '../components/reading-exercises/ZigZagExercise';
import ExerciseLayout from '../components/ExerciseLayout';
import ExerciseManagement from '../components/ExerciseManagement';


const NotFound = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil.</p>
    </div>
  );

  function AppRouter() {
    return (
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/app" element={<HomePage />} />
          

          {/* Exercises */}
          <Route path="/app/exercises/13-dot-eye" element={<DotEyeExercise />} />
          <Route path="/app/exercises/zig-zag" element={<ExerciseManagement />} />

          {/* Workouts */}
          {/* <Route path="/app/gelisim/calisma/temel-okuma-calismasi" element={<TemelOkumaCalisma />} /> */}
          

          {/* Tests */}
          <Route path="/app/tests/speed-reading-test" element={<SpeedReadingTest />} />
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }

export default AppRouter;
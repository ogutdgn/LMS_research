import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpeedReadingTest from '../components/reading-tests/speed-reading-test/SpeedReadingTest';

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
          {/* Ana Sayfa */}
          <Route path="/app" element={<HomePage />} />
          
          {/* <Route path="/app/gelisim/egzersizler/goz-kaslari-gelistirme" element={<GozKaslariEgzersizi />} />
          <Route path="/app/gelisim/egzersizler/gorme-alani-genisletme" element={<GormeAlaniEgzersizi />} /> */}
          
          {/* <Route path="/app/gelisim/calisma/temel-okuma-calismasi" element={<TemelOkumaCalisma />} />
          <Route path="/app/gelisim/calisma/ileri-seviye-okuma-calismasi" element={<IleriSeviyeCalisma />} /> */}
          
          <Route path="/app/gelisim/test/speed-reading-test" element={<SpeedReadingTest />} />
          {/* <Route path="/app/gelisim/test/anlama-testi" element={<AnlamaTesti />} /> */}
          
          {/* <Route path="/" element={<Navigate to="/app" replace />} /> */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }

export default AppRouter;
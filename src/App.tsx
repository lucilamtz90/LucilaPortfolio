import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CaseSheet } from './components/CaseSheet/CaseSheet';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { CursorSparkles } from './features/music/CursorSparkles';
import { GradientBackground } from './features/music/GradientBackground';
import { MusicProvider, useMusic } from './features/music/MusicContext';
import { MusicVisualizerBar } from './features/music/MusicVisualizerBar';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

/** Keeps Home mounted as the persistent base layer; the Outlet renders the case sheet on top of it. */
function HomeLayout() {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
}

/** Reads music state and renders the background/bar — split out so it can sit inside
 * MusicProvider while App itself stays the thing that's actually exported/mounted. */
function MusicChrome() {
  const { isOn } = useMusic();
  return (
    <>
      <GradientBackground active={isOn} />
      <MusicVisualizerBar />
      <CursorSparkles active={isOn} />
    </>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <MusicProvider>
      <MusicChrome />
      <CustomCursor />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={null} />
          <Route path="/case/:slug" element={<CaseSheet />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;

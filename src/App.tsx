import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CaseSheet } from './components/CaseSheet/CaseSheet';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
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

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={null} />
          <Route path="/case/:slug" element={<CaseSheet />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

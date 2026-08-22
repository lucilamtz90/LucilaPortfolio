import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { CaseSectionRenderer } from '../components/CaseSectionRenderer';
import { ContactFab } from '../components/ContactFab/ContactFab';
import { Footer } from '../components/Footer/Footer';
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { TripPageHeader } from '../components/TripPageHeader/TripPageHeader';
import { getCaseBySlug } from '../data';
import { useShare } from '../hooks/useShare';
import './CaseDetail.css';

export function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const caseData = getCaseBySlug(i18n.language, slug ?? '');
  const share = useShare();
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!caseData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <div className="case-detail container">
        <NavigationBar />
        <TripPageHeader caseData={caseData} onShare={() => share(caseData.headerTitle, caseData.heroMedia)} />

        <div className="case-detail__content">
          {caseData.sections.map((section, index) => (
            <CaseSectionRenderer key={index} section={section} />
          ))}
        </div>

        <Footer onContactClick={() => setContactOpen(true)} />
      </div>

      <ContactFab open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

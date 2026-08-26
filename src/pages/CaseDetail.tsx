import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { CasePasswordGate } from '../components/CasePasswordGate/CasePasswordGate';
import { CaseSectionRenderer } from '../components/CaseSectionRenderer';
import { ContactFab } from '../components/ContactFab/ContactFab';
import { Footer } from '../components/Footer/Footer';
import { TripPageHeader } from '../components/TripPageHeader/TripPageHeader';
import { getCaseBySlug } from '../data';
import { useShare } from '../hooks/useShare';
import './CaseDetail.css';

interface CaseDetailProps {
  onBack: () => void;
}

export function CaseDetail({ onBack }: CaseDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const caseData = getCaseBySlug(i18n.language, slug ?? '');
  const share = useShare();
  const [contactOpen, setContactOpen] = useState(false);

  if (!caseData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <div className="case-detail container">
        <TripPageHeader caseData={caseData} onShare={() => share(caseData.headerTitle, caseData.heroMedia)} onBack={onBack} />

        <div className="case-detail__content">
          <CasePasswordGate>
            {caseData.sections.map((section, index) => (
              <CaseSectionRenderer key={index} section={section} />
            ))}
          </CasePasswordGate>
        </div>

        <Footer onContactClick={() => setContactOpen(true)} />
      </div>

      <ContactFab open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

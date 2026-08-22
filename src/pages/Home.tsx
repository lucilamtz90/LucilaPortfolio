import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonPills, type ProjectTab } from '../components/ButtonPills/ButtonPills';
import { ContactFab } from '../components/ContactFab/ContactFab';
import { Footer } from '../components/Footer/Footer';
import { Hero } from '../components/Hero/Hero';
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen';
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { ProjectsGrid } from '../components/ProjectsGrid/ProjectsGrid';
import { features } from '../config/features';
import { aiCasesPlaceholder } from '../data/aiCases.placeholder';
import { getCases } from '../data';
import './Home.css';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function Home() {
  const { t, i18n } = useTranslation();
  const cases = getCases(i18n.language);

  const [activeTab, setActiveTab] = useState<ProjectTab>('professional');
  const [contactOpen, setContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 1800));
    const images = Promise.all(cases.map((c) => preloadImage(c.heroMedia)));

    Promise.race([Promise.all([images, timeout]), timeout]).then(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <div className={`home container ${isLoading ? '' : 'home--revealed'}`}>
        <NavigationBar />
        <Hero />

        <section className="home__projects" aria-label={t('buttonPills.professionalWork')}>
          <ButtonPills active={activeTab} onChange={setActiveTab} />

          {activeTab === 'professional' && (
            <ProjectsGrid>
              {cases.map((c) => (
                <ProjectCard
                  key={c.slug}
                  number={c.cardNumber}
                  company={c.cardCompany}
                  year={c.cardYear}
                  title={c.cardTitle}
                  meta={c.cardMeta}
                  type={c.cardType}
                  image={c.heroMedia}
                  to={`/case/${c.slug}`}
                />
              ))}
            </ProjectsGrid>
          )}

          {activeTab === 'ai' && !features.aiCaseDistinctLayout && (
            <ProjectsGrid>
              {aiCasesPlaceholder.map((c) => (
                <ProjectCard
                  key={c.number}
                  number={c.number}
                  company={t('aiCases.comingSoonTitle')}
                  title={t('aiCases.comingSoonBody')}
                  image={c.image}
                />
              ))}
            </ProjectsGrid>
          )}
        </section>

        <Footer onContactClick={() => setContactOpen(true)} />
      </div>

      <ContactFab open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

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
import placeholder from '../assets/images/project-placeholder.jpg';
import { features } from '../config/features';
import { aiCases } from '../data/aiCases';
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

const LOADER_SHOWN_SESSION_KEY = 'lucila-portfolio:loader-shown';

function hasShownLoaderThisSession(): boolean {
  return window.sessionStorage.getItem(LOADER_SHOWN_SESSION_KEY) === '1';
}

export function Home() {
  const { t, i18n } = useTranslation();
  const cases = getCases(i18n.language);

  const [activeTab, setActiveTab] = useState<ProjectTab>('professional');
  const [contactOpen, setContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => !hasShownLoaderThisSession());

  useEffect(() => {
    if (!isLoading) return;

    let cancelled = false;
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 2900));
    const images = Promise.all(cases.map((c) => preloadImage(c.heroMedia)));

    Promise.race([Promise.all([images, timeout]), timeout]).then(() => {
      if (!cancelled) {
        setIsLoading(false);
        window.sessionStorage.setItem(LOADER_SHOWN_SESSION_KEY, '1');
      }
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
        <NavigationBar playPillIntro={!isLoading} />
        <Hero playPillIntro={!isLoading} />

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
                  imagePosition={c.heroMediaPosition}
                  to={`/case/${c.slug}`}
                />
              ))}
            </ProjectsGrid>
          )}

          {activeTab === 'ai' && !features.aiCaseDistinctLayout && (
            <ProjectsGrid>
              {aiCases.length > 0 ? (
                aiCases.map((c) => (
                  <ProjectCard
                    key={c.number}
                    number={c.number}
                    dateLine={c.dateLine}
                    title={c.title}
                    description={c.description}
                    image={c.image}
                    href={c.url}
                  />
                ))
              ) : (
                <ProjectCard
                  number="01"
                  company={t('aiCases.comingSoonTitle')}
                  title={t('aiCases.comingSoonBody')}
                  image={placeholder}
                />
              )}
            </ProjectsGrid>
          )}
        </section>

        <Footer onContactClick={() => setContactOpen(true)} />
      </div>

      <ContactFab open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

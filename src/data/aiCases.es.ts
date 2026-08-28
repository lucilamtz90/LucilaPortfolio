import aiBloomStudio from '../assets/images/ai-bloom-studio.mp4';
import aiBonittaBrandingHub from '../assets/images/ai-bonitta-branding-hub.mp4';
import aiEtsyVideoFeed from '../assets/images/ai-etsy-video-feed.mp4';
import aiNoorish from '../assets/images/ai-noorish.mp4';
import type { AiCase } from './types';

export const aiCasesEs: AiCase[] = [
  {
    number: '01',
    title: 'Made at Etsy: Video Feed',
    dateLine: '6 horas • 2026 • Figma Make',
    description:
      'Un feed de video corto y personalizado, pensado para mobile — para que los usuarios conozcan a las personas reales detrás de cada producto hecho a mano. Diseñado en Figma y publicado en vivo con Figma Make.',
    url: 'https://etsy-made-design-concept.figma.site/',
    image: aiEtsyVideoFeed,
  },
  {
    number: '02',
    title: 'Bloom Studio',
    dateLine: '3 días • 2026 • Claude Code',
    description:
      'Un atelier virtual de flores, responsive, para armar ramos y compartirlos con amigos en ocasiones especiales. Construido enteramente con Claude Code — sin diseño previo, todo por prompting, assets hechos a mano — y desplegado directo a GitHub Pages desde Claude Code.',
    url: 'https://lucilamtz90.github.io/bloom-studio/',
    image: aiBloomStudio,
  },
  {
    number: '03',
    title: 'Bonitta Studio Branding Hub',
    dateLine: '5 horas • 2026 • Claude Code',
    description:
      'Una plataforma B2B, responsive, para centralizar el avance y los entregables de branding de cada cliente, con recolección de feedback integrada y personalización por cliente. Construida enteramente por prompting — un stylesheet generado por los agentes de IA de Figma se le entregó a Claude Code, que la construyó y la desplegó directo a GitHub Pages.',
    url: 'https://lucilamtz90.github.io/today-coffee/demo/',
    image: aiBonittaBrandingHub,
  },
  {
    number: '04',
    title: 'Noorish',
    dateLine: '~2 semanas • 2026 • Claude Code',
    description:
      'Una app de protocolo nutricional personalizado de 14 días — pensada mobile-first, con planes de comida a la medida, badges de racha y una lista de compras inteligente. Este demo corre sobre datos estáticos, sin llamadas de IA en vivo, empaquetado y desplegado a GitHub Pages desde Claude Code.',
    url: 'https://lucilamtz90.github.io/noorish/',
    image: aiNoorish,
  },
];

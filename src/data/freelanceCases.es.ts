import todayCoffeeSignage from '../assets/images/today-coffee-signage.png';
import todayCoffeeInstagramCards from '../assets/images/today-coffee-instagram-cards.png';
import todayCoffeeAsset03 from '../assets/images/today-coffee-asset-03.png';
import todayCoffeeAsset04 from '../assets/images/today-coffee-asset-04.png';
import todayCoffeeAsset05 from '../assets/images/today-coffee-asset-05.png';
import type { FreelanceCase } from './types';

export const freelanceCasesEs: FreelanceCase[] = [
  {
    slug: 'today-coffee',
    cardNumber: '01',
    dateLine: 'Diseño de marca • 2026',
    cardTitle: 'Branding y aplicaciones para Today Coffee',
    description: 'Diseño de branding y aplicaciones impresas y físicas para Today Coffee, una cafetería en CDMX.',
    heroMediaPosition: 'center',

    headerCompany: 'Diseñadora',
    headerYear: '2026',
    headerTitle: 'Branding y aplicaciones para Today Coffee',
    headerStatus: 'Cafetería en CDMX',
    headerMeta: 'Diseño de marca',
    headerRole: 'Freelance',
    headerRoleConnector: ' ',
    headerSignals: ['Foto y video', 'Branding', 'Impresos', 'Redes sociales'],
    heroMedia: todayCoffeeSignage,

    narratives: [
      {
        heading: 'Sobre la marca',
        body: 'Today Coffee es una cafetería de especialidad fresca, joven y acogedora. Los dueños querían que su logo y su identidad de marca reflejaran de verdad su visión y sus valores, y conectaran con su público local: adultos jóvenes y adolescentes.',
      },
      {
        heading: 'El diseño en la práctica',
        body: 'Ayudé a darle vida a su visión a través del diseño. Investigué cafeterías locales para encontrar un ángulo interesante que conectara con la gente. Después de un audit, un workshop con mis clientes y varios bocetos rápidos de formas y tipografías, llegamos a un logo e ícono con formas suaves, redondeadas y fluidas.',
      },
      {
        heading: 'Aplicaciones y branding',
        body: 'La identidad de marca incluye dos lockups principales de logo (con ícono, wordmark y tagline) y dos versiones simplificadas ideales para sellos u otros elementos de apoyo. Para asegurar consistencia, diseñé tanto los assets impresos como los digitales.\n\nEsto incluyó menús impresos y digitales, posters, códigos QR de mesa y flyers promocionales. También armé un brand kit completo con lineamientos de colores, tipografía y uso del logo, para que los diseños futuros se mantengan limpios y consistentes. Además, entregué una plantilla reutilizable de Reel de Instagram, junto con diseños para posts e historias.',
      },
    ],
    credit: {
      lead: 'Instagram de Today Coffee:',
      url: 'https://www.instagram.com/reel/Dc2EdbFtQwg/embed',
      aspectRatio: '9 / 16',
      mediaOnly: true,
    },
    media: [
      { src: todayCoffeeSignage, aspectRatio: '396 / 551' },
      { src: todayCoffeeInstagramCards, aspectRatio: '396 / 654' },
      { src: todayCoffeeAsset03, aspectRatio: '396 / 513' },
      { src: todayCoffeeAsset04, aspectRatio: '396 / 513' },
      { src: todayCoffeeAsset05, aspectRatio: '396 / 513' },
    ],
  },
];

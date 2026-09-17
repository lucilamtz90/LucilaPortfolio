import todayCoffeeSignage from '../assets/images/today-coffee-signage.png';
import todayCoffeeInstagramCards from '../assets/images/today-coffee-instagram-cards.png';
import todayCoffeeAsset03 from '../assets/images/today-coffee-asset-03.png';
import todayCoffeeAsset04 from '../assets/images/today-coffee-asset-04.png';
import todayCoffeeAsset05 from '../assets/images/today-coffee-asset-05.png';
import type { FreelanceCase } from './types';

export const freelanceCasesEn: FreelanceCase[] = [
  {
    slug: 'today-coffee',
    cardNumber: '01',
    dateLine: 'Branding design • 2026',
    cardTitle: 'Branding & applications for Today Coffee',
    description: 'Branding design and print & physical applications for Today Coffee, a coffee shop in Mexico City.',
    heroMediaPosition: 'center',

    headerCompany: 'Designer',
    headerYear: '2026',
    headerTitle: 'Branding & applications for Today Coffee',
    headerStatus: 'Coffee shop in CDMX',
    headerMeta: 'Branding design',
    headerRole: 'Freelance',
    headerRoleConnector: ' ',
    headerSignals: ['Photo & Video', 'Branding', 'Printing', 'Social media'],
    heroMedia: todayCoffeeSignage,

    narratives: [
      {
        heading: 'About the brand',
        body: 'Today Coffee is a fresh, youthful, and inviting specialty coffee shop. The owners wanted their logo and branding to truly reflect their vision and values and connect with local consumers which are young adults and teenagers.',
      },
      {
        heading: 'Design in practice',
        body: 'I helped bring their vision to life with design. I dug into local coffee shops to find a cool angle that would really click with people. After teaming up for an audit, a workshop with my clients, and a few quick sketches of shapes and fonts, we ended up with a logo and icon featuring soft, smooth, and rounded shapes.',
      },
      {
        heading: 'Applications & branding',
        body: 'The brand identity includes two main logo lockups (featuring the icon, wordmark, and tagline) and two simplified versions perfect for stamps or supporting brand elements. To ensure brand consistency, I designed both print and digital assets.\n\nThis included print and digital menus, posters, table QR codes, and promotional flyers. I also put together a comprehensive brand kit covering guidelines for colors, typography, and logo usage so future designs stay clean and on point. On top of that, I delivered a reusable Instagram Reel template, along with designs for posts and stories.',
      },
    ],
    credit: {
      lead: "Today's Coffee Instagram:",
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

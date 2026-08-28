import checkoutErrorsCover from '../assets/images/checkout-errors-cover.mp4';
import dynamicUnitsCover from '../assets/images/dynamic-units-cover.mp4';
import dynamicUnitsWorkshop from '../assets/images/dynamic-units-workshop.mp4';
import dynamicUnitsWorkshopWidget from '../assets/images/dynamic-units-workshop-widget.jpg';
import etsyInsiderCover from '../assets/images/etsy-insider-rewards-cover.mp4';
import etsyInsiderRewardsFlows from '../assets/images/etsy-insider-rewards-flows.jpg';
import etsyInsiderRewardsJourney from '../assets/images/etsy-insider-rewards-journey.mp4';
import etsyInsiderRoadmap from '../assets/images/etsy-insider-roadmap.jpg';
import etsyErrorCardAuth from '../assets/images/etsy-error-card-auth.jpg';
import etsyErrorDocumentation from '../assets/images/etsy-error-documentation.mp4';
import etsyErrorMocks from '../assets/images/etsy-error-mocks.jpg';
import etsyErrorPaypal from '../assets/images/etsy-error-paypal.jpg';
import etsyErrorSystemOverview from '../assets/images/etsy-error-system-overview.mp4';
import placeholder from '../assets/images/project-placeholder.jpg';
import rappiCardCover from '../assets/images/rappi-card-cover.mp4';
import type { CaseData } from './types';

export const casesEs: CaseData[] = [
  {
    slug: 'dynamic-units',
    cardNumber: '01',
    cardCompany: 'Etsy',
    cardYear: '2023',
    cardTitle: 'Dynamic Units para Affiliates',
    cardMeta: 'De discovery a lanzamiento',
    cardType: 'B2B',
    heroMedia: dynamicUnitsCover,
    heroMediaPosition: 'top',

    headerCompany: 'Etsy',
    headerYear: '2023',
    headerTitle: 'Dynamic Units: convirtiendo a los Affiliates en un canal de ingresos',
    headerStatus: 'Mercado de EE. UU.',
    headerMeta: 'De discovery a lanzamiento',
    headerRole: 'Sr. Product Designer',
    externalUrl: 'https://www.etsy.com/affiliates',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problema y oportunidad',
        body: 'El programa de Affiliates de Etsy —bloggers, creadores de redes sociales y editoriales que ganan comisiones al promover listings— había superado a su primera herramienta, Static Units. Sin un investigador dedicado al proyecto, mi PM, mi PMM y yo lideramos proactivamente la estrategia y el plan de investigación: entender qué estaba realmente frenando a los Affiliates y diseñar una herramienta lo suficientemente automatizada y flexible para hacer crecer el canal, sin perder de vista las restricciones técnicas reales que ya estaban en marcha del lado de ingeniería.',
      },
      {
        type: 'processStep',
        heading: 'Facilité un taller multidisciplinario de 2 días para alinear al equipo en la visión',
        body: 'Organicé y lideré un taller de dos días con Producto, Marketing, Analytics y Diseño para establecer una visión compartida, necesidades clave y objetivos para la herramienta. El segundo día realicé un ejercicio SCAMPER para identificar qué mejorar, modificar o conservar de Static Units, y facilité una votación y un affinity mapping para priorizar los temas frente a nuestros pilares de negocio.',
        image: dynamicUnitsWorkshop,
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Investigué desde cero, en el vacío donde debería haber existido un investigador',
          body: 'Sin un investigador dedicado al proyecto, mi PM, mi PMM y yo lideramos proactivamente el plan de investigación. Realicé 8 entrevistas cualitativas con Affiliates activos y apliqué dos encuestas a más de 100 Affiliates, para luego traducir todo en un mapa de journey de principio a fin con los puntos de dolor y expectativas reales — la base sobre la que se construyó todo el diseño.',
        },
        right: {
          heading: 'Analicé más de 6 programas de la competencia antes de diseñar',
          body: 'Auditué más de seis programas de Affiliates, analizando experiencia, usabilidad, contenido y diseño visual, y construí una matriz comparativa para agilizar el análisis — fundamentando mis decisiones de diseño en lo que ya funcionaba (y lo que no) en otros lugares.',
        },
      },
      { type: 'heroImage', image: dynamicUnitsWorkshopWidget },
      {
        type: 'processStep',
        heading: 'Diseñé pensando en viabilidad y deleite, y lo llevé más allá de la interfaz',
        body: 'Mapeé la experiencia en diagramas de happy path para ponerla a prueba contra restricciones técnicas reales, y luego refiné la UI final en dos versiones — un flujo modal para MVP y un flujo de una sola página simplificado — a través de retroalimentación iterativa, una revisión de cumplimiento legal y colaboración cercana con mi UX Writer en tono y voz.',
        body2:
          'También lideré la estrategia de la campaña de lanzamiento por correo con Marketing, creando ilustraciones y adaptando el contenido por nivel de Affiliate junto con mi partner de UX Content, y construí un plan de correos de ciclo de vida para reactivar Affiliates inactivos.',
      },
      {
        type: 'toolCredit',
        lead: 'Explora la demo en vivo que construí:',
        url: 'https://etsy-affiliates-hub.figma.site',
      },
      {
        type: 'impactResults',
        heading: 'Impacto y resultados',
        stats: [
          {
            label: 'Adopción',
            value:
              '+$500k de ingresos estimados atribuidos a Dynamic Units, con +30k impresiones diarias y +10k visitas diarias a Etsy desde Units activas',
          },
          {
            label: 'Engagement',
            value:
              'Los Affiliates que adoptaron la nueva herramienta crearon en promedio 2.3x más widgets que con Static Units. Solo 2 tickets de soporte en la primera semana',
          },
        ],
      },
      {
        type: 'reflection',
        heading: 'Qué haría diferente',
        body: 'Insistir antes en tener un investigador dedicado al proyecto. Lo saqué adelante asumiendo yo misma la investigación junto con mi PM y mi PMM, pero un proyecto con tanto ingreso en juego merecía capacidad de investigación que no estuviera repartida entre tres personas.',
      },
    ],
  },
  {
    slug: 'etsy-insider-rewards',
    cardNumber: '02',
    cardCompany: 'Etsy',
    cardYear: '2025',
    cardTitle: 'Etsy Insider — lanzando Rewards',
    cardMeta: 'De ideación a hand-off',
    cardType: 'B2C',
    heroMedia: etsyInsiderCover,
    heroMediaPosition: 'top',

    headerCompany: 'Etsy',
    headerYear: '2025',
    headerTitle: 'Etsy Insider Rewards: diseñando un nuevo beneficio a escala',
    headerStatus: 'Mercado de EE. UU.',
    headerMeta: 'De ideación a hand-off',
    headerRole: 'Sr. Product Designer',
    externalUrl: 'https://www.etsy.com/news/meet-etsy-insider-etsys-new-buyer-membership-beta-program',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problema y oportunidad',
        body: 'La primera cohorte de Etsy Insider estaba estancada — los compradores de baja frecuencia no regresaban. La Fase 2 necesitaba introducir Rewards como un beneficio completamente nuevo, pero dónde ubicarlo era el verdadero reto de diseño: audité la experiencia existente para mapear posibles puntos de integración, y lo combiné con investigación sobre los momentos de mayor conversión de la Fase 1 para identificar dónde los compradores valorarían más Rewards — sin romper flujos que ya funcionaban. Más allá del nuevo beneficio en sí, esto implicó renovar los llamados a registro y el contenido en cada punto de contacto del journey del comprador.',
      },
      {
        type: 'processStep',
        heading: 'Convertí un benchmark competitivo en la recomendación estratégica',
        body: 'Auditué y sinteticé programas de lealtad y recompensas de otras empresas, destilando patrones de tratamiento visual, posicionamiento y diseño de experiencia. Esa síntesis se convirtió en mi recomendación sobre cómo y dónde introducir Rewards — dándole a mi PM y a mis partners de marketing una visión clara y respaldada por evidencia de dónde el beneficio tendría más impacto para los compradores, y eso marcó las prioridades de todo lo que siguió.',
        image: etsyInsiderRewardsJourney,
        aspectRatio: '425 / 830',
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Construí el roadmap trabajando hacia atrás desde la fecha límite',
          body: 'Lideré una sesión de planeación multidisciplinaria de 3.5 horas con liderazgo de ingeniería, marketing y design systems, preparando un tablero de FigJam con calendarios, notas y los PRD que mi PM había compartido — dándonos a todos visibilidad compartida de lo que necesitaba lanzarse y exponiendo los vacíos y dependencias entre equipos. Trabajando hacia atrás desde la fecha límite, definimos hitos concretos y acciones a seguir, alineando un plan secuenciado entre 4 partners de diseño externos.',
        },
        right: {
          heading: 'Convertí un plan en 8 proyectos lanzados',
          body: 'Esa sesión de planeación se convirtió en el hilo conductor de más de 8 proyectos que juntos construyeron Etsy Insider V2, incluyendo Rewards. Con un roadmap claro en mano, mi PM pudo planear con confianza junto a otros equipos de producto, mientras yo desglosaba cada proyecto en tareas más pequeñas y empezaba a coordinarme con los demás diseñadores involucrados.',
        },
      },
      { type: 'heroImage', image: etsyInsiderRoadmap, aspectRatio: '2200 / 1093' },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Validé el concepto antes de escalarlo',
          body: 'Realicé dos rondas de pruebas de usabilidad — primero para confirmar que los compradores entendían lo que Rewards realmente ofrecía, y luego para confirmar que los lugares que elegimos aportaban valor sin romper la experiencia alrededor. Las pruebas motivaron cambios reales en cómo y dónde aparecía Rewards, desde la claridad del mensaje hasta el posicionamiento en momentos de alta conversión como carrito y checkout.',
        },
        right: {
          heading: 'Escalé a 9 puntos de contacto, dos plataformas',
          body: 'Desde el homepage hasta el correo post-compra, entregué flujos consistentes para web y nativo, coordinándome con la persona a cargo del diseño del lado seller para mantener la consistencia.',
        },
      },
      {
        type: 'impactResults',
        heading: 'Impacto y resultados',
        stats: [
          {
            label: 'Adopción y frecuencia',
            value: [
              '150 mil suscriptores en 6 semanas',
              '+1.3% de incremento en frecuencia de compra',
              '+40% de frecuencia de recompra entre miembros nuevos y habituales',
            ],
          },
          {
            label: 'Percepción de conversión de usuarios',
            value:
              '20 de 25 participantes de investigación de seguimiento dijeron que el programa redujo su barrera para comprar',
          },
        ],
      },
      { type: 'heroImage', image: etsyInsiderRewardsFlows, aspectRatio: '2400 / 877' },
      {
        type: 'reflection',
        heading: 'Qué haría diferente',
        body: 'Descubrir las restricciones técnicas más temprano — algunos flujos en su estado ideal se vieron comprometidos tarde porque las conexiones con el backend surgieron a mitad del desarrollo en lugar de durante la definición.',
      },
    ],
  },
  {
    slug: 'checkout-errors',
    cardNumber: '03',
    cardCompany: 'Etsy',
    cardYear: '2026',
    cardTitle: 'Manejo de errores en checkout',
    cardMeta: 'De definición a hand-off',
    cardType: 'B2C',
    heroMedia: checkoutErrorsCover,
    heroMediaPosition: 'top',

    headerCompany: 'Etsy',
    headerYear: '2026',
    headerTitle: 'Errores de checkout: convirtiendo la fricción en momentos recuperables',
    headerStatus: 'Lanzado globalmente',
    headerMeta: 'De definición a hand-off',
    headerRole: 'Sr. Product Designer',
    externalUrl: 'https://www.etsy.com/?ref=lgo',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problema y oportunidad',
        body: 'El checkout estaba lleno de experiencias de error desactualizadas e inconsistentes — más de 10 tipos de error de alto tráfico sin un patrón compartido, dejando a los compradores atorados y abandonando su carrito en el peor momento posible. La solicitud no era solo arreglar errores individuales, sino resolver el problema de fondo: no existía un sistema reutilizable, así que cada error se manejaba como un caso aislado. Esto se convirtió en un workstream de experimentación a gran escala — cada nuevo diseño se probaba directamente contra la experiencia anterior con errores, un tipo de error a la vez, en lugar de lanzarse a ciegas.',
      },
      {
        type: 'processStep',
        heading: 'Prioricé por impacto real de negocio, y lo fundamenté en la realidad técnica',
        body: 'Analytics, mi PM y yo priorizamos los errores según fallos recurrentes de los compradores e impacto de negocio. Mi tech lead después auditó y entregó el set completo de errores del backend — un hand-off clave que me permitió entender rápidamente qué era realmente viable experimentar. A partir de ahí, construí cuentas de prueba para vivir cada error priorizado yo misma, detectando patrones de navegación, bugs y oportunidades sobre las que actuar en el nuevo diseño.',
        image: etsyErrorDocumentation,
        aspectRatio: '700 / 347',
      },
      {
        type: 'processStep',
        heading: 'Construí un sistema, no un conjunto de pantallas',
        body: 'Definí tres primitivos reutilizables dentro del design system — Section Banner, In-line Message e Input Validation — cada uno con reglas claras de cuándo usarlo, nivel de prioridad y tono de voz. Esto redujo el esfuerzo de implementación técnica y aumentó la consistencia a lo largo del journey de compra, convirtiendo cada error futuro en aplicar el patrón correcto, no en diseñar desde cero.',
        image: etsyErrorSystemOverview,
        aspectRatio: '1400 / 720',
      },
      {
        type: 'sectionTwoColumn',
        heading: 'Diseñado para una recuperación calmada, no solo errores claros',
        body: 'Junto con mi partner de UX Content, establecí reglas y lineamientos claros de tono y voz según los niveles de severidad del error — errores, advertencias y mensajes informativos. También definí patrones de navegación fluidos para ayudar a los compradores a recuperarse más rápido en estos momentos de alta fricción.',
      },
      {
        type: 'impactResultsExperiments',
        heading: 'Impacto y resultados tras la experimentación',
        experiments: [
          {
            label: 'Experimento #1',
            image: etsyErrorCardAuth,
            aspectRatio: '1424 / 1893',
            title: 'Autenticación de tarjeta: +1.7% de conversión tras 10 días',
            body: 'Mejoras de usabilidad y fricción de pago, como contenido más claro y componentes de UI dedicados, eliminaron la necesidad de que compradores de alta intención volvieran a capturar manualmente una tarjeta vencida, reduciendo la fricción en momentos críticos de la compra.',
          },
          {
            label: 'Experimento #2',
            image: etsyErrorPaypal,
            aspectRatio: '1424 / 1893',
            title: 'Redirección a PayPal: +29% de conversión tras 15 días',
            body: 'Cuando un pago con tarjeta falla por una razón de autenticación con poca probabilidad de éxito, redirigir a los compradores hacia PayPal en el mensaje de rechazo aceleró la conclusión del checkout y la conversión, en lugar de mostrar un error genérico o solo reintentos manuales.',
          },
        ],
        summary:
          'Ambos experimentos se lanzaron al 100% de los compradores a nivel global, y el resto de los tipos de error se fueron lanzando progresivamente bajo el mismo modelo de prueba y lanzamiento.',
      },
      {
        type: 'toolCredit',
        lead: 'Explora la demo en vivo que construí:',
        url: 'https://error-demo.figma.site/',
      },
      { type: 'heroImage', image: etsyErrorMocks, aspectRatio: '2400 / 1095' },
      {
        type: 'reflection',
        heading: 'Qué haría diferente',
        body: 'Involucrar a ingeniería antes para mapear las restricciones técnicas antes de finalizar la dirección de diseño — algunas soluciones en su estado ideal tuvieron que reducirse a mitad de proyecto cuando surgieron limitaciones del backend, lo que nos costó cerca de un mes en el timeline. De ahora en adelante, investigar las restricciones técnicas junto con ingeniería durante la definición (no después) es cómo desglosaría un trabajo tan complejo en hitos más precisos.',
      },
    ],
  },
  {
    slug: 'rappi-card',
    cardNumber: '04',
    cardCompany: 'Rappi Card',
    cardYear: '2021',
    cardTitle: 'Reduciendo pagos tardíos',
    cardMeta: 'De discovery a hand-off',
    cardType: 'B2C',
    heroMedia: rappiCardCover,
    heroMediaPosition: 'top',

    headerCompany: 'Rappi Card',
    headerYear: '2021',
    headerTitle: 'Rappi Card: reduciendo pagos tardíos con un pago con tarjeta más simple',
    headerStatus: 'Lanzado a clientes de Latinoamérica',
    headerMeta: 'De discovery a hand-off',
    headerRole: 'Lead Product Designer',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problema y oportunidad',
        body: 'Más del 15% de los usuarios globales de RappiCard estaban en riesgo de que les bloquearan la tarjeta por pagos tardíos — impulsado principalmente por una comunicación in-app poco efectiva, no por incapacidad de pagar. Las sesiones de usabilidad en vivo mostraron fricción real en el propio flujo de pago: una jerarquía de información pobre y componentes de UI inconsistentes hacían innecesariamente difíciles tareas simples, como seleccionar o capturar un monto de pago.',
      },
      {
        type: 'processStep',
        heading: 'La colaboración cercana con CX reveló la misma historia desde otro ángulo',
        body: 'Realicé un taller con el equipo líder de CX y mi investigadora para analizar el volumen de tickets, investigar las fricciones de fondo y priorizarlas en acciones concretas — revelando un alto volumen de tickets de soporte ligados directamente a quejas sobre el flujo de pago y confusión con terminología financiera, una brecha que golpeaba más fuerte a los compradores menos familiarizados con conceptos de crédito y finanzas.',
        body2:
          'En conjunto, estas señales apuntaron a tres áreas prioritarias: comunicación más clara del ciclo de pago, un flujo de pago más usable y recordatorios in-app mejor programados.',
        image: placeholder,
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Elegí componentes por familiaridad, no por fricción',
          body: 'Auditué y seleccioné cuidadosamente componentes que resultaran familiares para los usuarios dentro de flujos de pago complejos — dejando atrás un slider a favor de botones, dropdowns y tooltips, patrones que los usuarios ya sabían leer de un vistazo.',
          body2: 'El objetivo: ayudar a los usuarios a completar su tarea de forma natural, con la menor fricción posible.',
        },
        right: {
          heading: 'Diseñé un sistema lo suficientemente flexible para dos monedas',
          body: 'Aunque la UI y el flujo eran compartidos entre iOS y Android, cada país traía su propia complejidad — Perú especialmente, donde los consumidores suelen pagar tanto en dólares como en soles. En lugar de construir variantes por país, diseñé la interfaz para absorber estos matices de moneda de forma nativa, de modo que pudiera escalar entre mercados sin romper la UI ni agregar complejidad al flujo.',
          body2:
            'Esa flexibilidad rindió frutos en el lanzamiento: como el sistema ya contemplaba los casos multi-moneda, el esfuerzo de ingeniería para lanzarlo se redujo de forma importante.',
        },
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'extendedNarrative',
        heading: 'Extendí el tono y la voz a un sistema multicanal',
        body: 'La dirección de contenido que lideré junto con mi partner de UX Content no se quedó en la mensajería in-app — se extendió a recordatorios de CRM, FAQs y puntos de contacto fuera de la app, como landing pages y redes sociales. Auditué cada punto de contacto ligado a recordatorios de pago y al estatus de la tarjeta de crédito, dándole a mis partners la vista completa del journey de crédito y pago.\n\nCon la ayuda de CX para identificar dónde se perdía la terminología para los usuarios, construimos una sola guía de tono y voz para que app, web y soporte hablaran el mismo idioma. Esto quedaba fuera del alcance del rediseño principal, pero vi cuánto importaba para la experiencia en conjunto y empujé para liderarlo como un workstream paralelo relacionado.',
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'impactResults',
        heading: 'Impacto y resultados',
        stats: [
          {
            label: 'Usabilidad y adopción',
            value: [
              'Las pruebas de usabilidad mostraron una fuerte aceptación de la nueva experiencia, con la retroalimentación restante enfocada más en claridad de contenido que en estructura',
              'El rediseño se lanzó a un grupo de prueba inicial de 10 mil usuarios en México como rollout gradual',
              'Al mes siguiente, soporte al cliente vio una caída importante en consultas relacionadas con pagos — una señal fuerte de que el rediseño redujo confusión real de los usuarios, no solo que funcionó bien en pruebas de laboratorio',
            ],
          },
        ],
      },
      {
        type: 'toolCredit',
        lead: 'Explora la demo en vivo que construí:',
        url: 'https://embed.figma.com/proto/13USGrzwxfp7yjb6DWCqdD/04.-PAGAR-TDC---FINAL--MX?node-id=1-706&starting-point-node-id=1%3A706&page-id=0%3A1&embed-host=share',
      },
      {
        type: 'reflection',
        heading: 'Qué haría diferente',
        body: 'Insistir más en instrumentar métricas duras de conversión y pagos tardíos antes del lanzamiento — las señales cualitativas y de tickets de soporte eran contundentes, pero un proyecto tan multidisciplinario merecía una línea cuantitativa más clara del problema al resultado.',
      },
    ],
  },
];

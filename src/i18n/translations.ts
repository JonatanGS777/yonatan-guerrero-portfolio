export type Language = 'es' | 'en';

const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    contact: 'Contacto',
    cta: 'Contactar',
  },
  hero: {
    label: 'DOCTOR EN EDUCACIÓN · MATEMÁTICAS · TECNOLOGÍA · IA',
    headline: 'Educación que',
    headlineAccent: 'trasciende',
    headlineEnd: 'el aula.',
    subheadline:
      'Diseño soluciones donde el rigor matemático, la pedagogía y la inteligencia artificial convergen para transformar el aprendizaje.',
    cta1: 'Ver mis proyectos →',
    cta2: 'Sobre mí',
    scroll: 'Desplaza',
  },
  trajectory: {
    sectionLabel: 'TRAYECTORIA',
    name: 'Yonatan Guerrero Soriano',
    subtitle: 'EdD en Educación · Matemático · EdTech · IA',
    quote:
      'Mi trabajo vive en la intersección: donde la teoría educativa se encuentra con la implementación tecnológica, y donde las matemáticas encuentran nuevos lenguajes para enseñar.',
    timeline: [
      { title: 'Doctorado en Educación', desc: 'Tecnología instruccional y educación a distancia' },
      { title: 'Formación en Biomatemáticas', desc: 'Modelado matemático aplicado a sistemas biológicos' },
      { title: 'Especialización en Educación Matemática', desc: 'Didáctica, diseño curricular y evaluación' },
      { title: 'Digital Mathematics', desc: 'Plataforma propia de educación matemática digital — digitalmathematics.org' },
      { title: 'Inteligencia Artificial Aplicada', desc: 'Integración de IA, analítica y recursos interactivos' },
    ],
    stats: [
      { value: '10+', label: 'Años de trayectoria' },
      { value: '3', label: 'Disciplinas integradas' },
      { value: '∞', label: 'Curiosidad matemática' },
    ],
  },
  projectsHome: {
    sectionLabel: 'PROYECTOS DESTACADOS',
    headline: 'Construyendo el',
    headlineAccent: 'futuro',
    headlineEnd: 'del aprendizaje matemático',
    viewAll: 'Ver todos →',
    items: [
      {
        title: 'Digital Mathematics',
        tags: 'EdTech · Matemáticas · Recursos Interactivos',
        description:
          'Plataforma propia donde convergen la pedagogía matemática y la tecnología. Diseñada para hacer accesible el aprendizaje matemático a través de herramientas digitales interactivas.',
        linkLabel: 'Visitar plataforma →',
        hoverText: 'Plataforma de educación matemática digital con recursos interactivos',
      },
      {
        title: 'Repositorios & Código',
        tags: 'Open Source · Desarrollo · IA',
        description:
          'Proyectos de código abiertos que integran inteligencia artificial, analítica de datos y desarrollo de recursos educativos interactivos.',
        linkLabel: 'Ver en GitHub →',
        hoverText: 'Repositorios de código abierto con IA y recursos educativos',
      },
    ],
    moreTitle: '¿Quieres ver más proyectos?',
    moreBtn: 'Ver todos los proyectos →',
  },
  pillars: {
    sectionLabel: 'CUATRO PILARES',
    headline: 'Un puente entre',
    headlineAccent: 'disciplinas',
    subheadline:
      'Mi fortaleza está en unir rigor académico, visión pedagógica y capacidad real de implementación.',
    items: [
      {
        title: 'Rigor Académico',
        description:
          'Doctorado en Educación con formación en biomatemáticas. Una base teórica sólida que respalda cada decisión pedagógica y tecnológica.',
        tags: 'Investigación · Epistemología · Análisis',
      },
      {
        title: 'Visión Pedagógica',
        description:
          'Diseño instruccional centrado en el estudiante. Currículo, evaluación y estrategias que priorizan la comprensión profunda sobre la memorización.',
        tags: 'Diseño Instruccional · Currículo · Evaluación',
      },
      {
        title: 'Implementación Tecnológica',
        description:
          'Desarrollo real de plataformas, recursos interactivos y herramientas digitales. De la idea al producto funcional.',
        tags: 'Desarrollo · Plataformas · Interactividad',
      },
      {
        title: 'Inteligencia Artificial',
        description:
          'Integración de IA aplicada para personalización del aprendizaje, analítica educativa y recursos adaptativos que responden a cada estudiante.',
        tags: 'IA · Analítica · Personalización',
      },
    ],
  },
  cta: {
    label: '¿TRABAJAMOS JUNTOS?',
    headline: 'Construyamos el',
    headlineAccent: 'siguiente',
    headlineEnd: 'paso',
    body: 'Estoy abierto a colaboraciones académicas, proyectos EdTech, consultoría educativa y oportunidades donde la educación, las matemáticas y la tecnología puedan converger.',
    btn1: 'Iniciar conversación',
    btn2: 'Ver mi trayectoria completa →',
  },
  footer: {
    subtitle: 'Doctor en Educación · Matemático · EdTech · IA',
    navLabel: 'Navegación',
    linksLabel: 'Enlaces',
    contactLabel: 'Contacto',
    location: 'Puerto Rico, EE. UU.',
    copyright: '© 2025 Yonatan Guerrero Soriano',
    tagline: 'Hecho con rigor académico y código',
  },
  aboutHero: {
    breadcrumbHome: 'Inicio',
    breadcrumbCurrent: 'Sobre mí',
    subtitle: 'Doctor en Educación · Matemático · Investigador · Innovador EdTech',
    stats: [
      { abbr: 'EdD', label: 'Doctorado en Educación' },
      { abbr: 'MSc', label: 'Biomatemáticas' },
      { abbr: 'EdTech', label: 'Tecnología Educativa' },
      { abbr: 'IA', label: 'Inteligencia Artificial' },
    ],
  },
  aboutBio: {
    label: 'MI HISTORIA',
    opening:
      'Soy un doctor en educación con formación sólida en matemáticas y una trayectoria interdisciplinaria que navega entre la biomatemática, la educación matemática, la tecnología instruccional y la inteligencia artificial aplicada.',
    paragraphs: [
      'Mi camino académico comenzó en las matemáticas — disciplina que me enseñó a pensar con precisión, a abstraer la complejidad y a encontrar patrones donde otros ven caos. Esta formación en biomatemáticas me permitió explorar cómo los modelos matemáticos pueden describir y predecir fenómenos complejos, una habilidad que luego trasladaría al campo educativo.',
      'El doctorado en educación me abrió una segunda dimensión: comprender cómo aprendemos, cómo enseñamos y cómo la tecnología puede amplificar ambos procesos. Me especialicé en tecnología instruccional y educación a distancia, campos donde la teoría pedagógica se encuentra con la implementación tecnológica.',
      'Hoy, mi trabajo se centra en diseñar soluciones de educación matemática digital e integrar inteligencia artificial, analítica y recursos interactivos para mejorar el aprendizaje. No se trata solo de crear herramientas — se trata de crear experiencias de aprendizaje donde cada elemento tecnológico responde a una intención pedagógica clara.',
    ],
    quote:
      'La verdadera innovación educativa no ocurre en la tecnología por sí sola, ni en la pedagogía aislada. Ocurre en la intersección: donde el rigor matemático informa el diseño, donde la IA personaliza el camino de cada estudiante, y donde la tecnología se vuelve invisible para que el aprendizaje brille.',
    attr: '— Yonatan Guerrero Soriano',
  },
  aboutTimeline: {
    label: 'FORMACIÓN & TRAYECTORIA',
    heading: 'El camino que me trajo',
    headingAccent: 'aquí',
    items: [
      {
        title: 'Bachillerato en Biomatemáticas',
        institution: 'Universidad Metropolitana (UAGM)',
        focus: 'Matemáticas Aplicadas, Bioinformática y Biología Computacional',
        description:
          'Formación sólida en modelado matemático, análisis de datos biológicos y métodos computacionales. Base que consolidó mi pensamiento analítico y cuantitativo.',
      },
      {
        title: 'Maestría en Educación (MEd)',
        institution: 'Inter American University of Puerto Rico – Metropolitan Campus',
        focus: 'Ciencias de la Educación con Especialización en Matemáticas',
        description:
          'Profundización en didáctica de las matemáticas, diseño curricular y evaluación formativa. Suma Cum Laude. Énfasis en matemática discreta y metodologías de enseñanza.',
      },
      {
        title: 'Doctorado en Educación (EdD)',
        institution: 'Nova Southeastern University',
        focus: 'Especialización en Tecnología Instruccional y Educación a Distancia',
        description:
          'Investigación doctoral centrada en estrategias de diseño instruccional para el aprendizaje híbrido de matemáticas con IA como herramienta pedagógica.',
      },
      {
        title: 'Digital Mathematics',
        institution: 'Proyecto Independiente',
        focus: 'Plataforma de educación matemática digital',
        description:
          'Creación y desarrollo de digitalmathematics.org — una plataforma que integra recursos interactivos, herramientas de visualización y contenido pedagógico para el aprendizaje matemático.',
        focusLink: 'https://digitalmathematics.org',
      },
      {
        title: 'Integración de IA en Educación',
        institution: 'Línea de investigación activa',
        focus: 'Inteligencia artificial aplicada a la educación matemática',
        description:
          'Desarrollo de sistemas que utilizan IA para personalizar el aprendizaje matemático, generar retroalimentación adaptativa y analizar patrones de aprendizaje en tiempo real.',
      },
    ],
  },
  aboutPhilosophy: {
    label: 'FILOSOFÍA DE INVESTIGACIÓN',
    heading: 'Los principios que guían mi',
    headingAccent: 'trabajo',
    cards: [
      {
        number: '01',
        title: 'La Intersección es el Futuro',
        body: 'Los problemas más interesantes de la educación no se resuelven desde una sola disciplina. Requieren matemáticos que entiendan de pedagogía, educadores que dominen la tecnología, y tecnólogos que respeten el proceso de aprendizaje. Mi trabajo habita ese espacio interdisciplinario.',
      },
      {
        number: '02',
        title: 'Tecnología con Propósito',
        body: 'Cada herramienta digital, cada algoritmo de IA, cada recurso interactivo debe responder a una pregunta pedagógica clara: ¿cómo mejora esto el aprendizaje? La tecnología por sí sola no transforma la educación. La tecnología diseñada con intención pedagógica sí lo hace.',
      },
      {
        number: '03',
        title: 'De la Teoría al Código',
        body: 'Hay una brecha entre la investigación educativa y su aplicación real. Mi fortaleza está en cerrar esa brecha: traducir hallazgos teóricos en plataformas funcionales, en recursos que los estudiantes realmente usan, en soluciones que generan impacto medible.',
      },
    ],
  },
  aboutContexts: {
    label: 'CONTEXTO DE APLICACIÓN',
    heading: 'Mi trabajo tiene',
    headingAccent: 'impacto',
    headingEnd: 'en:',
    items: [
      {
        title: 'Entornos Académicos',
        description:
          'Universidades, colegios, coordinación académica y diseño curricular. Desarrollo de programas de estudio, estrategias de enseñanza y evaluación en contextos formales de educación.',
      },
      {
        title: 'Empresas EdTech',
        description:
          'Diseño instruccional, desarrollo de producto educativo e innovación formativa. Colaboración con startups y empresas de tecnología educativa para crear productos con valor pedagógico real.',
      },
      {
        title: 'Consultoría Educativa',
        description:
          'Diagnóstico, estrategia y mejora de procesos educativos. Asesoría a instituciones que buscan transformar sus prácticas de enseñanza-aprendizaje mediante la integración tecnológica.',
      },
      {
        title: 'Programas STEM',
        description:
          'Diseño e implementación de programas de ciencia, tecnología, ingeniería y matemáticas. Estrategias para hacer accesibles y atractivas estas disciplinas a diversos públicos.',
      },
    ],
  },
  aboutCta: {
    label: '¿TE INTERESA COLABORAR?',
    heading: 'Hablemos de',
    headingAccent: 'educación, matemáticas o tecnología',
    body: 'Estoy siempre abierto a nuevas conversaciones, colaboraciones y proyectos donde estas tres pasiones puedan encontrar un propósito común.',
    btn: 'Contactarme →',
  },
  contactHero: {
    breadcrumbHome: 'Inicio',
    breadcrumbCurrent: 'Contacto',
    title: 'Hablemos',
    subtitle:
      'Estoy abierto a colaboraciones académicas, proyectos EdTech, consultoría educativa y cualquier conversación donde la educación, las matemáticas y la tecnología puedan encontrar un propósito común.',
    responseTime: 'Tiempo de respuesta: 24–48 horas',
  },
  contactForm: {
    heading: 'Envíame un mensaje',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Correo electrónico',
    collabLabel: 'Tipo de colaboración',
    collabPlaceholder: 'Selecciona una opción...',
    options: {
      academic: 'Colaboración académica',
      edtech: 'Proyecto EdTech',
      consulting: 'Consultoría educativa',
      stem: 'Programa STEM',
      other: 'Otra propuesta',
    },
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Cuéntame sobre tu proyecto, idea o propuesta...',
    submitBtn: 'Enviar mensaje',
    submitting: 'Enviando...',
    success: '¡Mensaje enviado! ✓',
    error: 'Error — intenta de nuevo',
    validationNameRequired: 'El nombre es obligatorio',
    validationEmailRequired: 'El correo es obligatorio',
    validationEmailInvalid: 'Ingresa un correo válido',
    validationCollabRequired: 'El asunto es obligatorio',
    validationMessageRequired: 'El mensaje es obligatorio',
    validationMessageMin: 'El mensaje debe tener al menos 10 caracteres',
    directContactLabel: 'CONTACTO DIRECTO',
    location: 'Puerto Rico, EE. UU.',
    professionalLinksLabel: 'ENLACES PROFESIONALES',
    availabilityLabel: 'DISPONIBILIDAD',
    availabilityStatus: 'Actualmente disponible para colaboraciones',
    availabilityDetail:
      'Abierto a proyectos de consultoría, desarrollo EdTech e investigación colaborativa.',
  },
  collaborationAreas: {
    label: 'ÁREAS DE COLABORACIÓN',
    heading: '¿Cómo puedo',
    headingAccent: 'aportar',
    headingEnd: '?',
    items: [
      {
        title: 'Colaboración Académica',
        description:
          'Co-investigación en educación matemática, tecnología instruccional e IA aplicada. Diseño de estudios, análisis de datos y publicación conjunta.',
        examples: 'Artículos de investigación · Tesis conjuntas · Revisiones sistemáticas',
      },
      {
        title: 'Desarrollo EdTech',
        description:
          'Diseño y desarrollo de plataformas educativas, recursos interactivos y herramientas digitales con fundamento pedagógico sólido. Del concepto al producto.',
        examples: 'Plataformas · Apps educativas · Recursos interactivos · LMS',
      },
      {
        title: 'Consultoría Educativa',
        description:
          'Asesoría a instituciones educativas en transformación digital, diseño curricular, evaluación y estrategias de implementación tecnológica.',
        examples: 'Diagnóstico · Estrategia · Implementación · Capacitación',
      },
      {
        title: 'Programas STEM',
        description:
          'Diseño e implementación de programas integrados de ciencia, tecnología, ingeniería y matemáticas. Estrategias para hacer STEM accesible y atractivo.',
        examples: 'Currículo STEM · Talleres · Competencias · Divulgación',
      },
    ],
  },
  quoteBanner: {
    quote:
      'La educación no es un acto individual. Es un esfuerzo colectivo donde cada conversación, cada colaboración y cada proyecto compartido construye algo mayor que la suma de sus partes.',
    attr: '— Yonatan Guerrero Soriano',
  },
  projectsPage: {
    breadcrumbHome: 'Inicio',
    breadcrumbCurrent: 'Proyectos',
    title: 'Proyectos &',
    titleAccent: 'Investigación',
    subtitle:
      'Una muestra de mi trabajo en la intersección entre educación matemática, tecnología e inteligencia artificial.',
    filters: {
      all: 'Todos',
      platforms: 'Plataformas',
      research: 'Investigación',
      openSource: 'Código Abierto',
      resources: 'Recursos',
    },
    empty: 'No hay proyectos en esta categoría.',
    items: [
      {
        title: 'Digital Mathematics',
        category: 'Plataforma Educativa',
        description:
          'Plataforma propia de educación matemática digital que integra recursos interactivos, visualizaciones dinámicas y contenido pedagógico estructurado. Diseñada para estudiantes, educadores y entusiastas de las matemáticas.',
        tags: ['React', 'D3.js', 'Pedagogía', 'Matemáticas'],
        links: [{ label: 'Visitar digitalmathematics.org →', href: 'https://digitalmathematics.org', external: true }],
      },
      {
        title: 'GitHub Starred — IA & Desarrollo',
        category: 'Comunidad · Open Source',
        description:
          'Repositorios destacados que sigo: antigravity-awesome-skills (33k⭐), awesome-claude-skills (8.5k⭐), trailofbits/skills (4.6k⭐), tutor-skills (741⭐) y microsoft/markitdown (112k⭐). Refleja mi interés en agentes de IA, seguridad y herramientas de desarrollo.',
        tags: ['Claude Code', 'AI Agents', 'Python', 'TypeScript'],
        links: [{ label: 'Ver starred en GitHub →', href: 'https://github.com/JonatanGS777?tab=stars', external: true }],
      },
      {
        title: 'MathMind — IA para Educación Matemática',
        category: 'Proyecto · IA',
        description:
          'Chatbot matemático impulsado por IA que resuelve problemas paso a paso, renderiza fórmulas en LaTeX y adapta las explicaciones al nivel del estudiante. Bilingüe (EN/ES), con historial de conversaciones y modo oscuro.',
        tags: ['Claude AI', 'React', 'KaTeX', 'TypeScript'],
        links: [
          { label: 'Ver demo →', href: '/mathmind', external: false },
        ],
      },
      {
        title: 'Diseño Curricular STEM Integrado',
        category: 'Consultoría · Currículo',
        description:
          'Framework de diseño curricular para programas STEM que integra matemáticas, ciencia y tecnología bajo una visión interdisciplinaria. Incluye mapas de aprendizaje, secuencias didácticas y herramientas de evaluación.',
        tags: ['Currículo', 'STEM', 'Evaluación'],
        links: [
          { label: 'Ver eBook STEM →', href: 'https://digitalmathematics.org/stem/Ebook-STEM/index.html', external: true },
        ],
      },
      {
        title: 'Plataforma de Analítica Educativa',
        category: 'Plataforma · EdTech',
        description:
          'Dashboard de analítica educativa que permite a instituciones visualizar el progreso de estudiantes, identificar patrones de riesgo académico y tomar decisiones basadas en datos para mejorar los resultados de aprendizaje.',
        tags: ['Analítica', 'Dashboard', 'Educación a Distancia'],
        links: [{ label: 'Ver caso de estudio →', href: '#', external: true }],
      },
      {
        title: 'Publicaciones y Artículos de Investigación',
        category: 'Investigación · Academia',
        description:
          'Artículos y capítulos de libro sobre tecnología educativa, educación matemática, diseño instruccional e integración de IA en contextos de aprendizaje formal e informal.',
        tags: ['Publicaciones', 'Peer Review', 'Educación'],
        links: [{ label: 'Ver publicaciones →', href: 'https://digitalmathematics.org/perfil-investigador/index.html', external: true }],
      },
    ],
    deepDiveLabel: 'PROYECTO DESTACADO',
    deepDiveDesc:
      'Mi plataforma insignia donde el rigor matemático se encuentra con el diseño pedagógico y la tecnología moderna. Un espacio diseñado para hacer que el aprendizaje matemático sea visual, interactivo y profundamente comprensible.',
    deepDiveFeatures: [
      'Visualizaciones matemáticas interactivas',
      'Contenido pedagógico estructurado por niveles',
      'Recursos descargables y ejercicios prácticos',
      'Herramientas de visualización de funciones y geometría',
      'Diseño responsive para aprendizaje en cualquier dispositivo',
    ],
    deepDiveCta: 'Visitar Digital Mathematics →',
    deepDiveCaption: 'Captura de la plataforma Digital Mathematics — digitalmathematics.org',
    githubLabel: 'CÓDIGO ABIERTO',
    githubHeading: 'Mi trabajo en',
    githubBody: 'Repositorios, experimentos y herramientas que comparto con la comunidad.',
    githubCta: 'Ver todos los repositorios en GitHub →',
    repoDescriptions: [
      'Control deck de IA: skills y agentes listos para producción',
      'Sitio web ministerial con Firebase Hosting, Auth y Firestore',
      'Página de recursos y contenidos matemáticos',
    ],
    ctaBannerLabel: '¿UN PROYECTO EN MENTE?',
    ctaBannerHeading: 'Colaboremos en',
    ctaBannerAccent: 'algo extraordinario',
    ctaBannerBody:
      'Si tienes una idea que conecte educación, matemáticas y tecnología, me encantaría escucharla.',
    ctaBannerBtn1: 'Proponer colaboración',
    ctaBannerBtn2: 'Conocer más sobre mí →',
  },
} as const;

const en = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    cta: 'Contact',
  },
  hero: {
    label: 'DOCTOR IN EDUCATION · MATHEMATICS · TECHNOLOGY · AI',
    headline: 'Education that',
    headlineAccent: 'transcends',
    headlineEnd: 'the classroom.',
    subheadline:
      'I design solutions where mathematical rigor, pedagogy and artificial intelligence converge to transform learning.',
    cta1: 'View my projects →',
    cta2: 'About me',
    scroll: 'Scroll',
  },
  trajectory: {
    sectionLabel: 'TRAJECTORY',
    name: 'Yonatan Guerrero Soriano',
    subtitle: 'EdD in Education · Mathematician · EdTech · AI',
    quote:
      'My work lives at the intersection: where educational theory meets technological implementation, and where mathematics finds new languages for teaching.',
    timeline: [
      { title: 'Doctorate in Education', desc: 'Instructional technology and distance education' },
      { title: 'Training in Biomathematics', desc: 'Mathematical modeling applied to biological systems' },
      { title: 'Specialization in Mathematics Education', desc: 'Didactics, curriculum design and assessment' },
      { title: 'Digital Mathematics', desc: 'Own digital mathematics education platform — digitalmathematics.org' },
      { title: 'Applied Artificial Intelligence', desc: 'Integration of AI, analytics and interactive resources' },
    ],
    stats: [
      { value: '10+', label: 'Years of experience' },
      { value: '3', label: 'Integrated disciplines' },
      { value: '∞', label: 'Mathematical curiosity' },
    ],
  },
  projectsHome: {
    sectionLabel: 'FEATURED PROJECTS',
    headline: 'Building the',
    headlineAccent: 'future',
    headlineEnd: 'of mathematical learning',
    viewAll: 'View all →',
    items: [
      {
        title: 'Digital Mathematics',
        tags: 'EdTech · Mathematics · Interactive Resources',
        description:
          'Own platform where mathematical pedagogy and technology converge. Designed to make mathematical learning accessible through interactive digital tools.',
        linkLabel: 'Visit platform →',
        hoverText: 'Digital mathematics education platform with interactive resources',
      },
      {
        title: 'Repositories & Code',
        tags: 'Open Source · Development · AI',
        description:
          'Open source projects integrating artificial intelligence, data analytics and development of interactive educational resources.',
        linkLabel: 'View on GitHub →',
        hoverText: 'Open source repositories with AI and educational resources',
      },
    ],
    moreTitle: 'Want to see more projects?',
    moreBtn: 'View all projects →',
  },
  pillars: {
    sectionLabel: 'FOUR PILLARS',
    headline: 'A bridge between',
    headlineAccent: 'disciplines',
    subheadline:
      'My strength lies in uniting academic rigor, pedagogical vision and real implementation capacity.',
    items: [
      {
        title: 'Academic Rigor',
        description:
          'Doctorate in Education with training in biomathematics. A solid theoretical foundation that backs every pedagogical and technological decision.',
        tags: 'Research · Epistemology · Analysis',
      },
      {
        title: 'Pedagogical Vision',
        description:
          'Student-centered instructional design. Curriculum, assessment and strategies that prioritize deep understanding over memorization.',
        tags: 'Instructional Design · Curriculum · Assessment',
      },
      {
        title: 'Technological Implementation',
        description:
          'Real development of platforms, interactive resources and digital tools. From idea to functional product.',
        tags: 'Development · Platforms · Interactivity',
      },
      {
        title: 'Artificial Intelligence',
        description:
          'Integration of applied AI for learning personalization, educational analytics and adaptive resources that respond to each student.',
        tags: 'AI · Analytics · Personalization',
      },
    ],
  },
  cta: {
    label: 'SHALL WE WORK TOGETHER?',
    headline: "Let's build the",
    headlineAccent: 'next',
    headlineEnd: 'step',
    body: 'I am open to academic collaborations, EdTech projects, educational consulting and opportunities where education, mathematics and technology can converge.',
    btn1: 'Start a conversation',
    btn2: 'View my full journey →',
  },
  footer: {
    subtitle: 'Doctor in Education · Mathematician · EdTech · AI',
    navLabel: 'Navigation',
    linksLabel: 'Links',
    contactLabel: 'Contact',
    location: 'Puerto Rico, USA',
    copyright: '© 2025 Yonatan Guerrero Soriano',
    tagline: 'Made with academic rigor and code',
  },
  aboutHero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About me',
    subtitle: 'Doctor in Education · Mathematician · Researcher · EdTech Innovator',
    stats: [
      { abbr: 'EdD', label: 'Doctorate in Education' },
      { abbr: 'MSc', label: 'Biomathematics' },
      { abbr: 'EdTech', label: 'Educational Technology' },
      { abbr: 'AI', label: 'Artificial Intelligence' },
    ],
  },
  aboutBio: {
    label: 'MY STORY',
    opening:
      'I am a doctor in education with a solid background in mathematics and an interdisciplinary career that navigates between biomathematics, mathematics education, instructional technology and applied artificial intelligence.',
    paragraphs: [
      'My academic journey began in mathematics — a discipline that taught me to think with precision, to abstract complexity and to find patterns where others see chaos. This training in biomathematics allowed me to explore how mathematical models can describe and predict complex phenomena, a skill I would later bring to the educational field.',
      'The doctorate in education opened a second dimension: understanding how we learn, how we teach and how technology can amplify both processes. I specialized in instructional technology and distance education, fields where pedagogical theory meets technological implementation.',
      'Today, my work focuses on designing digital mathematics education solutions and integrating artificial intelligence, analytics and interactive resources to improve learning. It is not just about creating tools — it is about creating learning experiences where each technological element responds to a clear pedagogical intention.',
    ],
    quote:
      'True educational innovation does not occur in technology alone, nor in pedagogy in isolation. It occurs at the intersection: where mathematical rigor informs design, where AI personalizes each student\'s path, and where technology becomes invisible so that learning can shine.',
    attr: '— Yonatan Guerrero Soriano',
  },
  aboutTimeline: {
    label: 'TRAINING & CAREER',
    heading: 'The path that brought me',
    headingAccent: 'here',
    items: [
      {
        title: 'Bachelor of Science in Biomathematics',
        institution: 'Universidad Metropolitana (UAGM)',
        focus: 'Applied Mathematics, Bioinformatics and Computational Biology',
        description:
          'Solid foundation in mathematical modeling, biological data analysis and computational methods. This training shaped my analytical and quantitative thinking.',
      },
      {
        title: 'Master of Education (MEd)',
        institution: 'Inter American University of Puerto Rico – Metropolitan Campus',
        focus: 'Educational Sciences with a Specialization in Mathematics',
        description:
          'In-depth study of mathematics didactics, curriculum design and formative assessment. Suma Cum Laude. Focus on discrete mathematics and teaching methodologies.',
      },
      {
        title: 'Doctor of Education (EdD)',
        institution: 'Nova Southeastern University',
        focus: 'Specialization in Instructional Technology and Distance Education',
        description:
          'Doctoral research on instructional design strategies for hybrid mathematics learning using AI as a pedagogical tool.',
      },
      {
        title: 'Digital Mathematics',
        institution: 'Independent Project',
        focus: 'Digital mathematics education platform',
        description:
          'Creation and development of digitalmathematics.org — a platform that integrates interactive resources, visualization tools and pedagogical content for mathematical learning.',
        focusLink: 'https://digitalmathematics.org',
      },
      {
        title: 'AI Integration in Education',
        institution: 'Active research line',
        focus: 'Artificial intelligence applied to mathematics education',
        description:
          'Development of systems that use AI to personalize mathematical learning, generate adaptive feedback and analyze learning patterns in real time.',
      },
    ],
  },
  aboutPhilosophy: {
    label: 'RESEARCH PHILOSOPHY',
    heading: 'The principles that guide my',
    headingAccent: 'work',
    cards: [
      {
        number: '01',
        title: 'The Intersection is the Future',
        body: "The most interesting problems in education are not solved from a single discipline. They require mathematicians who understand pedagogy, educators who master technology, and technologists who respect the learning process. My work inhabits that interdisciplinary space.",
      },
      {
        number: '02',
        title: 'Technology with Purpose',
        body: 'Every digital tool, every AI algorithm, every interactive resource must answer a clear pedagogical question: how does this improve learning? Technology alone does not transform education. Technology designed with pedagogical intention does.',
      },
      {
        number: '03',
        title: 'From Theory to Code',
        body: 'There is a gap between educational research and its real application. My strength lies in closing that gap: translating theoretical findings into functional platforms, into resources that students actually use, into solutions that generate measurable impact.',
      },
    ],
  },
  aboutContexts: {
    label: 'APPLICATION CONTEXT',
    heading: 'My work has',
    headingAccent: 'impact',
    headingEnd: 'in:',
    items: [
      {
        title: 'Academic Environments',
        description:
          'Universities, colleges, academic coordination and curriculum design. Development of study programs, teaching strategies and assessment in formal educational contexts.',
      },
      {
        title: 'EdTech Companies',
        description:
          'Instructional design, educational product development and formative innovation. Collaboration with startups and educational technology companies to create products with real pedagogical value.',
      },
      {
        title: 'Educational Consulting',
        description:
          'Diagnosis, strategy and improvement of educational processes. Advisory services to institutions seeking to transform their teaching-learning practices through technological integration.',
      },
      {
        title: 'STEM Programs',
        description:
          'Design and implementation of science, technology, engineering and mathematics programs. Strategies to make these disciplines accessible and engaging for diverse audiences.',
      },
    ],
  },
  aboutCta: {
    label: 'INTERESTED IN COLLABORATING?',
    heading: "Let's talk about",
    headingAccent: 'education, mathematics or technology',
    body: 'I am always open to new conversations, collaborations and projects where these three passions can find a common purpose.',
    btn: 'Contact me →',
  },
  contactHero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Contact',
    title: "Let's Talk",
    subtitle:
      'I am open to academic collaborations, EdTech projects, educational consulting and any conversation where education, mathematics and technology can find a common purpose.',
    responseTime: 'Response time: 24–48 hours',
  },
  contactForm: {
    heading: 'Send me a message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address',
    collabLabel: 'Collaboration type',
    collabPlaceholder: 'Select an option...',
    options: {
      academic: 'Academic collaboration',
      edtech: 'EdTech project',
      consulting: 'Educational consulting',
      stem: 'STEM program',
      other: 'Other proposal',
    },
    messageLabel: 'Message',
    messagePlaceholder: 'Tell me about your project, idea or proposal...',
    submitBtn: 'Send message',
    submitting: 'Sending...',
    success: 'Message sent! ✓',
    error: 'Error — try again',
    validationNameRequired: 'Name is required',
    validationEmailRequired: 'Email is required',
    validationEmailInvalid: 'Enter a valid email',
    validationCollabRequired: 'Subject is required',
    validationMessageRequired: 'Message is required',
    validationMessageMin: 'Message must be at least 10 characters',
    directContactLabel: 'DIRECT CONTACT',
    location: 'Puerto Rico, USA',
    professionalLinksLabel: 'PROFESSIONAL LINKS',
    availabilityLabel: 'AVAILABILITY',
    availabilityStatus: 'Currently available for collaborations',
    availabilityDetail:
      'Open to consulting projects, EdTech development and collaborative research.',
  },
  collaborationAreas: {
    label: 'COLLABORATION AREAS',
    heading: 'How can I',
    headingAccent: 'contribute',
    headingEnd: '?',
    items: [
      {
        title: 'Academic Collaboration',
        description:
          'Co-research in mathematics education, instructional technology and applied AI. Study design, data analysis and joint publication.',
        examples: 'Research articles · Joint theses · Systematic reviews',
      },
      {
        title: 'EdTech Development',
        description:
          'Design and development of educational platforms, interactive resources and digital tools with a solid pedagogical foundation. From concept to product.',
        examples: 'Platforms · Educational apps · Interactive resources · LMS',
      },
      {
        title: 'Educational Consulting',
        description:
          'Advisory services to educational institutions on digital transformation, curriculum design, assessment and technology implementation strategies.',
        examples: 'Diagnosis · Strategy · Implementation · Training',
      },
      {
        title: 'STEM Programs',
        description:
          'Design and implementation of integrated science, technology, engineering and mathematics programs. Strategies to make STEM accessible and engaging.',
        examples: 'STEM curriculum · Workshops · Competitions · Outreach',
      },
    ],
  },
  quoteBanner: {
    quote:
      'Education is not an individual act. It is a collective effort where every conversation, every collaboration and every shared project builds something greater than the sum of its parts.',
    attr: '— Yonatan Guerrero Soriano',
  },
  projectsPage: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Projects',
    title: 'Projects &',
    titleAccent: 'Research',
    subtitle:
      'A showcase of my work at the intersection of mathematics education, technology and artificial intelligence.',
    filters: {
      all: 'All',
      platforms: 'Platforms',
      research: 'Research',
      openSource: 'Open Source',
      resources: 'Resources',
    },
    empty: 'No projects in this category.',
    items: [
      {
        title: 'Digital Mathematics',
        category: 'Educational Platform',
        description:
          'Own digital mathematics education platform integrating interactive resources, dynamic visualizations and structured pedagogical content. Designed for students, educators and mathematics enthusiasts.',
        tags: ['React', 'D3.js', 'Pedagogy', 'Mathematics'],
        links: [{ label: 'Visit digitalmathematics.org →', href: 'https://digitalmathematics.org', external: true }],
      },
      {
        title: 'GitHub Starred — AI & Development',
        category: 'Community · Open Source',
        description:
          'Curated starred repositories I follow: antigravity-awesome-skills (33k⭐), awesome-claude-skills (8.5k⭐), trailofbits/skills (4.6k⭐), tutor-skills (741⭐) and microsoft/markitdown (112k⭐). Reflects my interest in AI agents, security and developer tooling.',
        tags: ['Claude Code', 'AI Agents', 'Python', 'TypeScript'],
        links: [{ label: 'View starred on GitHub →', href: 'https://github.com/JonatanGS777?tab=stars', external: true }],
      },
      {
        title: 'MathMind — AI Math Tutor',
        category: 'Project · AI',
        description:
          'AI-powered math chatbot that solves problems step by step, renders formulas with LaTeX and adapts explanations to the student\'s level. Bilingual (EN/ES), with conversation history and dark mode.',
        tags: ['Claude AI', 'React', 'KaTeX', 'TypeScript'],
        links: [
          { label: 'View demo →', href: '/mathmind', external: false },
        ],
      },
      {
        title: 'Integrated STEM Curriculum Design',
        category: 'Consulting · Curriculum',
        description:
          'Curriculum design framework for STEM programs integrating mathematics, science and technology under an interdisciplinary vision. Includes learning maps, didactic sequences and assessment tools.',
        tags: ['Curriculum', 'STEM', 'Assessment'],
        links: [
          { label: 'View STEM eBook →', href: 'https://digitalmathematics.org/stem/Ebook-STEM/index.html', external: true },
        ],
      },
      {
        title: 'Educational Analytics Platform',
        category: 'Platform · EdTech',
        description:
          'Educational analytics dashboard that enables institutions to visualize student progress, identify academic risk patterns and make data-driven decisions to improve learning outcomes.',
        tags: ['Analytics', 'Dashboard', 'Distance Education'],
        links: [{ label: 'View case study →', href: '#', external: true }],
      },
      {
        title: 'Research Publications & Articles',
        category: 'Research · Academia',
        description:
          'Articles and book chapters on educational technology, mathematics education, instructional design and AI integration in formal and informal learning contexts.',
        tags: ['Publications', 'Peer Review', 'Education'],
        links: [{ label: 'View publications →', href: 'https://digitalmathematics.org/perfil-investigador/index.html', external: true }],
      },
    ],
    deepDiveLabel: 'FEATURED PROJECT',
    deepDiveDesc:
      'My flagship platform where mathematical rigor meets pedagogical design and modern technology. A space designed to make mathematical learning visual, interactive and deeply comprehensible.',
    deepDiveFeatures: [
      'Interactive mathematical visualizations',
      'Pedagogical content structured by levels',
      'Downloadable resources and practice exercises',
      'Function and geometry visualization tools',
      'Responsive design for learning on any device',
    ],
    deepDiveCta: 'Visit Digital Mathematics →',
    deepDiveCaption: 'Screenshot of the Digital Mathematics platform — digitalmathematics.org',
    githubLabel: 'OPEN SOURCE',
    githubHeading: 'My work on',
    githubBody: 'Repositories, experiments and tools I share with the community.',
    githubCta: 'View all repositories on GitHub →',
    repoDescriptions: [
      'AI skill & agent control deck: benchmarked, production-ready',
      'Ministry website with Firebase Hosting, Auth & Firestore',
      'Mathematics resources and content page',
    ],
    ctaBannerLabel: 'A PROJECT IN MIND?',
    ctaBannerHeading: "Let's collaborate on",
    ctaBannerAccent: 'something extraordinary',
    ctaBannerBody:
      'If you have an idea that connects education, mathematics and technology, I would love to hear it.',
    ctaBannerBtn1: 'Propose collaboration',
    ctaBannerBtn2: 'Learn more about me →',
  },
} as const;

export const translations = { es, en } as const;

type Stringified<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<Stringified<U>>
  : T extends object
  ? { readonly [K in keyof T]: Stringified<T[K]> }
  : T;

export type Translations = Stringified<typeof es>;

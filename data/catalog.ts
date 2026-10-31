import type { Category, Product } from "@/types/product";

export const hero = {
  badge: "In evidenza",
  productSlug: "scala-valutazione-cognitiva-adulti",
  primaryCta: { label: "Esplora il catalogo", href: "/catalogo" },
  productCtaLabel: "Scopri il prodotto",
};

export const categories: Category[] = [
  { id: "clinica", label: "Clinica e Neuropsicologia" },
  { id: "scuola", label: "Scuola ed Età evolutiva" },
  { id: "lavoro", label: "Lavoro e Organizzazioni" },
  { id: "formazione", label: "Formazione" },
];

const img = (name: string) => `/images/prodotti/${name}.jpg`;

export const products: Product[] = [
  {
    id: "p01",
    slug: "scala-valutazione-cognitiva-adulti",
    name: "Scala di Valutazione Cognitiva Adulti",
    author: "Dr.ssa Elena Marchetti",
    kind: "test",
    category: "clinica",
    format: "Cartaceo",
    ageRange: "18-90 anni",
    price: 1250,
    discountPrice: 1062.5,
    image: img("prodotto_01"),
    imageAlt: "Professionista sanitario con documenti clinici",
    topics: ["funzioni-cognitive-e-neuropsicologia", "comportamento"],
    constructs: ["intelligenza", "attenzione"],
    description:
      "Strumento per valutare le principali funzioni cognitive negli adulti, dall'attenzione alla memoria di lavoro. Pensato per il contesto clinico e per il monitoraggio nel tempo.",
    includes: [
      "Manuale d'uso",
      "Fascicoli di somministrazione",
      "Fogli di scoring",
    ],
  },
  {
    id: "p02",
    slug: "batteria-neuropsicologica-digitale",
    name: "Batteria Neuropsicologica Digitale",
    author: "Prof. Marco Valentini",
    kind: "test",
    category: "clinica",
    format: "Digitale",
    ageRange: "16-85 anni",
    price: 890,
    discountPrice: 756.5,
    image: img("prodotto_02"),
    imageAlt: "Schermata con grafici di valutazione neuropsicologica",
    topics: ["funzioni-cognitive-e-neuropsicologia"],
    constructs: ["attenzione", "sviluppo-neuropsicologico"],
    description:
      "Batteria di prove somministrabile su tablet o computer, con calcolo automatico dei punteggi e report immediato. Riduce i tempi di scoring e rende più semplice confrontare i risultati.",
    includes: [
      "Licenza d'uso annuale",
      "Report automatico in PDF",
      "Assistenza dedicata",
    ],
  },
  {
    id: "p03",
    slug: "questionario-ansia-generalizzata",
    name: "Questionario sull'Ansia Generalizzata",
    author: "Dr. Paolo Ferretti",
    kind: "test",
    category: "clinica",
    format: "Digitale",
    ageRange: "14-75 anni",
    price: 320,
    image: img("prodotto_03"),
    imageAlt: "Persona che compila un questionario al computer",
    topics: ["benessere", "personalita"],
    constructs: ["salute-mentale"],
    description:
      "Questionario breve per rilevare la presenza e l'intensità dei sintomi d'ansia. Adatto a screening iniziali e a verifiche di follow-up.",
    includes: [
      "Accesso alla piattaforma online",
      "Griglia di interpretazione",
      "Report di sintesi",
    ],
  },
  {
    id: "p04",
    slug: "profilo-abilita-lettura",
    name: "Profilo delle Abilità di Lettura",
    author: "Dr.ssa Chiara Bellini",
    kind: "test",
    category: "scuola",
    format: "Cartaceo",
    ageRange: "6-11 anni",
    price: 410,
    discountPrice: 348.5,
    image: img("prodotto_04"),
    imageAlt: "Bambino che legge un libro in classe",
    topics: ["apprendimenti", "linguaggio-e-comunicazione"],
    constructs: ["linguaggio", "processi-di-apprendimento"],
    description:
      "Prove graduate per valutare velocità e correttezza di lettura nella scuola primaria. Utile per individuare precocemente eventuali difficoltà.",
    includes: [
      "Quaderno delle prove",
      "Guida alla somministrazione",
      "Schede di registrazione",
    ],
  },
  {
    id: "p05",
    slug: "scala-sviluppo-emotivo-infantile",
    name: "Scala dello Sviluppo Emotivo Infantile",
    author: "Prof.ssa Giulia Romano",
    kind: "test",
    category: "scuola",
    format: "Digitale",
    ageRange: "3-10 anni",
    price: 560,
    discountPrice: 476,
    image: img("prodotto_05"),
    imageAlt: "Gruppo di bambini che lavorano insieme",
    topics: ["benessere", "comportamento"],
    constructs: ["funzionamento-socio-emotivo", "salute-mentale"],
    description:
      "Scala per osservare lo sviluppo emotivo e relazionale dei bambini, con indicazioni pratiche per genitori e insegnanti.",
    includes: [
      "Accesso digitale per un anno",
      "Report per la famiglia",
      "Indicazioni per la scuola",
    ],
  },
  {
    id: "p06",
    slug: "inventario-interessi-scolastici",
    name: "Inventario degli Interessi Scolastici",
    author: "Dr. Luca Santoro",
    kind: "test",
    category: "scuola",
    format: "Cartaceo",
    ageRange: "11-18 anni",
    price: 295,
    image: img("prodotto_06"),
    imageAlt: "Quaderno e matite su una scrivania",
    topics: ["orientamento-professionale", "apprendimenti"],
    constructs: ["orientamento-lavorativo", "processi-di-apprendimento"],
    description:
      "Inventario per esplorare interessi e preferenze degli studenti, a supporto dell'orientamento scolastico.",
    includes: [
      "Fascicoli per lo studente",
      "Fogli di profilo",
      "Guida per l'insegnante",
    ],
  },
  {
    id: "p07",
    slug: "valutazione-potenziale-professionale",
    name: "Valutazione del Potenziale Professionale",
    author: "Dr.ssa Francesca Moretti",
    kind: "test",
    category: "lavoro",
    format: "Digitale",
    ageRange: "18-65 anni",
    price: 1480,
    discountPrice: 1258,
    image: img("prodotto_07"),
    imageAlt: "Professionista durante un colloquio di lavoro",
    topics: [
      "selezione-del-personale",
      "sviluppo-del-talento",
      "orientamento-professionale",
    ],
    constructs: ["orientamento-lavorativo", "intelligenza"],
    description:
      "Percorso di valutazione per individuare punti di forza e margini di crescita in ambito professionale.",
    includes: [
      "Licenza per 10 valutazioni",
      "Report individuale",
      "Sessione di restituzione guidata",
    ],
  },
  {
    id: "p08",
    slug: "questionario-clima-organizzativo",
    name: "Questionario sul Clima Organizzativo",
    author: "Prof. Andrea Colombo",
    kind: "test",
    category: "lavoro",
    format: "Cartaceo",
    ageRange: "18-65 anni",
    price: 740,
    discountPrice: 629,
    image: img("prodotto_08"),
    imageAlt: "Pila di libri colorati su sfondo sfocato",
    topics: ["clima-e-cultura-aziendale"],
    constructs: ["ambito-organizzativo"],
    description:
      "Questionario per misurare la percezione del clima in team e organizzazioni, con confronto tra le diverse aree.",
    includes: [
      "Pacchetto di 50 questionari",
      "Griglia di analisi",
      "Guida all'interpretazione",
    ],
  },
  {
    id: "p09",
    slug: "corso-base-somministrazione-test",
    name: "Corso Base di Somministrazione dei Test",
    author: "Dr.ssa Laura Gentile",
    kind: "corso",
    category: "formazione",
    format: "Corso online",
    startDate: "2026-11-20",
    price: 450,
    hours: 9,
    ecm: 9,
    image: img("prodotto_09"),
    imageAlt: "Persone in videoconferenza durante una lezione",
    topics: ["apprendimenti"],
    constructs: ["processi-di-apprendimento"],
    description:
      "Corso online per imparare le basi della somministrazione e dello scoring dei test, con esercitazioni pratiche.",
    includes: [
      "Accesso alle lezioni registrate",
      "Materiali scaricabili",
      "Attestato di partecipazione",
    ],
  },
  {
    id: "p10",
    slug: "workshop-interpretazione-clinica",
    name: "Workshop di Interpretazione Clinica",
    author: "Prof. Roberto Esposito",
    kind: "corso",
    category: "formazione",
    format: "In presenza",
    startDate: "2027-01-15",
    price: 980,
    discountPrice: 833,
    hours: 16,
    ecm: 20,
    image: img("prodotto_10"),
    imageAlt: "Aula con partecipanti a un workshop",
    topics: ["funzioni-cognitive-e-neuropsicologia", "personalita"],
    constructs: ["salute-mentale"],
    description:
      "Workshop in presenza dedicato alla lettura dei profili e alla stesura del report, con la discussione di casi simulati.",
    includes: [
      "Due giornate in aula",
      "Materiale didattico",
      "Attestato di partecipazione",
    ],
  },
  {
    id: "p11",
    slug: "master-valutazione-neuropsicologica",
    name: "Master in Valutazione Neuropsicologica",
    author: "Prof.ssa Silvia Caruso",
    kind: "corso",
    category: "formazione",
    format: "In presenza",
    startDate: "2027-02-12",
    price: 2400,
    hours: 120,
    ecm: 50,
    image: img("prodotto_11"),
    imageAlt: "Studenti universitari in aula",
    topics: ["funzioni-cognitive-e-neuropsicologia", "sviluppo-del-talento"],
    constructs: ["sviluppo-neuropsicologico", "attenzione"],
    description:
      "Percorso di approfondimento di più mesi sulla valutazione neuropsicologica, tra teoria, pratica e supervisione.",
    includes: [
      "Lezioni in presenza",
      "Supervisione sui casi",
      "Attestato finale",
    ],
  },
  {
    id: "p12",
    slug: "corso-avanzato-assessment-organizzativo",
    name: "Corso Avanzato di Assessment Organizzativo",
    author: "Dr. Matteo Greco",
    kind: "corso",
    category: "formazione",
    format: "Corso online",
    startDate: "2026-12-03",
    price: 690,
    discountPrice: 586.5,
    hours: 12,
    ecm: 12,
    image: img("prodotto_12"),
    imageAlt: "Professionista che segue un corso online sul portatile",
    topics: [
      "clima-e-cultura-aziendale",
      "selezione-del-personale",
      "sviluppo-del-talento",
    ],
    constructs: ["ambito-organizzativo", "comportamenti"],
    description:
      "Corso online avanzato su strumenti e metodi per l'assessment nelle organizzazioni.",
    includes: [
      "Lezioni online live e registrate",
      "Esercitazioni guidate",
      "Attestato di partecipazione",
    ],
  },
];

export interface MenuLink {
  label: string;
  slug: string;
}

export const temi: MenuLink[] = [
  { label: "Apprendimenti", slug: "apprendimenti" },
  { label: "Benessere", slug: "benessere" },
  { label: "Clima e cultura aziendale", slug: "clima-e-cultura-aziendale" },
  { label: "Comportamento", slug: "comportamento" },
  {
    label: "Funzioni cognitive e neuropsicologia",
    slug: "funzioni-cognitive-e-neuropsicologia",
  },
  { label: "Linguaggio e comunicazione", slug: "linguaggio-e-comunicazione" },
  { label: "Orientamento professionale", slug: "orientamento-professionale" },
  { label: "Personalità", slug: "personalita" },
  { label: "Selezione del personale", slug: "selezione-del-personale" },
  { label: "Sviluppo del talento", slug: "sviluppo-del-talento" },
];

export const costrutti: MenuLink[] = [
  { label: "Ambito organizzativo", slug: "ambito-organizzativo" },
  { label: "Attenzione", slug: "attenzione" },
  { label: "Comportamenti", slug: "comportamenti" },
  { label: "Funzionamento socio-emotivo", slug: "funzionamento-socio-emotivo" },
  { label: "Intelligenza", slug: "intelligenza" },
  { label: "Linguaggio", slug: "linguaggio" },
  { label: "Orientamento lavorativo", slug: "orientamento-lavorativo" },
  { label: "Processi di apprendimento", slug: "processi-di-apprendimento" },
  { label: "Salute mentale", slug: "salute-mentale" },
  { label: "Sviluppo neuropsicologico", slug: "sviluppo-neuropsicologico" },
];

export const utilityLinks = ["Corporate", "Aiuto"];

export const platformLabel = "Accesso alla piattaforma";

export const platformItems = [
  "Piattaforma di valutazione online",
  "Area Clienti",
  "Crea un account",
];

export interface ContactChannel {
  id: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  hours: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "assistenza",
    title: "Assistenza clienti",
    description:
      "Domande su prodotti, accesso alla piattaforma e uso dei test.",
    email: "assistenza@example.com",
    phone: "+39 000 000 0000",
    hours: "Lun–Ven, 9:00–18:00",
  },
  {
    id: "ordini",
    title: "Ordini e spedizioni",
    description: "Stato dell'ordine, fatture, resi e rimborsi.",
    email: "ordini@example.com",
    hours: "Lun–Ven, 9:00–17:00",
  },
  {
    id: "formazione",
    title: "Formazione",
    description: "Iscrizioni ai corsi, calendario, sedi e attestati.",
    email: "formazione@example.com",
    phone: "+39 000 000 0001",
    hours: "Lun–Ven, 9:00–17:00",
  },
];

export const headquarters = {
  name: "Sede (dimostrativa)",
  lines: ["Via dei Test 10", "50123 Firenze (FI)", "Italia"],
};

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Come posso seguire il mio ordine?",
    answer:
      "Dopo la spedizione riceverai un'email con il codice di tracciamento. Per qualsiasi dubbio scrivi all'assistenza ordini indicando il numero dell'ordine.",
  },
  {
    question: "Posso restituire un prodotto?",
    answer:
      "I prodotti fisici integri possono essere resi entro 14 giorni dalla consegna. I prodotti digitali e i corsi seguono le condizioni indicate al momento dell'acquisto.",
  },
  {
    question: "Come mi iscrivo a un corso?",
    answer:
      "Apri la scheda del corso dal catalogo, scegli il numero di posti e aggiungilo al carrello. Dopo il pagamento riceverai la conferma con tutte le informazioni.",
  },
  {
    question: "Come si attivano i test digitali?",
    answer:
      "Al termine dell'acquisto ricevi le istruzioni per accedere alla piattaforma con le tue credenziali. Se hai problemi di accesso, contatta l'assistenza clienti.",
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Area Clienti",
    links: [
      { label: "Aiuto", href: "/contatti#faq" },
      { label: "Contattaci", href: "/contatti" },
      { label: "Condizioni generali di vendita", href: "#inizio" },
      { label: "Resi e rimborsi", href: "#inizio" },
    ],
  },
  {
    title: "Giunti Psychometrics",
    links: [
      { label: "Chi siamo", href: "#inizio" },
      { label: "Lavora con noi", href: "#inizio" },
      { label: "Codice etico", href: "#inizio" },
      { label: "Sistema di segnalazione", href: "#inizio" },
    ],
  },
  {
    title: "Esplora",
    links: [
      { label: "Catalogo test", href: "/catalogo" },
      { label: "Formazione", href: "/catalogo?categoria=formazione" },
      { label: "Guida all'acquisto dei test", href: "#inizio" },
      { label: "Notizie", href: "/#risorse" },
    ],
  },
];

export const footerLegalLinks: FooterLink[] = [
  { label: "Informativa privacy", href: "#inizio" },
  { label: "Cookie", href: "#inizio" },
  { label: "Accessibilità", href: "#inizio" },
];

export type SocialId = "linkedin" | "instagram" | "youtube" | "facebook";

export const socialLinks: { id: SocialId; label: string; href: string }[] = [
  { id: "linkedin", label: "LinkedIn", href: "#inizio" },
  { id: "instagram", label: "Instagram", href: "#inizio" },
  { id: "youtube", label: "YouTube", href: "#inizio" },
  { id: "facebook", label: "Facebook", href: "#inizio" },
];

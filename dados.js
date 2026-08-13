const FONTE_OFICIAL = {
  url: "https://wp.ufpel.edu.br/transporte/transporte-apoio/pelotas/",
  atualizadoEm: "22 de março de 2026",
};

const PARADAS = {
  anglo: {
    id: "anglo",
    nome: "Anglo",
    subtitulo: "Campus Anglo · Centro",
    arquivo: "anglo.html",
  },
  odonto: {
    id: "odonto",
    nome: "Odonto",
    subtitulo: "Parada Panvel",
    arquivo: "odonto.html",
  },
  direito: {
    id: "direito",
    nome: "Direito",
    subtitulo: "Faculdade de Direito",
    arquivo: "direito.html",
  },
};

const ALIASES_PARADA = {
  anglo: ["Anglo"],
  odonto: ["Odonto"],
  direito: ["Direito"],
};

const T = {
  circ0715: [
    "Direito", "Eng. Madeireira", "CEU", "Direito", "Odonto", "ALM",
    "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  circ0800: [
    "Anglo", "Direito", "Odonto", "ALM", "Campus II", "FaUrb",
    "Cotada", "CEIQ", "Anglo",
  ],
  circPadrao: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "Odonto", "ALM", "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  circRu: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "Eng. Madeireira", "Odonto", "RU", "Odonto", "ALM", "Campus II",
    "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  circ2100: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "Eng. Madeireira", "Odonto", "ALM", "Campus II", "FaUrb", "Cotada",
    "CEIQ", "Anglo",
  ],
  circ2145: ["Anglo", "CEIQ", "Direito", "CEIQ", "Anglo"],
  esef0700: [
    "Direito", "FaMed", "Canguru", "CEU", "Madeireira", "Direito",
    "Odonto", "ALM", "ESEF", "Amílcar Gigante", "FaMed", "Laneira",
    "Canguru", "CEU", "Madeireira", "Direito", "Odonto", "ALM",
    "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef0900: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito",
    "Madeireira", "ESEF", "Amílcar Gigante", "FaMed", "Laneira",
    "Canguru", "CEU", "Madeireira", "Direito", "Odonto", "ALM",
    "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef1115: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "RU", "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru",
    "CEU", "Madeireira", "Direito", "Odonto", "RU", "Odonto", "ALM",
    "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef1300: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "RU", "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru",
    "CEU", "Direito", "Odonto", "RU", "Odonto", "ALM", "Campus II",
    "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef1510: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "Madeireira", "ESEF", "Amílcar Gigante", "FaMed", "Laneira",
    "Canguru", "CEU", "Direito", "Odonto", "ALM", "Campus II", "FaUrb",
    "Cotada", "CEIQ", "Anglo",
  ],
  esef1650: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "Odonto", "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru",
    "CEU", "Madeireira", "Odonto", "ALM", "Campus II", "FaUrb",
    "Cotada", "CEIQ", "Anglo",
  ],
  esef1800: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "CEU",
    "HE", "Laneira", "FaMed", "Laneira", "Canguru", "CEU", "Direito",
    "Odonto", "ALM", "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef1820: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "RU", "Odonto", "ESEF", "Amílcar Gigante", "FaMed", "Laneira",
    "Canguru", "CEU", "Odonto", "RU", "Odonto", "ALM", "Campus II",
    "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef2000: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru", "CEU",
    "Direito", "Odonto", "ALM", "Campus II", "FaUrb", "Cotada", "CEIQ",
    "Anglo",
  ],
  esef2100: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru", "CEU",
    "Odonto", "ALM", "Campus II", "FaUrb", "Cotada", "CEIQ", "Anglo",
  ],
  esef2210: [
    "Anglo", "CEIQ", "Cotada", "CCHS", "Campus II", "Direito", "Odonto",
    "ESEF", "Amílcar Gigante", "FaMed", "Laneira", "Canguru", "CEU",
    "Direito", "Odonto", "ALM", "Campus II", "FaUrb", "Cotada", "CEIQ",
    "Anglo",
  ],
};

const LINHAS = [
  {
    id: "circular",
    nome: "Circular Anglo",
    descricao: "Centro · Direito · Odonto · Campus II",
    partidas: [
      { hora: "07:15", itinerario: T.circ0715 },
      { hora: "08:00", itinerario: T.circ0800 },
      { hora: "09:00", itinerario: T.circPadrao },
      { hora: "10:00", itinerario: T.circPadrao },
      { hora: "11:00", itinerario: T.circRu },
      { hora: "12:00", itinerario: T.circRu },
      { hora: "13:00", itinerario: T.circRu },
      { hora: "14:00", itinerario: T.circPadrao },
      { hora: "15:00", itinerario: T.circPadrao },
      { hora: "16:00", itinerario: T.circPadrao },
      { hora: "17:00", itinerario: T.circRu },
      { hora: "18:00", itinerario: T.circRu },
      { hora: "19:00", itinerario: T.circRu },
      { hora: "20:00", itinerario: T.circRu },
      { hora: "21:00", itinerario: T.circ2100 },
      { hora: "21:45", itinerario: T.circ2145 },
      { hora: "22:20", itinerario: T.circPadrao },
    ],
  },
  {
    id: "esef",
    nome: "ESEF · FaMed",
    descricao: "Anglo · ESEF · FaMed · Eng. Madeireira",
    partidas: [
      { hora: "07:00", itinerario: T.esef0700 },
      { hora: "09:00", itinerario: T.esef0900 },
      { hora: "11:15", itinerario: T.esef1115 },
      { hora: "13:00", itinerario: T.esef1300 },
      { hora: "15:10", itinerario: T.esef1510 },
      { hora: "16:50", itinerario: T.esef1650 },
      { hora: "18:00", itinerario: T.esef1800 },
      { hora: "18:20", itinerario: T.esef1820 },
      { hora: "20:00", itinerario: T.esef2000 },
      { hora: "21:00", itinerario: T.esef2100 },
      { hora: "22:10", itinerario: T.esef2210 },
    ],
  },
];

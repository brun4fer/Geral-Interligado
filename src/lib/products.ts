export type Product = {
  title: string;
  description: string;
  url?: string;
  icon: "video" | "goal" | "users" | "chart" | "map" | "live";
  label: string;
};

export type ProductGroup = {
  number: string;
  title: string;
  description: string;
  accent: "cyan" | "violet" | "mint" | "amber" | "rose";
  products: Product[];
};

export const productGroups: ProductGroup[] = [
  {
    number: "01",
    title: "Adversário",
    description: "Preparação coletiva e padrões de finalização do próximo adversário.",
    accent: "cyan",
    products: [
      {
        title: "Análise ao adversário",
        description: "Identifica momentos, submomentos e padrões coletivos em vídeo.",
        url: "https://analise-adversario.vercel.app/",
        icon: "video",
        label: "1.1"
      },
      {
        title: "Golos marcados",
        description: "Regista e consulta os golos marcados pelo adversário.",
        url: "https://football-analysis1.vercel.app/",
        icon: "goal",
        label: "1.2"
      }
    ]
  },
  {
    number: "02",
    title: "Jogadores adversários",
    description: "Observação individual e perfis dos jogadores que vais enfrentar.",
    accent: "violet",
    products: [
      {
        title: "Análise individual adversária",
        description: "Módulo reservado para a futura análise dos jogadores adversários.",
        icon: "users",
        label: "2.1"
      }
    ]
  },
  {
    number: "03",
    title: "A nossa equipa",
    description: "Análise coletiva da equipa e revisão dos golos sofridos.",
    accent: "mint",
    products: [
      {
        title: "Análise de jogo",
        description: "Revê os jogos da equipa, identifica momentos e produz mapas.",
        url: "https://analise-equipa.vercel.app/login?next=%2F",
        icon: "chart",
        label: "3.1"
      },
      {
        title: "Golos sofridos",
        description: "Regista o contexto tático e os intervenientes de cada golo sofrido.",
        url: "https://golossofridos.vercel.app/",
        icon: "goal",
        label: "3.2"
      }
    ]
  },
  {
    number: "04",
    title: "Os nossos jogadores",
    description: "Vídeo individual e métricas de rendimento dos teus jogadores.",
    accent: "amber",
    products: [
      {
        title: "Análise individual",
        description: "Marca ações e subações individuais diretamente sobre o vídeo.",
        url: "https://video-analise-jogadores.vercel.app/",
        icon: "video",
        label: "4.1"
      },
      {
        title: "Mapa de ações",
        description: "Consulta estatísticas, comparações e mapas de rendimento.",
        url: "https://football-our-players-yavn.vercel.app/",
        icon: "map",
        label: "4.2"
      }
    ]
  },
  {
    number: "05",
    title: "Live Game",
    description: "Informação e apoio à decisão durante o jogo.",
    accent: "rose",
    products: [
      {
        title: "Análise em direto",
        description: "Espaço reservado para o futuro módulo de acompanhamento ao vivo.",
        icon: "live",
        label: "5.1"
      }
    ]
  }
];


export type ProductIcon = "coding" | "video" | "goal" | "users" | "chart" | "map" | "live" | "document" | "presentation" | "training" | "scouting";

export type ProductStatus = "available" | "configuration" | "planned";

export type Product = {
  id: string;
  title: string;
  description: string;
  url?: string;
  icon: ProductIcon;
  status: ProductStatus;
};

export type EcosystemArea = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "opponent-team" | "opponent-player" | "our-team" | "our-player" | "practice" | "individual" | "collective" | "scouting";
  accent: string;
  products: Product[];
};

function configuredProduct(product: Omit<Product, "status">): Product {
  return { ...product, status: product.url ? "available" : "configuration" };
}

export function getEcosystemAreas(): EcosystemArea[] {
  const tactiDrawUrl = process.env.TACTIDRAW_URL?.trim() || "https://draw-analysis.vercel.app";
  const gamePlanUrl = process.env.GAMEPLAN_URL?.trim();
  const writtenReportUrl = process.env.WRITTEN_REPORT_URL?.trim();
  const liveGameUrl = process.env.LIVE_GAME_URL?.trim() || "https://live-game-lilac.vercel.app";
  const liveTrainingUrl = process.env.LIVE_TRAINING_URL?.trim() || "https://live-training.vercel.app";

  const tactiDraw = configuredProduct({
    id: "tactidraw",
    title: "Opponent Video Analysis",
    description: "Análise de vídeo, desenho tático e construção de apresentações.",
    url: tactiDrawUrl,
    icon: "presentation",
  });

  const gamePlan = configuredProduct({
    id: "gameplan",
    title: "GamePlan",
    description: "Planeamento do jogo com apresentações próprias e a mesma biblioteca de vídeos.",
    url: gamePlanUrl,
    icon: "presentation",
  });

  const writtenReport = configuredProduct({
    id: "written-report",
    title: "Written Report",
    description: "Relatório do adversário com dados do jogo, esquemas, desenhos e momentos táticos.",
    url: writtenReportUrl,
    icon: "document",
  });

  return [
    {
      id: "opponent-teams",
      number: "01",
      title: "Opponent teams",
      description: "Preparação coletiva do adversário, do vídeo ao plano de jogo.",
      icon: "opponent-team",
      accent: "#55ddeb",
      products: [
        {
          id: "opponents-video-analysis",
          title: "Coding and Analysing",
          description: "Codificação, consulta e análise dos momentos coletivos do adversário.",
          url: "https://analise-adversario.vercel.app/",
          icon: "coding",
          status: "available",
        },
        writtenReport,
        {
          id: "goals-scored",
          title: "Goals Scored",
          description: "Padrões e contexto dos golos marcados pelo adversário.",
          url: "https://football-analysis1.vercel.app/",
          icon: "goal",
          status: "available",
        },
        tactiDraw,
        gamePlan,
        configuredProduct({
          id: "live-game",
          title: "Live Game",
          description: "Registo, replay e apoio à decisão durante o jogo.",
          url: liveGameUrl,
          icon: "live",
        }),
      ],
    },
    {
      id: "opponent-players",
      number: "02",
      title: "Opponent players",
      description: "Perfis individuais dos jogadores que a equipa vai enfrentar.",
      icon: "opponent-player",
      accent: "#aa8cff",
      products: [
        {
          id: "opponent-player-report",
          title: "Opponent Player Report",
          description: "Observação individual, pontos fortes, fragilidades e clips por jogador.",
          icon: "users",
          status: "planned",
        },
      ],
    },
    {
      id: "our-team-performance",
      number: "03",
      title: "Our team performance",
      description: "Leitura coletiva da nossa equipa e revisão do rendimento em jogo.",
      icon: "our-team",
      accent: "#3ee6a8",
      products: [
        {
          id: "team-analysis",
          title: "AP Our Team Analysis",
          description: "Momentos, submomentos, mapas e consultas da nossa equipa.",
          url: "/sso/launch/analise-equipa",
          icon: "chart",
          status: "available",
        },
        {
          id: "our-goals-suffered",
          title: "Goals Suffered",
          description: "Contexto tático e intervenientes de cada golo sofrido.",
          url: "https://golossofridos.vercel.app/",
          icon: "goal",
          status: "available",
        },
      ],
    },
    {
      id: "our-players-performance",
      number: "04",
      title: "Our players performance",
      description: "Vídeo individual, ações e indicadores dos nossos jogadores.",
      icon: "our-player",
      accent: "#f6b94f",
      products: [
        {
          id: "individual-video-analysis",
          title: "AP Player Video Analysis",
          description: "Codificação e revisão das ações individuais diretamente no vídeo.",
          url: "https://video-analise-jogadores.vercel.app/",
          icon: "video",
          status: "available",
        },
        {
          id: "player-performance",
          title: "Player Performance",
          description: "Estatísticas, comparações e mapas de rendimento individual.",
          url: "https://football-our-players-yavn.vercel.app/",
          icon: "map",
          status: "available",
        },
      ],
    },
    {
      id: "practice",
      number: "05",
      title: "Practice",
      description: "Planeamento e acompanhamento do processo de treino.",
      icon: "practice",
      accent: "#fb7185",
      products: [
        configuredProduct({
          id: "live-training",
          title: "Live Training",
          description: "Registo e análise do treino no terreno.",
          url: liveTrainingUrl,
          icon: "training",
        }),
      ],
    },
    {
      id: "individual-tactics",
      number: "06",
      title: "Individual tactics",
      description: "Intervenção específica por posição, função e jogador.",
      icon: "individual",
      accent: "#67e8f9",
      products: [tactiDraw],
    },
    {
      id: "collective-tactics",
      number: "07",
      title: "Collective tactics",
      description: "Estratégia coletiva, princípios e preparação do próximo jogo.",
      icon: "collective",
      accent: "#a3ff12",
      products: [gamePlan, tactiDraw],
    },
    {
      id: "scouting",
      number: "08",
      title: "Scouting",
      description: "Observação, comparação e decisão sobre potenciais jogadores.",
      icon: "scouting",
      accent: "#c4b5fd",
      products: [
        {
          id: "scouting-workspace",
          title: "AP Scouting",
          description: "Base futura para observações, shortlists e relatórios de recrutamento.",
          icon: "scouting",
          status: "planned",
        },
      ],
    },
  ];
}

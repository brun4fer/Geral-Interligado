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
  const opponentPlayersUrl = process.env.OPPONENT_PLAYERS_URL?.trim() || "https://ap-opponent-players.vercel.app";

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
      description: "Individual profiles of the players our team will face.",
      icon: "opponent-player",
      accent: "#aa8cff",
      products: [
        configuredProduct({
          id: "opponent-player-squad-list",
          title: "Squad List",
          description: "Opponent squad and essential information about each player.",
          url: opponentPlayersUrl,
          icon: "users",
        }),
        {
          id: "opponent-player-written-report",
          title: "Individual Written Report",
          description: "Individual observations, strengths and weaknesses for each player.",
          icon: "document",
          status: "planned",
        },
        {
          id: "opponent-player-video-analysis",
          title: "Video Analysis",
          description: "Clips and video analysis of the opponent players' actions.",
          icon: "video",
          status: "planned",
        },
      ],
    },
    {
      id: "our-team-performance",
      number: "03",
      title: "Our team performance",
      description: "Collective analysis and match performance review of our team.",
      icon: "our-team",
      accent: "#3ee6a8",
      products: [
        {
          id: "team-analysis",
          title: "Coding and Analysis",
          description: "Moments, submoments, maps and analysis of our team.",
          url: "/sso/launch/analise-equipa",
          icon: "coding",
          status: "available",
        },
        {
          id: "our-team-performance-reports",
          title: "Performance Reports",
          description: "Collective performance reports for our team.",
          icon: "document",
          status: "planned",
        },
        {
          id: "our-team-goals-scored",
          title: "Goals Scored",
          description: "Patterns and context behind the goals scored by our team.",
          url: "https://football-analysis1.vercel.app/",
          icon: "goal",
          status: "available",
        },
        {
          id: "our-goals-suffered",
          title: "Goals Suffered",
          description: "Tactical context and players involved in each goal suffered.",
          url: "https://golossofridos.vercel.app/",
          icon: "goal",
          status: "available",
        },
        {
          id: "our-team-game-review",
          title: "Game Analysis / Game Review",
          description: "Complete match review and the team's key performance indicators.",
          icon: "chart",
          status: "planned",
        },
      ],
    },
    {
      id: "our-players-performance",
      number: "04",
      title: "Our players performance",
      description: "Individual video, actions and performance indicators for our players.",
      icon: "our-player",
      accent: "#f6b94f",
      products: [
        {
          id: "our-player-coding-analysis",
          title: "Coding and Analysis",
          description: "Coding and reviewing individual actions directly in the video.",
          url: "https://video-analise-jogadores.vercel.app/",
          icon: "coding",
          status: "available",
        },
        {
          id: "our-player-action-map",
          title: "Action Map",
          description: "Statistics, comparisons and individual performance maps.",
          url: "https://football-our-players-yavn.vercel.app/",
          icon: "map",
          status: "available",
        },
        {
          id: "our-player-performance-report",
          title: "Performance Report",
          description: "Individual performance report for each player.",
          icon: "document",
          status: "planned",
        },
        {
          id: "our-player-video-analysis",
          title: "Video Analysis",
          description: "Video analysis of each player's actions and behaviours.",
          icon: "video",
          status: "planned",
        },
        {
          id: "our-player-gps",
          title: "GPS",
          description: "External load, distance, speed and physical performance indicators.",
          icon: "map",
          status: "planned",
        },
        {
          id: "our-player-wellness-report",
          title: "Wellness Report",
          description: "Player wellness and availability monitoring.",
          icon: "chart",
          status: "planned",
        },
      ],
    },
    {
      id: "practice",
      number: "05",
      title: "Training",
      description: "Planning and monitoring of the training process.",
      icon: "practice",
      accent: "#fb7185",
      products: [
        {
          id: "live-training",
          title: "Coding and Analysis (Live Training)",
          description: "Live coding and analysis of training sessions on the pitch.",
          icon: "coding",
          status: "planned",
        },
        {
          id: "training-performance-report",
          title: "Performance Report",
          description: "Performance and workload report for each training session.",
          icon: "document",
          status: "planned",
        },
        {
          id: "training-individual-video-analysis",
          title: "Individual Video Analysis",
          description: "Video analysis of individual performance during training.",
          icon: "video",
          status: "planned",
        },
        {
          id: "training-collective-video-analysis",
          title: "Collective Video Analysis",
          description: "Video analysis of drills and collective behaviours.",
          icon: "video",
          status: "planned",
        },
        {
          id: "training-gps",
          title: "GPS",
          description: "External load and physical indicators recorded during training.",
          icon: "map",
          status: "planned",
        },
        {
          id: "training-wellness-report",
          title: "Wellness Report",
          description: "Wellness, fatigue and availability before and after training.",
          icon: "chart",
          status: "planned",
        },
      ],
    },
    {
      id: "individual-tactics",
      number: "06",
      title: "Individual technique",
      description: "Specific technical work by position, role and player.",
      icon: "individual",
      accent: "#67e8f9",
      products: [
        {
          id: "individual-technical-coding-analysis",
          title: "Coding and Analysis",
          description: "Coding and analysis of individual technical work.",
          icon: "coding",
          status: "planned",
        },
        {
          id: "individual-technical-studies-reports",
          title: "Studies and Reports",
          description: "Studies by position, role and individual player needs.",
          icon: "document",
          status: "planned",
        },
        {
          ...tactiDraw,
          id: "individual-technical-video-analysis",
          title: "Video Analysis",
          description: "Video analysis and drawing for individual technical development.",
        },
      ],
    },
    {
      id: "collective-tactics",
      number: "07",
      title: "Collective tactics",
      description: "Collective strategy, principles and preparation for the next match.",
      icon: "collective",
      accent: "#a3ff12",
      products: [
        {
          id: "collective-tactical-coding-analysis",
          title: "Coding and Analysis",
          description: "Coding and analysis of collective principles and behaviours.",
          icon: "coding",
          status: "planned",
        },
        {
          ...gamePlan,
          id: "collective-tactical-studies-reports",
          title: "Studies and Reports",
          description: "Collective studies and game-plan preparation.",
        },
        {
          ...tactiDraw,
          id: "collective-tactical-video-analysis",
          title: "Video Analysis",
          description: "Video analysis and drawing of collective behaviours.",
        },
      ],
    },
    {
      id: "scouting",
      number: "08",
      title: "Scouting",
      description: "Observation, comparison and decision-making on potential players.",
      icon: "scouting",
      accent: "#c4b5fd",
      products: [
        {
          id: "scouting-player-list",
          title: "Player List",
          description: "Database of observed players, filters and recruitment lists.",
          icon: "scouting",
          status: "planned",
        },
        {
          id: "scouting-shadow-teams",
          title: "Shadow Teams",
          description: "Future squad planning by position and player profile.",
          icon: "users",
          status: "planned",
        },
      ],
    },
  ];
}

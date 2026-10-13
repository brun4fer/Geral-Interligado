"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Binoculars,
  ChartNoAxesCombined,
  CircleDot,
  Dumbbell,
  FileText,
  Goal as GoalIcon,
  Map,
  PersonStanding,
  Presentation,
  Radio,
  Shield,
  Sparkles,
  UserRoundSearch,
  Users,
  Video,
} from "lucide-react";
import type { EcosystemArea, Product, ProductIcon } from "@/lib/products";

const areaIcons = {
  "opponent-team": Shield,
  "opponent-player": UserRoundSearch,
  "our-team": ChartNoAxesCombined,
  "our-player": Users,
  practice: Dumbbell,
  individual: PersonStanding,
  collective: GoalIcon,
  scouting: Binoculars,
};

const productIcons: Record<ProductIcon, typeof Video> = {
  video: Video,
  goal: GoalIcon,
  users: Users,
  chart: ChartNoAxesCombined,
  map: Map,
  live: Radio,
  document: FileText,
  presentation: Presentation,
  training: Dumbbell,
  scouting: Binoculars,
};

const statusLabels = {
  available: "Disponível",
  configuration: "Por configurar",
  planned: "Planeado",
};

function ProductLink({ product }: { product: Product }) {
  const Icon = productIcons[product.icon];
  const available = product.status === "available" && Boolean(product.url);
  const content = (
    <>
      <span className="ecosystem-product-icon"><Icon size={18} /></span>
      <span className="ecosystem-product-copy">
        <span className="ecosystem-product-heading">
          <strong>{product.title}</strong>
          <small data-status={product.status}>{statusLabels[product.status]}</small>
        </span>
        <span>{product.description}</span>
      </span>
      {available ? <ArrowUpRight className="ecosystem-product-arrow" size={18} /> : <Activity className="ecosystem-product-arrow" size={17} />}
    </>
  );

  return available ? (
    <a className="ecosystem-product focus-ring" href={product.url} target="_blank" rel="noreferrer">{content}</a>
  ) : (
    <div className="ecosystem-product is-disabled">{content}</div>
  );
}

export function EcosystemMap({ areas }: { areas: EcosystemArea[] }) {
  const [activeId, setActiveId] = useState(areas[0]?.id ?? "");
  const activeArea = areas.find((area) => area.id === activeId) ?? areas[0];

  if (!activeArea) return null;

  const theme = { "--area-accent": activeArea.accent } as CSSProperties;

  return (
    <div className="ecosystem-shell" style={theme}>
      <div className="ecosystem-nodes" aria-label="Áreas do ecossistema">
        <span className="ecosystem-connection connection-top" aria-hidden="true" />
        <span className="ecosystem-connection connection-bottom" aria-hidden="true" />
        {areas.map((area) => {
          const Icon = areaIcons[area.icon];
          const active = area.id === activeArea.id;
          return (
            <button
              key={area.id}
              type="button"
              className={`ecosystem-node focus-ring${active ? " is-active" : ""}`}
              style={{ "--node-accent": area.accent } as CSSProperties}
              aria-pressed={active}
              aria-controls="ecosystem-products"
              onPointerEnter={() => setActiveId(area.id)}
              onFocus={() => setActiveId(area.id)}
              onClick={() => setActiveId(area.id)}
            >
              <span className="ecosystem-node-name">{area.title}</span>
              <span className="ecosystem-node-circle"><Icon size={28} /><i>{area.number}</i></span>
              <span className="ecosystem-node-count">{area.products.length} {area.products.length === 1 ? "software" : "softwares"}</span>
            </button>
          );
        })}
      </div>

      <section id="ecosystem-products" className="ecosystem-detail" aria-live="polite" aria-labelledby="active-area-title">
        <div className="ecosystem-detail-heading">
          <div>
            <span><CircleDot size={13} /> Área {activeArea.number}</span>
            <h3 id="active-area-title">{activeArea.title}</h3>
            <p>{activeArea.description}</p>
          </div>
          <div className="ecosystem-detail-brand"><Sparkles size={16} /> AP ecosystem</div>
        </div>
        <div className="ecosystem-products">
          {activeArea.products.map((product) => <ProductLink key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}

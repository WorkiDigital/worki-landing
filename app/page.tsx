"use client";
import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───
const COLORS = {
  primaryBlue: "#1877F2",
  deepBlue: "#0B5CDB",
  navy: "#0B1220",
  surface: "#0F172A",
  surface2: "#111C33",
  magenta: "#C13584",
  purple: "#833AB4",
  orange: "#F77737",
  yellow: "#FCAF45",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};

const FONT = "'Plus Jakarta Sans', sans-serif";

// ─── SCROLL REVEAL ───
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ─── METRIC CARD ───
function MetricCard({ label, value, change, status, delay = 0 }) {
  const col = { up: COLORS.success, down: COLORS.danger, neutral: COLORS.warning };
  return (
    <Reveal delay={delay}>
      <div style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px" }}>
        <div style={{ fontSize: 10, color: "rgba(229,231,235,0.5)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 5, fontFamily: FONT }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#E5E7EB", fontFamily: FONT }}>{value}</div>
        <div style={{ fontSize: 11, color: col[status], marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
          {status === "up" ? "▲" : status === "down" ? "▼" : "●"} {change}
        </div>
      </div>
    </Reveal>
  );
}

// ─── MINI CHART ───
function MiniChart() {
  const pts = [8, 22, 15, 38, 32, 52, 45, 68, 60, 80, 74, 93];
  const w = 250, h = 72;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - (p / 100) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={COLORS.primaryBlue} /><stop offset="100%" stopColor={COLORS.magenta} /></linearGradient>
        <linearGradient id="cf" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={COLORS.primaryBlue} stopOpacity="0.25" /><stop offset="100%" stopColor={COLORS.primaryBlue} stopOpacity="0" /></linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#cf)" />
      <path d={path} fill="none" stroke="url(#cg)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={w} cy={h - (93 / 100) * h} r="4" fill={COLORS.magenta} />
    </svg>
  );
}

// ─── STATUS CHIP ───
function StatusChip({ label, variant = "blue" }) {
  const s = {
    blue: { bg: `${COLORS.primaryBlue}22`, color: COLORS.primaryBlue, border: `${COLORS.primaryBlue}40` },
    green: { bg: `${COLORS.success}22`, color: COLORS.success, border: `${COLORS.success}40` },
    orange: { bg: `${COLORS.orange}22`, color: COLORS.orange, border: `${COLORS.orange}40` },
  }[variant] || {};
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: FONT }}>● {label}</span>;
}

// ─── BUTTONS ───
function CTABlue({ children, onClick, full = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? COLORS.deepBlue : COLORS.primaryBlue, color: "#fff", fontWeight: 700, borderRadius: 14,
      padding: "15px 30px", fontSize: 15, border: "none", cursor: "pointer", fontFamily: FONT, width: full ? "100%" : "auto",
      boxShadow: hov ? "0 0 40px rgba(24,119,242,0.4)" : "0 0 25px rgba(24,119,242,0.25)", transition: "all 0.25s ease",
    }}>{children}</button>
  );
}

function CTAIG({ children, onClick, full = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.magenta}, ${COLORS.orange})`, color: "#fff",
      fontWeight: 700, borderRadius: 14, padding: "15px 30px", fontSize: 15, border: "none", cursor: "pointer",
      fontFamily: FONT, width: full ? "100%" : "auto",
      boxShadow: hov ? "0 0 50px rgba(193,53,132,0.35)" : "0 0 35px rgba(193,53,132,0.22)",
      transform: hov ? "scale(1.02)" : "scale(1)", transition: "all 0.25s ease",
    }}>{children}</button>
  );
}

// ─── CARD WRAPPER ───
function Card({ children, glow = "none", style: extra = {} }) {
  const g = { blue: "0 0 30px rgba(24,119,242,0.12)", ig: "0 0 40px rgba(193,53,132,0.10)", none: "0 0 25px rgba(0,0,0,0.2)" };
  return <div style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, boxShadow: g[glow] || g.none, ...extra }}>{children}</div>;
}

// ─── FAQ ITEM ───
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 0", background: "none", border: "none", cursor: "pointer", color: "#E5E7EB",
        fontSize: 16, fontWeight: 600, textAlign: "left", fontFamily: FONT,
      }}>
        {q}
        <span style={{ color: COLORS.primaryBlue, fontSize: 22, fontWeight: 300, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0, marginLeft: 16 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <p style={{ color: "rgba(229,231,235,0.7)", fontSize: 15, lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── GRID BG ───
function GridBG() {
  return <div style={{
    position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  }} />;
}

// ─── IG GRADIENT TEXT ───
function IGText({ children, style: s = {} }) {
  return <span style={{
    backgroundImage: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.magenta}, ${COLORS.orange})`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", ...s,
  }}>{children}</span>;
}

// ─── WHATSAPP FORM MODAL ───
function WhatsAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sending, setSending] = useState(false);

  const formatPhone = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 2) return nums;
    if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };

  const handleSubmit = () => {
    if (!nome.trim() || telefone.replace(/\D/g, "").length < 10) return;
    setSending(true);
    const msg = encodeURIComponent(
      `Olá Herickson, meu nome é ${nome.trim()}, Quero garantir a mentoria da Worki Digital.`
    );
    const url = `https://wa.me/5585998372658?text=${msg}`;
    window.open(url, "_blank");
    setTimeout(() => {
      setSending(false);
      setNome("");
      setTelefone("");
      onClose();
    }, 1000);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.surface, border: `1px solid ${COLORS.primaryBlue}40`, borderRadius: 24,
          padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", overflow: "hidden",
          boxShadow: "0 0 60px rgba(24,119,242,0.2)",
        }}
      >
        {/* Top gradient line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.primaryBlue}, ${COLORS.magenta}, ${COLORS.orange})` }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 16, background: "none", border: "none",
            color: "rgba(229,231,235,0.4)", fontSize: 22, cursor: "pointer", fontFamily: FONT,
          }}
        >✕</button>

        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: "50%",
            background: `${COLORS.success}20`, border: `1px solid ${COLORS.success}30`,
            fontSize: 28,
          }}>💬</div>
        </div>

        <h3 style={{ fontSize: 22, fontWeight: 800, textAlign: "center", margin: "0 0 6px 0", color: "#fff", fontFamily: FONT }}>
          Garanta sua vaga agora
        </h3>
        <p style={{ fontSize: 14, color: "rgba(229,231,235,0.5)", textAlign: "center", margin: "0 0 28px 0", fontFamily: FONT }}>
          Preencha seus dados e você será redirecionado para o WhatsApp
        </p>

        {/* Nome */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(229,231,235,0.7)", marginBottom: 6, display: "block", fontFamily: FONT }}>
            Seu nome
          </label>
          <input
            type="text"
            placeholder="Como quer ser chamado?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 12, fontSize: 15,
              background: COLORS.navy, border: "1px solid rgba(255,255,255,0.1)",
              color: "#E5E7EB", outline: "none", fontFamily: FONT, boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = `${COLORS.primaryBlue}60`}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>

        {/* Telefone */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(229,231,235,0.7)", marginBottom: 6, display: "block", fontFamily: FONT }}>
            Seu WhatsApp
          </label>
          <input
            type="tel"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => setTelefone(formatPhone(e.target.value))}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 12, fontSize: 15,
              background: COLORS.navy, border: "1px solid rgba(255,255,255,0.1)",
              color: "#E5E7EB", outline: "none", fontFamily: FONT, boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = `${COLORS.primaryBlue}60`}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!nome.trim() || telefone.replace(/\D/g, "").length < 10 || sending}
          style={{
            width: "100%", padding: "15px 28px", borderRadius: 14, fontSize: 16, fontWeight: 700,
            border: "none", cursor: nome.trim() && telefone.replace(/\D/g, "").length >= 10 ? "pointer" : "not-allowed",
            fontFamily: FONT, color: "#fff",
            background: nome.trim() && telefone.replace(/\D/g, "").length >= 10
              ? `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.magenta}, ${COLORS.orange})`
              : "rgba(255,255,255,0.1)",
            boxShadow: nome.trim() && telefone.replace(/\D/g, "").length >= 10
              ? "0 0 35px rgba(193,53,132,0.22)" : "none",
            transition: "all 0.25s ease",
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? "Redirecionando..." : "🚀 Garantir Minha Vaga no WhatsApp"}
        </button>

        <p style={{ fontSize: 11, color: "rgba(229,231,235,0.25)", textAlign: "center", marginTop: 14, margin: "14px 0 0 0", fontFamily: FONT }}>
          🔒 Seus dados estão seguros e não serão compartilhados
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// ─── MAIN PAGE ───
// ════════════════════════════════════════════
export default function WorkiMetaAdsLanding() {
  const offerRef = useRef(null);
  const scrollToOffer = () => offerRef.current?.scrollIntoView({ behavior: "smooth" });
  const [showSticky, setShowSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openForm = () => setShowModal(true);

  useEffect(() => {
    const h = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const calls = [
    {
      num: 1, title: "Estudo de Posicionamento",
      subtitle: "Onde você está → Onde vai chegar",
      bullets: [
        "Diagnóstico completo da sua operação atual",
        "Análise de maturidade no tráfego pago",
        "Clareza de nicho, oferta e estrutura de funil",
        "Mapa estratégico: ponto A → ponto B com prazos",
      ],
    },
    {
      num: 2, title: "Planejamento Estratégico",
      subtitle: "Chega de improvisar campanha",
      bullets: [
        "Estruturação completa do funil de aquisição",
        "Definição de objetivos por etapa do funil",
        "Planejamento de testes com método científico",
        "Estratégia de crescimento previsível e escalável",
      ],
    },
    {
      num: 3, title: "Estrutura Profissional de Anúncios",
      subtitle: "BM organizado = resultado consistente",
      bullets: [
        "Organização profissional do Business Manager",
        "Estrutura de campanhas que facilita otimização",
        "Estratégia de criativos por etapa do funil",
        "Segmentação de públicos e estratégia de orçamento",
      ],
    },
    {
      num: 4, title: "Mão na Massa — Implementação",
      subtitle: "Você não sai sem campanha no ar",
      bullets: [
        "Subimos juntos toda a estrutura ao vivo",
        "Ajuste técnico em tempo real com feedback",
        "Configuração estratégica validada na prática",
        "Correção de erros ocultos que matam performance",
      ],
    },
    {
      num: 5, title: "Métricas de Alta Performance",
      subtitle: "Ler dados como um gestor de elite",
      bullets: [
        "Leitura estratégica de CPL, CPM, CTR e CPA",
        "Como identificar gargalos antes de perder dinheiro",
        "Tomada de decisão 100% baseada em dados",
        "Framework de análise que funciona para qualquer nicho",
      ],
    },
    {
      num: 6, title: "Otimização e Escala",
      subtitle: "O momento que separa amador de profissional",
      bullets: [
        "Como escalar campanhas lucrativas sem explodir CPA",
        "Estratégia de duplicação inteligente",
        "Controle de orçamento para crescimento sustentável",
        "Modelo de escala previsível mês a mês",
      ],
    },
  ];

  const bonuses = [
    {
      tag: "Copy IA", tagColor: COLORS.purple,
      title: "Copy de Alta Performance com IA",
      desc: "Estrutura de copy validada, biblioteca de prompts persuasivos e modelos de anúncios prontos. Nunca mais trave na hora de criar.",
    },
    {
      tag: "Dashboard", tagColor: COLORS.primaryBlue,
      title: "Dashboard Personalizado",
      desc: "Relatório estratégico da sua operação com métricas essenciais organizadas. Clareza total de ROI em um só lugar.",
    },
    {
      tag: "Pixel/API", tagColor: COLORS.orange,
      title: "Pixel, API e Mensuração Profissional",
      desc: "Configuração correta do Pixel, integração via API de Conversões, teste de eventos e correção de falhas ocultas.",
    },
    {
      tag: "WhatsApp", tagColor: COLORS.success,
      title: "Suporte Direto no WhatsApp",
      desc: "Acompanhamento durante toda a mentoria com tira-dúvidas estratégico e direcionamento rápido.",
    },
  ];

  const faqs = [
    { q: "Sou iniciante, a mentoria serve pra mim?", a: "Sim. A estrutura começa do zero e evolui até escala. Se você nunca criou uma campanha, vai aprender o processo profissional desde o primeiro dia. Se já roda tráfego, vai eliminar os erros que estão travando seus resultados." },
    { q: "São calls individuais ou em grupo?", a: "Individuais. São 6 calls de 1 hora, uma por mês, durante 6 meses. Você tem atenção total para a sua operação, seu nicho e seus desafios específicos — com tempo entre as calls para implementar e trazer resultados reais." },
    { q: "Preciso ter investimento mínimo em tráfego?", a: "Recomendamos pelo menos R$ 30/dia para aplicar na prática. Mas o método funciona com qualquer orçamento — a estratégia é a mesma que gestores usam com R$ 10k/dia." },
    { q: "E se eu não gostar?", a: "Se após a primeira call você sentir que não é para você, devolvemos 100% do valor. Sem burocracia, sem perguntas. Confiamos no método." },
    { q: "Como funciona o pagamento?", a: "PIX, cartão de crédito (até 6x sem juros) ou boleto. O acesso é liberado imediatamente após confirmação do pagamento." },
    { q: "R$ 2.000 é caro para uma mentoria?", a: "Pense assim: são 6 meses de acompanhamento individual com um especialista. O valor de uma única campanha bem otimizada já paga a mentoria inteira. É investimento que se paga na primeira campanha bem feita." },
  ];

  const audiences = [
    "Gestor de tráfego iniciante",
    "Dono de agência",
    "Empresário que investe em ads",
    "Social media que quer escalar",
    "Freelancer de marketing",
    "Quem busca previsibilidade",
  ];

  const problems = [
    { icon: "🔴", text: "Joga dinheiro em campanha sem saber por que não converte" },
    { icon: "🟡", text: "CPM alto e CTR baixo — e não sabe o que ajustar primeiro" },
    { icon: "🔴", text: "Tenta escalar e o CPA explode junto com o orçamento" },
    { icon: "🟡", text: "Cria público novo toda semana sem estratégia de teste" },
    { icon: "🔴", text: "Pixel mal configurado — perdendo dados que custam caro" },
    { icon: "🟡", text: "Copia concorrente e reza pra dar resultado diferente" },
  ];

  return (
    <div style={{ background: COLORS.navy, minHeight: "100vh", fontFamily: FONT, color: "#E5E7EB", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section style={{ position: "relative", padding: "72px 20px 60px", overflow: "hidden" }}>
        <GridBG />
        <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}22, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.primaryBlue}18, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ flex: "1 1 480px", minWidth: 300 }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: `${COLORS.primaryBlue}1A`, border: `1px solid ${COLORS.primaryBlue}33`, marginBottom: 22 }}>
                <span style={{ fontSize: 11, color: COLORS.primaryBlue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>🎯 Mentoria Worki — Tráfego Pago</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 style={{ fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 20px 0", letterSpacing: "-0.025em" }}>
                Pare de <span style={{ color: COLORS.danger }}>queimar verba</span>.
                <br />Aprenda a criar campanhas que{" "}
                <span style={{ color: COLORS.primaryBlue }}>dão resultado</span>{" "}
                <IGText>de verdade</IGText>.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontSize: 18, color: "rgba(229,231,235,0.7)", lineHeight: 1.7, margin: "0 0 12px 0", maxWidth: 530 }}>
                Em <strong style={{ color: "#fff" }}>6 calls individuais</strong> ao longo de 6 meses, você sai com processo, estrutura e previsibilidade — não achismo.
              </p>
              <p style={{ fontSize: 15, color: "rgba(229,231,235,0.45)", lineHeight: 1.6, margin: "0 0 30px 0", maxWidth: 530 }}>
                O mesmo método que gestores de alta performance usam para escalar campanhas lucrativas no Facebook e Instagram Ads.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <CTABlue onClick={scrollToOffer}>Quero dominar tráfego pago →</CTABlue>
                <CTAIG onClick={() => document.getElementById("calls")?.scrollIntoView({ behavior: "smooth" })}>Ver o cronograma</CTAIG>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div style={{ display: "flex", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
                {[{ n: "6", l: "Calls Individuais" }, { n: "1h", l: "Cada Sessão" }, { n: "6", l: "Meses de Acesso" }].map((item, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primaryBlue }}>{item.n}</div>
                    <div style={{ fontSize: 11, color: "rgba(229,231,235,0.45)", marginTop: 2 }}>{item.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Ads Manager Mock */}
          <div style={{ flex: "1 1 440px", minWidth: 300 }}>
            <Reveal delay={0.2}>
              <Card glow="blue">
                <div style={{ display: "flex", gap: 0, marginBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Visão Geral", "Campanhas", "Relatórios"].map((tab, i) => (
                    <div key={tab} style={{
                      padding: "8px 16px", fontSize: 12, fontWeight: i === 0 ? 700 : 500,
                      color: i === 0 ? COLORS.primaryBlue : "rgba(229,231,235,0.35)",
                      borderBottom: i === 0 ? `2px solid ${COLORS.primaryBlue}` : "2px solid transparent",
                    }}>{tab}</div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                  <MetricCard label="CTR" value="4.2%" change="+18% esta semana" status="up" delay={0.3} />
                  <MetricCard label="CPM" value="R$ 12,50" change="-8% vs mês anterior" status="up" delay={0.4} />
                  <MetricCard label="CPA" value="R$ 28,00" change="-22% pós otimização" status="up" delay={0.5} />
                  <MetricCard label="ROAS" value="5.8x" change="+35% com novo criativo" status="up" delay={0.6} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "rgba(229,231,235,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.2 }}>Performance 30 dias</div>
                  <MiniChart />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <StatusChip label="Escalando" variant="green" />
                  <StatusChip label="Otimizar" variant="orange" />
                  <StatusChip label="Lucrativo" variant="blue" />
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PROBLEMA ════════════════════════════════ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span style={{ fontSize: 12, color: COLORS.danger, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>⚠️ Reconhece algum desses?</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: "12px 0 0 0", letterSpacing: "-0.02em" }}>
                Se você se vê aqui, está <span style={{ color: COLORS.danger }}>perdendo dinheiro</span> agora
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {problems.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <Card glow="none" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 20 }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
                  <span style={{ fontSize: 15, color: "rgba(229,231,235,0.8)", lineHeight: 1.6 }}>{p.text}</span>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Card glow="ig" style={{ display: "inline-block", padding: "18px 32px" }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>
                  Sem método = sem <IGText>previsibilidade</IGText> = sem <span style={{ color: COLORS.danger }}>lucro</span>
                </p>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════ SOLUÇÃO ════════════════════════════════ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span style={{
                display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: `linear-gradient(135deg, ${COLORS.purple}30, ${COLORS.magenta}30, ${COLORS.orange}30)`,
                border: "1px solid rgba(255,255,255,0.1)", marginBottom: 14,
              }}>🚀 A Solução</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
                <span style={{ color: COLORS.primaryBlue }}>Mentoria Worki</span> — Tráfego e Performance
              </h2>
              <p style={{ fontSize: 17, color: "rgba(229,231,235,0.6)", marginTop: 14, maxWidth: 600, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
                6 meses de acompanhamento individual. 1 call por mês de 1 hora.
                Você sai com processo, estrutura e resultados — não teoria.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {[
              { icon: "📊", title: "Decisão por Dados", desc: "Cada otimização é baseada em métricas reais. Você aprende a ler o Ads Manager como um gestor de elite." },
              { icon: "🎯", title: "Processo Validado", desc: "Framework testado para criar, testar e escalar. Funciona para qualquer nicho e qualquer orçamento." },
              { icon: "⚡", title: "Resultado em 6 Meses", desc: "Calls individuais mensais, mão na massa juntos, suporte no WhatsApp. Tempo para implementar e evoluir entre cada sessão." },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card glow="blue" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.primaryBlue}, ${COLORS.magenta})` }} />
                  <div style={{ fontSize: 30, marginBottom: 12, marginTop: 4 }}>{card.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: "#fff" }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(229,231,235,0.6)", lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ TIMELINE DAS 6 CALLS ════════════════════════════════ */}
      <section id="calls" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, letterSpacing: "-0.02em", margin: 0 }}>
                Cronograma: <span style={{ color: COLORS.primaryBlue }}>6 Calls</span> em 6 Meses
              </h2>
              <p style={{ fontSize: 15, color: "rgba(229,231,235,0.5)", marginTop: 10 }}>
                1 call por mês · 1 hora cada · 100% individual e prática
              </p>
            </div>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 28, top: 0, bottom: 0, width: 3,
              background: `linear-gradient(180deg, ${COLORS.primaryBlue}, ${COLORS.magenta}, ${COLORS.orange})`, borderRadius: 4,
            }} />

            {calls.map((call, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ display: "flex", gap: 22, marginBottom: 24, position: "relative" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                    background: i < 3 ? COLORS.primaryBlue : `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.orange})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 20, color: "#fff",
                    boxShadow: `0 0 20px ${i < 3 ? "rgba(24,119,242,0.3)" : "rgba(193,53,132,0.3)"}`,
                  }}>{call.num}</div>

                  <Card glow={i < 3 ? "blue" : "ig"} style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 6px 0" }}>{call.title}</h3>
                    <p style={{ fontSize: 13, color: COLORS.primaryBlue, fontWeight: 600, margin: "0 0 12px 0", fontStyle: "italic" }}>{call.subtitle}</p>
                    {call.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 14, color: "rgba(229,231,235,0.7)" }}>
                        <span style={{ color: COLORS.success, flexShrink: 0 }}>✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ BÔNUS ════════════════════════════════ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span style={{
                display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}40`, color: COLORS.yellow, marginBottom: 14,
              }}>🎁 Incluído na Mentoria</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
                Bônus <IGText>Exclusivos</IGText>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {bonuses.map((bonus, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card glow="none" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 8,
                    fontSize: 10, fontWeight: 800, background: "rgba(255,255,255,0.06)", color: "rgba(229,231,235,0.4)", letterSpacing: 1.5,
                  }}>BÔNUS</div>

                  <span style={{
                    display: "inline-block", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                    background: `${bonus.tagColor}20`, color: bonus.tagColor, border: `1px solid ${bonus.tagColor}30`, marginBottom: 14,
                  }}>{bonus.tag}</span>

                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{bonus.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(229,231,235,0.55)", lineHeight: 1.65, margin: 0 }}>{bonus.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PÚBLICO IDEAL ════════════════════════════════ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span style={{
              display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: `${COLORS.primaryBlue}1A`, border: `1px solid ${COLORS.primaryBlue}33`, color: COLORS.primaryBlue, marginBottom: 14,
            }}>👥 Segmentação</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: "0 0 10px 0", letterSpacing: "-0.02em" }}>
              Para quem é essa <span style={{ color: COLORS.primaryBlue }}>Mentoria</span>?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(229,231,235,0.5)", marginBottom: 30 }}>
              Se você se encaixa em pelo menos um desses perfis, essa mentoria foi feita pra você.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {audiences.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{
                  padding: "10px 20px", borderRadius: 24, background: COLORS.surface,
                  border: "1px solid rgba(255,255,255,0.08)", fontSize: 14, fontWeight: 600,
                  color: "rgba(229,231,235,0.85)", transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = `${COLORS.primaryBlue}50`; t.style.boxShadow = `0 0 20px ${COLORS.primaryBlue}15`; }}
                  onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(255,255,255,0.08)"; t.style.boxShadow = "none"; }}
                >{a}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ OFERTA ════════════════════════════════ */}
      <section ref={offerRef} style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              background: COLORS.surface, border: `1px solid ${COLORS.primaryBlue}40`, borderRadius: 24,
              padding: "40px 32px", boxShadow: "0 0 60px rgba(24,119,242,0.15)",
              textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.primaryBlue}, ${COLORS.magenta}, ${COLORS.orange})` }} />

              <span style={{
                display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: `${COLORS.success}22`, border: `1px solid ${COLORS.success}40`, color: COLORS.success, marginBottom: 20,
              }}>🔒 Vagas Limitadas</span>

              <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                Mentoria Worki — Tráfego e Performance
              </h2>
              <p style={{ fontSize: 14, color: "rgba(229,231,235,0.45)", margin: "0 0 28px 0" }}>
                6 calls individuais de 1h em 6 meses + bônus + suporte WhatsApp
              </p>

              <Card glow="none" style={{ padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
                {[
                  "6 calls individuais de 1 hora",
                  "Acompanhamento por 6 meses",
                  "Copy de Alta Performance com IA",
                  "Dashboard Personalizado",
                  "Setup completo Pixel + API",
                  "Suporte direto no WhatsApp",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < 5 ? 8 : 0, fontSize: 14, color: "rgba(229,231,235,0.75)" }}>
                    <span style={{ color: COLORS.success, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </Card>

              <p style={{ fontSize: 14, color: "rgba(229,231,235,0.4)", margin: "0 0 4px 0" }}>
                Eu poderia cobrar <span style={{ textDecoration: "line-through" }}>R$ 5.000</span> por essa mentoria
              </p>
              <p style={{ fontSize: 15, color: "rgba(229,231,235,0.55)", margin: "0 0 20px 0", fontWeight: 600 }}>
                Mas você vai investir apenas:
              </p>

              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 50, fontWeight: 900, color: "#fff" }}>R$ 2.000</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "rgba(229,231,235,0.45)" }}>,00</span>
              </div>

              <p style={{ fontSize: 16, color: COLORS.success, fontWeight: 700, margin: "0 0 28px 0" }}>
                ou 6x de R$ 333,33 sem juros
              </p>

              <CTAIG onClick={openForm} full>
                🚀 Garantir Minha Vaga Agora
              </CTAIG>

              <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 20, flexWrap: "wrap" }}>
                {["PIX", "Cartão até 6x", "Boleto"].map((m) => (
                  <span key={m} style={{ fontSize: 12, color: "rgba(229,231,235,0.3)", display: "flex", alignItems: "center", gap: 4 }}>✓ {m}</span>
                ))}
              </div>

              <p style={{ fontSize: 12, color: "rgba(229,231,235,0.25)", margin: "16px 0 0 0" }}>
                Garantia total: se após a 1ª call não for pra você, devolvemos 100%. Sem burocracia.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════ FAQ ════════════════════════════════ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, textAlign: "center", margin: "0 0 36px 0", letterSpacing: "-0.02em" }}>
              Perguntas <span style={{ color: COLORS.primaryBlue }}>Frequentes</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Card glow="none">
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════ WHATSAPP MODAL ════════════════════════════════ */}
      <WhatsAppModal open={showModal} onClose={() => setShowModal(false)} />

      {/* ════════════════════════════════ FOOTER ════════════════════════════════ */}
      <footer style={{ padding: "36px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(229,231,235,0.25)", margin: 0 }}>
          © 2026 — Worki Prospect · Mentoria de Tráfego e Performance. Todos os direitos reservados.
        </p>
      </footer>

      {/* ════════════════════════════════ STICKY CTA ════════════════════════════════ */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px",
        background: `${COLORS.navy}ee`, backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: showSticky ? "flex" : "none", justifyContent: "center", zIndex: 100,
      }}>
        <button onClick={openForm} style={{
          width: "100%", maxWidth: 400,
          background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.magenta}, ${COLORS.orange})`,
          color: "#fff", fontWeight: 800, borderRadius: 14, padding: "14px 28px",
          fontSize: 15, border: "none", cursor: "pointer",
          boxShadow: "0 0 35px rgba(193,53,132,0.22)", fontFamily: FONT,
        }}>🚀 Garantir Minha Vaga — R$ 2.000</button>
      </div>
    </div>
  );
}

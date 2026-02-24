import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentoria Worki — Tráfego e Performance | Facebook & Instagram Ads",
  description:
    "Domine Facebook e Instagram Ads com método e performance. 6 calls individuais em 6 meses. Pare de queimar verba e aprenda a escalar campanhas lucrativas.",
  openGraph: {
    title: "Mentoria Worki — Tráfego e Performance",
    description:
      "6 calls individuais em 6 meses para dominar Facebook & Instagram Ads com método e previsibilidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

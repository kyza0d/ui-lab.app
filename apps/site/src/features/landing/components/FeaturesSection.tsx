import Link from "next/link";
import {
  FaBox,
  FaBrain,
  FaWandMagicSparkles,
  FaTerminal,
  FaPalette,
  FaSun,
  FaTree,
  FaCopy,
} from "react-icons/fa6";
import { Divider } from "ui-lab-components";

const features = [
  {
    icon: <FaBox size={20} />,
    title: "28 Production-Ready Components",
    highlight: "28+",
    desc: "Built with React Aria + Tailwind v4. 100% WAI-ARIA compliant out of the box.",
    link: "/components",
    colSpan: 12,
  },
  {
    icon: <FaWandMagicSparkles size={20} />,
    title: "Stunning Defaults, Total Control",
    desc: "Beautiful out-of-the-box design. Theme any component with ease.",
    colSpan: 6,
  },
  {
    icon: <FaTerminal size={20} />,
    title: "Powerful Built-in CLI",
    desc: "Install components, sync themes, measure bundle impact — all from terminal.",
    colSpan: 6,
  },
  {
    icon: <FaBrain size={20} />,
    title: "Claude & AI-First Types",
    desc: "Granular TypeScript, zero any. Claude, Cursor, Copilot autocomplete perfectly.",
    colSpan: 12,
  },
  {
    icon: <FaPalette size={20} />,
    title: "OKLCH-Powered Color System",
    highlight: "OKLCH",
    desc: "Modern perceptual color space for smoother gradients, better contrast, and predictable theming across light/dark modes.",
    colSpan: 7,
  },
  {
    icon: <FaSun size={20} />,
    title: "Seamless Light & Dark Modes",
    desc: "Built-in automatic dark mode with prefers-color-scheme support and manual toggle. Zero extra setup needed.",
    colSpan: 5,
  },
  {
    icon: <FaTree size={20} />,
    title: "Tree-Shakable & Tiny Bundle Size",
    desc: "Each component is fully tree-shakable. Import only what you use — average < 5kB gzipped per component.",
    colSpan: 6,
  },
  {
    icon: <FaCopy size={20} />,
    title: "Copy-Paste Ready Code",
    desc: "Every example includes clean, ready-to-copy code with installation commands and accessible props table.",
    colSpan: 6,
  },
];

export function FeaturesSection() {
  const elements: React.ReactNode[] = [];
  let currentRowSpan = 0;

  features.forEach((feature, i) => {
    if (i > 0 && currentRowSpan === 0) {
      elements.push(<Divider spacing="none" key={`divider-${i}`} style={{ gridColumn: 'span 12' }} />);
    }

    const hasLink = !!feature.link;
    const cardContent = (
      <div className="grid grid-rows-[350px_auto] group transition-colors">

        <div className="flex-1 w-full bg-background-800 border-r-[2px] border-b-[2px] last:border-r-none border-background-700" />

        <div className="flex gap-5 flex-row items-start text-left p-4 border-background-700">
          <div className="group-hover:bg-background-700 group-hover:text-foreground-300 bg-background-800 border-[2px] border-background-700 group-hover:border-background-600 text-foreground-300 h-13 grid place-items-center rounded-[12px] aspect-square shrink-0 transition-colors">
            {feature.icon}
          </div>
          <div className="flex-1">
            <strong className="font-semibold text-base block leading-tight text-foreground-100">
              {feature.highlight ? (
                <>
                  <span className="font-medium underline text-foreground-50">
                    {feature.highlight}
                  </span>{" "}
                  Production-Ready Components
                </>
              ) : (
                feature.title
              )}
            </strong>
            <p className="text-sm mt-1.5 leading-relaxed text-foreground-400">
              {feature.desc}
            </p>
          </div>
        </div>
      </div>
    );

    const cardElement = hasLink ? (
      <Link key={`feature-${i}`} href={feature.link} className="block" style={{ gridColumn: `span ${feature.colSpan}` }}>
        {cardContent}
      </Link>
    ) : (
      <div key={`feature-${i}`} style={{ gridColumn: `span ${feature.colSpan}` }}>
        {cardContent}
      </div>
    );

    elements.push(cardElement);
    currentRowSpan += feature.colSpan;

    if (currentRowSpan === 12) {
      currentRowSpan = 0;
    }
  });

  return (
    <div className="bg-background-950 border-t border-background-700 grid" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
      {elements}
    </div>
  );
}

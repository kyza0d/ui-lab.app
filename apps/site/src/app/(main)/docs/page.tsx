import { ArrowRight } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote-client/rsc'

import { getDocBySlug } from "@/features/docs";
import { mdxComponents, mdxOptions } from '@/features/docs'
import { Logo } from "@/shared";
import { RequirementsSection } from "./requirements-section";
import { DocumentationHeader } from "@/features/docs/components/documentation-header";
import { SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

const ReactAriaSvg = () => (
  <svg viewBox="200 206 800 790" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z" fill="var(--background-500)" />
  </svg>
);

interface DocLink {
  href: string;
  children: string;
}

const DocLink = ({ href, children }: DocLink) => (
  <a href={href} className="text-accent-400 hover:text-accent-300 transition-colors">
    {children}
  </a>
);

export default async function DocsPage() {
  const doc = await getDocBySlug('index');

  if (!doc) {
    return (
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main>
            <div className="text-red-500">Documentation not found</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 lg:w-48rem">
          <DocumentationHeader
            title={doc.metadata.title}
            description={doc.metadata.description}
          />


          <div className="h-50 border border-background-700 rounded-sm mb-12  relative overflow-hidden">
            <Logo className="absolute text-foreground-200 opacity-10 top-1/2 left-0 -translate-y-40 -translate-x-10 w-70 h-90" />
            {/* <div className="grid-paper z-0" /> */}
          </div>

          <div id="doc-content">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>

          {/* Requirements section */}
          <section id="requirements" className="my-12">
            <h2 className="text-md pb-8 font-semibold text-foreground-50">Dependencies & compatibility</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: SiTailwindcss, name: 'Tailwind CSS', version: 'v4.1' },
                { Icon: SiReact, name: 'React', version: 'v19.1' },
                { Icon: ReactAriaSvg, name: 'React Aria', version: 'v3.4' },
                { Icon: SiTypescript, name: 'TypeScript', version: 'v5.8' },
              ].map(({ Icon, name, version }) => (
                <a
                  key={name}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex  justify-end flex-col gap-4 px-3 py-2 h-28 rounded-sm border border-background-700 bg-background-800/50 transition-all hover:border-foreground-400 hover:bg-background-800 cursor-pointer"
                >
                  <div className="absolute top-4 left-3">
                    <Icon className="w-6 h-6 text-foreground-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground-200">{name}</div>
                    <div className="text-xs text-foreground-400">{version}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Requirements table */}
          <RequirementsSection />
        </main>
        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  );
}

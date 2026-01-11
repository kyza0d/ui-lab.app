import { ArrowRight } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { getDocBySlug } from "@/features/docs";
import { mdxComponents } from '@/features/docs'
import { Logo } from "@/shared";
import { RequirementsSection } from "./requirements-section";
import { DocumentationHeader } from "@/features/docs/components/documentation-header";

const TailwindSvg = () => (
  <svg
    viewBox="0 0 256 154"
    width="256"
    height="154"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="w-5 h-5"
  >
    <defs>
    </defs>
    <path
      d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
      fill="var(--background-500)"
    />
  </svg>
);

const ReactAriaSvg = () => (
  <svg viewBox="200 206 800 790" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z" fill="var(--background-500)" />
  </svg>
);

const ReactSvg = () => (
  <svg viewBox="0 0 256 228" width="256" height="228" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="w-5 h-5">
    <path
      d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z"
      fill="var(--background-500)"
    />
  </svg>
);

const TypeScriptSvg = () => (
  <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="w-5 h-5">
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="var(--background-500)"
    />
    <path
      d="M150.518 200.475V128h27.857v71.904h42.268V200.475Zm-58.914-125.99c0 17.706-10.299 31.524-24.633 31.524-14.314 0-24.632-13.818-24.632-31.524 0-17.688 10.318-31.525 24.632-31.525 14.334 0 24.633 13.837 24.633 31.525Zm-59.54 128.85l2.16-16.868c6.253 3.74 16.884 7.303 27.151 7.303 14.314 0 21.151-5.649 21.151-15.795 0-9.629-7.5-13.228-21.303-18.508l-5.202-2.237C64.725 133.746 48.3 121.747 48.3 99.062c0-20.063 15.3-35.245 39.357-35.245 16.886 0 29.023 5.868 36.885 13.228l-16.04 12.752c-4.822-3.623-11.663-7.265-20.845-7.265-10.65 0-17.45 5.302-17.45 13.018 0 9.087 5.651 12.786 18.701 18.414l5.202 2.239c17.124 7.379 33.55 19.378 33.55 41.772 0 23.916-18.923 36.75-44.517 36.75-19.703 0-34.16-6.348-42.876-14.666Z"
      fill="white"
    />
  </svg>
);

const TypeScript = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
        <main>
          <DocumentationHeader
            title={doc.metadata.title}
            description={doc.metadata.description}
          />


          <div className="h-50 bg-linear-to-b border border-background-700 from-background-900 to-background-950 rounded-xl mb-12  relative overflow-hidden">
            <Logo className="absolute text-foreground-500 opacity-10 top-1/2 left-0 -translate-y-40 -translate-x-10 w-70 h-90" />
            {/* <div className="grid-paper z-0" /> */}
          </div>

          <div id="doc-content" className="prose dark:prose-invert prose-lg max-w-none">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
            />
          </div>

          {/* Requirements section */}
          <section id="requirements" className="max-w-xl space-y-6 my-12">
            <h2 className="text-xl font-semibold text-foreground-50">Dependencies & compatibility</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: TailwindSvg, name: 'Tailwind CSS', version: '>=3.0' },
                { Icon: ReactSvg, name: 'React', version: '>=19.0' },
                { Icon: ReactAriaSvg, name: 'React Aria', version: 'Latest' },
                { Icon: TypeScriptSvg, name: 'TypeScript', version: 'Optional' },
              ].map(({ Icon, name, version }) => (
                <a
                  key={name}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex  justify-end flex-col gap-4 px-3 py-2 h-28 rounded-lg border border-background-700 bg-background-800/50 backdrop-blur-sm transition-all hover:border-foreground-600 hover:bg-background-800 cursor-pointer"
                >
                  <div className="absolute top-4 left-3">
                    <Icon />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground-200">{name}</div>
                    <div className="text-sm text-foreground-400">{version}</div>
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

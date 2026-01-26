import "ui-lab-components/styles.css"
import "ui-lab-registry/styles.css"

import "./globals.css";

import "@fontsource/geist-sans";
import "@fontsource-variable/karla";
import "@fontsource-variable/geist";
import "@fontsource-variable/inter";
import "@fontsource-variable/work-sans";
import "@fontsource-variable/jetbrains-mono";

import { RootLayoutClient } from "./client";
import { generateMetadata } from "@/shared/lib/metadata";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;try{var c=localStorage.getItem('uilab_theme_complete');if(c){var d=JSON.parse(c);if(!d||typeof d!=='object')throw new Error('Invalid cache format');if(d.themeMode!=='light'&&d.themeMode!=='dark')throw new Error('Invalid themeMode');if(!d.cssVariables||typeof d.cssVariables!=='object')throw new Error('Missing cssVariables');var req=['--background-500','--text-md'];for(var i=0;i<req.length;i++)if(!(req[i] in d.cssVariables))throw new Error('Missing: '+req[i]);r.setAttribute('data-theme',d.themeMode);Object.entries(d.cssVariables).forEach(function(e){r.style.setProperty(e[0],e[1])});}else{var theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';r.setAttribute('data-theme',theme);}}catch(e){var theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';r.setAttribute('data-theme',theme);console.warn('[Theme] Cache invalid, using device preference:',e.message);}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

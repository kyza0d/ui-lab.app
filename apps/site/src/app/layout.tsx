import "ui-lab-components/styles.css"
import "ui-lab-registry/styles.css"

import "./globals.css";

import "@fontsource-variable/karla";
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
            __html: `(function(){var r=document.documentElement;try{var c=localStorage.getItem('uilab_theme_complete');if(!c)return;var d=JSON.parse(c);if(!d||typeof d!=='object')throw new Error('Invalid cache format');if(d.themeMode!=='light'&&d.themeMode!=='dark')throw new Error('Invalid themeMode');if(!d.cssVariables||typeof d.cssVariables!=='object')throw new Error('Missing cssVariables');var req=['--spacing-base','--background-50','--text-base'];for(var i=0;i<req.length;i++)if(!(req[i] in d.cssVariables))throw new Error('Missing: '+req[i]);r.setAttribute('data-theme',d.themeMode);Object.entries(d.cssVariables).forEach(function(e){r.style.setProperty(e[0],e[1])});}catch(e){console.warn('[Theme] Cache invalid, using defaults:',e.message);}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

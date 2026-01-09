export function generateThemeScript(): string {
  return `(function(){
    const STORAGE_KEY='ui-lab-theme-complete';
    const root=document.documentElement;
    try{
      const saved=localStorage.getItem(STORAGE_KEY);
      if(saved){
        const data=JSON.parse(saved);
        if(data&&typeof data==='object'){
          if(data.themeMode==='light'||data.themeMode==='dark'){
            root.setAttribute('data-theme',data.themeMode);
          }
          if(data.cssVariables&&typeof data.cssVariables==='object'){
            Object.entries(data.cssVariables).forEach(function(e){
              root.style.setProperty(e[0],e[1]);
            });
          }
        }
      }else{
        root.setAttribute('data-theme','dark');
      }
    }catch(e){
      root.setAttribute('data-theme','dark');
      if(typeof console!=='undefined'&&console.warn){
        console.warn('[ThemeProvider] Failed to restore theme',e);
      }
    }
  })();`
}

export const THEME_SCRIPT = generateThemeScript()

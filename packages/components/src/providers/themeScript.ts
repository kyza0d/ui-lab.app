export function generateThemeScript(): string {
  return `(function(){
    const STORAGE_KEY='ui-lab-theme-complete';
    try{
      const saved=localStorage.getItem(STORAGE_KEY);
      if(!saved)return;
      const data=JSON.parse(saved);
      if(!data||typeof data!=='object')throw new Error('Invalid cache format');
      if(data.themeMode!=='light'&&data.themeMode!=='dark')throw new Error('Invalid themeMode');
      const root=document.documentElement;
      root.setAttribute('data-theme',data.themeMode);
      if(data.cssVariables&&typeof data.cssVariables==='object'&&Object.keys(data.cssVariables).length>0){
        Object.entries(data.cssVariables).forEach(function(e){
          root.style.setProperty(e[0],e[1]);
        });
      }
    }catch(e){
      console.warn('[ThemeProvider] Failed to restore theme:',e instanceof Error?e.message:String(e));
    }
  })();`
}

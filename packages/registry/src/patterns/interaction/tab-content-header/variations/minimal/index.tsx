'use client';

function TabContentHeaderMinimal({ title }: { title: string }) {
  return (
    <div className="pb-3 border-b border-background-800">
      <h3 className="text-sm font-semibold text-foreground-100">{title}</h3>
    </div>
  );
}

export function TabContentHeaderMinimalDemo() {
  return (
    <div className="p-6 flex flex-col gap-8 max-w-md w-full">
      <TabContentHeaderMinimal title="API Keys" />
      <TabContentHeaderMinimal title="Team members" />
      <TabContentHeaderMinimal title="Billing history" />
    </div>
  );
}

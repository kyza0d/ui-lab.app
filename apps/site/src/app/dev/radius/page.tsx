"use client";

import { useState } from "react";
import styles from "./radius.module.css";

export default function RadiusDevPage() {
  const [ratio, setRatio] = useState(0.5);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Padding-Based Radius</h1>

      <label className="flex items-center gap-3 text-sm">
        --radius-ratio
        <input type="range" min={0} max={2} step={0.05} value={ratio} onChange={(e) => setRatio(Number(e.target.value))} />
        <span className="font-mono w-10">{ratio}</span>
      </label>

      <div className={`${styles.box} ${styles.outer}`} style={{ "--radius-ratio": ratio } as React.CSSProperties}>
        <div className={`${styles.box} ${styles.inner}`} style={{ "--radius-ratio": ratio * 1.5 } as React.CSSProperties}>
          Inner (sm)
        </div>
      </div>
    </div>
  );
}

"use client";

import { Banner as BannerComponent } from "ui-lab-components";
import React from "react";

export const Banner = BannerComponent;
export const BannerTitle = BannerComponent.Title;

export const BannerBody = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm font-normal text-opacity-90">
    {children}
  </div>
);

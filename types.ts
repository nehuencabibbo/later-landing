import React from 'react';

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  align?: 'left' | 'right';
}

export interface PricingPlanProps {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}
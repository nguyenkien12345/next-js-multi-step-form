import PageHeader from '@/components/PageHeader';
import StepNavigation from '@/components/StepNavigation';
import { AddDealContextProvider } from '@/contexts/addDealContext';
import React from 'react';

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 lg:px-0">
      <PageHeader
        title="Handle Form With Multi Step"
        subtitle="Developer Fullstack Nguyen Trung Kien"
      />

      <div className="mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
        <StepNavigation />
        <AddDealContextProvider>
          <div className="w-full">{children}</div>
        </AddDealContextProvider>
      </div>
    </div>
  );
}

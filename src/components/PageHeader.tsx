import React from 'react';

interface IProps {
  title: string,
  subtitle?: string
}

export default function PageHeader({ title, subtitle } : IProps) {
  return (
    <>
      <h1 className="mb-4 text-4xl font-semibold text-white md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <span className="text-sm font-light text-white md:text-2xl">
          {subtitle}
        </span>
      )}
    </>
  );
}

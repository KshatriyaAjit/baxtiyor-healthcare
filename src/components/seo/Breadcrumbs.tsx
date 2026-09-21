import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem, Locale } from '@/types';
import { JsonLd, createBreadcrumbSchema } from './JsonLd';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const isArabic = locale === 'ar';

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0 text-xs sm:text-sm text-brand-text-secondary">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url} className="inline-flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-gray-400 mx-1 ${isArabic ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span className="font-semibold text-brand-blue" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-brand-blue hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}


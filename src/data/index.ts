import { casesEn } from './cases.en';
import { casesEs } from './cases.es';
import type { CaseData } from './types';

export function getCases(language: string): CaseData[] {
  return language === 'es' ? casesEs : casesEn;
}

export function getCaseBySlug(language: string, slug: string): CaseData | undefined {
  return getCases(language).find((c) => c.slug === slug);
}

export type { CaseData, CaseSection, ProjectType } from './types';

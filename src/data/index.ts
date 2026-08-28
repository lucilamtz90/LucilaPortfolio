import { aiCasesEn } from './aiCases.en';
import { aiCasesEs } from './aiCases.es';
import { casesEn } from './cases.en';
import { casesEs } from './cases.es';
import type { AiCase, CaseData } from './types';

export function getCases(language: string): CaseData[] {
  return language === 'es' ? casesEs : casesEn;
}

export function getCaseBySlug(language: string, slug: string): CaseData | undefined {
  return getCases(language).find((c) => c.slug === slug);
}

export function getAiCases(language: string): AiCase[] {
  return language === 'es' ? aiCasesEs : aiCasesEn;
}

export type { AiCase, CaseData, CaseSection, ProjectType } from './types';

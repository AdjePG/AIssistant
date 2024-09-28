import type { Locale } from "@/i18n/i18n.config";

const langJson: Record<Locale, () => Promise<Record<string, any>>> = {
  es: () => import("@/i18n/json/es.json").then((module) => module.default),
  ca: () => import("@/i18n/json/ca.json").then((module) => module.default),
  en: () => import("@/i18n/json/en.json").then((module) => module.default),
  fr: () => import("@/i18n/json/fr.json").then((module) => module.default),
  de: () => import("@/i18n/json/de.json").then((module) => module.default),
  it: () => import("@/i18n/json/it.json").then((module) => module.default)
};

export const getLangJson = async (locale: Locale) => langJson[locale]?.() ?? langJson.es();

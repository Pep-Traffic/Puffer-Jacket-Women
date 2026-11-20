"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";
import { localePath, locales, t, type Locale } from "@/lib/i18n";

// Languages offered in the footer. Choosing one opens the same page in that
// language. Currencies are listed for display only: prices are not published
// yet, so no rates are applied.
export const languages = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "ar", label: "العربية (Arabic)" },
  { code: "tr", label: "Türkçe (Turkish)" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "zh", label: "中文 (Chinese)" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "ko", label: "한국어 (Korean)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "fr", label: "Français (French)" },
  { code: "de", label: "Deutsch (German)" },
  { code: "it", label: "Italiano (Italian)" },
  { code: "pt", label: "Português (Portuguese)" },
];

export const currencies = [
  { code: "USD", label: "USD ($)" },
  { code: "PKR", label: "PKR (₨)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "INR", label: "INR (₹)" },
  { code: "AED", label: "AED (د.إ)" },
  { code: "SAR", label: "SAR (ر.س)" },
  { code: "BDT", label: "BDT (৳)" },
  { code: "TRY", label: "TRY (₺)" },
  { code: "CAD", label: "CAD (C$)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "CNY", label: "CNY (¥)" },
  { code: "JPY", label: "JPY (¥)" },
  { code: "IDR", label: "IDR (Rp)" },
  { code: "MYR", label: "MYR (RM)" },
  { code: "SGD", label: "SGD (S$)" },
];

export default function LocaleSelects({ lang = "en" }: { lang?: Locale }) {
  const s = t(lang);
  const router = useRouter();
  const pathname = usePathname();
  const [currency, setCurrency] = useState("USD");
  const [note, setNote] = useState("");

  // The page path without the language prefix, so the same page opens in the new language.
  const base = pathname.replace(/^\/(ur|ar|hi)(?=\/|$)/, "") || "/";

  return (
    <div className="ft__locale">
      <div className="ft__selects">
        <label className="ft__select">
          <span className="sr-only">{s.language}</span>
          <select
            value={lang}
            onChange={(event) => {
              const next = event.target.value;
              const target = languages.find((l) => l.code === next);
              if (!target) return;
              const code = (locales as readonly string[]).includes(next) ? (next as Locale) : null;
              if (code) {
                router.push(localePath(code, base));
              } else {
                setNote(`${target.label}: ${s.languageNote}`);
              }
            }}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
          <CaretDown size={14} aria-hidden="true" />
        </label>
        <label className="ft__select">
          <span className="sr-only">{s.currency}</span>
          <select
            value={currency}
            onChange={(event) => {
              setCurrency(event.target.value);
              setNote(s.currencyNote);
            }}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <CaretDown size={14} aria-hidden="true" />
        </label>
      </div>
      <p className="ft__locale-note" role="status">
        {note}
      </p>
    </div>
  );
}

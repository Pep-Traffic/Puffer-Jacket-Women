"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { t, type Locale } from "@/lib/i18n";

// No mailing list is connected yet, so the form drafts an email to the store
// instead of keeping the address. Swap this for a real sign-up when one exists.
export default function NewsletterForm({ lang = "en" }: { lang?: Locale }) {
  const s = t(lang);
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    const body = `Please add this address to the newsletter: ${email}`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      "Join the Circle",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="ft-join__form" onSubmit={onSubmit}>
      <label className="ft-join__field">
        <span className="sr-only">{s.emailPlaceholder}</span>
        <EnvelopeSimple size={20} aria-hidden="true" />
        <input name="email" type="email" required autoComplete="email" placeholder={s.emailPlaceholder} />
      </label>
      <button type="submit" className="ft-join__submit">
        {s.subscribe} <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="ft-join__status" role="status">
        {sent ? s.subscribed : ""}
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// No server is connected yet, so the form opens a drafted email instead of
// posting data. Swap this for a real endpoint when one exists.
export default function FitRequest() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Name: ${d.get("first")} ${d.get("last")}`,
      `Email: ${d.get("email")}`,
      `Height and usual size: ${d.get("size")}`,
      `Piece I am after: ${d.get("piece")}`,
      `Weather: ${d.get("weather")}`,
      "",
      `${d.get("notes") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      "Fit request",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="fit-form" onSubmit={onSubmit}>
      <div className="fit-form__row">
        <label>
          First name
          <input name="first" required autoComplete="given-name" />
        </label>
        <label>
          Last name
          <input name="last" required autoComplete="family-name" />
        </label>
      </div>
      <label>
        Email address
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <div className="fit-form__row">
        <label>
          Height and usual size
          <input name="size" placeholder="For example 168 cm, size M" />
        </label>
        <label>
          Piece you want
          <select name="piece" defaultValue="Long sleeve puffer">
            <option>Long sleeve puffer</option>
            <option>Sleeveless vest</option>
            <option>Short sleeve layer</option>
            <option>Cap or hat</option>
            <option>Accessories</option>
          </select>
        </label>
      </div>
      <label>
        Coldest weather you plan to wear it in
        <select name="weather" defaultValue="Cold, around freezing">
          <option>Cool, above 10 C</option>
          <option>Cold, around freezing</option>
          <option>Very cold, below -10 C</option>
        </select>
      </label>
      <label>
        Anything else
        <textarea name="notes" rows={3} />
      </label>
      <button type="submit" className="btn">
        Send fit request
      </button>
      <p className="fit-form__note" role="status">
        {sent
          ? "Your email app should have opened with the request ready to send."
          : "This opens a drafted email to our team. We reply personally."}
      </p>
    </form>
  );
}

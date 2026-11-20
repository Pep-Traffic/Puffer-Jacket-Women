"use client";

import { useState, type ComponentType } from "react";
import {
  ArrowRight,
  ChatsCircle,
  EnvelopeSimple,
  Handbag,
  Headset,
  ShieldCheck,
  Ruler,
  Snowflake,
  TShirt,
  Wallet,
  type IconProps,
} from "@phosphor-icons/react";
import type { FaqGroup } from "@/lib/faq";
import { site } from "@/lib/site";

type Icon = ComponentType<IconProps>;

const topicIcons: Record<string, Icon> = {
  "Fill and warmth": Snowflake,
  "Fit and layering": Ruler,
  Care: ShieldCheck,
  "Caps, hats and accessories": TShirt,
  Shopping: Handbag,
  "Orders and payment": Wallet,
};

// Topic sidebar and question panels. Every panel stays in the page markup, so
// all answers are readable by search engines; only the chosen topic is shown.
export default function FaqTopics({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(0);
  const idFor = (title: string) => `faq-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

  return (
    <div className="faq-topics">
      <aside className="faq-side" aria-label="Question topics">
        <div className="faq-side__intro">
          <ChatsCircle size={34} aria-hidden="true" />
          <div>
            <h2>Have a question?</h2>
            <p>Browse the topics or read the questions on the right.</p>
          </div>
        </div>

        <div className="faq-side__topics">
          {groups.map((group, i) => {
            const TopicIcon = topicIcons[group.title] ?? ChatsCircle;
            return (
              <button
                key={group.title}
                type="button"
                className="faq-topic"
                aria-pressed={i === active}
                aria-controls={idFor(group.title)}
                onClick={() => setActive(i)}
              >
                <TopicIcon size={20} aria-hidden="true" />
                <span>{group.title}</span>
                <ArrowRight size={16} aria-hidden="true" className="faq-topic__arrow" />
              </button>
            );
          })}
        </div>

        <div className="faq-help">
          <Headset size={30} aria-hidden="true" />
          <h3>Still need help?</h3>
          <p>Email the store with your question.</p>
          <a href={`mailto:${site.contactEmail}`} className="faq-help__button">
            <EnvelopeSimple size={18} aria-hidden="true" />
            Contact us
          </a>
        </div>
      </aside>

      <div className="faq-panels">
        {groups.map((group, i) => {
          const PanelIcon = topicIcons[group.title] ?? ChatsCircle;
          const headingId = `${idFor(group.title)}-heading`;
          return (
            <section
              key={group.title}
              id={idFor(group.title)}
              className="faq-panel"
              aria-labelledby={headingId}
              hidden={i !== active}
            >
              <h2 id={headingId} className="faq-panel__head">
                <PanelIcon size={26} aria-hidden="true" />
                {group.title}
              </h2>
              <div className="faq">
                {group.items.map((item, j) => (
                  <details key={item.q} open={j === 0}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";

const faqItems = [
  {
    question: "Can I switch between monthly and yearly anytime?",
    answer: "Yes. You can switch billing in one click and changes apply at your next cycle.",
  },
  {
    question: "Do you offer onboarding help for teams?",
    answer: "Growth and Scale plans include guided onboarding and migration support.",
  },
  {
    question: "Is there API access for integrations?",
    answer: "API access is available on all plans with higher limits on Growth and Scale.",
  },
  {
    question: "How does support work?",
    answer: "Starter uses email support, Growth gets priority queue, Scale has dedicated 24/7 support.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-block">
      <div className="section-head">
        <p className="eyebrow">FAQ Page</p>
        <h1>Frequently asked questions</h1>
      </div>

      <div className="faq-list">
        {faqItems.map((item, index) => {
          const open = openIndex === index;
          return (
            <article className={`faq-item ${open ? "open" : ""}`} key={item.question}>
              <button className="faq-question" onClick={() => setOpenIndex(open ? -1 : index)}>
                <span>{item.question}</span>
                <span>{open ? "-" : "+"}</span>
              </button>
              <div className="faq-answer-wrap" style={{ maxHeight: open ? "120px" : "0px" }}>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


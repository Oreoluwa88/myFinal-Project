import { useState } from "react";
import "./Faq.css";

function FAQSection() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why is rent management stressful for landlords?",
      answer:
        "Most landlords still track payments manually which leads to missed payments, poor records, and confusion.",
    },

    {
      question: "How does the platform help tenants?",
      answer:
        "Tenants can request leases, view properties, and manage rental information from one place.",
    },

    {
      question: "Can landlords track rent payments easily?",
      answer:
        "Yes. The dashboard gives landlords clear payment visibility and organized rent tracking.",
    },

    {
      question: "Does the system support online payments?",
      answer:
        "Yes. Payments can be processed securely using Paystack integration.",
    },

    {
      question: "How are property records managed?",
      answer:
        "All property details, tenants, and lease records are stored in one centralized dashboard.",
    },
  ];

  return (
    <section className="faq-section">

      <div className="faq-header">
        <p style={{color: "green"}}>FAQ</p>
        <h2>Frequently Asked Questions</h2>
        <p>
          Everything you need to know about the platform
        </p>
      </div>

      <div className="faq-container">

        {faqs.map((faq, index) => (

          <div className="faq-card" key={index}>

            <button
              className="faq-question"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span>{faq.question}</span>

              <span className="faq-icon">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}

export default FAQSection;
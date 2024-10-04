import { useEffect, useState } from "react";
import { getFAQ } from "../sanityclient";

const FAQ = () => {
  const [faqElements, setFAQElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const faq = await getFAQ();
      if (faq && faq.length > 0) {
        setFAQElements(
          faq.map((faq_el) => ({
            question: faq_el.title,
            answer: faq_el.answer,
          }))
        );
      }
    };

    fetchData();
  }, []);

  const [openFAQ, setOpenFAQ] = useState(Array(faqElements.length).fill(false));

  const toggleFAQ = (index) => {
    setOpenFAQ((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const faqContentStyle = (isOpen) => ({
    maxHeight: isOpen ? "500px" : "0",
    opacity: isOpen ? 1 : 0,
    marginTop: isOpen ? "1rem" : "0",
    overflow: "hidden",
    transition:
      "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out, margin-top 0.4s ease-in-out",
  });

  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-2xl my-5">Ответы на часто задаваемые вопросы</p>
        <div className="flex flex-col gap-5">
          {faqElements.map((item, index) => (
            <div
              key={index}
              className="border-0 rounded-lg p-4 transition duration-300 shadow-lg"
            >
              <button
                className="flex justify-between items-center w-full text-left text-lg bg-transparent border-0 p-3"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openFAQ[index]}
                aria-controls={`faq-content-${index}`}
              >
                <span className="faq-question">{item.question}</span>
                <svg
                  className={`transition-transform duration-400 ${
                    openFAQ[index] ? "rotate-90" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                </svg>
              </button>
              <div
                id={`faq-content-${index}`}
                style={faqContentStyle(openFAQ[index])}
                className="text-left mt-2"
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

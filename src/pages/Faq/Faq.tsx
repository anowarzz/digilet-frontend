import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const navigate = useNavigate();
  const heading = "Frequently Asked Questions";
  const description =
    "Find answers to common questions about using Digilet. Can't find what you're looking for? Contact our support team.";

  const faqItems = [
    {
      id: "faq-1",
      question: "What is Digilet?",
      answer:
        "Digilet is a digital wallet platform that allows you to securely send money, add funds to your wallet, withdraw cash, and perform various financial transactions with ease.",
    },
    {
      id: "faq-2",
      question: "How do I register for a Digilet account?",
      answer:
        "To register, click on the 'Register' button and provide your name, phone number, email (optional), and create a secure password. You'll need to verify your account before you can start using all features.",
    },
    {
      id: "faq-3",
      question: "How do I add money to my Digilet wallet?",
      answer:
        "You can add money to your wallet through various methods including bank transfers, mobile banking, or by visiting an authorized Digilet agent for cash deposits.",
    },
    {
      id: "faq-4",
      question: "How do I send money to another user?",
      answer:
        "To send money, go to the 'Send Money' section in your dashboard, enter the recipient's phone number or username, specify the amount, and confirm the transaction. The money will be instantly transferred if the recipient has a Digilet account.",
    },
    {
      id: "faq-5",
      question: "What is the difference between Cash-In and Cash-Out?",
      answer:
        "Cash-In allows you to deposit physical cash through an authorized agent and add it to your digital wallet. Cash-Out allows you to withdraw digital money from your wallet as physical cash through an agent.",
    },
    {
      id: "faq-6",
      question: "How do I withdraw money from my Digilet wallet?",
      answer:
        "To withdraw money, use the 'Withdraw Money' feature in your dashboard. Enter the amount you want to withdraw and select a nearby agent. The agent will provide you with the physical cash after verifying your identity.",
    },
    {
      id: "faq-7",
      question: "Is my money safe in Digilet?",
      answer:
        "Yes, Digilet uses advanced security measures including encryption, secure authentication, and transaction verification to protect your funds and personal information.",
    },
    {
      id: "faq-8",
      question: "What are the transaction fees?",
      answer:
        "Transaction fees vary depending on the type of transaction. Sending money typically has a small fee, while cash-in and cash-out transactions may have different rates. Check the specific transaction details before confirming.",
    },
  ];

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="mx-auto flex max-w-2xl flex-col text-center">
            <h1 className="mb-3 text-2xl font-semibold text-foreground md:text-3xl">
              {heading}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* FAQ Accordion */}
          <div className="mx-auto w-full max-w-3xl">
            <Accordion type="single" collapsible className="w-full space-y-1">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-border/40 rounded-md px-4 hover:border-border/60 transition-colors"
                >
                  <AccordionTrigger className="py-3 text-left hover:no-underline">
                    <span className="font-medium text-foreground text-sm md:text-base">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Subtle CTA */}
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Still have questions?{" "}
              <button
                onClick={handleContactClick}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Contact our support team
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;

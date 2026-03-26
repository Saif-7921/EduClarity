import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const AdminFAQ = () => {
  const faqs = [
    {
      question: "How do I monitor student performance?",
      answer: "Use the Admin Dashboard to view platform analytics. The charts and metrics update dynamically based on student activity across the ecosystem."
    },
    {
      question: "What are 'Weak Areas' and how do I address them?",
      answer: "The AI automatically flags topics where the average student score falls below an acceptable threshold. You can click 'Generate Resource' under these insights to receive AI-curated study material for your students."
    },
    {
      question: "Can I add my own resources?",
      answer: "Yes, you can click 'Add Custom Resource' in the insights section to provide your own links, PDFs, or external materials to help students with specific topics."
    },
    {
      question: "How is the 'At Risk' status determined?",
      answer: "Students are marked 'At Risk' if their recent quiz scores drop, or if their study hours fall below the cohort average for consecutive weeks."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" /> Admin FAQ
        </h1>
        <p className="text-slate-500">Frequently asked questions and guides for managing the platform.</p>
      </header>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:border-indigo-200 transition-colors">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-6 py-4 font-semibold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
              {faq.question}
              {openIndex === index ? <ChevronUp size={20} className="text-indigo-500" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-slate-600 border-t pt-4 bg-slate-50/50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ;

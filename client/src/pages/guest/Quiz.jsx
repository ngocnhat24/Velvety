import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const questions = [
  {
    id: 1,
    question: "What type of skin do you have?",
    options: ["Dry", "Oily", "Combination", "Sensitive"],
  },
  {
    id: 2,
    question: "How often do you experience acne breakouts?",
    options: ["Rarely", "Occasionally", "Often", "Always"],
  },
  {
    id: 3,
    question: "What is your main skincare goal?",
    options: ["Hydration", "Acne Control", "Anti-Aging", "Even Skin Tone"],
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    console.log("Quiz Answers:", answers);
    alert("Thank you for completing the quiz!");
  };

  return (
    <div className="quiz-container w-full min-h-screen bg-[#f9faef] flex flex-col">
      <Navbar />
      <div className="quiz-content flex flex-col items-center mt-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Take Our Skincare Quiz
        </h1>
        <p className="text-lg text-center text-gray-700 mb-12 max-w-2xl">
          Answer a few simple questions to find your Skintype for our therapists to serve better services.
        </p>
        <div className="quiz-questions w-full max-w-4xl space-y-8">
          {questions.map((q) => (
            <div
              key={q.id}
              className="question-card bg-white shadow-lg p-6 rounded-lg"
            >
              <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
              <div className="options grid grid-cols-2 gap-4">
                {q.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-2 border rounded-lg hover:shadow-md cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600"
        >
          Submit Quiz
        </button>
      </div>
      <Footer />
    </div>
  );
}

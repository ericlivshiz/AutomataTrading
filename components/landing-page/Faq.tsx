"use client";
import React from "react";
import { Container } from "./Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-black rounded-lg bg-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "How can I learn how to use Automata Trading?",
    answer: "Please go to our learn section to check out our documentation.",
  },
  {
    question: "How can I make my workflow collaborative?",
    answer: "Collaborating with others on your workflow is simple, just click SHARE and input the users email! You can decide whether the user will have edit or view access.",
  },
  {
    question: "How can I join the team?",
    answer:
      "Automata Trading is completely open-source. We highly encourage any experienced developers to contribute."
  },
  {
    question: "How do I get in touch?",
    answer:
      "If you'd like to get in touch, feel free to email: elivshiz@ucsb.edu",
  },
];
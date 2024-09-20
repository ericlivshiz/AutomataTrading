"use client";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import LearnWorkflow from "../documentation/LearnWorkflow";
import LearnBacktest from "../documentation/LearnBacktest";
import LearnMarketPlace from "../documentation/LearnMarketPlace";

const Learn = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const youd = "you'd";
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sidebar */}
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button
                            as="button"
                            className="md:hidden bg-indigo-500 text-white p-4"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                        </Disclosure.Button>

                        <aside
                            className={`${isSidebarOpen ? "block" : "hidden"
                                } md:block w-full md:w-1/4 text-white p-4 overflow-auto bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 min-h-screen`}
                        >
                            <div className="space-y-4 justify-center">
                                <h2 className="text-xl font-bold">Documentation</h2>
                                <nav>
                                    <ul className="space-y-2">
                                        <li>
                                            <a
                                                href="#installation"
                                                className="hover:text-indigo-400 block mb-3"
                                                onClick={() => setIsSidebarOpen(false)}
                                            >
                                                Workflow Editor
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#configuration"
                                                className="hover:text-indigo-400 block mb-3"
                                                onClick={() => setIsSidebarOpen(false)}
                                            >
                                                Backtesting & Data Analysis
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#directives"
                                                className="hover:text-indigo-400 block mb-3"
                                                onClick={() => setIsSidebarOpen(false)}
                                            >
                                                Marketplace
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    </>
                )}
            </Disclosure>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto bg-gradient-to-b from-gray-800 via-gray-800 to-slate-900 min-h-screen">
                <LearnWorkflow />
                <LearnBacktest />
                <LearnMarketPlace />
            </main>
        </div>
    );
};

export default Learn;


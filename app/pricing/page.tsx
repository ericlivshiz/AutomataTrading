"use client";

import { Navbar } from "@/components/landing-page/Navbar";

const Pricing = () => {
    const pricingPlans = [
        {
            name: "Starter",
            price: "$0",
            description: "Basic tools for getting started with automated trading.",
            features: ["1 Workflow", "3 Backtest & Data Analysis", "Community Support"],
            isCurrentPlan: true, // Added to indicate the current plan
        },
        {
            name: "Pro",
            price: "$24",
            description: "Advanced features for serious traders.",
            features: ["50 Workflows", "100 Backtest & Data Analysis", "Priority Support", "$0.25/workflow after 50", "$0.50/analysis after 100"],
            isPopular: true,
        },
        {
            name: "Enterprise",
            price: "$99",
            description: "Everything you need for high-volume trading.",
            features: ["Unlimited Workflows", "Unlimited Backtest & Data Analysis", "24/7 Support"],
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8 flex items-center justify-center">
                {/* This section is hidden on smaller devices */}
                <div className="text-center mb-12 hidden md:block">
                    <h1 className="text-4xl font-bold text-white mb-4">Pricing Plans</h1>
                    <p className="text-gray-400">Choose the perfect plan for your trading needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${plan.isPopular ? "border border-indigo-500" : ""
                                }`}
                        >
                            {plan.isPopular && (
                                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm uppercase font-semibold mb-4 inline-block">
                                    Most Popular
                                </span>
                            )}
                            <h2 className="text-2xl font-bold text-white mb-4">{plan.name}</h2>
                            <p className="text-indigo-400 text-4xl font-bold mb-4">{plan.price}/mo</p>
                            <p className="text-gray-400 mb-6">{plan.description}</p>
                            <ul className="text-left space-y-2 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="text-gray-200">
                                        <span className="mr-2">✔️</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Button logic for the Starter plan vs. other plans */}
                            {plan.isCurrentPlan ? (
                                <button className="w-full bg-gray-500 text-white py-3 rounded-md cursor-not-allowed">
                                    Current Plan
                                </button>
                            ) : (
                                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md transition duration-300">
                                    Get Started
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Pricing;


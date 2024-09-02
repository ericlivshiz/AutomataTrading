# Automata Trading

Welcome to **Automata Trading**, a web-based platform that empowers users to create, test, and share automated trading bots without any coding skills. Whether you're a seasoned trader or just starting out, Automata Trading is designed to make algorithmic trading accessible to everyone. Automata Trading has just started getting built.

## 🚀 Project Overview

Automata Trading is built with three core functionalities:

1. **No-Code Workflow for Creating Automated Trading Bots:**
   - Our platform allows users to design and implement trading strategies without writing a single line of code. The intuitive interface simplifies the process, making it accessible to traders with varying levels of experience.

2. **Backtesting & Data Analysis:**
   - Users can run backtests on their strategies against historical market data to evaluate performance before going live. The platform provides detailed analysis, enabling users to refine and optimize their strategies.

3. **Marketplace for Trading Bots:**
   - Automata Trading includes a marketplace where users can buy and sell trading bots. Each bot listing includes comprehensive data analysis and performance metrics, ensuring transparency and authenticity. The marketplace fosters a community where users can share strategies and benefit from each other's insights.

## 💡 What's the Point?

The stock market has evolved dramatically over the decades, becoming more accessible to the average investor. However, creating and using automated trading bots remains complex and time-consuming, often requiring extensive market knowledge and technical expertise. **Automata Trading** aims to democratize algorithmic trading, making it as easy as placing a trade on platforms like Robinhood.

By providing a no-code environment and a data-driven marketplace, Automata Trading opens up the world of algorithmic trading to a broader audience, allowing anyone with basic trading knowledge to create and deploy bots quickly and efficiently.

### Why a Marketplace?

Finding reliable trading bots online can be a daunting task. Many bots available for purchase lack transparency, making it difficult to gauge their effectiveness. Automata Trading addresses this issue by offering a marketplace where every bot comes with verified performance data. Buyers can trust that the bots listed on our platform are backed by real data, not just testimonials.

## 🛠️ Tech Stack

Automata Trading is still being built, the full tech-stack isn't determined but the current set up involved:

- **Frontend:** Next.js, React, Tailwind CSS
- **Collaboration & Real-time Updates:** Liveblocks, Zustand
- **User Authentication:** Clerk
- **Performance Monitoring:** Sentry
- **Flow Chart/Workflow Builder/No-Code Editor:** React Flow

## ⚙️ Getting Started

To run Automata Trading locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/AutomataTrading.git
   cd AutomataTrading
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your environment variables:

   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_key
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_key
   LIVEBLOCKS_SECRET_KEY=your_key
   SENTRY_AUTH_TOKEN=your_key
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 📈 Contributing

We welcome contributions from developers, designers, and traders who believe in the vision of Automata Trading. Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit)) file for details.

## 📞 Contact

For inquiries, reach out to [elivshiz@ucsb.edu](mailto:elivshiz@ucsb.edu).

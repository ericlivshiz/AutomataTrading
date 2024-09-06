import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    CodeBracketSquareIcon,
    PlayCircleIcon,
    QuestionMarkCircleIcon,
    BoltIcon
  } from "@heroicons/react/24/solid";
  
  import benefitOneImg from "./../../public/assets/images/bear-bull-image-2.png"
  import benefitTwoImg from "./../../public/assets/images/presentation.png"
  
  const BenefitOne = {
    title: "Core Functionality",
    desc: "Automata Trading is built with three core functionalities:",
    image: benefitOneImg,
    bullets: [
      {
        title: "No-Code Workflow Editor",
        desc: "Users can design and implement trading strategies without writing any code.",
        icon: <CodeBracketSquareIcon />,
      },
      {
        title: "Backtesting & Data Analysis",
        desc: "Run backtests on strategies against historical market data.",
        icon: <ChartBarSquareIcon />,
      },
      {
        title: "Marketplace for Trading Bots",
        desc: "Buy & sell trading bots with a data-analysis report attached",
        icon: <CursorArrowRaysIcon />,
      },
    ],
  };
  
  const BenefitTwo = {
    title: "Create Your Strategy",
    desc: "Creating a bot with Automata Trading is as simple as choosing 3 categories",
    image: benefitTwoImg,
    bullets: [
      {
        title: "Choose a Trigger Event",
        desc: "Select an event that will trigger your bot to start",
        icon: <PlayCircleIcon />
      },
      {
        title: "Choose a Condition Event",
        desc: "Your condition is your strategy! Create the conditions for your bot to follow.",
        icon: <QuestionMarkCircleIcon />
      },
      {
        title: "Choose an Action Event",
        desc: "Choose which action you would like the bot to take if your condition is met. This could be a trade order or notification.",
        icon: <BoltIcon />
      }
    ]
  }

  export {BenefitOne, BenefitTwo};
  
import stringSimilarity from "string-similarity";

// lista med nyckelord som boten kan känna igen
const keywords = [
  "hello",
  "hi",
  "hey",
  "shipping",
  "delivery",
  "return",
  "refund",
  "cancel",
  "payment",
  "pay",
  "methods",
  "recommend",
  "suggest",
  "best game",
  "ps5",
  "xbox",
  "pc",
  "order status",
  "track",
  "where is my order",
  "support",
  "help",
  "problem",
  "account",
  "login",
  "register",
  "gift card",
  "voucher",
  "bye",
  "goodbye",
  "thanks",
];


const contact =
  "if not, contact support at support@gamezone.com or call +46 123 456 789.";

const followUp = `\ndid that help?\n${contact}`;

// funktion som hittar närmaste nyckelord baserat på likhet
const findClosestKeyword = (input: string): string | null => {
  const { bestMatch } = stringSimilarity.findBestMatch(
    input.toLowerCase(),
    keywords
  );
  if (bestMatch.rating > 0.6) return bestMatch.target;
  return null;
};

// kollar om ordet finns som ett helt ord i input (inte bara substring)
const includesWord = (input: string, word: string) => {
  return new RegExp(`\\b${word}\\b`, "i").test(input);
};

// huvudfunktionen som returnerar botens svar
export const getBotResponse = (message: string): string => {
  const input = message.toLowerCase().trim();

  // hitta nyckelord som finns i input
  const matched = keywords.filter((k) => includesWord(input, k));

  // om inga nyckelord hittas, kolla efter närmaste match
  if (matched.length === 0) {
    const closest = findClosestKeyword(input);
    if (closest) {
      // föreslå närmaste nyckelord om användaren skrivit fel
      return `did you mean "${closest}"? please try again or contact support.\n${contact}`;
    }
  }

  // kolla input mot olika case och returnera rätt svar
  switch (true) {
    case includesWord(input, "hello"):
    case includesWord(input, "hi"):
    case includesWord(input, "hey"):
      return "hello! how can i help you today?";

    case includesWord(input, "shipping"):
    case includesWord(input, "delivery"):
      return (
        "we offer free shipping on orders over 500 sek. delivery takes 2–5 business days." +
        followUp
      );

    case includesWord(input, "return"):
    case includesWord(input, "refund"):
    case includesWord(input, "cancel"):
      return (
        "you can return your order within 14 days. contact support to start the process." +
        followUp
      );

    case includesWord(input, "payment"):
    case includesWord(input, "pay"):
    case includesWord(input, "methods"):
      return (
        "we accept visa, mastercard, swish, klarna, and paypal." + followUp
      );

    case includesWord(input, "recommend"):
    case includesWord(input, "suggest"):
    case includesWord(input, "best game"):
      return (
        "what platform or genre do you prefer? (e.g. ps5, xbox, pc, rpg)" +
        followUp
      );

    case includesWord(input, "ps5"):
      return (
        "popular ps5 games: god of war: ragnarok, spider-man 2, horizon forbidden west." +
        followUp
      );

    case includesWord(input, "xbox"):
      return (
        "popular xbox games: halo infinite, forza horizon 5, starfield." +
        followUp
      );

    case includesWord(input, "pc"):
      return (
        "top pc games: baldur’s gate 3, elden ring, cyberpunk 2077." + followUp
      );

    case includesWord(input, "order status"):
    case includesWord(input, "track"):
    case includesWord(input, "where is my order"):
      return (
        "please provide your order id so we can check the status." + followUp
      );

    case includesWord(input, "support"):
    case includesWord(input, "help"):
    case includesWord(input, "problem"):
      return (
        "i’m here to help. you can ask about shipping, payments, orders, or returns." +
        followUp
      );

    case includesWord(input, "account"):
      return (
        "your account lets you view your orders or create a new, show details of order or game, and manage your profile." +
        followUp
      );

    case includesWord(input, "login"):
      return (
        "to login, click the login button at the top right and enter your email and password." +
        followUp
      );

    case includesWord(input, "register"):
      return (
        "to register, click login, then select create account. fill in the form and submit." +
        followUp
      );

    case includesWord(input, "gift card"):
    case includesWord(input, "voucher"):
      return (
        "we support gift cards. you can enter the code during checkout." +
        followUp
      );

    case includesWord(input, "bye"):
    case includesWord(input, "goodbye"):
    case includesWord(input, "thanks"):
      return "thanks for visiting! come back soon." + followUp;

    default:
      // fallback svar om inget förstås, med uppföljning
      return (
        "i didn’t understand that. you can ask about shipping, returns, payment, or recommendations." +
        followUp
      );
  }
};

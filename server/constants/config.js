const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

const BOOK_FUND_TOKEN = "book_fund_token";

const generateGiftCard = () => {
  return "EGF-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export { corsOptions,
   BOOK_FUND_TOKEN,
   generateGiftCard
   };
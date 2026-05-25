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

export { corsOptions, BOOK_FUND_TOKEN };
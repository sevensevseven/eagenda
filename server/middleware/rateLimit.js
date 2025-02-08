import { rateLimit } from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "You are being rate limited. Slow down or try again later. If you think this is a mistake, please contact us.",
  standardHeaders: true,
  legacyHeaders: false
});

export default rateLimitMiddleware;
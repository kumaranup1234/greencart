import rateLimit from 'express-rate-limit';

export const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: 'Too many orders placed from this IP. Try again later.',
})
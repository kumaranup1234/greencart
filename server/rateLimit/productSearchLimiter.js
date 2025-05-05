import rateLimit from 'express-rate-limit';

export const productSearchLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 30,
    message: 'Too many image search requests. Please try again later.',
})
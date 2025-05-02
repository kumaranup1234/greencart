export const validTransitions = {
    Placed: ["Processing", "Cancelled"],
    Processing: ["Packed", "Cancelled"],
    Packed: ["Out for Delivery"],
    "Out for Delivery": ["Delivered", "Failed"],
    Delivered: [],
    Cancelled: [],
    Failed: ["Returned"],
    Returned: []
};


export const canUpdateStatus = (currentStatus, newStatus) => {
    const allowedNext = validTransitions[currentStatus];
    return allowedNext && allowedNext.includes(newStatus);
}


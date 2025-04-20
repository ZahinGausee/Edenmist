export const formatIndianNumber = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
}

export const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

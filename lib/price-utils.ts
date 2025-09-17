export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  
  // Check if it's in AED format (e.g., "AED 1,800,000")
  if (priceStr.includes('AED')) {
    const numericValue = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
  }
  
  // Check if it's in Indian format with CR (e.g., "₹2.50 CR")
  if (priceStr.includes('CR')) {
    const numericValue = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) * 10000000; // Convert CR to base units
  }
  
  // Check if it's in Indian format with L (e.g., "₹55.00 L")
  if (priceStr.includes('L')) {
    const numericValue = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) * 100000; // Convert L to base units
  }
  
  // Default case for any other format
  return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
};

export const formatPrice = (price: number, currency: 'AED' | 'INR' = 'INR'): string => {
  if (currency === 'AED') {
    return `AED ${price.toLocaleString()}`;
  }
  
  // For INR, format as CR or L based on the value
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} CR`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  
  return `₹${price.toLocaleString()}`;
};

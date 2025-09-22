export const parsePrice = (priceString: string): number => {
  if (!priceString) return 0;
  
  // Check for Indian currency formats (Lakhs and Crores)
  const lakhMatch = priceString.match(/₹?\s*([\d.,]+)\s*L/i);
  const croreMatch = priceString.match(/₹?\s*([\d.,]+)\s*CR?/i);
  
  if (lakhMatch) {
    // Convert Lakhs to actual number (1 Lakh = 100,000)
    const value = parseFloat(lakhMatch[1].replace(/,/g, ''));
    return value * 100000;
  } 
  
  if (croreMatch) {
    // Convert Crores to actual number (1 Crore = 10,000,000)
    const value = parseFloat(croreMatch[1].replace(/,/g, ''));
    return value * 10000000;
  }
  
  // For other formats, use the existing logic
  const cleanString = priceString.replace(/[^\d.,-]/g, '');
  const hasComma = cleanString.includes(',');
  const hasPeriod = cleanString.includes('.');
  
  let numericString = cleanString;
  
  if (hasComma && hasPeriod) {
    numericString = cleanString.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    const parts = cleanString.split(',');
    if (parts[1]?.length === 3) {
      numericString = parts.join('');
    } else {
      numericString = cleanString.replace(',', '.');
    }
  }
  
  return parseFloat(numericString) || 0;
};

// Format price in Indian currency (Lakhs/Crores)
export const formatIndianPrice = (value: number): string => {
  if (value >= 10000000) {
    // Convert to Crores
    return `₹${(value / 10000000).toFixed(2)} CR`;
  } else if (value >= 100000) {
    // Convert to Lakhs
    return `₹${(value / 100000).toFixed(2)} L`;
  } else {
    // For values less than 1 Lakh
    return `₹${value.toLocaleString('en-IN')}`;
  }
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

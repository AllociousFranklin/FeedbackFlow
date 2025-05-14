// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format date to display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get rating statistics
export const getRatingStats = (ratings: number[]) => {
  if (ratings.length === 0) return { average: 0, distribution: [0, 0, 0, 0, 0] };
  
  const sum = ratings.reduce((acc, curr) => acc + curr, 0);
  const average = sum / ratings.length;
  
  const distribution = [1, 2, 3, 4, 5].map(rating => {
    return ratings.filter(r => r === rating).length;
  });
  
  return { average, distribution };
};

// Helper function to format the hours
export const formatHour = (hour: number): string => {
  // Ensure the hour is a valid number
  const parsedHour = parseInt(String(hour), 10);

  // Check if the parsedHour is a valid number
  if (!isNaN(parsedHour) && parsedHour >= 0 && parsedHour <= 23) {
    // Convert to string and add leading zero if needed
    const formattedHour = parsedHour.toString().padStart(2, '0');

    // Return the formatted string with ":00" for the minutes
    return `${formattedHour}:00`;
  } else {
    // Return the original hour if it's not a valid number
    return String(hour);
  }
};

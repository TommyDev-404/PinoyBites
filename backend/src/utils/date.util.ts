export function setExpiryDate(currentDate: Date, valid_days: number) {
      const date = new Date();
      date.setDate(date.getDate() + valid_days)
      return date;
}
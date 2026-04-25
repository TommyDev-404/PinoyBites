
export const capitalizeWords = (value: string) => {
      return value
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
};

export const fadeUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
};
      
export const slideLeft = {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 }
};
      
export const slideRight = {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 }
};

export const timeAgo = (date: Date | string | number): string => {
      const now = new Date();
      const past = new Date(date);
      const diff = now.getTime() - past.getTime(); // difference in ms

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
      if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
      if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      return `${days} day${days !== 1 ? 's' : ''} ago`;
};

export const getInitials = (name: string) => {
      if (!name) return "";

      const words = name.trim().split(" ");

      if (words.length === 1) {
            return words[0][0].toUpperCase();
      }

      return (
            words[0][0] + words[words.length - 1][0]
      ).toUpperCase();
};
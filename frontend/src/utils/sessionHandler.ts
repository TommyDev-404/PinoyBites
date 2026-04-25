let sessionExpiredHandler: (() => void) | null = null;

// this create a temporary storage for showing a modal when user token is expired and they are logout
export const setSessionExpiredHandler = (fn: () => void) => {
      sessionExpiredHandler = fn;
};

export const triggerSessionExpired = () => {
      sessionExpiredHandler?.();
};
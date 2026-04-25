import notifSound from '@/assets/notifSound.mp3';

export const  PlaySound = () => {
      const audio = new Audio(notifSound);
      const playPromise = audio.play();

      if (playPromise !== undefined) {
            playPromise.catch(err => console.log("Sound play prevented:", err));
      }
}
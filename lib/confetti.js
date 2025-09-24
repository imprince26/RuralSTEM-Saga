import confetti from 'canvas-confetti';

export const celebrateCorrectAnswer = () => {
  // Fire confetti from different positions
  const end = Date.now() + 3000; // 3 seconds

  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};

export const celebrateTheoremComplete = () => {
  // Bigger celebration for completing a theorem
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899']
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const celebrateClassComplete = () => {
  // Epic celebration for completing entire class
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];

  (function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  });

  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: colors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};
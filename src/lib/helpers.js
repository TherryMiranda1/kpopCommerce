import confetti from 'canvas-confetti';
export const gradientMaker = (categoria) => {
  if (categoria === "sudaderas") {
    return "bg-gradient-to-l from-green-500 to-emerald-600 shadow-lg shadow-green-500";
  }
  if (categoria === "accesorios") {
    return "bg-gradient-to-l from-blue-900 to-blue-500 shadow-lg shadow-blue-500";
  }
  if (categoria === "zapatillas") {
    return "bg-gradient-to-l from-gray-900 to-yellow-500 shadow-lg shadow-yellow-500";
  }
  if (categoria === "gorras") {
    return "bg-gradient-to-l from-red-400 to-rose-600 shadow-lg shadow-rose-500";
  } else return "";
};

export const runFireworks = () => {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

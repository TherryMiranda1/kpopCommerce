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

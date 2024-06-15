export const months1 = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString().padStart(2, "0"),
  label: (i + 1).toString().padStart(2, "0"),
}));

const currentYear = new Date().getFullYear();
export const years1 = Array.from({ length: 11 }, (_, i) => ({
  value: (currentYear + i).toString().slice(-2),
  label: (currentYear + i).toString(),
}));
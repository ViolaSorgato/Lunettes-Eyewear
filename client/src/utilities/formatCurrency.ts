// International number formatter for currency
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "SEK",
  style: "currency",
});

// Function to format a given number as currency using the configured formatter
export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}

export const currencyFormat = (currency: string = 'THB', compact: boolean = true) => new Intl.NumberFormat('th-TH', {
  currency,
  style: 'currency',
  notation: compact ? 'compact' : 'standard',
})

export const diffRates = (a: number, b: number) =>
  ((a - b) / b)

export const calculateTax = (remainingIncome: number, deduction: number = 160000) => {
  const progressiveTaxRates = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]
  const progressiveTax = [150000, 300000, 500000, 750000, 1000000, 2000000]

  let tax = 0

  remainingIncome -= deduction

  for (let i = 0; i < progressiveTaxRates.length; i++) {
    if (remainingIncome <= 0) break

    const rate = progressiveTaxRates[i]
    const limit = progressiveTax[i]

    if (remainingIncome > limit) {
      tax += limit * rate
      remainingIncome -= limit
    } else {
      tax += remainingIncome * rate
      remainingIncome = 0
    }
  }

  return tax
}

import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core'
import { calculateTax } from "@/libs/math";

export type Company = {
  name: string
  salary: number
  bonus: number
  pvdRate: number
  contributePVDRate: number
  allowance: number
}

const initialCompany: Company = {
  name: '',
  salary: 0,
  bonus: 0,
  pvdRate: 0,
  contributePVDRate: 0,
  allowance: 0,
}

export const useCompanyStore = defineStore('company', {
  state: () => ({
    currentCompany: useLocalStorage('currentCompany', { ...initialCompany }),
    companies: useLocalStorage('companies', [] as Company[]),
  }),
  actions: {
    add() {
      this.companies.push({ ...initialCompany });
    },
    remove(index: number) {
      this.companies.splice(index, 1);
    },
    summarize({ salary, allowance, pvdRate, contributePVDRate, bonus }: Company, yearly?: boolean) {
      const sso = (salary * 0.05 > 750 ? 750 : salary * 0.05) * (yearly ? 12 : 1)
      const pvdAmount = salary * (pvdRate / 100) * (yearly ? 12 : 1)
      const contributePVDAmount = salary * (contributePVDRate / 100) * (yearly ? 12 : 1)
      const revenue = (salary + allowance) * (yearly ? 12 : 1)
      const grossRevenue = revenue + contributePVDAmount
      const taxDeductible = 160000 + (pvdAmount + sso) * 12
      const minimumTax = yearly ? calculateTax(revenue, taxDeductible) : calculateTax(revenue * 12, taxDeductible) / 12
      const income = revenue - (sso + minimumTax)

      const bonusAmount = (bonus * salary) / (yearly ? 1 : 12)
      const maximumTax = yearly
        ? calculateTax(revenue + bonusAmount)
        : calculateTax((revenue + bonusAmount) * 12) / 12

      const balanceIncome = income - pvdAmount

      return {
        salary: salary * (yearly ? 12 : 1),
        sso,
        pvdAmount,
        contributePVDAmount,
        revenue,
        grossRevenue,
        income,
        bonusAmount,
        minimumTax,
        maximumTax,
        balanceIncome,
      }
    }
  },
});

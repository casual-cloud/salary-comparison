import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core'

export type Salary = {
  company: string
  salary: number
  bonus: number
  pvdRate: number
  contributePVDRate: number
  allowance: number
}

export const useSalaryStore = defineStore('salary', {
  state: () => ({
    salaries: useLocalStorage('salaries', [] as Salary[]),
  }),
  actions: {
    add() {
      this.salaries.push({
        company: '',
        salary: 0,
        bonus: 0,
        pvdRate: 0,
        contributePVDRate: 0,
        allowance: 0,
      });
    },
    remove(index: number) {
      this.salaries.splice(index, 1);
    }
  },
});

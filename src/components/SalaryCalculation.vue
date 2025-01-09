<script setup lang="ts">
import { computed, ref } from 'vue'

const {
  salary = 0,
  bonus = 0,
  pvdRate = 0,
  contributePVDRate = 0,
  allowance = 0,
} = defineProps<{
  salary: number
  bonus: number
  pvdRate: number
  contributePVDRate: number
  allowance: number
}>()

const yearly = ref<boolean>(false)

const calculateTax = (remainingIncome: number) => {
  const progressiveTaxRates = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]
  const progressiveTax = [150000, 300000, 500000, 750000, 1000000, 2000000]

  let tax = 0

  remainingIncome -= 160000 + (pvdAmount.value + sso.value) * 12

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

const numberFormat = (value: number) =>
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    notation: 'compact',
  }).format(value)

const sso = computed(() => (salary * 0.05 > 750 ? 750 : salary * 0.05) * (yearly.value ? 12 : 1))
const pvdAmount = computed(() => salary * (pvdRate / 100) * (yearly.value ? 12 : 1))
const contributePVDAmount = computed(
  () => salary * (contributePVDRate / 100) * (yearly.value ? 12 : 1),
)
const revenue = computed(() => (salary + allowance) * (yearly.value ? 12 : 1))
const grossRevenue = computed(() => revenue.value + contributePVDAmount.value)
const minimumTax = computed(() =>
  yearly.value ? calculateTax(revenue.value) : calculateTax(revenue.value * 12) / 12,
)
const income = computed(() => revenue.value - (sso.value + minimumTax.value))

const bonusAmount = computed(() => (bonus * salary) / (yearly.value ? 1 : 12))
const maximumTax = computed(() =>
  yearly.value
    ? calculateTax(revenue.value + bonusAmount.value)
    : calculateTax((revenue.value + bonusAmount.value) * 12) / 12,
)

const balanceIncome = computed(() => income.value - pvdAmount.value)

const summary = computed<
  { label: string; value: string; negative?: boolean; information?: string }[]
>(() => [
  { label: 'ค่าจ้าง', value: numberFormat(salary * (yearly.value ? 12 : 1)) },
  { label: 'รายรับ', value: numberFormat(revenue.value), information: 'ค่าจ้าง + เบี้ยเลี้ยง' },
  { label: 'กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)', value: numberFormat(contributePVDAmount.value) },
  {
    label: 'รายรับสุทธิ',
    value: numberFormat(grossRevenue.value),
    information: 'ค่าจ้าง + เบี้ยเลี้ยง + นายจ้างสมทบ',
  },
  {
    label: 'กองทุนประกันสังคม',
    negative: true,
    value: numberFormat(sso.value),
  },
  {
    label: 'ภาษีเงินได้',
    negative: true,
    value: [
      numberFormat(minimumTax.value),
      maximumTax.value > minimumTax.value
        ? `+ ${numberFormat(maximumTax.value - minimumTax.value)} = ${numberFormat(maximumTax.value)}`
        : null,
    ]
      .filter((v) => !!v)
      .join(''),
    information: 'คำนวณจาก รายรับ',
  },
  {
    label: 'รายได้สุทธิ',
    value: [
      numberFormat(income.value),
      bonusAmount.value > 0
        ? ` + ${numberFormat(bonusAmount.value)} = ${numberFormat(income.value + bonusAmount.value)}`
        : null,
    ]
      .filter((v) => !!v)
      .join(''),
    information: 'รายรับสุทธิ - กองทุนประกันสังคม - ภาษีเงินได้',
  },
  {
    label: 'รายได้เข้าบัญชี',
    value: numberFormat(balanceIncome.value),
    information: 'รายได้สุทธิ - กองทุนสำรองเลี้ยงชีพ',
  },
])
</script>

<template>
  <div
    class="border-y border-gray-200 bg-gray-50 px-5 text-center text-sm dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-400 py-4"
  >
    <label class="group relative inline-flex items-center gap-3">
      <input type="checkbox" v-model="yearly" class="peer sr-only" id="yearly" name="yearly" />
      <span class="font-medium">รายเดือน</span>
      <span
        class="relative h-7 w-12 flex-none rounded-full bg-gray-300 transition-all duration-150 ease-out before:absolute before:left-1 before:top-1 before:size-5 before:rounded-full before:bg-white before:transition-transform before:duration-150 before:ease-out before:content-[''] peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus:ring peer-focus:ring-blue-500/50 peer-focus:ring-offset-2 peer-focus:ring-offset-white peer-disabled:cursor-not-allowed peer-disabled:opacity-75 dark:bg-gray-700 dark:peer-checked:bg-blue-500 dark:peer-focus:ring-offset-gray-900"
      ></span>
      <span class="font-medium">รายปี</span>
    </label>
    <div class="grid grid-cols-1">
      <dl
        v-for="(item, index) in summary"
        :key="index"
        class="inline-flex items-center justify-between"
        :class="{
          'text-teal-500': !item.negative,
          'text-red-500': item.negative,
        }"
      >
        <dd
          class="group relative inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
        >
          {{ item.label }}
          <template v-if="item.information?.length">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="hi-solid hi-information-circle inline-block size-5 ml-1"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <div
              class="invisible absolute bottom-full left-1/2 z-1 -ml-24 flex w-48 origin-bottom translate-y-2 scale-75 flex-col items-center justify-center pb-0.5 opacity-75 transition duration-150 ease-out will-change-auto group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
            >
              <div
                class="overflow-hidden rounded-lg border border-gray-200 bg-white text-left text-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <p class="p-3 text-gray-500 dark:text-gray-400">
                  {{ item.information }}
                </p>
              </div>
              <div
                class="relative z-1 -mt-px h-0 w-0 flex-none border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"
                aria-hidden="true"
              />
              <div
                class="relative z-0 -mt-[7px] h-0 w-0 flex-none border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300 dark:border-t-gray-600"
                aria-hidden="true"
              />
            </div>
          </template>
        </dd>
        <dt class="mb-1 text-lg font-semibold">
          {{ item.value }}
        </dt>
      </dl>
    </div>
  </div>
</template>

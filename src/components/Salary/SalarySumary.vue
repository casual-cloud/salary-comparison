<script setup lang="ts">
import { currencyFormat } from '@/libs/format'
import { diffRates } from '@/libs/math'
import { useCompanyStore, type Company } from '@/stores/company'
import { computed, ref } from 'vue'
import CompareResult from './CompareResult.vue'

const { company, compareDisabled } = defineProps<{ company: Company; compareDisabled?: boolean }>()

const store = useCompanyStore()

const displayType = ref<'monthly' | 'yearly'>('monthly')
const compare = ref<Company>(store.currentCompany)

const yearly = computed(() => displayType.value === 'yearly')
const summary = computed(() => store.summarize(company, yearly.value))
const compareSummary = computed(() => store.summarize(compare.value, yearly.value))

const groupTable = computed<
  {
    label: string
    value: string
    compareResult?: { amount: number; rate: number }
    negative?: boolean
    invert?: boolean
    information?: string
  }[][]
>(() => [
  [
    {
      label: 'ค่าจ้าง',
      value: currencyFormat('THB').format(summary.value.salary),
      compareResult: {
        amount: summary.value.salary - compareSummary.value.salary,
        rate: diffRates(summary.value.salary, compareSummary.value.salary),
      },
    },
    {
      label: 'รายรับ',
      value: currencyFormat('THB').format(summary.value.revenue),
      information: 'ค่าจ้าง + เบี้ยเลี้ยง',
      compareResult: {
        amount: summary.value.revenue - compareSummary.value.revenue,
        rate: diffRates(summary.value.revenue, compareSummary.value.revenue),
      },
    },
    {
      label: 'กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)',
      value: currencyFormat('THB').format(summary.value.contributePVDAmount),
      compareResult: {
        amount: summary.value.contributePVDAmount - compareSummary.value.contributePVDAmount,
        rate: diffRates(
          summary.value.contributePVDAmount,
          compareSummary.value.contributePVDAmount,
        ),
      },
    },
    {
      label: 'รายรับสุทธิ',
      value: currencyFormat('THB').format(summary.value.grossRevenue),
      information: 'ค่าจ้าง + เบี้ยเลี้ยง + นายจ้างสมทบ',
      compareResult: {
        amount: summary.value.grossRevenue - compareSummary.value.grossRevenue,
        rate: diffRates(summary.value.grossRevenue, compareSummary.value.grossRevenue),
      },
    },
  ],
  [
    {
      label: 'กองทุนประกันสังคม',
      negative: true,
      value: currencyFormat('THB').format(summary.value.sso),
      compareResult: {
        amount: summary.value.sso - compareSummary.value.sso,
        rate: diffRates(summary.value.sso, compareSummary.value.sso),
      },
      invert: true,
    },
    {
      label: 'ภาษีเงินได้',
      negative: true,
      // value: [
      //   currencyFormat('THB').format(summary.value.minimumTax),
      //   summary.value.maximumTax > summary.value.minimumTax
      //     ? `+ ${currencyFormat('THB').format(summary.value.maximumTax - summary.value.minimumTax)} = ${currencyFormat('THB').format(summary.value.maximumTax)}`
      //     : null,
      // ]
      //   .filter((v) => !!v)
      //   .join(''),
      value: currencyFormat('THB').format(summary.value.maximumTax),
      information: 'คำนวณจาก รายรับ',
      compareResult: {
        amount: summary.value.maximumTax - compareSummary.value.maximumTax,
        rate: diffRates(summary.value.maximumTax, compareSummary.value.maximumTax),
      },
      invert: true,
    },
  ],
  [
    {
      label: 'รายได้สุทธิ',
      value: currencyFormat('THB').format(summary.value.income + summary.value.bonusAmount),
      compareResult: {
        amount:
          summary.value.income +
          summary.value.bonusAmount -
          (compareSummary.value.income + compareSummary.value.bonusAmount),
        rate: diffRates(
          summary.value.income + summary.value.bonusAmount,
          compareSummary.value.income + compareSummary.value.bonusAmount,
        ),
      },
      information: 'รายรับสุทธิ - กองทุนประกันสังคม - ภาษีเงินได้',
    },
    {
      label: 'รายได้เข้าบัญชี',
      value: currencyFormat('THB').format(summary.value.balanceIncome),
      information: 'รายได้สุทธิ - กองทุนสำรองเลี้ยงชีพ',
      compareResult: {
        amount: summary.value.balanceIncome - compareSummary.value.balanceIncome,
        rate: diffRates(summary.value.balanceIncome, compareSummary.value.balanceIncome),
      },
    },
  ],
])
</script>

<template>
  <div
    class="border-y border-gray-200 bg-gray-50 px-5 text-sm dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-400 py-4"
  >
    <div class="flex flex-row justify-between gap-3">
      <div>
        <label for="displayType" class="font-medium">การแสดงผล</label>
        <select
          id="displayType"
          name="displayType"
          class="block w-full rounded-lg border border-gray-200 py-2 pl-3 pr-10 leading-6 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500"
          v-model="displayType"
        >
          <option value="monthly">รายเดือน</option>
          <option value="yearly">รายปี</option>
        </select>
      </div>
      <div v-if="!compareDisabled">
        <label for="compare" class="font-medium">เปรียบเทียบ</label>
        <select
          id="compare"
          name="compare"
          class="block w-full rounded-lg border border-gray-200 py-2 pl-3 pr-10 leading-6 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500"
          v-model="compare"
        >
          <option :value="store.currentCompany">{{ store.currentCompany.name }}</option>
          <option v-for="(company, index) in store.companies" :key="index" :value="company">
            {{ company.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1">
      <template v-for="(table, index) in groupTable" :key="index">
        <dl
          v-for="(item, index) in table"
          :key="index"
          class="inline-flex items-center justify-between text-gray-500 dark:text-gray-400"
        >
          <dd class="group relative inline-flex items-center text-xs tracking-wider">
            <span class="font-semibold uppercase">{{ item.label }}</span>
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
                class="invisible absolute bottom-0 left-full top-0 z-1 flex w-20 origin-left -translate-x-2 scale-75 flex-row-reverse items-center justify-end pl-0.5 opacity-75 transition duration-150 ease-out will-change-auto group-hover:visible group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
              >
                <div
                  class="flex-none whitespace-nowrap rounded-lg bg-gray-800 px-2.5 py-2 text-center text-xs font-semibold text-gray-50 dark:bg-gray-700"
                >
                  <p class="p-3 text-gray-500 dark:text-gray-400">
                    {{ item.information }}
                  </p>
                </div>
                <div
                  class="h-0 w-0 flex-none border-b-4 border-r-4 border-t-4 border-b-transparent border-r-gray-800 border-t-transparent dark:border-r-gray-700"
                  aria-hidden="true"
                />
              </div>
            </template>
          </dd>
          <dt class="mb-1 text-right flex">
            <p class="text-lg font-semibold">{{ item.value }}</p>

            <CompareResult
              v-if="!compareDisabled && item.compareResult"
              :amount="item.compareResult.amount"
              :rate="item.compareResult.rate"
              :invert="item.invert"
            />
          </dt>
        </dl>
        <hr
          v-if="index < groupTable.length - 1"
          class="my-4 border-t border-gray-200 dark:border-gray-700"
        />
      </template>
    </div>
  </div>
</template>

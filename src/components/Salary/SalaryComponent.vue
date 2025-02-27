<script setup lang="ts">
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import SalaryCalculation from '@/components/Salary/SalarySumary.vue'
import { currencyFormat } from '@/libs/format'
import SalaryForm from './SalaryForm.vue'
import type { Company } from '@/stores/company'

defineProps<{ subtitle?: string; removeDisabled?: boolean; compareDisabled?: boolean }>()

const emit = defineEmits(['remove'])

const company = defineModel<Company>({
  type: Object,
  default: () => ({
    company: '',
    salary: 0,
    bonus: 0,
    pvdRate: 0,
    contributePVDRate: 0,
    allowance: 0,
  }),
})

const isOpen = ref<boolean>(false)

const open = () => (isOpen.value = true)
const close = () => (isOpen.value = false)
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-sm dark:text-gray-100">
    <div class="flex items-center justify-between gap-2 bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
      <div>
        <h4 class="text-xs font-bold" v-if="subtitle?.length">{{ subtitle }}</h4>
        <h3 class="font-medium">{{ company.name.length ? company.name : '-' }}</h3>
      </div>
      <div class="-my-4 inline-flex items-center gap-1">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-100 px-2 py-1 text-sm font-semibold leading-5 text-blue-800 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm focus:ring focus:ring-blue-300/25 active:border-blue-200 active:shadow-none dark:border-blue-200 dark:bg-blue-200 dark:hover:border-blue-300 dark:hover:bg-blue-300 dark:focus:ring-blue-500/50 dark:active:border-blue-200 dark:active:bg-blue-200"
          @click="open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="hi-solid hi-pencil-square inline-block size-6"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
            />
            <path
              d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
            />
          </svg>
        </button>
        <button
          v-if="!removeDisabled"
          type="button"
          class="ml-2 inline-flex items-center justify-center gap-2 rounded-lg border border-rose-700 bg-rose-700 px-2 py-1 text-sm font-semibold leading-5 text-white hover:border-rose-600 hover:bg-rose-600 hover:text-white focus:ring focus:ring-rose-400/50 active:border-rose-700 active:bg-rose-700 dark:focus:ring-rose-400/90"
          @click="emit('remove')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="hi-solid hi-x-mark inline-block size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="p-5">
      <div class="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">ค่าจ้าง</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ currencyFormat('THB').format(company.salary) }}
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">เบี้ยเลี้ยง และสวัสดิการ</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ currencyFormat('THB').format(company.allowance) }}
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">กองทุนสำรองเลี้ยงชีพ</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ company.pvdRate || 0 }}%
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ company.contributePVDRate || 0 }}%
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">โบนัส</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">{{ company.bonus }} เดือน</p>
        </div>
      </div>
    </div>

    <SalaryCalculation :company="company" :compare-disabled="compareDisabled" />
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-90">
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto p-4 lg:p-8">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-125"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-100"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-125"
        >
          <DialogPanel
            class="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100"
          >
            <SalaryForm
              v-model:company="company.name"
              v-model:salary.number="company.salary"
              v-model:bonus.number="company.bonus"
              v-model:pvdRate.number="company.pvdRate"
              v-model:contributePVDRate.number="company.contributePVDRate"
              v-model:allowance.number="company.allowance"
              :subtitle="subtitle"
              @remove="close"
            />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

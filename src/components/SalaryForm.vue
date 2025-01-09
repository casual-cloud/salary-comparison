<script setup lang="ts">
import { ref } from 'vue'
import SalaryCalculation from './SalaryCalculation.vue'

const companyInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['remove'])

const company = defineModel<string>('company', { type: String, default: '' })
const salary = defineModel<number>('salary', { type: Number, default: 0 })
const bonus = defineModel<number>('bonus', { type: Number, default: 0 })
const pvdRate = defineModel<number>('pvdRate', { type: Number, default: 0 })
const contributePVDRate = defineModel<number>('contributePVDRate', { type: Number, default: 0 })
const allowance = defineModel<number>('allowance', { type: Number, default: 0 })

const editCompany = ref<boolean>(true)
const minimize = ref<boolean>(false)

const onEditCompany = () => {
  editCompany.value = !editCompany.value
  companyInput.value?.focus()
}

const onBlurCompany = () => {
  if (company.value.trim()?.length) {
    editCompany.value = false
  }
}

const toggleSize = () => {
  minimize.value = !minimize.value
}

const numberFormat = (value: number) =>
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    notation: 'compact',
  }).format(value)
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-sm dark:text-gray-100">
    <div class="flex items-center justify-between gap-2 bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
      <div class="flex items-center">
        <template v-if="!editCompany">
          <h3 class="font-medium">{{ company }}</h3>
          <button
            type="button"
            class="ml-2 inline-flex flex-none items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
            @click="onEditCompany"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="hi-solid hi-pencil inline-block size-3"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
              />
            </svg>
          </button>
        </template>
        <input
          v-else
          v-model="company"
          ref="companyInput"
          type="text"
          id="company"
          name="company"
          placeholder="กรอกชื่อบริษัท"
          class="block px-3 py-2 text-sm leading-5 bg-transparent border-b"
          @blur="onBlurCompany"
        />
      </div>
      <div class="-my-4 inline-flex items-center gap-1">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-100 px-2 py-1 text-sm font-semibold leading-5 text-blue-800 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm focus:ring focus:ring-blue-300/25 active:border-blue-200 active:shadow-none dark:border-blue-200 dark:bg-blue-200 dark:hover:border-blue-300 dark:hover:bg-blue-300 dark:focus:ring-blue-500/50 dark:active:border-blue-200 dark:active:bg-blue-200"
          @click="toggleSize"
        >
          <svg
            v-if="minimize"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="hi-solid hi-arrows-pointing-out inline-block size-6"
          >
            <path
              fill-rule="evenodd"
              d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="hi-solid hi-arrows-pointing-in inline-block size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
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
      <div v-if="minimize" class="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">ค่าจ้าง</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">{{ numberFormat(salary) }}</p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">เบี้ยเลี้ยง และสวัสดิการ</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ numberFormat(allowance) }}
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">กองทุนสำรองเลี้ยงชีพ</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">{{ pvdRate || 0 }}%</p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ contributePVDRate || 0 }}%
          </p>
        </div>
        <div class="inline-flex items-center justify-between py-1">
          <h4 class="text-sm font-semibold">โบนัส</h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">{{ bonus }} เดือน</p>
        </div>
      </div>
      <div v-else class="space-y-6 dark:text-gray-100">
        <div class="space-y-1">
          <label for="salary" class="font-medium">ค่าจ้าง</label>
          <input
            v-model="salary"
            type="number"
            id="salary"
            name="salary"
            placeholder="ค่าจ้าง"
            class="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>

        <div class="space-y-1">
          <label for="allowance" class="font-medium">เบี้ยเลี้ยง และสวัสดิการ</label>
          <input
            v-model="allowance"
            type="number"
            id="allowance"
            name="allowance"
            placeholder="เบี้ยเลี้ยง และสวัสดิการ"
            class="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>

        <div class="space-y-1">
          <label for="contributePVDRate" class="font-medium">กองทุนสำรองเลี้ยงชีพ</label>
          <div class="relative">
            <input
              v-model="pvdRate"
              type="number"
              id="pvdRate"
              name="pvdRate"
              placeholder="กองทุนสำรองเลี้ยงชีพ"
              class="block w-full rounded-lg border border-gray-200 py-2 pl-3 pr-20 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 my-px mr-px flex w-16 items-center justify-center rounded-r-lg border-l border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-300"
            >
              %
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <label for="contributePVDRate" class="font-medium"
            >กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)</label
          >
          <div class="relative">
            <input
              v-model="contributePVDRate"
              type="number"
              id="contributePVDRate"
              name="contributePVDRate"
              placeholder="กองทุนสำรองเลี้ยงชีพ (นายจ้างสมทบ)"
              class="block w-full rounded-lg border border-gray-200 py-2 pl-3 pr-20 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 my-px mr-px flex w-16 items-center justify-center rounded-r-lg border-l border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-300"
            >
              %
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <label for="bonus" class="font-medium">โบนัส</label>
          <div class="relative">
            <input
              v-model="bonus"
              type="number"
              id="bonus"
              name="bonus"
              placeholder="โบนัส"
              class="block w-full rounded-lg border border-gray-200 py-2 pl-3 pr-20 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 my-px mr-px flex w-16 items-center justify-center rounded-r-lg border-l border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-300"
            >
              เดือน
            </div>
          </div>
        </div>
      </div>
    </div>

    <SalaryCalculation
      :salary="salary"
      :bonus="bonus"
      :pvdRate="pvdRate"
      :contributePVDRate="contributePVDRate"
      :allowance="allowance"
    />
  </div>
</template>

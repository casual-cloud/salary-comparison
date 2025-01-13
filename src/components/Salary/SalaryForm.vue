<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ subtitle?: string }>()

const companyInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['remove'])

const company = defineModel<string>('company', { type: String, default: '' })
const salary = defineModel<number>('salary', { type: Number, default: 0 })
const bonus = defineModel<number>('bonus', { type: Number, default: 0 })
const pvdRate = defineModel<number>('pvdRate', { type: Number, default: 0 })
const contributePVDRate = defineModel<number>('contributePVDRate', { type: Number, default: 0 })
const allowance = defineModel<number>('allowance', { type: Number, default: 0 })
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-sm dark:text-gray-100">
    <div class="flex items-center justify-between gap-2 bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
      <div>
        <h4 class="text-xs font-bold" v-if="subtitle?.length">{{ subtitle }}</h4>
        <div class="flex items-center">
          <input
            v-model="company"
            ref="companyInput"
            type="text"
            id="company"
            name="company"
            placeholder="กรอกชื่อบริษัท"
            class="block px-3 py-2 text-sm leading-5 bg-transparent border-b"
          />
        </div>
      </div>
      <div class="-my-4 inline-flex items-center gap-1">
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
      <div class="space-y-6 dark:text-gray-100">
        <div class="space-y-1">
          <label for="salary" class="font-medium">ค่าจ้าง (ต่อเดือน)</label>
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
  </div>
</template>

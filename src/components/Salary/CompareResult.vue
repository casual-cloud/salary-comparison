<script setup lang="ts">
import { currencyFormat } from '@/libs/format'

const currencyFmt = currencyFormat('THB')
const rateFmt = new Intl.NumberFormat('th-TH', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

defineProps<{
  amount: number
  rate: number
  invert?: boolean
}>()
</script>

<template>
  <div
    class="ml-2 inline-flex items-center justify-center gap-1"
    :class="{
      [!invert ? 'text-teal-500' : 'text-red-500']: rate > 0,
      [!invert ? 'text-red-500' : 'text-teal-500']: rate < 0,
    }"
  >
    {{ currencyFmt.format(amount) }}
    ({{ rateFmt.format(rate) }})
    <svg
      v-if="rate === 0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="hi-solid hi-minus inline-block size-6"
    >
      <path
        fill-rule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else-if="rate < 0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="hi-solid hi-arrow-trending-down inline-block size-6"
    >
      <path
        fill-rule="evenodd"
        d="M1.72 5.47a.75.75 0 0 1 1.06 0L9 11.69l3.756-3.756a.75.75 0 0 1 .985-.066 12.698 12.698 0 0 1 4.575 6.832l.308 1.149 2.277-3.943a.75.75 0 1 1 1.299.75l-3.182 5.51a.75.75 0 0 1-1.025.275l-5.511-3.181a.75.75 0 0 1 .75-1.3l3.943 2.277-.308-1.149a11.194 11.194 0 0 0-3.528-5.617l-3.809 3.81a.75.75 0 0 1-1.06 0L1.72 6.53a.75.75 0 0 1 0-1.061Z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="hi-solid hi-arrow-trending-up inline-block size-6"
    >
      <path
        fill-rule="evenodd"
        d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

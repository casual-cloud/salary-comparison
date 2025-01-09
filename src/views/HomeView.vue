<script setup lang="ts">
import { onMounted } from 'vue'
import SalaryForm from '@/components/SalaryForm.vue'
import { useSalaryStore } from '@/stores/salary'

const store = useSalaryStore()

const onRemoveSalary = (index: number) => {
  if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
    store.remove(index)
  }
}

onMounted(() => {
  if (store.salaries.length === 0) {
    store.add()
  }
})
</script>

<template>
  <main>
    <div
      class="grid grid-cols-1 gap-4 lg:gap-8"
      :class="[
        store.salaries.length > 2 ? 'md:grid-cols-3' : `md:grid-cols-${store.salaries.length + 1}`,
      ]"
    >
      <SalaryForm
        v-for="(item, index) in store.salaries"
        :key="index"
        v-model:company="item.company"
        v-model:salary.number="item.salary"
        v-model:bonus.number="item.bonus"
        v-model:pvdRate.number="item.pvdRate"
        v-model:contributePVDRate.number="item.contributePVDRate"
        v-model:allowance.number="item.allowance"
        @remove="onRemoveSalary(index)"
      />
      <div
        class="flex flex-col p-8 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100"
      >
        <button
          class="w-full h-full border-dashed border border-blue-200 rounded-lg flex items-center justify-center"
          @click="store.add"
        >
          + เพิ่ม
        </button>
      </div>
    </div>
  </main>
</template>

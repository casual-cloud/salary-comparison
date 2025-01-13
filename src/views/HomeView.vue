<script setup lang="ts">
import SalaryComponent from '@/components/Salary/SalaryComponent.vue'
import { useCompanyStore } from '@/stores/company'

const store = useCompanyStore()

const onRemoveSalary = (index: number) => {
  if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
    store.remove(index)
  }
}
</script>

<template>
  <main>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <SalaryComponent
        v-model="store.currentCompany"
        subtitle="บริษัทปัจจุบัน"
        remove-disabled
        compare-disabled
      />
      <template v-for="(item, index) in store.companies" :key="index">
        <SalaryComponent
          v-model="store.companies[index]"
          :subtitle="`บริษัทที่ ${index + 1}`"
          @remove="onRemoveSalary(index)"
        />
      </template>
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

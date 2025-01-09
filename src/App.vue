<script setup lang="ts">
import { RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg'
</script>

<template>
  <div
    id="page-container"
    class="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
  >
    <header
      id="page-header"
      class="z-1 flex flex-none items-center bg-white shadow-sm dark:bg-gray-800"
    >
      <div class="container mx-auto px-4 lg:px-8 xl:max-w-10xl">
        <div class="flex justify-between py-4">
          <div class="flex items-center">
            <a
              href="#"
              class="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
            >
              <Logo class="w-10 fill-[#01bffe] dark:fill-white" />
              <span>เปรียบเทียบเงินเดือน</span>
            </a>
          </div>
          <div class="flex items-center gap-2 lg:gap-5"></div>
        </div>
      </div>
    </header>
    <main id="page-content" class="flex max-w-full flex-auto flex-col">
      <div class="container mx-auto w-full max-w-10xl p-4 lg:p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

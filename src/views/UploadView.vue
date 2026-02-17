<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-12">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl font-bold text-text-primary">
          ANALYZE YOUR FILES AND CLASSIFY THEM
        </h1>
      
      </div>
      <div class="max-w-4xl mx-auto">
        <FileZone />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
import FileZone from '@/components/ui/FileZone.vue'

</script>

<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-14">
      <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
        <h2 class="font-serif text-h2 font-bold justify-center text-text-primary">
          Analyze your files and classify them
        </h2>
      
      </div>
      <div class="max-w-6xl mx-auto">
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

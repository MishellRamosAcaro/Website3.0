<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-12">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl font-bold text-text-primary">Upload files</h1>
        <button
          type="button"
          class="btn-secondary text-sm"
          aria-label="Sign out"
          @click="handleLogout"
        >
          Sign out
        </button>
      </div>
      <div class="max-w-2xl mx-auto">
        <FileUploadZone />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
import FileUploadZone from '@/components/ui/FileUploadZone.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

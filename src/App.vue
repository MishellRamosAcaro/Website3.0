<template>
  <div id="app-wrapper">
    <router-view v-if="!error" />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
const error = ref<string | null>(null)

onErrorCaptured((err) => {
  error.value = err instanceof Error ? err.message : 'Unknown error'
  console.error('Application error:', err)
  return false
})
</script>

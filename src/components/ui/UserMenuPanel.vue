<template>
  <div
    class="card-base min-w-[10rem] p-2"
    role="menu"
    aria-label="User menu"
    @keydown.esc="emit('close')"
  >
    <RouterLink
      to="/profile"
      role="menuitem"
      class="user-menu-item flex w-full items-center rounded-lg px-3 py-2 text-left text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
      @click="emit('close')"
    >
      Profile
    </RouterLink>
    <button
      type="button"
      role="menuitem"
      class="user-menu-item flex w-full items-center rounded-lg px-3 py-2 text-left text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
      @click="emit('sign-out')"
    >
      Sign out
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emit = defineEmits<{
  close: []
  'sign-out': []
}>()
</script>

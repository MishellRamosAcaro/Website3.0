<template>
  <section
    id="demo"
    class="section-padding"
    aria-labelledby="demo-heading"
  >
    <div class="container-content">
      <h2
        id="demo-heading"
        class="font-serif text-h2 font-bold text-text-primary"
      >
        View Our Agent
      </h2>
      <p class="mt-4 max-w-2xl text-body-lg text-text-secondary">
        See the Field Application Specialist AI Agent in action.
      </p>
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 400 }"
        class="mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-card border border-white/10 bg-bg-1"
      >
        <video
          class="h-full w-full object-cover"
          src="/fas-agent-demostration.mp4"
          controls
          playsinline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

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
        Demo
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
        <div
          class="flex h-full w-full items-center justify-center text-text-muted"
        >
          <div class="text-center">
            <i class="pi pi-video text-5xl" aria-hidden="true" />
            <p class="mt-4 text-body">Video placeholder — add your demo URL</p>
            <p class="mt-1 text-small">
              Use a &lt;video&gt; or embed (e.g. YouTube) when ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

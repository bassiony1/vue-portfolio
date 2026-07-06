<script setup lang="ts">
import { ref } from "vue"
import { AnimatePresence } from "motion-v"
import BubbleField from "./components/BubbleField.vue"
import DetailWindow from "./components/DetailWindow.vue"
import { profile, tourOrder } from "./data/portfolio"

const openId = ref<string | null>(null)
const tourIdx = ref(-1)

function startTour() {
  tourIdx.value = 0
  openId.value = tourOrder[0]
}
function tourNext() {
  if (tourIdx.value >= tourOrder.length - 1) return closeWindow()
  tourIdx.value++
  openId.value = tourOrder[tourIdx.value]
}
function tourPrev() {
  if (tourIdx.value <= 0) return
  tourIdx.value--
  openId.value = tourOrder[tourIdx.value]
}
function closeWindow() {
  tourIdx.value = -1
  openId.value = null
}
function openNode(id: string) {
  tourIdx.value = -1
  openId.value = id
}

const dark = ref(document.documentElement.classList.contains("dark"))
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle("dark", dark.value)
  localStorage.theme = dark.value ? "dark" : "light"
}
</script>

<template>
  <main class="relative h-full w-full">
    <BubbleField @open="openNode" />

    <header
      class="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start flex-wrap gap-4 justify-between p-5 md:p-7"
    >
      <div>
        <h1 class="text-2xl font-black tracking-tight text-slate-800 md:text-3xl dark:text-white">
          {{ profile.name }}
        </h1>
        <p class="text-sm font-semibold text-cyan-700 md:text-base dark:text-cyan-300">
          {{ profile.title }}
        </p>
      </div>

      <div class="pointer-events-auto flex items-center gap-2">
        <button class="chip-btn chip-btn-accent" @click="startTour">▶ Recruiter tour</button>
        <a :href="profile.links.github" target="_blank" rel="noopener" class="chip-btn">GitHub</a>
        <a :href="profile.links.linkedin" target="_blank" rel="noopener" class="chip-btn">
          LinkedIn
        </a>
        <button
          class="chip-btn"
          :aria-label="dark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          {{ dark ? "☀" : "☾" }}
        </button>
      </div>
    </header>

    <p
      class="pointer-events-none absolute inset-x-0 bottom-5 z-40 text-center text-xs font-medium tracking-wide text-slate-500 dark:text-white/50"
    >
      hover a bubble to catch it · click to dive in
    </p>

    <AnimatePresence mode="wait">
      <DetailWindow
        v-if="openId"
        :key="openId"
        :node-id="openId"
        :tour-idx="tourIdx"
        :tour-len="tourOrder.length"
        @close="closeWindow"
        @open="openNode"
        @next="tourNext"
        @prev="tourPrev"
      />
    </AnimatePresence>
  </main>
</template>

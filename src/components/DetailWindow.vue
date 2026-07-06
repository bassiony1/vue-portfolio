<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue"
import { motion } from "motion-v"
import { ACCENT_HEX } from "../composables/useBubbleField"
import {
  nodeById,
  profile,
  attributes,
  summaryText,
  type ChildNode,
} from "../data/portfolio"

const props = withDefaults(
  defineProps<{ nodeId: string; tourIdx?: number; tourLen?: number }>(),
  { tourIdx: -1, tourLen: 0 },
)
const emit = defineEmits<{ close: []; open: [id: string]; next: []; prev: [] }>()
const touring = computed(() => props.tourIdx >= 0)

const node = computed(() => nodeById[props.nodeId])
const category = computed(() => nodeById[props.nodeId.split(".")[0]!])
const isChild = computed(() => props.nodeId.includes("."))
const accent = computed(() => {
  const c = category.value
  return c && "accent" in c ? ACCENT_HEX[c.accent] : "#22d3ee"
})

const WINDOW_TITLES: Record<string, string> = {
  summary: "Professional Summary",
  skills: "Technical Arsenal",
  projects: "Technical Projects",
  education: "Education",
  history: "History & Training",
  contact: "Get in Touch",
}

const title = computed(() =>
  isChild.value
    ? `${category.value?.label} · ${node.value?.label}`
    : (WINDOW_TITLES[props.nodeId] ?? ""),
)

// each section renders when its list is non-empty; a child window
// just narrows the list down to itself
function groupsOf(catId: string): ChildNode[] {
  const cat = nodeById[catId]
  if (props.nodeId === catId && cat && "children" in cat) return cat.children ?? []
  if (isChild.value && category.value?.id === catId) return [node.value as ChildNode]
  return []
}
const skillGroups = computed(() =>
  groupsOf("skills").map((g) => ({ id: g.id, label: g.label, tags: g.tags ?? [] })),
)
const projectGroups = computed(() =>
  groupsOf("projects").map((g) => ({ id: g.id, label: g.label, items: g.items ?? [] })),
)
const eduEntries = computed(() =>
  groupsOf("education").map((g) => ({ id: g.id, ...g.entry! })),
)
const historyEntries = computed(() =>
  groupsOf("history").map((g) => ({ id: g.id, ...g.entry!, points: g.entry?.points ?? [] })),
)

const related = computed(() =>
  (node.value?.related ?? []).map((id) => ({ id, label: relLabel(id) })),
)
function relLabel(id: string): string {
  const catId = id.split(".")[0]!
  return `${nodeById[catId]?.label} · ${nodeById[id]?.label}`
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") emit("close")
  if (touring.value && e.key === "ArrowRight") emit("next")
  if (touring.value && e.key === "ArrowLeft") emit("prev")
}
onMounted(() => window.addEventListener("keydown", onKey))
onBeforeUnmount(() => window.removeEventListener("keydown", onKey))
</script>

<template>
  <motion.div
    class="fixed inset-0 z-50 grid place-items-center bg-sky-900/20 p-4 backdrop-blur-sm md:p-8 dark:bg-black/50"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    @click.self="emit('close')"
  >
    <motion.div
      class="window flex max-h-[85vh] w-full max-w-3xl flex-col"
      :style="{ '--a': accent }"
      :initial="{ scale: 0.88, y: 36, opacity: 0 }"
      :animate="{ scale: 1, y: 0, opacity: 1 }"
      :exit="{ scale: 0.92, y: 24, opacity: 0 }"
      :transition="{ type: 'spring', stiffness: 260, damping: 26 }"
    >
      <div class="flex items-center justify-between px-6 pt-5 pb-3 md:px-8">
        <h2 class="text-xl font-black tracking-tight md:text-2xl" :style="{ color: accent }">
          {{ title }}
        </h2>
        <button class="chip-btn" aria-label="Close" @click="emit('close')">✕</button>
      </div>

      <div class="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 pb-6 md:px-8">
        <!-- summary -->
        <template v-if="nodeId === 'summary'">
          <div class="space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            <p v-for="(p, i) in summaryText" :key="i">{{ p }}</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="a in attributes" :key="a.title" class="glass-card">
              <h4 class="mb-1 font-bold text-slate-800 dark:text-white">{{ a.title }}</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ a.desc }}</p>
            </div>
          </div>
        </template>

        <!-- skills -->
        <section v-for="g in skillGroups" :key="g.id">
          <h3 class="section-h">{{ g.label }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in g.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </section>

        <!-- projects -->
        <section v-for="g in projectGroups" :key="g.id">
          <h3 class="section-h">{{ g.label }} · {{ g.items.length }}</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <a
              v-for="p in g.items"
              :key="p.title"
              :href="p.link"
              target="_blank"
              rel="noopener"
              class="glass-card group block"
            >
              <div class="mb-1 flex items-start justify-between gap-2">
                <h4 class="font-bold text-slate-800 dark:text-white">{{ p.title }}</h4>
                <span
                  class="text-xs opacity-40 transition-opacity group-hover:opacity-100"
                  :style="{ color: accent }"
                  >↗</span
                >
              </div>
              <p class="mb-3 text-sm text-slate-500 dark:text-slate-400">{{ p.desc }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="t in p.tech" :key="t" class="tag tag-sm">{{ t }}</span>
              </div>
            </a>
          </div>
        </section>

        <!-- education -->
        <section
          v-if="eduEntries.length"
          class="space-y-8 border-l-2 pl-6"
          :style="{ borderColor: accent + '55' }"
        >
          <div v-for="e in eduEntries" :key="e.id" class="relative">
            <span
              class="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full"
              :style="{ background: accent }"
            ></span>
            <span class="text-xs font-bold tracking-wide uppercase" :style="{ color: accent }">
              {{ e.period }}
            </span>
            <h4 class="text-lg font-bold text-slate-800 dark:text-white">{{ e.title }}</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ e.field }} — {{ e.place }}
            </p>
            <span class="tag tag-sm mt-2 inline-block">{{ e.grade }}</span>
          </div>
        </section>

        <!-- history -->
        <section v-for="h in historyEntries" :key="h.id">
          <div class="mb-1 flex items-baseline justify-between gap-3">
            <h3 class="section-h mb-0">{{ h.title }}</h3>
            <span class="shrink-0 font-mono text-xs" :style="{ color: accent }">
              {{ h.period }}
            </span>
          </div>
          <ul class="list-disc space-y-1 pl-5 text-sm text-slate-500 dark:text-slate-400">
            <li v-for="pt in h.points" :key="pt">{{ pt }}</li>
          </ul>
        </section>

        <!-- contact -->
        <template v-if="nodeId === 'contact'">
          <div class="space-y-3 text-slate-600 dark:text-slate-300">
            <p class="text-lg">
              📍 <span class="ml-1">{{ profile.location }}</span>
            </p>
            <p class="text-lg">
              📞 <span class="ml-1">{{ profile.phone }}</span>
            </p>
            <a
              :href="`mailto:${profile.email}`"
              class="block text-lg font-bold hover:underline"
              :style="{ color: accent }"
              >✉ {{ profile.email }}</a
            >
          </div>
          <div class="flex gap-3">
            <a :href="profile.links.github" target="_blank" rel="noopener" class="chip-btn">
              GitHub
            </a>
            <a :href="profile.links.linkedin" target="_blank" rel="noopener" class="chip-btn">
              LinkedIn
            </a>
          </div>
        </template>

        <!-- cross-links -->
        <div v-if="related.length" class="border-t border-slate-200/60 pt-4 dark:border-white/10">
          <p
            class="mb-2 text-xs font-bold tracking-wide text-slate-400 uppercase dark:text-slate-500"
          >
            Related
          </p>
          <div class="flex flex-wrap gap-2">
            <button v-for="r in related" :key="r.id" class="chip-btn" @click="emit('open', r.id)">
              {{ r.label }} →
            </button>
          </div>
        </div>
      </div>

      <!-- tour controls -->
      <div
        v-if="touring"
        class="flex items-center justify-between border-t border-slate-200/60 px-6 py-3 md:px-8 dark:border-white/10"
      >
        <button
          class="chip-btn"
          :disabled="tourIdx === 0"
          :class="{ 'opacity-40': tourIdx === 0 }"
          @click="emit('prev')"
        >
          ← Prev
        </button>
        <div class="flex gap-1.5">
          <span
            v-for="i in tourLen"
            :key="i"
            class="h-1.5 w-1.5 rounded-full transition-colors"
            :style="{ background: i - 1 === tourIdx ? accent : 'currentColor' }"
            :class="i - 1 === tourIdx ? '' : 'opacity-25'"
          ></span>
        </div>
        <button class="chip-btn chip-btn-accent" @click="emit('next')">
          {{ tourIdx === tourLen - 1 ? "Finish ✓" : "Next →" }}
        </button>
      </div>
    </motion.div>
  </motion.div>
</template>

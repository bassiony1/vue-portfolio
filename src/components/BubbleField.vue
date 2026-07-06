<script setup>
import { ref } from "vue"
import { AnimatePresence } from "motion-v"
import Bubble from "./Bubble.vue"
import { useBubbleField, ACCENT_HEX } from "../composables/useBubbleField"

const emit = defineEmits(["open"])
const box = ref(null)
const { nodes, toggleBurst, setHover, tethers } = useBubbleField(box)

function activate(node) {
  if (node.kind === "category" && node.hasChildren) toggleBurst(node.id)
  else emit("open", node.id)
}

// gentle sag in the middle so lines hang like they're underwater
function tetherPath(l) {
  const sag = Math.hypot(l.to.x - l.from.x, l.to.y - l.from.y) * 0.12
  const mx = (l.from.x + l.to.x) / 2
  const my = (l.from.y + l.to.y) / 2 + sag
  return `M ${l.from.x} ${l.from.y} Q ${mx} ${my} ${l.to.x} ${l.to.y}`
}
</script>

<template>
  <div ref="box" class="absolute inset-0 overflow-hidden">
    <svg class="pointer-events-none absolute inset-0 h-full w-full">
      <path
        v-for="l in tethers"
        :key="l.id"
        :d="tetherPath(l)"
        class="tether"
        :class="{ 'tether-related': l.related }"
        :stroke="ACCENT_HEX[l.from.accent]"
      />
    </svg>
    <AnimatePresence>
      <Bubble
        v-for="n in nodes"
        :key="n.id"
        :node="n"
        @hover="setHover(n, true)"
        @unhover="setHover(n, false)"
        @activate="activate"
      />
    </AnimatePresence>
  </div>
</template>

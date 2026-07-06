<script setup>
import { motion } from "motion-v"
import { ACCENT_HEX } from "../composables/useBubbleField"

const props = defineProps({ node: { type: Object, required: true } })
const emit = defineEmits(["hover", "unhover", "activate"])
</script>

<template>
  <div
    class="absolute top-0 left-0 will-change-transform"
    :style="{
      transform: `translate3d(${node.x - node.r}px, ${node.y - node.r}px, 0)`,
    }"
  >
    <motion.div
      class="bubble grid cursor-pointer place-items-center text-center select-none"
      :style="{
        '--a': ACCENT_HEX[node.accent],
        width: node.r * 2 + 'px',
        height: node.r * 2 + 'px',
      }"
      :initial="{ scale: 0, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :exit="{ scale: 0, opacity: 0 }"
      :transition="{ type: 'spring', stiffness: 190, damping: 19 }"
      @pointerenter="emit('hover', node)"
      @pointerleave="emit('unhover', node)"
      @click="emit('activate', node)"
    >
      <div class="pointer-events-none px-2">
        <div
          class="font-bold tracking-wide text-slate-700 dark:text-white"
          :class="node.kind === 'category' ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'"
        >
          {{ node.label }}
          <span v-if="node.count" class="ml-0.5 opacity-60">· {{ node.count }}</span>
        </div>
        <div
          v-if="node.blurb"
          class="bubble-blurb text-[10px] font-medium text-slate-500 dark:text-white/60"
          :class="{ 'is-visible': node.hovered }"
        >
          {{ node.blurb }}
        </div>
      </div>
    </motion.div>
  </div>
</template>

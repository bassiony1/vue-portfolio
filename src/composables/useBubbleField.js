import { reactive, computed, onMounted, onBeforeUnmount } from "vue"
import { categories, nodeById } from "../data/portfolio"

export const ACCENT_HEX = {
  cyan: "#22d3ee",
  rose: "#fb7185",
  emerald: "#34d399",
  blue: "#60a5fa",
  indigo: "#818cf8",
  amber: "#fbbf24",
}

const CRUISE = 22 // px/s drift speed
const WOBBLE = 26 // px/s² sinusoidal push, gives the watery wandering
const GAP = 14 // min space between bubble edges

// ponytail: hand-rolled rAF physics — ~20 bubbles max, O(n²) collisions are fine.
// Swap for matter.js only if the scene ever grows into hundreds of bodies.
export function useBubbleField(containerRef) {
  const nodes = reactive([])
  const burstIds = reactive(new Set())
  let W = 0
  let H = 0
  let raf = 0
  let last = 0
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
  const cruise = reduced ? 0 : CRUISE

  const byId = (id) => nodes.find((n) => n.id === id)
  const baseRadius = () => Math.min(Math.max(Math.min(W, H) * 0.085, 42), 82)

  function init() {
    const base = baseRadius()
    for (const cat of categories) {
      const r = base * cat.size
      let x = W / 2
      let y = H / 2
      for (let tries = 0; tries < 80; tries++) {
        x = r + 24 + Math.random() * Math.max(1, W - 2 * (r + 24))
        y = r + 24 + Math.random() * Math.max(1, H - 2 * (r + 24))
        if (!nodes.some((n) => Math.hypot(n.x - x, n.y - y) < n.r + r + 40)) break
      }
      const a = Math.random() * Math.PI * 2
      nodes.push({
        id: cat.id,
        label: cat.label,
        blurb: cat.blurb,
        kind: "category",
        parentId: null,
        accent: cat.accent,
        size: cat.size,
        baseR: r,
        r,
        x,
        y,
        vx: Math.cos(a) * cruise,
        vy: Math.sin(a) * cruise,
        phase: Math.random() * Math.PI * 2,
        hovered: false,
        hasChildren: !!cat.children,
      })
    }
  }

  function measure() {
    const el = containerRef.value
    if (!el) return
    W = el.clientWidth
    H = el.clientHeight
    const base = baseRadius()
    for (const n of nodes) {
      n.baseR = n.kind === "category" ? base * n.size : base * 0.62
      n.r = n.kind === "category" && burstIds.has(n.id) ? n.baseR * 0.55 : n.baseR
      n.x = Math.min(Math.max(n.x, n.r), W - n.r)
      n.y = Math.min(Math.max(n.y, n.r), H - n.r)
    }
  }

  function step(t) {
    const dt = Math.min((t - last) / 1000, 0.05)
    last = t
    const time = t / 1000

    for (const n of nodes) {
      if (n.hovered) {
        // caught: glide to a stop
        n.vx *= 0.8
        n.vy *= 0.8
        continue
      }
      if (!reduced) {
        n.vx += Math.cos(time * 0.55 + n.phase) * WOBBLE * dt
        n.vy += Math.sin(time * 0.62 + n.phase * 1.7) * WOBBLE * dt
      }

      if (n.parentId) {
        // child orbits its parent on a soft spring
        const p = byId(n.parentId)
        if (p) {
          const dx = n.x - p.x
          const dy = n.y - p.y
          const d = Math.hypot(dx, dy) || 1
          const want = p.r + n.r + 46
          const f = (want - d) * 2.4
          n.vx += (dx / d) * f * dt
          n.vy += (dy / d) * f * dt
        }
        const damp = Math.max(0, 1 - 1.1 * dt)
        n.vx *= damp
        n.vy *= damp
      } else {
        // free bubble: ease speed back toward cruise
        const sp = Math.hypot(n.vx, n.vy)
        if (reduced) {
          // prefers-reduced-motion: stay put
        } else if (sp < 0.001) {
          const a = Math.random() * Math.PI * 2
          n.vx = Math.cos(a) * Math.max(cruise, 1)
          n.vy = Math.sin(a) * Math.max(cruise, 1)
        } else {
          const k = 1 + ((cruise - sp) / sp) * Math.min(1, dt * 1.2)
          n.vx *= k
          n.vy *= k
        }
      }
      n.x += n.vx * dt
      n.y += n.vy * dt
    }

    // soft push-apart
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const d = Math.hypot(dx, dy) || 1
        const min = a.r + b.r + GAP
        if (d < min) {
          const push = (min - d) / 2
          const ux = dx / d
          const uy = dy / d
          if (!a.hovered) {
            a.x -= ux * push
            a.y -= uy * push
            a.vx -= ux * 30 * dt
            a.vy -= uy * 30 * dt
          }
          if (!b.hovered) {
            b.x += ux * push
            b.y += uy * push
            b.vx += ux * 30 * dt
            b.vy += uy * 30 * dt
          }
        }
      }
    }

    // walls
    for (const n of nodes) {
      if (n.x < n.r) {
        n.x = n.r
        n.vx = Math.abs(n.vx)
      } else if (n.x > W - n.r) {
        n.x = W - n.r
        n.vx = -Math.abs(n.vx)
      }
      if (n.y < n.r) {
        n.y = n.r
        n.vy = Math.abs(n.vy)
      } else if (n.y > H - n.r) {
        n.y = H - n.r
        n.vy = -Math.abs(n.vy)
      }
    }

    raf = requestAnimationFrame(step)
  }

  function toggleBurst(catId) {
    const parent = byId(catId)
    const cat = nodeById[catId]
    if (!parent || !cat?.children) return
    if (burstIds.has(catId)) {
      burstIds.delete(catId)
      parent.r = parent.baseR
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].parentId === catId) nodes.splice(i, 1)
      }
      return
    }
    burstIds.add(catId)
    parent.r = parent.baseR * 0.55
    const childR = baseRadius() * 0.62
    cat.children.forEach((ch, i) => {
      const a = (i / cat.children.length) * Math.PI * 2 + Math.random() * 0.6
      nodes.push({
        id: ch.id,
        label: ch.label,
        blurb: "click for details",
        kind: "child",
        parentId: catId,
        accent: cat.accent,
        baseR: childR,
        r: childR,
        x: parent.x + Math.cos(a) * 8,
        y: parent.y + Math.sin(a) * 8,
        vx: Math.cos(a) * 110,
        vy: Math.sin(a) * 110,
        phase: Math.random() * Math.PI * 2,
        hovered: false,
        count: ch.count,
      })
    })
  }

  function setHover(node, val) {
    node.hovered = val
  }

  // tether lines: every child ties to its parent; the hovered bubble also
  // reaches out to its related nodes (or their category bubble if not burst)
  const tethers = computed(() => {
    const lines = []
    for (const n of nodes) {
      if (!n.parentId) continue
      const p = byId(n.parentId)
      if (p) lines.push({ id: `${n.id}~parent`, from: p, to: n, related: false })
    }
    const hv = nodes.find((n) => n.hovered)
    if (hv) {
      for (const rid of nodeById[hv.id]?.related ?? []) {
        const target = byId(rid) ?? byId(rid.split(".")[0])
        if (target) lines.push({ id: `${hv.id}~${rid}`, from: hv, to: target, related: true })
      }
    }
    return lines
  })

  onMounted(() => {
    const el = containerRef.value
    W = el.clientWidth
    H = el.clientHeight
    init()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    last = performance.now()
    raf = requestAnimationFrame(step)
    onBeforeUnmount(() => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    })
  })

  return { nodes, burstIds, toggleBurst, setHover, tethers }
}

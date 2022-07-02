<template>
  <div>
    <start />
    <div class="relative rounded-lg shadow-sm w-full">
      <!-- <slot name="start"></slot> -->
      <start />
      <input
        type="text"
        placeholder="Search"
        class="font-sans block text-sm w-full pl-10 py-2 px-3 ring-1 ring-gray-900/10 text-gray-500 rounded-lg dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
      <end />
    </div>
  </div>
</template>
<script setup lang="tsx">
interface IProps {
  start?: HTMLElement
  end?: HTMLElement
}
const props = defineProps<IProps>()

const slots = useSlots()

// TSX渲染语法
const start = () => {
  return <div>{slots.start?.()}</div>
}

const end = () => {
  return <div>{slots.end?.()}</div>
}
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" :width="width" :height="height">
    <!-- Abstract swirl resembling ChatGPT style -->
    <g transform="translate(100,100)">
      <path d="M0,-80 A80,80 0 1,1 -56.57,56.57 L-40,40 A60,60 0 1,0 0,-60 Z" fill="#A9A9A9" />
      <path d="M0,-80 A80,80 0 0,1 56.57,56.57 L40,40 A60,60 0 0,0 0,-60 Z" fill="#808080" />
    </g>

    <!-- Pig face -->
    <circle cx="100" cy="100" r="50" fill="#FFC0CB" />
    <circle cx="80" cy="90" r="8" fill="#000" />
    <circle cx="120" cy="90" r="8" fill="#000" />
    <ellipse cx="100" cy="115" rx="20" ry="10" fill="#F28B82" />
    <circle cx="92" cy="115" r="3" fill="#000" />
    <circle cx="108" cy="115" r="3" fill="#000" />

    <!-- Pig ears -->
    <polygon points="70,60 80,40 90,60" fill="#FFC0CB" />
    <polygon points="110,60 120,40 130,60" fill="#FFC0CB" />
  </svg>
</template>

<script setup lang="ts" name="PigGpt">
defineProps<{
  name: string
  width: string
  height: string
  color?: string
}>()
</script>

<style scoped></style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        App
        <RouterLink to="/">Chat</RouterLink>
        <el-button type="primary">Primary</el-button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
.color-red {
  color: red;
}
</style>

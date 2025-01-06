<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<!-- <template>

  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header><RouterLink to="/">Chat</RouterLink></el-header>
        <el-main>
          <RouterView />
           <el-button type="primary">Primary</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template> -->

<template>
  <el-container class="common-layout">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header><RouterLink to="/">Chat</RouterLink></el-header>
      <el-main><RouterView /> </el-main>
    </el-container>
  </el-container>
</template>

<style>
.common-layout {
  height: 100%;
}
.el-container {
  background-color: blue;
}
.el-header {
  height: 3rem;
  background-color: red;
}
.el-main {
  background-color: green;
}
.el-aside {
  background-color: blue;
}
.el-button {
  display: block;
}
@media (max-width: 576px) {
  .el-aside {
    display: none;
  }
}
/*

@media (min-width: 1024px) {
  .el-aside {
    display: block;
  }
} */
</style>

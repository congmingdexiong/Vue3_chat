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
      <el-header>
        <!-- <RouterLink to="/">PigChat</RouterLink> -->
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item>
            <el-icon><icon-menu /></el-icon>
            <span>PigGpt</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main><RouterView /> </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="App">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.common-layout {
  height: 100%;
}
.el-container {
  /* background-color: blue; */
}
.el-header {
  height: 3rem;
  /* background-color: red; */
}
.el-main {
  /* background-color: green; */
}
.el-aside {
  /* background-color: blue; */
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

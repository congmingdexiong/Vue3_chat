<template>
  <el-container class="common-layout" v-loading.fullscreen.lock="loader">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <!-- <RouterLink to="/">PigChat</RouterLink> -->
        <div class="config-setting">
          <Operation style="width: 1.5rem; height: 1.5rem; margin-right: 8px" />
        </div>
        <div>
          PigGpt <el-icon><ArrowDown /></el-icon>
        </div>
        <div class="edit-setting">
          <Edit style="width: 1.5rem; height: 1.5rem; margin-right: 8px" />
        </div>
      </el-header>
      <el-main><RouterView /> </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="App">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { provide, ref, watch } from 'vue';
const route = useRoute(); // 获取当前路由信息
const currentPath = ref(route.path); // 存储当前路径的响应式引用

const loader = ref(false);
const setLoadingState = (loading: boolean) => {
  loader.value = loading;
};
provide('appLoading', { loader, setLoadingState });
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// 使用watch监听路由变化
watch(
  () => route.path,
  (oldPath, newPath) => {
    console.log(`route from ${oldPath} to ${newPath}`);
  }
);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  .config-setting {
    display: none;
  }

  .edit-setting {
    display: none;
  }

  /* background-color: red; */
}
.el-main {
  padding-top: 0;
  /* background-color: green; */
}
.el-aside {
  /* background-color: blue; */
}
.el-button {
  display: block;
}
@media (max-width: 480px) {
  .el-aside {
    display: none;
  }

  .el-header {
    .config-setting {
      display: block;
    }

    .edit-setting {
      display: block;
    }
  }
}
/*

@media (min-width: 1024px) {
  .el-aside {
    display: block;
  }
} */
</style>

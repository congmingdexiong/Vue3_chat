<template>
  <div class="chat-wrapper">
    <div class="chat-content">chat content</div>
    <div class="chat-input-area">
      <el-button type="primary">Primary</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatView"></script>

<style scoped lang="scss">
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: yellow;
  .chat-content {
    background-color: red;
    height: 80%;
  }

  .chat-input-area {
    background-color: orange;
    height: 20%;
  }
}
</style>

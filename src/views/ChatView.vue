<template>
  <div class="chat-wrapper">
    <div class="chat-content">
      <div class="chat-content-middle">
        <div class="article article-my-query">
          <article>123</article>
        </div>
        <div class="article article-bot-answer">
          <div class="avatar_bot">
            <PigIcon width="100%" height="100%" />
          </div>
          <article>你好！ 有什么需要帮忙的吗？😊</article>
        </div>
        <div class="article article-my-query">
          <article>123</article>
        </div>
        <div class="article article-bot-answer">
          <div class="avatar_bot">
            <PigIcon width="100%" height="100%" />
          </div>
          <article>你好！ 有什么需要帮忙的吗？😊</article>
        </div>
      </div>
    </div>
    <div class="chat-translator">translator ongoing</div>
    <div class="chat-input-area">
      Message PigGPT
      <!-- <el-button type="primary">Primary</el-button> -->
      <!-- <p data-placeholder="Message ChatGPT" class="placeholder">
          <br class="ProseMirror-trailingBreak" />
        </p> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatView"></script>

<style scoped lang="scss">
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .chat-content {
    // background-color: red;
    height: 90%;
    .chat-content-middle {
      width: 60%;
      height: 100%;
      margin: 0 auto;
      // border: 1px solid orange;
      > .article {
        // border: 1px solid red;
        display: flex;
        width: 100%;
        align-items: center;

        .avatar_bot {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgb(227, 227, 227);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }

        &.article-my-query {
          justify-content: end;
          > article {
            background-color: hsla(0, 4%, 79%, 0.5);
          }
        }
        &.article-bot-answer {
          justify-content: start;
          margin-bottom: 1rem;
        }
        article {
          border-radius: 1.5rem;
          padding-bottom: 0.625rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-top: 0.625rem;
          display: inline-block;
        }
      }
    }
  }

  .chat-translator {
    display: flex;
    justify-content: end;
    height: 3rem;
  }

  .chat-input-area {
    background-color: rgb(244, 244, 244);
    border-bottom-color: rgb(227, 227, 227);
    height: 10%;
    border-radius: 1.5rem;
    color: rgb(13, 13, 13);
  }
  .chat-input-area:first-child {
    border-bottom-color: rgb(227, 227, 227);
    border-left-color: rgb(227, 227, 227);
    border-right-color: rgb(227, 227, 227);
    border-top-color: rgb(227, 227, 227);
    color-scheme: light;
    font-family:
      ui-sans-serif,
      -apple-system,
      system-ui,
      'Segoe UI',
      Helvetica,
      'Apple Color Emoji',
      Arial,
      sans-serif,
      'Segoe UI Emoji',
      'Segoe UI Symbol';
    scrollbar-color: rgb(236, 236, 236) rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
</style>

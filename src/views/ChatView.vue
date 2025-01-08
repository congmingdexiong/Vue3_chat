<template>
  <div class="chat-wrapper">
    <div class="chat-content">
      <div class="chat-content-middle">
        <div class="article article-my-query">
          <article>Hi</article>
        </div>
        <div class="article article-bot-answer">
          <div class="avatar_bot">
            <PigIcon width="2rem" height="2rem" />
          </div>
          <article>你好！ 有什么需要帮忙的吗？😊</article>
        </div>
        <div class="article article-my-query">
          <article>谁是最好的熊</article>
        </div>
        <div class="article article-bot-answer">
          <div class="avatar_bot">
            <PigIcon width="2rem" height="2rem" />
          </div>
          <article>
            The best bear depends on the context! Here are a few contenders for "best bear":
            <ul>
              <li>Winnie the Pooh: The beloved, honey-loving bear from A. A. Milne's stories.</li>
              <li>Paddington Bear: A polite bear from Peru who loves marmalade sandwiches.</li>
              <li>Baloo: The laid-back, fun-loving bear from The Jungle Book.</li>
              <li>The Care Bears: A group of colorful, caring bears from the 80s.</li>
              <li>Grizzly Bears: Majestic, wild, and powerful animals in nature.</li>
              <li>Bear Grylls: Not an actual bear, but people love this survival</li>
            </ul>
          </article>
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
    overflow-y: scroll;

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
        line-height: 1.75;
        align-items: flex-start;

        ul {
          li {
            margin: 0.5rem;
          }
        }

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

  .chat-content::-webkit-scrollbar {
    display: none;
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

  /* 在小屏幕上调整文本大小 */
  @media screen and (max-width: 768px) {
  }

  /* 在非常小的屏幕上进一步调整文本大小 */
  @media screen and (max-width: 480px) {
    .chat-content {
      height: 99%;
      .chat-content-middle {
        width: 100%;
        > .article {
          line-height: 1.75;
        }
      }
    }
    .chat-translator {
      display: none;
    }
  }
}
</style>

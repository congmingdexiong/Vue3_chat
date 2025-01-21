<template>
  <div v-if="item.type === 'user'" class="article article-my-query">
    <article>
      {{ item.content }}
    </article>
     <div class="avatar_bot" style="margin-left:0.5rem;">
      <img style="width: 2rem; height: 2rem;border-radius: 50%;" :src="userInformation.headimgurl"> </img>
    </div>
  </div>
  <div v-if="item.type === 'chat'" class="article article-bot-answer">
    <div class="avatar_bot">
      <PigIcon width="2rem" height="2rem" />
    </div>
    <article>
      {{ item.content }}
    </article>
  </div>
</template>

<script setup lang="ts" name="Article">
const { item, userInformation } = defineProps(['item', 'userInformation'])
</script>

<style scoped lang="scss">
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

.article-my-query {
  > article {
    background-color: hsla(0, 4%, 79%, 0.5);
  }
}

.article {
  display: flex;
  width: 100%;
  align-items: center;
  line-height: 1.75;
  align-items: flex-start;

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
}

article {
  border-radius: 1.5rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.625rem;
  display: inline-block;
}
</style>

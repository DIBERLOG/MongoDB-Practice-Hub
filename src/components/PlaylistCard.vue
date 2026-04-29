<template>
  <article class="card">
    <span class="badge">{{ playlist.author }}</span>
    <h3>{{ playlist.title }}</h3>
    <p class="muted">Коллекция роликов одного автора.</p>
    <button class="ghost-button" @click="$emit('open', playlist)">Открыть плейлист</button>
  </article>
</template>

<script>
export default {
  emits: ['open'],
  props: {
    playlist: {
      type: Object,
      required: true
    }
  }
};
</script>

<template>
  <article class="card">
    <img :src="previewUrl" :alt="video.title" class="preview-image" />
    <h3 class="card-title-link" @click="$emit('to-video', video._id)">
      {{ video.title }}
    </h3>
    <div class="inline-meta">
      <a class="card-title-link" @click="$emit('to-blogger', video.author)">{{ video.author }}</a>
      <span>{{ video.likes }} likes</span>
      <span v-if="video.playlist" class="badge">{{ video.playlist }}</span>
    </div>
  </article>
</template>

<script>
export default {
  emits: ['to-video', 'to-blogger'],
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  computed: {
    previewUrl() {
      if (!this.video.preview) return '';
      return this.video.preview.startsWith('http') ? this.video.preview : `/${this.video.preview}`;
    }
  }
};
</script>

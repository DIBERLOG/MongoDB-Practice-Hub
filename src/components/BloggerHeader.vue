<template>
  <section class="hero">
    <div class="grid-2">
      <div>
        <img :src="avatarUrl" :alt="blogger.username" class="preview-image" style="max-height:260px;" />
      </div>
      <div>
        <span class="badge">Блогер</span>
        <h2>{{ blogger.username }}</h2>
        <p>Подписчиков: {{ blogger.followers }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    blogger: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatarUrl() {
      if (!this.blogger.avatar) return '';
      return this.blogger.avatar.startsWith('http') ? this.blogger.avatar : `/${this.blogger.avatar}`;
    }
  }
};
</script>

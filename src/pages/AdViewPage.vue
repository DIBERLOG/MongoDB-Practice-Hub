<template>
  <section class="hero" v-if="ad">
    <span class="badge">{{ ad.category }}</span>
    <h2>{{ ad.title }}</h2>
    <img :src="ad.image" :alt="ad.title" class="preview-image" style="max-height:380px;" />
    <p style="margin-top: 16px;">{{ ad.description }}</p>
    <div class="inline-meta">
      <strong>{{ ad.price }} ₽</strong>
      <span v-if="ad.asNew" class="status-success">Как новенький</span>
      <span v-if="ad.createdAt">{{ new Date(ad.createdAt).toLocaleString('ru-RU') }}</span>
    </div>
  </section>
  <section class="card" v-else>
    <p>{{ status }}</p>
  </section>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      ad: null,
      status: 'Загрузка...'
    };
  },
  async mounted() {
    try {
      let response = await api.get('/ad', { params: { id: this.$route.query.id } });
      this.ad = response.data;
    } catch (error) {
      this.status = error.response?.data?.error || 'Объявление не найдено.';
    }
  }
};
</script>

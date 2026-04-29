<template>
  <section v-if="video" class="grid-2">
    <article class="hero">
      <h2>{{ video.title }}</h2>
      <div class="inline-meta">
        <a class="card-title-link" @click="toBlogger(video.author)">by {{ video.author }}</a>
        <span>{{ video.likes }} likes</span>
        <span v-if="video.playlist" class="badge">{{ video.playlist }}</span>
      </div>
      <div v-if="video.youtube" v-html="video.youtube" style="margin-top:18px;"></div>
      <img v-else :src="previewUrl(video.preview)" :alt="video.title" class="preview-image" style="margin-top:18px;" />
    </article>

    <article class="card">
      <h3>Другие видео этого автора</h3>
      <div class="grid">
        <VideoCard
          v-for="item in recommendations"
          :key="item._id"
          :video="item"
          @to-video="toVideo"
          @to-blogger="toBlogger"
        />
      </div>
    </article>
  </section>

  <section class="card" v-else>
    <p>{{ status }}</p>
  </section>
</template>

<script>
import api from '../api';
import VideoCard from '../components/VideoCard.vue';

export default {
  components: {
    VideoCard
  },
  data() {
    return {
      video: null,
      recommendations: [],
      status: 'Загрузка...'
    };
  },
  methods: {
    async loadVideo() {
      try {
        let response = await api.get('/video', { params: { id: this.$route.query.id } });
        this.video = response.data.video;
        this.recommendations = response.data.recommendations;
      } catch (error) {
        this.status = error.response?.data?.error || 'Видео не найдено.';
      }
    },
    previewUrl(value) {
      return value.startsWith('http') ? value : `/${value}`;
    },
    toVideo(id) {
      this.$router.push({ path: '/video', query: { id } });
      this.loadVideo();
    },
    toBlogger(username) {
      this.$router.push({ path: '/blogger', query: { username } });
    }
  },
  mounted() {
    this.loadVideo();
  }
};
</script>

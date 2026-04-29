<template>
  <section class="hero">
    <h2>Видео</h2>
    <p>Показываются 10 видео с максимальным количеством лайков. Переходы на видео и блогера делаются через события дочернего компонента.</p>
  </section>

  <section class="grid-3">
    <VideoCard
      v-for="video in videos"
      :key="video._id"
      :video="video"
      @to-video="toVideo"
      @to-blogger="toBlogger"
    />
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
      videos: []
    };
  },
  methods: {
    async loadVideos() {
      let response = await api.get('/videos', { params: { limit: 10 } });
      this.videos = response.data;
    },
    toVideo(id) {
      this.$router.push({ path: '/video', query: { id } });
    },
    toBlogger(username) {
      this.$router.push({ path: '/blogger', query: { username } });
    }
  },
  mounted() {
    this.loadVideos();
  }
};
</script>

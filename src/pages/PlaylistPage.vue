<template>
  <section class="hero" v-if="playlist">
    <span class="badge">{{ playlist.author }}</span>
    <h2>{{ playlist.title }}</h2>
    <p>Видео этого плейлиста отфильтрованы сразу по двум полям: <code>playlist</code> и <code>author</code>.</p>
  </section>

  <section class="grid-3" v-if="videos.length">
    <VideoCard v-for="video in videos" :key="video._id" :video="video" @to-video="toVideo" @to-blogger="toBlogger" />
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
      playlist: null,
      videos: [],
      status: 'Загрузка...'
    };
  },
  methods: {
    async loadPlaylist() {
      try {
        let response = await api.get('/playlist', {
          params: {
            title: this.$route.query.title,
            author: this.$route.query.author
          }
        });
        this.playlist = response.data.playlist;
        this.videos = response.data.videos;
      } catch (error) {
        this.status = error.response?.data?.error || 'Плейлист не найден.';
      }
    },
    toVideo(id) {
      this.$router.push({ path: '/video', query: { id } });
    },
    toBlogger(username) {
      this.$router.push({ path: '/blogger', query: { username } });
    }
  },
  mounted() {
    this.loadPlaylist();
  }
};
</script>

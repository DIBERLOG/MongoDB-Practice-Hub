<template>
  <div v-if="blogger">
    <BloggerHeader :blogger="blogger" />

    <section class="grid-2">
      <article class="card">
        <h3>Плейлисты</h3>
        <div class="grid">
          <PlaylistCard
            v-for="playlist in playlists"
            :key="playlist._id"
            :playlist="playlist"
            @open="openPlaylist"
          />
        </div>
      </article>
      <article class="card">
        <h3>Видео автора</h3>
        <p class="muted">Сортировка идёт от меньшего количества лайков к большему.</p>
      </article>
    </section>

    <section class="grid-3" style="margin-top:18px;">
      <VideoCard
        v-for="video in videos"
        :key="video._id"
        :video="video"
        @to-video="toVideo"
        @to-blogger="toBlogger"
      />
    </section>
  </div>

  <section class="card" v-else>
    <p>{{ status }}</p>
  </section>
</template>

<script>
import api from '../api';
import VideoCard from '../components/VideoCard.vue';
import PlaylistCard from '../components/PlaylistCard.vue';
import BloggerHeader from '../components/BloggerHeader.vue';

export default {
  components: {
    VideoCard,
    PlaylistCard,
    BloggerHeader
  },
  data() {
    return {
      blogger: null,
      videos: [],
      playlists: [],
      status: 'Загрузка...'
    };
  },
  methods: {
    async loadBlogger() {
      try {
        let response = await api.get('/blogger', { params: { username: this.$route.query.username } });
        this.blogger = response.data.blogger;
        this.videos = response.data.videos;
        this.playlists = response.data.playlists;
      } catch (error) {
        this.status = error.response?.data?.error || 'Блогер не найден.';
      }
    },
    toVideo(id) {
      this.$router.push({ path: '/video', query: { id } });
    },
    toBlogger(username) {
      if (username !== this.$route.query.username) {
        this.$router.push({ path: '/blogger', query: { username } });
        this.loadBlogger();
      }
    },
    openPlaylist(playlist) {
      this.$router.push({
        path: '/playlist',
        query: {
          title: playlist.title,
          author: playlist.author
        }
      });
    }
  },
  mounted() {
    this.loadBlogger();
  }
};
</script>

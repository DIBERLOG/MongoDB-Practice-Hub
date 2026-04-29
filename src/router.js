import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import MongoSearch from './pages/MongoSearch.vue';
import CatalogPage from './pages/CatalogPage.vue';
import ProductPage from './pages/ProductPage.vue';
import AdsPage from './pages/AdsPage.vue';
import MyAdsPage from './pages/MyAdsPage.vue';
import AdViewPage from './pages/AdViewPage.vue';
import AdEditPage from './pages/AdEditPage.vue';
import RelationsPage from './pages/RelationsPage.vue';
import VideosPage from './pages/VideosPage.vue';
import VideoPage from './pages/VideoPage.vue';
import BloggerPage from './pages/BloggerPage.vue';
import PlaylistPage from './pages/PlaylistPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/mongo-search', component: MongoSearch },
  { path: '/catalog', component: CatalogPage },
  { path: '/product', component: ProductPage },
  { path: '/ads', component: AdsPage },
  { path: '/ads/my', component: MyAdsPage },
  { path: '/ad', component: AdViewPage },
  { path: '/ad/edit', component: AdEditPage },
  { path: '/relations', component: RelationsPage },
  { path: '/videos', component: VideosPage },
  { path: '/video', component: VideoPage },
  { path: '/blogger', component: BloggerPage },
  { path: '/playlist', component: PlaylistPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

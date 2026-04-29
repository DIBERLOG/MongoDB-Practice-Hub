<template>
  <section class="hero">
    <h2>Объявления</h2>
    <p>Общий список объявлений с поиском, фильтрацией и сортировкой по цене. Для создания и редактирования есть отдельные управляемые разделы.</p>
  </section>

  <section class="card">
    <form class="field-grid" @submit.prevent="loadAds">
      <label>
        <span class="muted">Название</span>
        <input v-model="searchState.title" placeholder="Что ищем?" />
      </label>
      <label>
        <span class="muted">Категория</span>
        <select v-model="searchState.category">
          <option value="">Все категории</option>
          <option value="Одежда">Одежда</option>
          <option value="Для дома">Для дома</option>
          <option value="Техника">Техника</option>
        </select>
      </label>
      <label>
        <span class="muted">Сортировка цены</span>
        <select v-model="searchState.sort">
          <option value="">без сортировки</option>
          <option value="1">по возрастанию</option>
          <option value="-1">по убыванию</option>
        </select>
      </label>
      <div class="button-row">
        <button class="button" type="submit">Найти</button>
        <button class="ghost-button" type="button" @click="$router.push('/ads/my')">Перейти в мои объявления</button>
      </div>
    </form>
  </section>

  <section class="grid-2" style="margin-top: 18px;">
    <AdCard v-for="ad in ads" :key="ad._id" :ad="ad" />
  </section>
</template>

<script>
import api from '../api';
import AdCard from '../components/AdCard.vue';

export default {
  components: {
    AdCard
  },
  data() {
    return {
      ads: [],
      searchState: {
        title: '',
        category: '',
        sort: ''
      }
    };
  },
  methods: {
    async loadAds() {
      let response = await api.get('/ads', { params: this.searchState });
      this.ads = response.data;
    }
  },
  mounted() {
    this.loadAds();
  }
};
</script>

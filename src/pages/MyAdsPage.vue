<template>
  <section class="hero">
    <h2>Мои объявления</h2>
    <p>Здесь состояние формы создания полностью отделено от поиска. Список сортируется по <code>createdAt: -1</code>, как и требовалось.</p>
  </section>

  <section class="grid-2">
    <article class="card">
      <h3>Новое объявление</h3>
      <form class="field-grid" @submit.prevent="createAd">
        <label><span class="muted">Название</span><input v-model="createState.title" /></label>
        <label><span class="muted">Описание</span><textarea v-model="createState.description"></textarea></label>
        <label><span class="muted">Цена</span><input v-model="createState.price" type="number" /></label>
        <label>
          <span class="muted">Категория</span>
          <select v-model="createState.category">
            <option value="Одежда">Одежда</option>
            <option value="Для дома">Для дома</option>
            <option value="Техника">Техника</option>
          </select>
        </label>
        <label><span class="muted">Изображение</span><input v-model="createState.image" /></label>
        <label style="display:flex; align-items:center; gap:10px;">
          <input v-model="createState.asNew" type="checkbox" style="width:auto;" />
          <span>Как новенький</span>
        </label>
        <div class="button-row">
          <button class="button" type="submit">Создать</button>
        </div>
        <p v-if="message" :class="messageType === 'error' ? 'status-error' : 'status-success'">{{ message }}</p>
      </form>
    </article>

    <article class="card">
      <h3>Управление</h3>
      <p class="muted">CRUD-операции идут через отдельные контролируемые API и используют статусы 201 / 200 / 400.</p>
      <div class="button-row">
        <button class="ghost-button" @click="$router.push('/ads')">Все объявления</button>
      </div>
    </article>
  </section>

  <section class="grid-2" style="margin-top: 18px;">
    <AdCard v-for="ad in ads" :key="ad._id" :ad="ad" editable @delete="removeAd" />
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
      message: '',
      messageType: 'success',
      createState: {
        title: '',
        description: '',
        price: '',
        category: 'Одежда',
        image: '',
        asNew: false
      }
    };
  },
  methods: {
    async loadMyAds() {
      let response = await api.get('/ads/my');
      this.ads = response.data;
    },
    async createAd() {
      try {
        await api.post('/ads', this.createState);
        this.message = 'Объявление успешно создано.';
        this.messageType = 'success';
        this.createState = {
          title: '',
          description: '',
          price: '',
          category: 'Одежда',
          image: '',
          asNew: false
        };
        this.loadMyAds();
      } catch (error) {
        this.message = error.response?.data?.error || 'Ошибка валидации.';
        this.messageType = 'error';
      }
    },
    async removeAd(id) {
      await api.delete('/ads', { params: { id } });
      this.loadMyAds();
    }
  },
  mounted() {
    this.loadMyAds();
  }
};
</script>

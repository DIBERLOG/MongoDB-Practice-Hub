<template>
  <section class="hero">
    <h2>Редактор объявления</h2>
    <p>Редактирование идёт через отдельный экран и отдельное состояние формы, чтобы не смешивать его с поиском и созданием.</p>
  </section>

  <section class="card" v-if="form.id">
    <form class="field-grid" @submit.prevent="saveAd">
      <label><span class="muted">Название</span><input v-model="form.title" /></label>
      <label><span class="muted">Описание</span><textarea v-model="form.description"></textarea></label>
      <label><span class="muted">Цена</span><input v-model="form.price" type="number" /></label>
      <label>
        <span class="muted">Категория</span>
        <select v-model="form.category">
          <option value="Одежда">Одежда</option>
          <option value="Для дома">Для дома</option>
          <option value="Техника">Техника</option>
        </select>
      </label>
      <label><span class="muted">Изображение</span><input v-model="form.image" /></label>
      <label style="display:flex; align-items:center; gap:10px;">
        <input v-model="form.asNew" type="checkbox" style="width:auto;" />
        <span>Как новенький</span>
      </label>
      <div class="button-row">
        <button class="button" type="submit">Сохранить</button>
        <button class="ghost-button" type="button" @click="$router.push('/ads/my')">Назад</button>
      </div>
      <p v-if="message" :class="messageType === 'error' ? 'status-error' : 'status-success'">{{ message }}</p>
    </form>
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
      form: {
        id: '',
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        asNew: false
      },
      status: 'Загрузка...',
      message: '',
      messageType: 'success'
    };
  },
  methods: {
    async loadAd() {
      try {
        let response = await api.get('/ad', { params: { id: this.$route.query.id } });
        Object.assign(this.form, {
          id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          image: response.data.image,
          asNew: response.data.asNew
        });
      } catch (error) {
        this.status = error.response?.data?.error || 'Объявление не найдено.';
      }
    },
    async saveAd() {
      try {
        await api.put('/ads', this.form);
        this.message = 'Изменения сохранены.';
        this.messageType = 'success';
      } catch (error) {
        this.message = error.response?.data?.error || 'Ошибка валидации.';
        this.messageType = 'error';
      }
    }
  },
  mounted() {
    this.loadAd();
  }
};
</script>

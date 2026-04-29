<template>
  <section class="hero">
    <h2>Связи между коллекциями</h2>
    <p>Раздел показывает учебный сценарий: сервер берёт первый заказ, затем находит пользователя и товар по связанным полям и собирает итоговый объект.</p>
  </section>

  <section class="grid-2" v-if="summary">
    <article class="card">
      <h3>Собранный итог</h3>
      <div class="inline-meta"><strong>Пользователь:</strong> {{ summary.user }}</div>
      <div class="inline-meta"><strong>Адрес:</strong> {{ summary.address }}</div>
      <div class="inline-meta"><strong>Товар:</strong> {{ summary.product }}</div>
      <div class="inline-meta"><strong>Цена:</strong> {{ summary.price }} ₽</div>
    </article>
    <article class="card">
      <h3>Исходный заказ</h3>
      <pre>{{ order }}</pre>
    </article>
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
      summary: null,
      order: null,
      status: 'Загрузка...'
    };
  },
  async mounted() {
    try {
      let response = await api.get('/orders/summary');
      this.summary = response.data.summary;
      this.order = response.data.order;
    } catch (error) {
      this.status = error.response?.data?.error || error.message;
    }
  }
};
</script>

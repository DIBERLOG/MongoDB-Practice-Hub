<template>
  <section class="hero" v-if="product">
    <span class="badge">{{ product.category }}</span>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <div class="inline-meta">
      <strong>{{ product.price }} ₽</strong>
      <span>{{ product.likes }} likes</span>
      <span v-if="product.isOnSale" class="status-success">Супер-цена</span>
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
      product: null,
      status: 'Загрузка...'
    };
  },
  methods: {
    async loadProduct() {
      try {
        let response = await api.get('/product', {
          params: { id: this.$route.query.id }
        });
        this.product = response.data;
      } catch (error) {
        this.status = error.response?.data?.error || 'Товар не найден.';
      }
    }
  },
  mounted() {
    this.loadProduct();
  }
};
</script>

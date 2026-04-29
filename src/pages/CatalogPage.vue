<template>
  <section class="hero">
    <h2>Каталог товаров</h2>
    <p>Здесь показываются товары из коллекции <code>catalog_products</code>, фильтрация по категории, сортировка по цене и отдельная логика “Супер-цена”.</p>
  </section>

  <section class="card">
    <div class="grid-2">
      <label>
        <span class="muted">Категория</span>
        <select v-model="filters.category">
          <option value="">Все</option>
          <option value="clothes">clothes</option>
          <option value="home">home</option>
          <option value="food">food</option>
        </select>
      </label>
      <label>
        <span class="muted">Сортировка по цене</span>
        <select v-model="filters.sort">
          <option value="">без сортировки</option>
          <option value="1">по возрастанию</option>
          <option value="-1">по убыванию</option>
        </select>
      </label>
    </div>
    <div class="button-row" style="margin-top: 18px;">
      <button class="button" @click="loadProducts">Применить</button>
      <button class="ghost-button" @click="loadDiscount">Супер-цена</button>
    </div>
  </section>

  <section class="grid-3" style="margin-top: 18px;">
    <ProductCard v-for="product in products" :key="product._id" :product="product" />
  </section>
</template>

<script>
import api from '../api';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      filters: {
        category: '',
        sort: ''
      }
    };
  },
  methods: {
    async loadProducts() {
      let response = await api.get('/products', {
        params: {
          category: this.filters.category,
          sort: this.filters.sort
        }
      });
      this.products = response.data;
    },
    async loadDiscount() {
      let response = await api.get('/products/discount');
      this.products = response.data;
    }
  },
  mounted() {
    this.loadProducts();
  }
};
</script>

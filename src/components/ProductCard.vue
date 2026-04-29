<template>
  <article class="card">
    <div class="inline-meta">
      <span class="badge">{{ product.category }}</span>
      <span>{{ product.likes }} likes</span>
      <span v-if="product.isOnSale" class="status-success">Супер-цена</span>
    </div>
    <h3 class="card-title-link" @click="$router.push({ path: '/product', query: { id: product._id } })">
      {{ product.title }}
    </h3>
    <p>{{ product.description }}</p>
    <div class="inline-meta">
      <strong>{{ product.price }} ₽</strong>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

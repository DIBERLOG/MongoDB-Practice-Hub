<template>
  <article class="card">
    <img :src="ad.image" :alt="ad.title" class="preview-image" />
    <div class="button-row" style="justify-content: space-between; margin-top: 14px;">
      <span class="badge">{{ ad.category }}</span>
      <span v-if="ad.asNew" class="status-success">Как новенький</span>
    </div>
    <h3 class="card-title-link" @click="$router.push({ path: '/ad', query: { id: ad._id } })">
      {{ ad.title }}
    </h3>
    <p>{{ ad.description }}</p>
    <div class="inline-meta">
      <strong>{{ ad.price }} ₽</strong>
      <span v-if="ad.createdAt">{{ new Date(ad.createdAt).toLocaleDateString('ru-RU') }}</span>
    </div>
    <div v-if="editable" class="button-row" style="margin-top: 12px;">
      <button class="ghost-button" @click="$router.push({ path: '/ad/edit', query: { id: ad._id } })">Редактировать</button>
      <button class="danger-button" @click="$emit('delete', ad._id)">Удалить</button>
    </div>
  </article>
</template>

<script>
export default {
  emits: ['delete'],
  props: {
    ad: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

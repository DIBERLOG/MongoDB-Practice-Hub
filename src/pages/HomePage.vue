<template>
  <section class="hero">
    <h2>Единый учебный портал по MongoDB</h2>
    <p>Здесь собраны безопасный поиск по базе, каталог товаров, связи коллекций, объявления с CRUD, видео, блогеры и плейлисты в одном проекте.</p>
  </section>

  <section class="grid-3">
    <article class="card" v-for="card in cards" :key="card.path">
      <span class="badge">{{ card.label }}</span>
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
      <button class="button" @click="$router.push(card.path)">Открыть</button>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { path: '/mongo-search', label: 'Search', title: 'Mongo Search', description: 'Два режима поиска по коллекциям actors и cities.' },
        { path: '/catalog', label: 'Catalog', title: 'Каталог товаров', description: 'Фильтрация, сортировка, супер-цена и страница одного товара.' },
        { path: '/relations', label: 'Relations', title: 'Связи коллекций', description: 'Сборка итогового объекта из orders, users и products.' },
        { path: '/ads', label: 'CRUD', title: 'Объявления', description: 'Поиск, просмотр, создание, редактирование и удаление объявлений.' },
        { path: '/videos', label: 'Media', title: 'Видео и блогеры', description: 'Видео, рекомендации, блогеры и переходы между страницами.' },
        { path: '/ads/my', label: 'My Ads', title: 'Мои объявления', description: 'Личный раздел автора с формой создания и сортировкой по дате.' }
      ]
    };
  }
};
</script>

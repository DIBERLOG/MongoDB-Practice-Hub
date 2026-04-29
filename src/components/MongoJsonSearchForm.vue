<template>
  <form class="field-grid" @submit.prevent="$emit('submit', { collection, filter, sort, limit })">
    <label>
      <span class="muted">Коллекция</span>
      <select v-model="collection">
        <option value="actors">actors</option>
        <option value="cities">cities</option>
      </select>
    </label>
    <label>
      <span class="muted">Filter</span>
      <textarea v-model="filter"></textarea>
    </label>
    <label>
      <span class="muted">Sort</span>
      <textarea v-model="sort"></textarea>
    </label>
    <label>
      <span class="muted">Limit</span>
      <input v-model="limit" type="number" min="1" max="100" />
    </label>
    <div class="button-row">
      <button class="button" type="submit">Выполнить JSON-запрос</button>
      <button class="ghost-button" type="button" @click="applyActorsExample">Пример actors</button>
      <button class="ghost-button" type="button" @click="applyCitiesExample">Пример cities</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['submit'],
  data() {
    return {
      collection: 'actors',
      filter: '{}',
      sort: '{}',
      limit: 10
    };
  },
  methods: {
    applyActorsExample() {
      this.collection = 'actors';
      this.filter = '{"sex":"female","hair":"red","age":{"$gte":20,"$lte":30}}';
      this.sort = '{"rating":-1}';
      this.limit = 10;
    },
    applyCitiesExample() {
      this.collection = 'cities';
      this.filter = '{"country":"France"}';
      this.sort = '{"population":-1}';
      this.limit = 10;
    }
  }
};
</script>

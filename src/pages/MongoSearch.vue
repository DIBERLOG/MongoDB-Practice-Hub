<template>
  <section class="hero">
    <h2>Mongo Search</h2>
    <p>Раздел полностью сохраняет безопасный поиск по MongoDB: только <code>actors</code> и <code>cities</code>, ограничение <code>limit ≤ 100</code>, два режима поиска и таблица результатов.</p>
  </section>

  <section class="grid-2">
    <article class="card">
      <div class="button-row" style="margin-bottom: 18px;">
        <button :class="mode === 'simple' ? 'button' : 'ghost-button'" @click="mode = 'simple'">Простой поиск</button>
        <button :class="mode === 'json' ? 'button' : 'ghost-button'" @click="mode = 'json'">JSON поиск</button>
      </div>

      <MongoSimpleSearchForm v-if="mode === 'simple'" @submit="runQuery" />
      <MongoJsonSearchForm v-else @submit="runQuery" />
    </article>

    <article class="card">
      <h3>Статус</h3>
      <p :class="error ? 'status-error' : 'muted'">{{ statusText }}</p>
      <p class="stats">{{ count }}</p>
      <p class="muted">Найдено документов</p>
    </article>
  </section>

  <section class="result-card" style="margin-top: 18px;">
    <h3>Результаты</h3>
    <ResultsTable :rows="documents" />
  </section>
</template>

<script>
import api from '../api';
import MongoSimpleSearchForm from '../components/MongoSimpleSearchForm.vue';
import MongoJsonSearchForm from '../components/MongoJsonSearchForm.vue';
import ResultsTable from '../components/ResultsTable.vue';

export default {
  components: {
    MongoSimpleSearchForm,
    MongoJsonSearchForm,
    ResultsTable
  },
  data() {
    return {
      mode: 'simple',
      documents: [],
      count: 0,
      statusText: 'Готов к поиску.',
      error: false
    };
  },
  methods: {
    async runQuery(payload) {
      try {
        this.statusText = 'Выполняю запрос...';
        this.error = false;
        let response = await api.post('/mongo/query', payload);
        this.documents = response.data.documents;
        this.count = response.data.count;
        this.statusText = 'Запрос выполнен успешно.';
      } catch (error) {
        this.error = true;
        this.documents = [];
        this.count = 0;
        this.statusText = error.response?.data?.error || error.message;
      }
    }
  }
};
</script>

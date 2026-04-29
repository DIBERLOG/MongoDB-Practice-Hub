<template>
  <form class="field-grid" @submit.prevent="submitForm">
    <label>
      <span class="muted">Коллекция</span>
      <select v-model="form.collection">
        <option value="actors">actors</option>
        <option value="cities">cities</option>
      </select>
    </label>

    <template v-if="form.collection === 'actors'">
      <label>
        <span class="muted">Имя содержит</span>
        <input v-model="form.actorName" placeholder="Juana" />
      </label>
      <label>
        <span class="muted">Пол</span>
        <select v-model="form.actorSex">
          <option value="">любой</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
      </label>
      <label>
        <span class="muted">Цвет волос</span>
        <input v-model="form.actorHair" placeholder="red" />
      </label>
      <label>
        <span class="muted">Возраст от</span>
        <input v-model="form.actorAgeFrom" type="number" />
      </label>
      <label>
        <span class="muted">Возраст до</span>
        <input v-model="form.actorAgeTo" type="number" />
      </label>
      <label>
        <span class="muted">Рейтинг от</span>
        <input v-model="form.actorRatingFrom" type="number" step="0.1" />
      </label>
      <label>
        <span class="muted">Рейтинг до</span>
        <input v-model="form.actorRatingTo" type="number" step="0.1" />
      </label>
      <label>
        <span class="muted">Сортировка</span>
        <select v-model="form.actorSort">
          <option value="{}">без сортировки</option>
          <option value='{"rating":-1}'>рейтинг по убыванию</option>
          <option value='{"age":1}'>возраст по возрастанию</option>
          <option value='{"name":1}'>имя A-Z</option>
        </select>
      </label>
    </template>

    <template v-else>
      <label>
        <span class="muted">Страна</span>
        <input v-model="form.cityCountry" placeholder="France" />
      </label>
      <label>
        <span class="muted">Название содержит</span>
        <input v-model="form.cityName" placeholder="Paris" />
      </label>
      <label>
        <span class="muted">Население от</span>
        <input v-model="form.cityPopulationFrom" type="number" />
      </label>
      <label>
        <span class="muted">Население до</span>
        <input v-model="form.cityPopulationTo" type="number" />
      </label>
      <label>
        <span class="muted">Сортировка</span>
        <select v-model="form.citySort">
          <option value="{}">без сортировки</option>
          <option value='{"population":-1}'>население по убыванию</option>
          <option value='{"population":1}'>население по возрастанию</option>
          <option value='{"name":1}'>название A-Z</option>
        </select>
      </label>
    </template>

    <label>
      <span class="muted">Limit</span>
      <input v-model="form.limit" type="number" min="1" max="100" />
    </label>

    <div class="button-row">
      <button class="button" type="submit">Найти</button>
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
      form: {
        collection: 'actors',
        actorName: '',
        actorSex: '',
        actorHair: '',
        actorAgeFrom: '',
        actorAgeTo: '',
        actorRatingFrom: '',
        actorRatingTo: '',
        actorSort: '{}',
        cityCountry: '',
        cityName: '',
        cityPopulationFrom: '',
        cityPopulationTo: '',
        citySort: '{}',
        limit: 10
      }
    };
  },
  methods: {
    submitForm() {
      let filter = {};
      let sort = {};

      if (this.form.collection === 'actors') {
        if (this.form.actorName) filter.name = { $regex: this.form.actorName, $options: 'i' };
        if (this.form.actorSex) filter.sex = this.form.actorSex;
        if (this.form.actorHair) filter.hair = this.form.actorHair;
        if (this.form.actorAgeFrom || this.form.actorAgeTo) {
          filter.age = {};
          if (this.form.actorAgeFrom) filter.age.$gte = Number(this.form.actorAgeFrom);
          if (this.form.actorAgeTo) filter.age.$lte = Number(this.form.actorAgeTo);
        }
        if (this.form.actorRatingFrom || this.form.actorRatingTo) {
          filter.rating = {};
          if (this.form.actorRatingFrom) filter.rating.$gte = Number(this.form.actorRatingFrom);
          if (this.form.actorRatingTo) filter.rating.$lte = Number(this.form.actorRatingTo);
        }
        sort = JSON.parse(this.form.actorSort);
      } else {
        if (this.form.cityCountry) filter.country = this.form.cityCountry;
        if (this.form.cityName) filter.name = { $regex: this.form.cityName, $options: 'i' };
        if (this.form.cityPopulationFrom || this.form.cityPopulationTo) {
          filter.population = {};
          if (this.form.cityPopulationFrom) filter.population.$gte = Number(this.form.cityPopulationFrom);
          if (this.form.cityPopulationTo) filter.population.$lte = Number(this.form.cityPopulationTo);
        }
        sort = JSON.parse(this.form.citySort);
      }

      this.$emit('submit', {
        collection: this.form.collection,
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort),
        limit: this.form.limit
      });
    },
    applyActorsExample() {
      Object.assign(this.form, {
        collection: 'actors',
        actorSex: 'female',
        actorHair: 'red',
        actorAgeFrom: '20',
        actorAgeTo: '30',
        actorSort: '{"rating":-1}',
        limit: 10
      });
    },
    applyCitiesExample() {
      Object.assign(this.form, {
        collection: 'cities',
        cityCountry: 'France',
        cityName: '',
        cityPopulationFrom: '',
        cityPopulationTo: '',
        citySort: '{"population":-1}',
        limit: 10
      });
    }
  }
};
</script>

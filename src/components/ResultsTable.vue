<template>
  <div class="table-wrap">
    <table v-if="rows.length">
      <thead>
        <tr>
          <th v-for="key in keys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="key in keys" :key="key">{{ stringify(row[key]) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="muted">Ничего не найдено.</p>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    keys() {
      let set = new Set();
      this.rows.forEach((row) => Object.keys(row).forEach((key) => set.add(key)));
      return [...set];
    }
  },
  methods: {
    stringify(value) {
      if (value && typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value ?? '';
    }
  }
};
</script>

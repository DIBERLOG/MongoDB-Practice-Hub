const ALLOWED_QUERY_OPERATORS = new Set([
  '$gte',
  '$lte',
  '$gt',
  '$lt',
  '$eq',
  '$ne',
  '$regex',
  '$options',
  '$in',
  '$nin'
]);

const BLOCKED_KEYS = new Set([
  '__proto__',
  'constructor',
  '$where',
  '$function',
  '$accumulator',
  '$expr'
]);

function validateFilterShape(value) {
  if (Array.isArray(value)) {
    throw new Error('Массивы в фильтре не поддерживаются.');
  }

  if (value && typeof value === 'object') {
    for (let [key, nested] of Object.entries(value)) {
      if (BLOCKED_KEYS.has(key)) {
        throw new Error(`Оператор ${key} запрещён.`);
      }

      if (key.startsWith('$') && !ALLOWED_QUERY_OPERATORS.has(key)) {
        throw new Error(`Оператор ${key} не разрешён.`);
      }

      validateFilterShape(nested);
    }
  }
}

function sanitizeSort(sort) {
  let safeSort = {};

  if (!sort || typeof sort !== 'object' || Array.isArray(sort)) {
    return safeSort;
  }

  for (let [key, value] of Object.entries(sort)) {
    if (BLOCKED_KEYS.has(key) || key.startsWith('$')) {
      throw new Error('В сортировке разрешены только обычные поля.');
    }

    let normalized = Number(value);
    safeSort[key] = normalized === -1 ? -1 : 1;
  }

  return safeSort;
}

function buildSafeMongoQuery({ filter, sort, limit, allowedCollections, collection }) {
  if (!allowedCollections.includes(collection)) {
    throw new Error('Коллекция не входит в разрешённый список.');
  }

  validateFilterShape(filter);

  let safeLimit = Number(limit);
  if (!Number.isFinite(safeLimit)) {
    safeLimit = 10;
  }

  safeLimit = Math.max(1, Math.min(100, Math.floor(safeLimit)));

  return {
    filter,
    sort: sanitizeSort(sort),
    limit: safeLimit
  };
}

module.exports = buildSafeMongoQuery;

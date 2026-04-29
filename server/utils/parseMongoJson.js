function parseMongoJson(value, fallback = {}) {
  let input = String(value ?? '').trim();

  if (!input) {
    return fallback;
  }

  let parsed = JSON.parse(input);

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Ожидался JSON-объект.');
  }

  return parsed;
}

module.exports = parseMongoJson;

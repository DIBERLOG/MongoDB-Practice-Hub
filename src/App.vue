<template>
  <div class="shell">
    <header class="topbar">
      <div class="brand" @click="$router.push('/')">
        <img src="/assets/owl.png" alt="Mongo Portal" class="brand__icon" />
        <div>
          <h1>Mongo Portal</h1>
          <p>Express + MongoDB + Mongoose + Vue</p>
        </div>
      </div>
      <nav class="nav">
        <RouterLink to="/mongo-search">Mongo Search</RouterLink>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/ads">Объявления</RouterLink>
        <RouterLink to="/ads/my">Мои объявления</RouterLink>
        <RouterLink to="/relations">Связи</RouterLink>
        <RouterLink to="/videos">Видео</RouterLink>
      </nav>
    </header>

    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {};
</script>

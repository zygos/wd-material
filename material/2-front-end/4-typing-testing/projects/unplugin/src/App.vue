<template>
  <header id="header">
    <nav id="navigation">
      <RouterLink :to="{ name: 'Home' }">Picture of the day</RouterLink>
      <RouterLink :to="{ name: 'Favorites' }">Favorites</RouterLink>
    </nav>
  </header>

  <RouterView />
  <ErrorToast />
</template>

<style>
#app {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1280px;
  font-weight: normal;
}

#header {
  max-height: 100vh;
  line-height: 1.5;
}

#navigation {
  margin-top: 2rem;
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

#navigation a.router-link-exact-active {
  color: var(--color-text);
}

#navigation a.router-link-exact-active:hover {
  background-color: transparent;
}

#navigation a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
  padding: 0 1rem;
}

#navigation a:first-of-type {
  border: 0;
}
</style>

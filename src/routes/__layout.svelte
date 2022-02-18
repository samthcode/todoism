<script>
  import "../app.scss";
</script>

<nav>
  <h1>Todoism</h1>
  <a href="/">Home</a>
  <a href="/about/">About</a>
</nav>

<slot />

<style lang="scss">
  a {
    margin-inline: 1em;
  }
  h1 {
    color: $accent-dark;
    font-size: 2rem;
    display: inline;
    margin-right: 1em;
  }
  nav {
    background-color: $bg-light;
    padding: 1rem;
  }
  a {
    padding-block: 1em;
  }
  a:any-link {
    font-size: 1.5em;
    color: $accent-light;
    text-decoration: none;
  }
  a:hover {
    color: $accent-dark;
  }
</style>

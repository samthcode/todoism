<script>
  import "../app.scss";
</script>

<nav>
  <div>
    <h1>Todoism</h1>
  </div>
  <div>
    <a href="/">Home</a>
    <a href="/about/">About</a>
  </div>
</nav>

<slot />

<style lang="scss">
  nav {
    background-color: $bg-light;
    padding: 1rem 1.5rem;
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1rem;
    align-items: center;
  }
  a {
    &:not(:last-child) {
      margin-right: 1.5rem;
    }
    &:any-link {
      font-size: 1.5em;
      color: $accent-light;
      text-decoration: none;
    }
    &:hover {
      color: $accent-dark;
    }
  }
  h1 {
    color: $accent-dark;
    font-size: 2em;
    display: inline;
    margin-right: 2rem;
  }
</style>

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
    @media only screen and (max-width: $mobile-size) {
      margin: 0;
    }
    &:not(:first-child) {
      @media only screen and (max-width: $mobile-size) {
      margin-right: 1.5rem;
    }
    }
  }
  h1 {
    color: $accent-dark;
    font-size: 2rem;
    display: inline;
    @media only screen and (max-width: $mobile-size) {
      display: block;
    }
    margin-right: 1em;
  }
  nav {
    background-color: $bg-light;
    padding: 1rem;

    @media only screen and (max-width: $mobile-size) {
      padding: 1rem 1.5rem;
    }
  }
  a {
    padding-block: 1em;
    &:any-link {
      font-size: 1.5em;
      color: $accent-light;
      text-decoration: none;
    }
    &:hover {
      color: $accent-dark;
    }
  }
</style>

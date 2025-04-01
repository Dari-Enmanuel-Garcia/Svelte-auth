<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./Home.svelte";
  import Register from "./Register.svelte"
  import Dashboard from "./Dashboard.svelte";
  import Protector from "./components/authComponents/Protector.svelte";
</script>

<Router>
  <Route path="/">
    <Protector redirectIfAuthenticated={true}>
      <Home />
    </Protector>
  </Route>
  
  <Route path="/register">
    <Protector redirectIfAuthenticated={true}>
      <Register />
    </Protector>
  </Route>


  <Route path="/dashboard">
    <Protector>
      <Dashboard/>
    </Protector>
  </Route>
</Router>

<style>
  :global(body){
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #667eea;
  }
</style>
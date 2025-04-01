<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Loader from "../Loader.svelte";
  import { verifyToken } from "../../auth/middlewareAuth";

  export let redirectIfAuthenticated = false;

  let isAuthenticated = false;
  let isLoading = true;

  onMount(async () => {
    try {
      const tokenValid = await verifyToken();
      isAuthenticated = tokenValid ? true : false;
    } catch (error) {
      isAuthenticated = false; 
    } finally {
      isLoading = false;

      if (redirectIfAuthenticated && isAuthenticated) {
        navigate("/dashboard");
      } else if (!isAuthenticated && !redirectIfAuthenticated) {
        navigate("/");
      }
    }
  });
</script>

{#if isLoading}
  <Loader />
{:else}
  {#if isAuthenticated || redirectIfAuthenticated}
    <slot />
  {/if}
{/if}
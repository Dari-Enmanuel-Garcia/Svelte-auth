<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Loader from "../Loader.svelte";
  import { verifyToken } from "../../auth/middlewareAuth";

  export let redirectIfAuthenticated = false;

  let auth = {
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null
  };

  onMount(async () => {
    try {
      const result = await verifyToken();
      console.log('Auth result:', result);
      
      auth = {
        isAuthenticated: result?.valid || false,
        isLoading: false,
        error: null,
        user: result?.user || null
      };

      if (redirectIfAuthenticated && auth.isAuthenticated) {
        navigate("/dashboard", { replace: true });
        return;
      }

      if (!redirectIfAuthenticated && !auth.isAuthenticated) {
        navigate("/", { replace: true });
        return;
      }

    } catch (error) {
      console.error('[AUTH] Error:', error);
      auth = {
        isAuthenticated: false,
        isLoading: false,
        error: error.message,
        user: null
      };
      
      if (!redirectIfAuthenticated) {
        navigate("/", { replace: true });
      }
    }
  });
</script>

{#if auth.isLoading}
  <Loader />
{:else if auth.error}
  <div class="error">Error: {auth.error}</div>
{:else}
  {#if (auth.isAuthenticated && !redirectIfAuthenticated) || (!auth.isAuthenticated && redirectIfAuthenticated)}
    <slot />
  {/if}
{/if}
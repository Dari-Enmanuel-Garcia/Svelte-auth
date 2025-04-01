<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Loader from "../Loader.svelte"
  import { verifyToken } from "../../auth/middlewareAuth";

  let isAuthenticated = false;
  let isLoading = true;

  onMount(async () => {
    isAuthenticated = await verifyToken();
    isLoading = false;

    if (!isAuthenticated) {
      navigate("/");
    }
  });
</script>

{#if isLoading}
  <Loader />
{:else}
  {#if isAuthenticated}
    <slot /> 
  {/if}
{/if}
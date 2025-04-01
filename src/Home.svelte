<script>
    import "./styles/Home.svelte.css"
    import {Link} from "svelte-routing"
    import Loader from "./components/Loader.svelte";

    //vars
    let email
    let password
    let isLoading = false
    let errorFound = false
    let errorText = ""


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }


    const handleSubmit = async () =>{
      isLoading = true
      try {
        const data ={
          "userEmail":email,
          "userPassword":password
        }

        const response = await fetch("https://jwt-api-testing.vercel.app/api/users/loginUser",{
              headers: {
                "Content-Type": "application/json"},
              method:"POST",
              credentials: "include",
              body:JSON.stringify(data)
            })

            const dataLogin= await response.json()

            if(response.status != 202){
              throw new Error(dataLogin.message);
            }

            await delay(200)
            window.location.pathname = "/dashboard"

      } catch (error) {
        errorText = error.message
        errorFound=true
      }
      finally{
        isLoading = false
      }
    }

</script>
    
<main class="home-page">
{#if !errorFound}
{#if !isLoading}
<div class="home-container">
  <form on:submit|preventDefault={handleSubmit} action="">
    <h1 class="home-title">Welcome Back</h1>
    <input type="email" placeholder="Email Address" autocomplete="off" minlength="8" maxlength="100" bind:value={email} class="home-input" required />
    <input type="password" placeholder="Password" autocomplete="off" minlength="8" maxlength="50" bind:value={password} class="home-input" required  />
    <button class="home-button">Login</button>
    <Link to="/register"><p class="home-link">¿No tienes una cuenta? Registrate</p></Link>
  </form>
</div>
{:else}
<Loader></Loader>
{/if}
{:else}
<div class="home-error">
  <h1>{errorText}</h1>
  <button on:click={() => errorFound = false} class="home-return-button">Regresar</button>
</div>
{/if}
</main>
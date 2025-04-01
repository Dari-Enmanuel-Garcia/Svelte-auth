<script>
    import { Link } from "svelte-routing";
    import "./styles/Register.svelte.css";
    import Loader from "./components/Loader.svelte";

    //vars
    let email
    let password
    let username
    let profile_photo
    let isLoading = false
    let errorFound = false
    let errorText = ""

    function checkUrl(url) {
      return (url.match(/\.(jpeg|jpg|gif|png|avif)$/) != null);
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    //Register controller
    const handleSubmit = async ()=>{

      //Activamos el loader
      isLoading = true
      try {

        await delay(1000)
        //Manejamos la data
        const data = {
          "userEmail":email,
          "userPassword":password,
          "userProfile_photo":profile_photo,
          "uusername":username
        }

        //Validamos inicialmente
        if(!checkUrl(profile_photo)){
          throw new Error("URL de imagen invalida")
        }

        //Enviamos nuestra solicitud
        const response = await fetch("https://jwt-api-testing.vercel.app/api/users/createUser",{
          method:"POST",
          headers: {
            "Content-Type": "application/json"},
          body:JSON.stringify(data)
        })

        if(response.status != 201){
          const data = await response.json()
          throw new Error(data.message);
        }
        //Si el usuario es registrado correctamente, le iniciamos la sesion, usamos fetch para enviarle los datos a la api
        const responseLogin = await fetch("https://jwt-api-testing.vercel.app/api/users/loginUser",{
              headers: {
                "Content-Type": "application/json"},
              method:"POST",
              credentials: "include",
              body:JSON.stringify(data)
            })

            const dataLogin = await responseLogin.json()
            if(responseLogin.status != 202){
              throw new Error(dataLogin.message);
            }
            await delay(200)
            window.location.pathname = "/dashboard" //y lo mandamos al dashboard si todo es correcto

      } catch (error) {
          errorText = error.message
          errorFound=true
      }finally{
        isLoading = false
      }
    }
</script>

{#if !errorFound}
{#if !isLoading}
<div class="register-page">
  <form on:submit|preventDefault={handleSubmit} class="register-form">
    <h1 class="register-title">Create Account</h1>
    <input type="email" placeholder="Email Address" bind:value={email} minlength="8" maxlength="100"  class="register-input" required />
    <input type="password" placeholder="Create Password" bind:value={password} minlength="8" maxlength="50" class="register-input" required />
    <input type="text" placeholder="Enter username" bind:value={username} minlength="8" maxlength="50" class="register-input" required />
    <input type="text" placeholder="Profile image url" bind:value={profile_photo} minlength="8" maxlength="200" class="register-input" required />
    <button class="register-button" disabled={isLoading}>Sign Up</button>
    <Link to="/"><p class="register-link">¿Ya tienes una cuenta? Inicia sesion</p></Link>
  </form>
</div>
{:else}
<Loader></Loader>
{/if}
{:else}
<div class="register-error">
  <h1>{errorText}</h1>
  <button on:click={() => errorFound = false} class="register-return-button">Regresar al registro</button>
</div>
{/if}
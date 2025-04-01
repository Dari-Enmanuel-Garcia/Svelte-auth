<script>
    import { verifyToken } from "./auth/middlewareAuth";
    import "./styles/Dashboard.svelte.css"



    let username = ""
    let profile_photo=""
    let isLoading = false

    const getData = async ()=>{
        try {
            const tokenData = await verifyToken()
            const data ={
                "userEmail":tokenData.user.email
            }

            const response = await fetch("https://jwt-api-testing.vercel.app/api/users/getUserDataWithEmail",{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body:JSON.stringify(data)
            })

            const userData = await response.json()
            username = userData.username
            profile_photo=userData.profile_photo
        } catch (error) {
            
        }
    }

    getData()
  </script>
  
<div class="dashboard-container">
    <h1 class="dashboard-title">Bienvenido {username}</h1>
    <img class="dashboard-img" src={profile_photo} alt="photo"/>
</div>
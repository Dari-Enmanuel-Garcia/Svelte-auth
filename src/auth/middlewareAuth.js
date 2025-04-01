export async function verifyToken() {
  try {
    const response = await fetch("https://jwt-api-testing.vercel.app/api/users/verifyToken", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error verificando token", error);
    return null;
  }
}
export async function verifyToken() {
  try {
      const response = await fetch("https://jwt-api-testing.vercel.app/api/users/verifyToken", {
          method: "GET",
          credentials: "include",
      });

      if (!response.ok) {
          throw new Error(`status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error verificando token", error);
      return { valid: false }; 
  }
}
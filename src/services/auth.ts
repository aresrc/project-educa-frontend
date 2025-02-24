import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export const login = async (correo: string, contrasenia: string) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasenia }),
    });

    if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    const data = await response.json();
    setCookie("token", data.token, { path: "/", maxAge: 60 * 60 * 24 }); // 🍪 Guarda la cookie
    return data;
};

export const logout = () => {
    deleteCookie("token"); // 🍪 Elimina la cookie
};
  

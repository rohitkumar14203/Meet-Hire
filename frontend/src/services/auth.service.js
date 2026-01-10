// import { axiosInstance } from "../api/axiosInstance";

// export const login = async (credentials) => {
//     const response = await axiosInstance.post("/auth/login", credentials);
//     return response.data;
// }



// src/services/auth.service.js

// Toggle for development
const USE_FAKE_AUTH = true;

export const login = async (credentials) => {
  if (USE_FAKE_AUTH) {
    // simulate network delay
    await new Promise((res) => setTimeout(res, 700));

    const { email } = credentials;

    let role = "CANDIDATE";
    if (email.includes("hr")) role = "HR";
    else if (email.includes("interviewer")) role = "INTERVIEWER";

    return {
      token: "fake-jwt-token",
      user: {
        id: 1,
        name: "Fake User",
        email,
        role,
      },
    };
  }

  // 🔐 REAL BACKEND (enable later)
  // const response = await axiosInstance.post("/auth/login", credentials);
  // return response.data;
};

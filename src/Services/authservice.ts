type userType = {
  email: string;
  password: string;
}

const users = JSON.parse(localStorage.getItem("users") || "[]");

export const register = async (email: string, password: string) => {
  const existingUser = users.find((user: userType) => user.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { message: "User registered successfully" };
};

export const login = async (email: string, password: string) => {
  const user = users.find((user: userType) => user.email === email && user.password === password);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  return { email };
};

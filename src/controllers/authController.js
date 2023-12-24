const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password, role = "client" } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  try {
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "This email is already in use." });
    }
    // Criptografar a senha antes de salvar o usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("cripitografada", hashedPassword);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "client",
    });
    console.log("resposta", newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log("errado");
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe pelo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    console.log("senha:", password, user.password);
    // Comparar as senhas usando bcrypt
    const passwordResult = await bcrypt.compare(password, user.password);
    console.log("senha", passwordResult);
    if (!passwordResult) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gerar um token JWT se as credenciais estiverem corretas
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "SEGREDO_JWT_USER",
      {
        expiresIn: "1h",
      }
    );

    // Retornar o token como resposta para o cliente
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

const logout = (req, res) => {
  // Lógica de logout aqui
  // Se estiver utilizando JWT, seria invalidar o token, por exemplo.
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

module.exports = { login, logout, register };

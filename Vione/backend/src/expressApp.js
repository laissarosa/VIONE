const express     = require("express");
const cors        = require("cors");
const authRoutes  = require("./routes/authRoutes");
const cartRoutes  = require("./routes/cartRoutes");
const favRoutes   = require("./routes/favoritesRoutes");
const prodRoutes  = require("./routes/productRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3001",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error(`CORS bloqueado: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

app.use("/auth",      authRoutes);
app.use("/cart",      cartRoutes);
app.use("/favorites", favRoutes);
app.use("/products",  prodRoutes);

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ success: false, message: "Erro interno no servidor." });
});

module.exports = app;
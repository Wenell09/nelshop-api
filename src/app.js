const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.listen(port, "localhost", () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});

const { welcome, getBarang, getDetailBarang, addBarang, getKategori, getKategoriMerk, addAccount, getAccount, addShoppingCart, getShoppingCart, updateShoppingCart, searchBarang, addFavoriteUser, getFavoriteUser, deleteShoppingCart, deleteFavoriteUser, addAlamat, getAlamat, updateAlamatUtama, deleteAlamat } = require("./function");

app.get("/", welcome);
app.get("/barang", getBarang);
app.get("/barang/:barang_id", getDetailBarang);
app.post("/addBarang", addBarang);
app.get("/searchBarang", searchBarang);
app.get("/kategori", getKategori);
app.get("/kategoriMerk", getKategoriMerk);
app.get("/shoppingCart/:user_id", getShoppingCart);
app.post("/addShoppingCart", addShoppingCart);
app.patch("/updateShoppingCart/:user_id/:keranjang_id", updateShoppingCart);
app.delete("/deleteShoppingCart/:user_id/:keranjang_id?", deleteShoppingCart);
app.get("/favoriteUser/:user_id", getFavoriteUser);
app.post("/addFavoriteUser", addFavoriteUser);
app.delete("/deleteFavoriteUser/:user_id/:barang_id?", deleteFavoriteUser);
app.get("/alamat/:user_id", getAlamat);
app.post("/addAlamat", addAlamat);
app.delete("/deleteAlamat/:user_id/:alamat_id?", deleteAlamat);
app.patch("/updateAlamatUtama/:user_id/:alamat_id", updateAlamatUtama);
app.get("/account/:user_id", getAccount);
app.post("/addAccount", addAccount);


const mysqlConnection = require("./db");
const { v4: uuidv4 } = require('uuid');

function welcome(req, res) {
    return res.json({
        status: "success",
        message: "Welcome to Nelshop API",
        informasi: {
            list_semua_barang: "api/barang",
            detail_barang: "api/barang/{barang_id}",
            tambah_barang: "api/addBarang",
            cari_barang: "api/searchBarang?q={query}",
            list_kategori: "api/kategori",
            list_kategori_merk: "api/kategoriMerk",
            tambah_keranjang: "api/addShoppingCart",
            lihat_keranjang: "api/shoppingCart/{user_id}",
            update_keranjang: "api/updateShoppingCart/{user_id}/{keranjang_id}",
            hapus_keranjang: "api/deleteShoppingCart/{user_id}/{keranjang_id}",
            tambah_favorite: "api/addFavoriteUser",
            lihat_favorite: "api/favoriteUser/{user_id}",
            hapus_favorite: "api/deletefavoriteUser/{user_id}/{barang_id}",
            buat_alamat: "api/addAlamat",
            lihat_alamat: "api/alamat/{user_id}",
            hapus_alamat: "api/deleteAlamat/{user_id}/{alamat_id}",
            update_alamat_utama: "api/updateAlamatUtama/{user_id}{alamat_id}",
            buat_akun: "api/addAccount",
            detail_akun: "api/account/{user_id}"
        },
    });
}

function getBarang(req, res) {
    mysqlConnection.query("SELECT barang_id,kategori_id,kategori_merk_id, nama_barang,gambar,harga,terjual FROM barang", (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan data barang"
            });
        }
        else {
            return res.json({
                status: "success",
                data: results,
            });
        }
    });
}

function getDetailBarang(req, res) {
    const { barang_id } = req.params
    mysqlConnection.query("SELECT * FROM barang WHERE barang_id=?", [barang_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan data barang"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "barang tidak ditemukan"
            });
        }
        return res.json({
            status: "success",
            data: results,
        });
    });
}

function addBarang(req, res) {
    const { kategori_id, nama_barang, spesifikasi, gambar, berat, harga, stok, status, kategori_merk_id } = req.body;
    const barang_id = uuidv4();
    if (!barang_id) {
        return res.status(404).json({
            status: "fail",
            message: "barang_id wajib diisi!"
        });
    }
    else if (!kategori_id) {
        return res.status(404).json({
            status: "fail",
            message: "kategori_id wajib diisi!"
        });
    }
    else if (!nama_barang) {
        return res.status(404).json({
            status: "fail",
            message: "nama barang wajib diisi!"
        });
    }
    else if (!spesifikasi) {
        return res.status(404).json({
            status: "fail",
            message: "spesifikasi wajib diisi!"
        });
    }
    else if (!gambar) {
        return res.status(404).json({
            status: "fail",
            message: "gambar wajib diisi!"
        });
    }
    else if (!berat) {
        return res.status(404).json({
            status: "fail",
            message: "berat wajib diisi!"
        });
    }
    else if (!harga) {
        return res.status(404).json({
            status: "fail",
            message: "harga wajib diisi!"
        });
    }
    else if (!stok) {
        return res.status(404).json({
            status: "fail",
            message: "stok wajib diisi!"
        });
    }
    else if (!status) {
        return res.status(404).json({
            status: "fail",
            message: "status wajib diisi!"
        });
    }
    else if (!kategori_merk_id) {
        return res.status(404).json({
            status: "fail",
            message: "kategori_merk_id wajib diisi!"
        });
    }

    mysqlConnection.query("INSERT INTO barang (barang_id,kategori_id,nama_barang,spesifikasi,gambar,berat,harga,stok,status,kategori_merk_id) VALUES (?,?,?,?,?,?,?,?,?,?)", [barang_id, kategori_id, nama_barang, spesifikasi, gambar, berat, harga, stok, status, kategori_merk_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal menambahkan data barang"
            });
        }
        return res.json({
            status: "success",
            message: "data barang berhasil ditambah",
        });
    });
}

function searchBarang(req, res) {
    const search = req.query.q;
    if (!search) {
        mysqlConnection.query("SELECT barang_id,kategori_id,kategori_merk_id, nama_barang,gambar,harga FROM barang", (err, results) => {
            if (err) {
                return res.json({
                    status: "fail",
                    message: "gagal cari barang"
                });
            }
            return res.json({
                status: "success",
                data: results
            });
        });
    }
    else {
        mysqlConnection.query("SELECT barang_id,kategori_id,kategori_merk_id, nama_barang,gambar,harga FROM barang WHERE nama_barang LIKE ?", [`${search}%`], (err, results) => {
            if (err) {
                return res.json({
                    status: "fail",
                    message: "gagal cari barang"
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    message: "barang yang dicari tidak ditemukan!"
                });
            }
            return res.json({
                status: "success",
                data: results
            });
        });
    }

}

function getKategori(req, res) {
    mysqlConnection.query("SELECT * FROM kategori", (err, results) => {
        if (err) {
            return res.json({
                status: "fail",
                message: "gagal mendapatkan kategori"
            });
        }
        return res.json({
            status: "success",
            data: results
        });
    });
}

function getKategoriMerk(req, res) {
    mysqlConnection.query("SELECT * FROM kategori_merk", (err, results) => {
        if (err) {
            return res.json({
                status: "fail",
                message: "gagal mendapatkan kategori"
            });
        }
        return res.json({
            status: "success",
            data: results
        });
    });
}

function addShoppingCart(req, res) {
    const { user_id, barang_id, nama_barang, kategori, gambar, berat, harga, quantity, total_harga } = req.body;
    const keranjang_id = uuidv4();
    if (!keranjang_id) {
        return res.status(404).json({
            status: "fail",
            message: "keranjang id kosong,silahkan perbaiki!"
        });
    }
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong,silahkan perbaiki!"
        });
    }
    if (!barang_id) {
        return res.status(404).json({
            status: "fail",
            message: "barang id kosong,silahkan perbaiki!"
        });
    }
    if (!quantity) {
        return res.status(404).json({
            status: "fail",
            message: "quantity kosong,silahkan perbaiki!"
        });
    }
    if (!total_harga) {
        return res.status(404).json({
            status: "fail",
            message: "total harga kosong,silahkan perbaiki!"
        });
    }
    if (!nama_barang) {
        return res.status(404).json({
            status: "fail",
            message: "nama barang kosong,silahkan perbaiki!"
        });
    }
    if (!harga) {
        return res.status(404).json({
            status: "fail",
            message: "harga kosong,silahkan perbaiki!"
        });
    }
    if (!berat) {
        return res.status(404).json({
            status: "fail",
            message: "berat kosong,silahkan perbaiki!"
        });
    }
    if (!gambar) {
        return res.status(404).json({
            status: "fail",
            message: "gambar kosong,silahkan perbaiki!"
        });
    }
    if (!kategori) {
        return res.status(404).json({
            status: "fail",
            message: "kategori kosong,silahkan perbaiki!"
        });
    }
    mysqlConnection.query("SELECT * FROM keranjang WHERE user_id = ? AND barang_id = ?", [user_id, barang_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan data barang"
            });
        }

        if (results.length > 0) {
            // Jika barang sudah ada, update quantity dan total_harga
            const newQuantity = results[0].quantity + quantity;
            const newTotalHarga = results[0].total_harga + total_harga;

            mysqlConnection.query("UPDATE keranjang SET quantity = ?, total_harga = ? WHERE user_id = ? AND barang_id = ?",
                [newQuantity, newTotalHarga, user_id, barang_id],
                (err, results) => {
                    if (err) {
                        return res.status(404).json({
                            status: "fail",
                            message: "gagal memperbarui data barang"
                        });
                    }
                    return res.json({
                        status: "success",
                        message: "data barang berhasil memperbarui"
                    });
                });
        } else {
            // Jika barang belum ada, tambahkan barang baru ke keranjang
            mysqlConnection.query("INSERT INTO keranjang (keranjang_id,user_id,barang_id, nama_barang,kategori,gambar,berat,harga,quantity,total_harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
                [keranjang_id, user_id, barang_id, nama_barang, kategori, gambar, berat, harga, quantity, total_harga],
                (err, results) => {
                    if (err) {
                        return res.status(404).json({
                            status: "fail",
                            message: "Gagal menambahkan data ke keranjang"
                        });
                    }
                    return res.json({
                        status: "success",
                        message: "Berhasil menambahkan data ke keranjang"
                    });
                });
        }
    });
}

function getShoppingCart(req, res) {
    const { user_id } = req.params;
    mysqlConnection.query("SELECT * FROM keranjang WHERE user_id=?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan data keranjang"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "data keranjang tidak ditemukan"
            });
        }
        mysqlConnection.query("SELECT SUM(total_harga) AS total_bayar FROM keranjang WHERE user_id=?", [user_id], (err, totalResult) => {
            if (err) {
                return res.status(404).json({
                    status: "fail",
                    message: "gagal menghitung total bayar"
                });
            }
            mysqlConnection.query("SELECT SUM(berat) AS total_berat FROM keranjang WHERE user_id=?", [user_id], (err, beratResult) => {
                if (err) {
                    return res.status(404).json({
                        status: "fail",
                        message: "gagal menghitung total berat"
                    });
                }
                return res.json({
                    status: "success",
                    data: results,
                    total_berat: parseInt(beratResult[0].total_berat),
                    total_bayar: parseInt(totalResult[0].total_bayar)
                });
            });

        });
    });
}


function updateShoppingCart(req, res) {
    const { user_id, keranjang_id } = req.params;
    const { quantity, total_harga } = req.body;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong,silahkan perbaiki!"
        });
    }
    if (!keranjang_id) {
        return res.status(404).json({
            status: "fail",
            message: "keranjang id kosong,silahkan perbaiki!"
        });
    }
    mysqlConnection.query("UPDATE keranjang SET quantity=?,total_harga=? WHERE user_id = ? AND keranjang_id=?", [quantity, total_harga, user_id, keranjang_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal update data keranjang"
            });
        }
        return res.json({
            status: "success",
            message: "data keranjang berhasil diupdate!"
        });
    });
}

function deleteShoppingCart(req, res) {
    const { user_id, keranjang_id } = req.params;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id tidak boleh kosong"
        });
    }
    // Jika keranjang_id tidak diberikan, hapus semua barang di keranjang untuk user_id tersebut
    let query = "DELETE FROM keranjang WHERE user_id = ?";
    let params = [user_id];
    if (keranjang_id) {
        // Jika keranjang_id diberikan, hapus hanya barang yang sesuai dengan keranjang_id dan user_id
        query += " AND keranjang_id = ?";
        params.push(keranjang_id);
    }
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal menghapus barang dari keranjang"
            });
        }
        // Cek apakah ada barang yang dihapus
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada barang yang ditemukan untuk dihapus"
            });
        }
        return res.json({
            status: "success",
            message: "Barang berhasil dihapus dari keranjang"
        });
    });
}


function addFavoriteUser(req, res) {
    const favorite_user_id = uuidv4();
    const { user_id, barang_id, nama_barang, harga, gambar, kategori } = req.body;
    if (!favorite_user_id) {
        return res.status(404).json({
            status: "fail",
            message: "favorite user id kosong, silahkan perbaiki!"
        });
    }
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong, silahkan perbaiki!"
        });
    }
    if (!barang_id) {
        return res.status(404).json({
            status: "fail",
            message: "barang id kosong, silahkan perbaiki!"
        });
    }
    if (!nama_barang) {
        return res.status(404).json({
            status: "fail",
            message: "nama barang kosong,silahkan perbaiki!"
        });
    }
    if (!harga) {
        return res.status(404).json({
            status: "fail",
            message: "harga kosong,silahkan perbaiki!"
        });
    }
    if (!gambar) {
        return res.status(404).json({
            status: "fail",
            message: "gambar kosong,silahkan perbaiki!"
        });
    }
    if (!kategori) {
        return res.status(404).json({
            status: "fail",
            message: "kategori kosong,silahkan perbaiki!"
        });
    }
    mysqlConnection.query("SELECT * FROM favorite_user WHERE user_id = ? AND barang_id = ?", [user_id, barang_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal memeriksa favorit user"
            });
        }
        if (results.length > 0) {
            return res.status(404).json({
                status: "fail",
                message: "Barang ini sudah ada di favorit user"
            });
        }
        // Jika barang belum ada di favorit tambahkan data
        mysqlConnection.query("INSERT INTO favorite_user (favorite_user_id, user_id, barang_id, nama_barang, harga, gambar, kategori) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [favorite_user_id, user_id, barang_id, nama_barang, harga, gambar, kategori], (err, results) => {
                if (err) {
                    return res.status(404).json({
                        status: "fail",
                        message: "Gagal menambahkan barang ke favorit"
                    });
                }
                return res.json({
                    status: "success",
                    message: "Barang berhasil ditambahkan ke favorit"
                });
            });
    });
}

function getFavoriteUser(req, res) {
    const { user_id } = req.params;
    mysqlConnection.query("SELECT * FROM favorite_user WHERE user_id=?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan favorite user"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "data favorite user tidak ada"
            });
        }
        return res.json({
            status: "success",
            data: results
        });
    });
}

function deleteFavoriteUser(req, res) {
    const { user_id, barang_id } = req.params;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id tidak boleh kosong"
        });
    }
    let query = "DELETE FROM favorite_user WHERE user_id = ?";
    let params = [user_id];
    if (barang_id) {
        query += " AND barang_id = ?";
        params.push(barang_id);
    }
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal menghapus favorite user"
            });
        }
        // Cek apakah ada barang yang dihapus
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada favorite user yang ditemukan untuk dihapus"
            });
        }
        return res.json({
            status: "success",
            message: "favorite user berhasil dihapus"
        });
    });
}

function addAlamat(req, res) {
    const alamat_id = uuidv4();
    const { user_id, nama_penerima, no_handphone, alamat_rumah, provinsi_id, provinsi, kota_kabupaten_id, kota_kabupaten, kode_pos, alamat_utama } = req.body;
    const alamatUtama = alamat_utama ? 1 : 0;
    if (!alamat_id) {
        return res.status(404).json({
            status: "fail",
            message: "alamat id kosong, silahkan perbaiki!"
        });
    }
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong, silahkan perbaiki!"
        });
    }
    if (!nama_penerima) {
        return res.status(404).json({
            status: "fail",
            message: "nama penerima kosong, silahkan perbaiki!"
        });
    }
    if (!no_handphone) {
        return res.status(404).json({
            status: "fail",
            message: "no handphone kosong, silahkan perbaiki!"
        });
    }
    if (!alamat_rumah) {
        return res.status(404).json({
            status: "fail",
            message: "alamat rumah kosong, silahkan perbaiki!"
        });
    }
    if (!provinsi_id) {
        return res.status(404).json({
            status: "fail",
            message: "provinsi id kosong, silahkan perbaiki!"
        });
    }
    if (!provinsi) {
        return res.status(404).json({
            status: "fail",
            message: "provinsi kosong, silahkan perbaiki!"
        });
    }
    if (!kota_kabupaten_id) {
        return res.status(404).json({
            status: "fail",
            message: "kota/kabupaten id kosong, silahkan perbaiki!"
        });
    }
    if (!kota_kabupaten) {
        return res.status(404).json({
            status: "fail",
            message: "kota/kabupaten kosong, silahkan perbaiki!"
        });
    }
    if (!kode_pos) {
        return res.status(404).json({
            status: "fail",
            message: "kode pos kosong, silahkan perbaiki!"
        });
    }

    mysqlConnection.query("INSERT INTO alamat (alamat_id,user_id,nama_penerima,no_handphone,alamat_rumah,provinsi_id,provinsi,kota_kabupaten_id,kota_kabupaten,kode_pos,alamat_utama) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [alamat_id, user_id, nama_penerima, no_handphone, alamat_rumah, provinsi_id, provinsi, kota_kabupaten_id, kota_kabupaten, kode_pos, alamatUtama], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal membuat alamat"
            });
        }
        return res.json({
            status: "success",
            message: "Alamat berhasil dibuat!"
        });
    });
}

function getAlamat(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong, silahkan perbaiki!"
        });
    }
    mysqlConnection.query("SELECT * FROM alamat WHERE user_id=?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal get alamat"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "alamat belum dibuat"
            });
        }
        return res.json({
            status: "success",
            data: results,
        });
    });
}

function updateAlamatUtama(req, res) {
    const { user_id, alamat_id } = req.params;
    const { alamat_utama } = req.body;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong, silahkan perbaiki!"
        });
    }
    if (!alamat_id) {
        return res.status(404).json({
            status: "fail",
            message: "alamat id kosong, silahkan perbaiki!"
        });
    }
    if (!alamat_utama) {
        return res.status(404).json({
            status: "fail",
            message: "alamat utama kosong, silahkan perbaiki!"
        });
    }
    mysqlConnection.query("UPDATE alamat SET alamat_utama=0 WHERE user_id = ?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal update alamat utama"
            });
        }
        mysqlConnection.query("UPDATE alamat SET alamat_utama=? WHERE user_id= ? AND alamat_id=?", [alamat_utama, user_id, alamat_id], (err, results) => {
            if (err) {
                return res.status(404).json({
                    status: "fail",
                    message: "Gagal update alamat utama"
                });
            }
            return res.json({
                status: "success",
                message: "Berhasil update alamat utama"
            });
        });
    });
}

function deleteAlamat(req, res) {
    const { user_id, alamat_id } = req.params;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id tidak boleh kosong"
        });
    }
    let query = "DELETE FROM alamat WHERE user_id = ?";
    let params = [user_id];
    if (alamat_id) {
        query += " AND alamat_id = ?";
        params.push(alamat_id);
    }
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal menghapus alamat"
            });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada alamat yang ingin dihapus"
            });
        }
        return res.json({
            status: "success",
            message: "Alamat berhasil dihapus!"
        });
    });
}


function addAccount(req, res) {
    const { user_id, role, nama, email } = req.body;
    if (!user_id) {
        return res.status(404).json({
            status: "fail",
            message: "user id kosong, silahkan perbaiki!"
        });
    }
    if (!role) {
        return res.status(404).json({
            status: "fail",
            message: "role kosong, wajib diisi!"
        });
    }
    if (!nama) {
        return res.status(404).json({
            status: "fail",
            message: "nama kosong, wajib diisi!"
        });
    }
    if (!email) {
        return res.status(404).json({
            status: "fail",
            message: "email kosong, wajib diisi!"
        });
    }
    // cek user_id ada di database
    mysqlConnection.query("SELECT * FROM user WHERE user_id = ?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal memeriksa user_id akun"
            });
        }
        if (results.length > 0) {
            return res.json({
                status: "fail",
                message: "Akun sudah terdaftar!"
            });
        }
        // Jika user_id belum ada, lakukan penyisipan data
        mysqlConnection.query("INSERT INTO user (user_id, role, nama, email) VALUES (?, ?, ?, ?)", [user_id, role, nama, email], (err, results) => {
            if (err) {
                return res.status(404).json({
                    status: "fail",
                    message: "Gagal membuat akun"
                });
            }
            return res.json({
                status: "success",
                message: "Akun berhasil dibuat!"
            });
        });
    });
}


function getAccount(req, res) {
    const { user_id } = req.params;
    mysqlConnection.query("SELECT * FROM user WHERE user_id=?", [user_id], (err, results) => {
        if (err) {
            return res.status(404).json({
                status: "fail",
                message: "gagal mendapatkan akun"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "akun tidak ditemukan"
            });
        }
        return res.json({
            status: "success",
            data: results
        });
    });
}

module.exports = { welcome, getBarang, getDetailBarang, addBarang, searchBarang, getKategori, getKategoriMerk, addShoppingCart, getShoppingCart, updateShoppingCart, deleteShoppingCart, addFavoriteUser, deleteFavoriteUser, getFavoriteUser, addAlamat, getAlamat, deleteAlamat, updateAlamatUtama, addAccount, getAccount }
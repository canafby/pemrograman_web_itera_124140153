const STORAGE_KEY = "miniPOS_cart_cania";

const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productQty = document.getElementById("productQty");
const cartBody = document.getElementById("cartBody");
const cashInput = document.getElementById("cashInput");

const rupiah = (amount) => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
}).format(amount);

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Gagal membaca keranjang dari localStorage:", error);
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal >= 50000 ? Math.round(subtotal * 0.10) : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function showError(input, errorId, message) {
  input.classList.toggle("invalid", Boolean(message));
  document.getElementById(errorId).textContent = message;
}

function clearFormErrors() {
  showError(productName, "nameError", "");
  showError(productPrice, "priceError", "");
  showError(productQty, "qtyError", "");
}

function validateProduct() {
  clearFormErrors();
  let valid = true;

  const name = productName.value.trim();
  const priceText = productPrice.value.trim();
  const qtyText = productQty.value.trim();
  const price = Number(priceText);
  const qty = Number(qtyText);

  if (name.length < 3) {
    showError(productName, "nameError", "Nama barang wajib diisi minimal 3 karakter.");
    valid = false;
  }
  if (priceText === "" || !Number.isFinite(price) || price < 500) {
    showError(productPrice, "priceError", "Harga wajib berupa angka minimal Rp500.");
    valid = false;
  }
  if (qtyText === "" || !Number.isInteger(qty) || qty < 1) {
    showError(productQty, "qtyError", "Jumlah wajib berupa angka bulat minimal 1.");
    valid = false;
  }
  return valid;
}

function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `<tr class="empty-row"><td colspan="6">
      <div class="empty-state"><span class="empty-icon">🛒</span>
      <strong>Keranjang masih kosong</strong>
      <span>Tambahkan barang untuk memulai transaksi.</span></div>
    </td></tr>`;
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      const values = [
        String(index + 1),
        item.name,
        rupiah(item.price),
        String(item.qty),
        rupiah(item.price * item.qty)
      ];
      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Hapus";
      deleteButton.setAttribute("aria-label", `Hapus ${item.name}`);
      deleteButton.addEventListener("click", () => removeItem(item.id));
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
      cartBody.appendChild(row);
    });
  }

  document.getElementById("itemCount").textContent =
    `${cart.reduce((sum, item) => sum + item.qty, 0)} item`;
  updateSummary();
}

function updateSummary() {
  const { subtotal, discount, total } = getTotals();
  document.getElementById("subtotalDisplay").textContent = rupiah(subtotal);
  document.getElementById("discountDisplay").textContent = `− ${rupiah(discount)}`;
  document.getElementById("totalDisplay").textContent = rupiah(total);

  const discountNote = document.getElementById("discountNote");
  if (discount > 0) {
    discountNote.textContent = "Diskon 10% berhasil diterapkan karena belanja mencapai Rp50.000.";
    discountNote.classList.add("eligible");
  } else {
    discountNote.textContent = "Belanja minimal Rp50.000 untuk mendapatkan diskon 10%.";
    discountNote.classList.remove("eligible");
  }
  updatePayment();
}

function updatePayment() {
  const { total } = getTotals();
  const cashText = cashInput.value.trim();
  const cash = Number(cashText);
  const changeBox = document.getElementById("changeBox");
  const changeDisplay = document.getElementById("changeDisplay");
  const paymentMessage = document.getElementById("paymentMessage");
  const finishBtn = document.getElementById("finishBtn");
  const cashError = document.getElementById("cashError");

  changeBox.classList.remove("success", "warning");
  cashInput.classList.remove("invalid");
  cashError.textContent = "";
  finishBtn.disabled = cart.length === 0 || cashText === "" || !Number.isFinite(cash) || cash < total;

  if (cart.length === 0) {
    changeDisplay.textContent = rupiah(0);
    paymentMessage.textContent = "Tambahkan barang terlebih dahulu.";
  } else if (cashText === "") {
    changeDisplay.textContent = rupiah(0);
    paymentMessage.textContent = "Masukkan nominal uang bayar.";
  } else if (!Number.isFinite(cash) || cash < 0) {
    changeDisplay.textContent = rupiah(0);
    paymentMessage.textContent = "Nominal uang bayar tidak valid.";
    cashInput.classList.add("invalid");
    cashError.textContent = "Masukkan nominal uang yang valid.";
  } else if (cash < total) {
    changeDisplay.textContent = rupiah(0);
    paymentMessage.textContent = `Uang kurang ${rupiah(total - cash)}.`;
    changeBox.classList.add("warning");
    cashError.textContent = "Uang bayar belum mencukupi.";
    cashInput.classList.add("invalid");
  } else {
    changeDisplay.textContent = rupiah(cash - total);
    paymentMessage.textContent = "Uang mencukupi. Transaksi siap diselesaikan.";
    changeBox.classList.add("success");
  }
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("formSuccess").textContent = "";

  if (!validateProduct()) return;

  const name = productName.value.trim();
  const price = Number(productPrice.value);
  const qty = Number(productQty.value);

  // Jika nama dan harga sama, jumlahnya digabung ke item yang sudah ada.
  const existingItem = cart.find((item) =>
    item.name.toLowerCase() === name.toLowerCase() && item.price === price
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      price,
      qty
    });
  }

  saveCart();
  renderCart();
  productForm.reset();
  productQty.value = "1";
  clearFormErrors();
  document.getElementById("formSuccess").textContent = `${name} berhasil ditambahkan ke keranjang.`;
  productName.focus();
});

[productName, productPrice, productQty].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
    const errorId = { productName: "nameError", productPrice: "priceError", productQty: "qtyError" }[input.id];
    document.getElementById(errorId).textContent = "";
  });
});

cashInput.addEventListener("input", updatePayment);

document.getElementById("clearCartBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  const confirmed = window.confirm("Yakin ingin mengosongkan semua barang di keranjang?");
  if (!confirmed) return;
  cart = [];
  saveCart();
  cashInput.value = "";
  renderCart();
  document.getElementById("formSuccess").textContent = "Keranjang berhasil dikosongkan.";
});

document.getElementById("newTransactionBtn").addEventListener("click", () => {
  cart = [];
  localStorage.removeItem(STORAGE_KEY);
  cashInput.value = "";
  productForm.reset();
  productQty.value = "1";
  clearFormErrors();
  document.getElementById("formSuccess").textContent = "Transaksi baru siap dimulai.";
  renderCart();
});

document.getElementById("finishBtn").addEventListener("click", () => {
  const { total } = getTotals();
  const cash = Number(cashInput.value);
  if (cart.length === 0 || !Number.isFinite(cash) || cash < total) {
    updatePayment();
    return;
  }

  window.alert(`Transaksi berhasil!\\nTotal: ${rupiah(total)}\\nUang bayar: ${rupiah(cash)}\\nKembalian: ${rupiah(cash - total)}`);
  cart = [];
  localStorage.removeItem(STORAGE_KEY);
  cashInput.value = "";
  renderCart();
  document.getElementById("formSuccess").textContent = "Transaksi selesai. Keranjang siap digunakan kembali.";
});

document.getElementById("todayDate").textContent = new Intl.DateTimeFormat("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
}).format(new Date());

renderCart();

// hiện danh sách: done ✔
// thêm: done ✔
// xóa: done ✔
// cập chật: done ✔

//      Todo:👇

// validation

//fetch data
let globalProduct = [];
const fetchProduct = async () => {
  try {
    const res = await axios({
      url: "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone",
      method: "GET",
    });
    globalProduct = res.data;
    renderProduct();
  } catch (error) {
    console.log(error);
  }
};

// hiện danh sách sp
const renderProduct = (data) => {
  if (!data) data = globalProduct;
  let html = "";
  for (let item of globalProduct) {
    html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><img src="${item.img}" alt=""></td>
                <td>
                <p>Màn hình: ${item.screen}</p>
                <p>Camera sau: ${item.backCamera}</p>
                <p>Camera trước: ${item.frontCamera}</p>
                <p>${item.desc}</p>
                </td>
                <td>
                   <button class="btn btn_update" onclick="fetchUpdateProduct('${item.id}')">Cập nhật</button>
                   <button class="btn btn_delete" onclick="deleteProduct('${item.id}')">Xóa</button>
                </td>
            </tr>`;
  }
  document.getElementById("productList").innerHTML = html;
};

// thêm sp
const createProduct = async () => {
  if (!validateForm()) return;
  const name = document.getElementById("product_name").value;
  const price = document.getElementById("product_price").value;
  const img = document.getElementById("product_img").value;
  const screen = document.getElementById("product_screen").value;
  const backCamera = document.getElementById("product_backCamera").value;
  const frontCamera = document.getElementById("product_frontCamera").value;
  const type = document.getElementById("product_type").value;
  const desc = document.getElementById("product_desc").value;
  const newProduct = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  try {
    await axios({
      url: "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone",
      method: "POST",
      data: newProduct,
    });
    closeForm();
    fetchProduct();
  } catch (error) {
    console.log(error);
  }
};

// xóa sp
const deleteProduct = async (productId) => {
  try {
    await axios({
      url:
        "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone/" + productId,
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  fetchProduct();
};

// cập chật
const fetchUpdateProduct = async (productId) => {
  try {
    const res = await axios({
      url:
        "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone/" + productId,
      method: "GET",
    });
    const product = res.data;
    document.getElementById("product_id").value = product.id;
    document.getElementById("product_name").value = product.name;
    document.getElementById("product_price").value = product.price;
    document.getElementById("product_img").value = product.img;
    document.getElementById("product_screen").value = product.screen;
    document.getElementById("product_backCamera").value = product.backCamera;
    document.getElementById("product_frontCamera").value = product.frontCamera;
    document.getElementById("product_type").value = product.type;
    document.getElementById("product_desc").value = product.desc;
    document.getElementById("input_form").style.display = "block";
    document.getElementById("createProduct").style.display = "none";
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async () => {
  if (!validateForm()) return;
  const productId = document.getElementById("product_id").value;
  const name = document.getElementById("product_name").value;
  const price = document.getElementById("product_price").value;
  const img = document.getElementById("product_img").value;
  const screen = document.getElementById("product_screen").value;
  const backCamera = document.getElementById("product_backCamera").value;
  const frontCamera = document.getElementById("product_frontCamera").value;
  const type = document.getElementById("product_type").value;
  const desc = document.getElementById("product_desc").value;
  const newProduct = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  try {
    await axios({
      url:
        "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone/" + productId,
      method: "PUT",
      data: newProduct,
    });
    fetchProduct();
    closeForm();
  } catch (error) {
    console.log(error);
  }
};

// validate
const validateForm = () => {
  isValid = true;
  const productName = document.getElementById("product_name").value.trim();
  const productPrice = document.getElementById("product_price").value.trim();
  const productType = document.getElementById("product_type").value;
  const productImg = document.getElementById("product_img").value.trim();
  isValid &=
    required(productName, "warn_name") && checkString(productName, "warn_name");
  isValid &= required(productPrice, "warn_price");
  isValid &= required(productType, "warn_type");
  if (productImg) isValid &= checkImageURL(productImg, "warn_img");
  return isValid;
};

// Patern
const checkString = (val, spanId) => {
  var pattern = /^[\w\s\d]+$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "Chỉ nhập ký tự A-Z, 0-9";
  return false;
};

const required = (val, spanId) => {
  if (!val.length) {
    document.getElementById(spanId).innerHTML = "*Thông tin bắt buộc";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
const checkNumber = (val, spanId) => {
  var pattern = /^[0-9.]+$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "Chỉ nhập số";
  return false;
};
const checkImageURL = (val, spanId) => {
  var pattern = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML =
    "URL không hợp lệ (https://....png|jpg|jpeg|gif|svg)";
  return false;
};

// form control
const showForm = () => {
  document.getElementById("input_form").style.display = "block";
  document.getElementById("updateProduct").style.display = "none";
};
const closeForm = () => {
  document.getElementById("btnReset").click();
  document.getElementById("input_form").style.display = "none";
  document.getElementById("createProduct").style.display = "block";
  document.getElementById("updateProduct").style.display = "block";
  const warnSpan = document.getElementsByClassName("warn_span");
  for (let item of warnSpan) {
    item.innerHTML = "";
  }
};

//window.load
window.onload = function () {
  fetchProduct();
  document
    .getElementById("createProduct")
    .addEventListener("click", createProduct);
  document
    .getElementById("updateProduct")
    .addEventListener("click", updateProduct);
  document.getElementById("openForm").addEventListener("click", showForm);
  document.getElementById("closeForm").addEventListener("click", closeForm);
};

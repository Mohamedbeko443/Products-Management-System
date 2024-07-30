var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productDes = document.getElementById("ProductDes");
var productCat = document.getElementById("ProductCat");
var tableBody = document.getElementById("tableBody");
var addUpdateBtn = document.getElementById("addUpdateButton");
var currentIndex ;
var productContainer = [];


if(localStorage.getItem("allProducts"))
{
    productContainer = JSON.parse(localStorage.getItem("allProducts"));
    displayProducts(productContainer);
}
else
{
    productContainer = [];
}



function action() {

    if((addUpdateBtn.innerHTML == "Add Product")
    && nameRgx 
    && priceRgx 
    && desRgx 
    && catRgx
    )
    {
        addProduct();
    }
    else
    {
        updateProduct();
    }
}


function addProduct()
{
    var product = {
        name: productName.value,
        price: productPrice.value,
        des: productDes.value,
        cat: productCat.value
    };
    productContainer.push(product);
    localStorage.setItem("allProducts" , JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productDes.value = "";
    productCat.value = "";
}


function displayProducts(arrayContainer) {

    var box = ``;
    for (var i = 0; i < arrayContainer.length; i++) {
        box += ` <tr>
                                <td>${i + 1}</td>
                                <td>${arrayContainer[i].name}</td>
                                <td>${arrayContainer[i].price}</td>
                                <td>${arrayContainer[i].des}</td>
                                <td>${arrayContainer[i].cat}</td>
                                <td>
                                    <button class="btn btn-success mb-1" onclick = "deleteProduct(${i});" >Delete</button>
                                    <button class="btn btn-secondary mb-1" onclick = "getObj(${i});">Update</button>
                                </td>
                            </tr>`;
    }
    tableBody.innerHTML = box;
}


function deleteProduct(index){
    productContainer.splice(index , 1);
    localStorage.setItem("allProducts" , JSON.stringify(productContainer));
    displayProducts(productContainer);
}

function reset(){
    productContainer.splice(0,productContainer.length);
    // productContainer = [];
    localStorage.removeItem("allProducts");
    displayProducts(productContainer);
}


function search(term){
    var list = [];
for(var i =0 ; i<productContainer.length;i++)
{
    if( productContainer[i].name.toUpperCase().includes(term.toUpperCase()));
    {
        list.push(productContainer[i]);
    }
    }  
    displayProducts(list);
}


function getObj(index){
currentIndex = index;
productName.value = productContainer[index].name;
productPrice.value = productContainer[index].price;
productDes.value = productContainer[index].des;
productCat.value = productContainer[index].cat;
addUpdateBtn.innerHTML = "Update Product";

}


function updateProduct()
{
    var product = {
        name: productName.value,
        price: productPrice.value,
        des: productDes.value,
        cat: productCat.value
    };
    productContainer[currentIndex] = product;
    localStorage.setItem("allProducts" , JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
    addUpdateBtn.innerHTML = "Add Product";
}


function nameRgx (){
    var rgx = /^[A-z]{2,}.{1,}$/;
    if (rgx.test(productName.value)){
        productName.classList.remove('is-invalid');
        productName.classList.add('is-valid');
        return true;
    }else{
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        return false;
    }
}




function priceRgx (){
    var rgx = /^[1-9][0-9]{0,}$/;
    if (rgx.test(productPrice.value)){
        productPrice.classList.remove('is-invalid');
        productPrice.classList.add('is-valid');
        
    }else {
        productPrice.classList.remove('is-valid');
        productPrice.classList.add('is-invalid');
        
    }
}

function catRgx (){
    var rgx = /^[A-z]{2,}.{0,}$/;
    if (rgx.test(productCategory.value)){
        productCategory.classList.remove('is-invalid');
        productCategory.classList.add('is-valid');
    }else{
        productCategory.classList.remove('is-valid');
        productCategory.classList.add('is-invalid');
    }
}

function desRgx(){
    var rgx = /^.{3,}$/;
    if (rgx.test(productDescription.value)){
        productDescription.classList.add('is-valid');
        productDescription.classList.remove('is-invalid');
    }else {
        productDescription.classList.add('is-invalid');
        productDescription.classList.remove('is-valid');
    }
}
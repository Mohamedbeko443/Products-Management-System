

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

    if((addUpdateBtn.innerHTML == "Add Product") == true)
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
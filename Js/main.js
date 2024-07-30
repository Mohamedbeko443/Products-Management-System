

var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productDes = document.getElementById("ProductDes");
var productCat = document.getElementById("ProductCat");
var tableBody = document.getElementById("tableBody");
var productContainer = [];


if(localStorage.getItem("allProducts"))
{
    productContainer = JSON.parse(localStorage.getItem("allProducts"));
    displayProducts(productContainer);
}

function addProduct() {
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
                                    <button class="btn btn-secondary mb-1">Update</button>
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




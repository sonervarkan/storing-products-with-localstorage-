const api_key="0ddc89b2a6b074e99b57f97e";
const url=`https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`;

let conversion_rateofTRY;
fetch(url)
.then(res=>res.json())
.then(data=>{
    conversion_rateofTRY=data.conversion_rates["TRY"];
    calculateTotal(conversion_rateofTRY);
})
    
const productName=document.getElementById("productName");
const productModel=document.getElementById("productModel");
const productPrice=document.getElementById("productPrice");
const productCount=document.getElementById("productCount");
const addBtn=document.querySelector(".addBtn");
const updateBtn=document.querySelector(".updateBtn");
const deleteBtn=document.querySelector(".deleteBtn");
const cancelBtn=document.querySelector(".cancelBtn");
const totalTl=document.getElementById("total-tl");
const totalDolar=document.getElementById("total-dolar");
const tbody=document.getElementById("tbody");


let products=[];
let newProduct;
if(localStorage.getItem("products")!==null){
    amountProduct();
}

addBtn.addEventListener("click",function(){
    if (productName.value!=="" && productModel.value!=="" && productPrice.value!=="" && productCount.value!==""){
        addProduct();
    
    }
    else{
        alert("please fill in all the fields");
    }
});

function addProduct(){
   if (localStorage.getItem("products")===null){
    newProduct ={
        name:productName.value, 
        model:productModel.value,
        price:productPrice.value,  
        count:productCount.value,
        groupPrice:productPrice.value*productCount.value 
    }
    products.push(newProduct);

    localStorage.setItem("products",JSON.stringify(products));

    amountProduct();

   }
    else{
        products=JSON.parse(localStorage.getItem("products"));
        newProduct ={
            name:productName.value, 
            model:productModel.value,
            price:productPrice.value,  
            count:productCount.value,
            groupPrice:productPrice.value*productCount.value  
        }
        products.push(newProduct);

        localStorage.setItem("products",JSON.stringify(products));

        amountProduct();

    }
}

function amountProduct(){
    products=JSON.parse(localStorage.getItem("products"));
    for (let product of products){
        const {name,model,price,count,groupPrice}=product;
        const tr=`<tr>
            <td>${name}</td>
            <td>${model}</td>
            <td>${price}</td>
            <td>${count}</td>
            <td>${groupPrice}</td>

            
            
        </tr>`; 
        tbody.insertAdjacentHTML("beforeend", tr);
    }
}


function calculateTotal(conversion_rateofTRY){
    if(localStorage.getItem("products")){
         if(products.length!==null){
        products=JSON.parse(localStorage.getItem("products"));
       let Tl=0;
       let Dolar=0;
    
        for(let i=0;i<products.length;i++){
            Tl+=products[i].count*products[i].price;
        }
        totalTl.innerHTML=Tl;
  
        Dolar=Tl / conversion_rateofTRY;
        totalDolar.innerHTML=Dolar.toFixed(2);
        }

    }
 
}

deleteBtn.addEventListener("click",function(){
    if(localStorage.getItem("products")!==null){
        localStorage.removeItem("products");
    }
    else{
        alert("No product to delete found");
    }
});

cancelBtn.addEventListener("click",function(){
    productName.value="";
    productModel.value="";
    productPrice.value="";
    productCount.value="";
});


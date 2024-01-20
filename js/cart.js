let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');
const searchBox = document.querySelector('.search-box');
let strelka = document.querySelector('.side-menu-wrap .nav-item a i')
let sidebaritem = document.querySelector('.nav-item')  
const searchInput = document.querySelector('.field');

sidebaritem.addEventListener('click', () => {
    strelka.classList.toggle(`active`)
})


iconCart.addEventListener('click', () => {
    cart.classList.toggle(`active`)
})
close.addEventListener('click', () => {
    cart.classList.remove(`active`)
});


let products;

document.addEventListener("DOMContentLoaded", function () {
    let navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(navItem => {
        let selectBtn = navItem.querySelector("a");
        let sideMenu = navItem.querySelector(".side-menu");
        let sBtnText = navItem.querySelector(".sBtn-text");

        selectBtn.addEventListener("click", () => {
            sideMenu.classList.toggle("active");
        });

        options = sideMenu.querySelectorAll("li a");
        options.forEach(option => {
            option.addEventListener("click", (event) => {
                event.preventDefault();
                let selectedOption = option.innerText;
                sBtnText.innerText = selectedOption;
                sideMenu.classList.remove("active");
            });
        });
    });
});

fetch('http://localhost:3000/foodStorage')
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        products = data;
        // consol
        addDataToHtml();

        // ------search
        searchBox.addEventListener('submit', function (event) {
            event.preventDefault();
            let valueFilter = event.target;
            products = data.filter(item => {

                if (valueFilter.name.value != '') {
                    if (!item.name.includes(valueFilter.name.value)) {
                        return false;
                    }
                }
                return true
            })
            // console.log(productFilter)
            addDataToHtml(products);
        })

        let selectedKitchens = '';
        let selectedCategories = '';

        const categories = Array.from(document.querySelectorAll('.firstFilter li a'));
        categories.forEach(link => {
            link.addEventListener(`click`, () => {
                selectedCategories = link.textContent
            })
        })
        const kitchens = Array.from(document.querySelectorAll('.secondfilter li a'));
        kitchens.forEach(link => {
            link.addEventListener(`click`, () => {
                selectedKitchens = link.textContent
            })
        })




        // -----filterSidebar
        filterButton.addEventListener('click', function () {
            // let selectedCategories = '';
            const newlySelectedCategories = categories
                .filter(a => a.classList.contains('selected'))
                .map(a => a.textContent);
            console.log(newlySelectedCategories);
            if (newlySelectedCategories.length > 0) {
                selectedCategories = [...newlySelectedCategories];
            }


            // let selectedKitchens = '';
            const newlySelectedKitchens = kitchens
                .filter(a => a.classList.contains('selected'))
                .map(a => a.textContent);

            if (newlySelectedKitchens.length > 0) {
                selectedKitchens = [...newlySelectedKitchens];
            }

            const combinateSelect = {
                selectedCategories: selectedCategories,
                selectedKitchens: selectedKitchens
            }
            console.log(combinateSelect)


            products = data.filter(item => {
                if (combinateSelect.selectedCategories.length > 0) {
                    if (!combinateSelect.selectedCategories.includes(item.category)) {
                        return false;
                    }
                }

                if (combinateSelect.selectedKitchens.length > 0) {
                    if (!combinateSelect.selectedKitchens.includes(item.kitchen)) {
                        return false;
                    }
                }

                return true;
            });
            console.log(products)
            addDataToHtml(products);
        });

        // ------filter
        filter.addEventListener('submit', function (e) {
            e.preventDefault();
            let valueFilter = e.target;
            // let category = document.querySelector('.side-menu')
            products = data.filter(item => {

                if (valueFilter.category.value != '') {
                    if (item.category != valueFilter.category.value) {
                        return false;
                    }
                }

                if (valueFilter.kitchen.value != '') {
                    if (item.kitchen != valueFilter.kitchen.value) {
                        return false;
                    }
                }

                if (valueFilter.minPrice.value != '') {
                    if (item.price < valueFilter.minPrice.value) {
                        return false;
                    }
                }

                if (valueFilter.maxPrice.value != '') {
                    if (item.price > valueFilter.maxPrice.value) {
                        return false;
                    }
                }


                return true;
            })

            addDataToHtml(products);

        })
    })


// const filterSearch = document.querySelector('.search-box')
// fetch('http://localhost:3000/foodStorage')
//     .then(res => res.json())
//     .then(data => {

//     })

const filterItems = document.querySelectorAll('.side-menu li a');
filterItems.forEach(item => {
    item.addEventListener('click', function () {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
        } else {
            // Deselect other items
            filterItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('selected');
                }
            });
            this.classList.add('selected');
        }
    });
});


// product/////////////////////
function addDataToHtml() {
    let listProductHtml = document.querySelector('.listProduct');
    count.innerText = products.length;
    listProductHtml.innerHTML = '';
    products.sort(() => {
        return (0.5 - Math.random())
    })
    if (products != null) {
        products.forEach(el => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img class="item-img" src="${el.img}" alt="">
            <h2>${el.name}</h2>
            <div class="desc">${el.description}</div>
            <div class="price">${el.price}$</div>
            <button onclick="addCart(${el.id})">Add To Cart</button>`;
            listProductHtml.appendChild(newProduct);

        });
    }
}
let listCart = [];

function checkCart() {
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    } else {
        listCart = [];
    }
}
checkCart();



function addCart($idProduct) {
    let productCopy = JSON.parse(JSON.stringify(products));
    // Если продукта нету в корзинке
    if (!listCart[$idProduct]) {
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        // Добавление продукта в корзинку
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    } else {
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHtml()
};
addCartToHtml();
function addCartToHtml() {
    // очистка даты
    let listCartHtml = document.querySelector('.listCart');
    listCartHtml.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCart) {
        listCart.forEach(el => {
            if (el) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `
                <img src="${el.img}">
                <div class="content">
                    <div class="name">${el.name}</div>
                    <div class="price">${el.price}</div>
                </div>
                <div class="quantity">
                    <button class='cart-btn' onClick="changeQuantity(${el.id}, '-')">-</button>
                    <span class="value">${el.quantity}</span>
                    <button class='cart-btn' onClick="changeQuantity(${el.id}, '+')">+</button>
                </div>`

                listCartHtml.appendChild(newCart);
                totalQuantity = totalQuantity + el.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
};
function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // если значение равно 0,то удали его
            if (listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct];
            }
            break;


        default:
            break;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHtml();
}
// sidebar ///////////////////////
const clickSide = document.getElementById('sideBtn');
const activeSide = document.querySelector('aside');
const titlesForm = document.querySelectorAll('.sidebar-logo a');

let isHidden = false;

function toggleSideEl() {
    if (isHidden) {
        activeSide.style.left = '0px';
        activeSide.classList.remove('activeSide')
    } else {
        activeSide.style.left = '-290px';
        activeSide.classList.toggle('activeSide');
    }
    isHidden = !isHidden;
}
if (clickSide) {
    clickSide.addEventListener('click', () => {
        toggleSideEl();
    });
} else {
    console.error('Element with ID "sideBtn" not found.');
}

// accordion///////////
const accorColors = document.querySelectorAll('.nav-item');

accorColors.forEach((accorColor) => {
    const accordion = accorColor.querySelector('.side-menu');

    accorColor.addEventListener('click', () => {
        accordion.classList.toggle('activeItemb');
        accorColor.classList.toggle('activeItem');
    });
});
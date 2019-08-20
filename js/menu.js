const API_URL = "http://localhost:8090";

window.Shop = {

    addProductToCart: function (productId){
        let body = {
            clientId: 7,
            pizzaId: productId,
        };

        $.ajax({
            url:API_URL + "/cart",
            method: "PUT",
            //MIME type
            contentType: "application/json",
            data: JSON.stringify(body),
        }).done(function () {
            window.location.replace("order-list.html")
        });
    },



    getProducts:function(){
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Shop.displayProducts(response.content)
        });
    },

    getProductHtml:function(product){

        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                         <div><a class="product-name" data-product_id="${product.id}" href="/canvas/menu/?add-to-cart=${product.id}">
                        <div class="product-upper">
<!--                            <h2><a class="product-name" data-product_id="${product.id}" href="/canvas/menu/?add-to-cart=${product.id}"><img src="${product.imagePath}" alt=""></a></h2>-->
                            <img src="${product.imagePath}" alt="">
                        </div>
                        <h2><a class="product-name" data-product_id="${product.id}" href="/canvas/menu/?add-to-cart=${product.id}">${product.name}</a></h2></a></div>
                        <div class="product-carousel-price">
                            <ins>€${product.price}</ins> <del>€${product.salePrice}</del>
                        </div>
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=${product.id}">Add to order list</a>
                        </div>                       
                    </div>
                </div>`
    },

    displayProducts: function (products) {
        let productsHtml = "";
        products.forEach(item => productsHtml += Shop.getProductHtml(item));

        //cssSelector
        $('#products-container').html(productsHtml);
    },

    bindEvents: function () {
        $('#products-container').delegate(
            '.add_to_cart_button', 'click', function (event) {
            event.preventDefault();

            let productId = $(this).data('product_id');
            Shop.addProductToCart(productId)
        });
    },

    openProductInDetailPage: function (productId){
        $.ajax({
            url:API_URL + "/products/" + productId,
            method: "GET",
            //MIME type
            // contentType: "application/json",
            // data: JSON.stringify(body),
        }).done(function () {
            window.location.replace("detail-page.html?id="+ productId)
        });
    },

    openDetail: function () {
        $('#products-container').delegate(
            '.product-name', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');
                Shop.openProductInDetailPage(productId)
            });
    }
};

Shop.getProducts();
Shop.bindEvents();
Shop.openDetail();
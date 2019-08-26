const API_URL = "http://localhost:8090";

window.Detail_page = {


    getProduct:function(){
        let urlSearchParams = new URLSearchParams(window.location.search);
        let productId = urlSearchParams.get('id');
        $.ajax({
            url: API_URL + "/products/" + productId,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Detail_page.displayProduct(response);
            Detail_page.displayBreadcrumbs(response);
        });
    },


    getProductHtml:function(product){

		return `<div class="col-sm-6">
					<div class="product-images">
						<div class="product-main-img">
							<img src=${product.imagePath} alt="">
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="product-inner">
						<h2 class="product-name">${product.name}</h2>
						<div class="product-inner-price">
							<ins>€${product.price}</ins> <del>€${product.salePrice}</del>
						</div>
						<form action="" class="cart">
<!--								<button class="add_to_cart_button" type="submit">Add to cart</button>-->
							<a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=${product.id}">Add to order list</a>
						</form>
						<div role="tabpanel">
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane fade in active" id="home">
									<h2>Pizza Description</h2>
									<p>Weight: ${product.weight} Kg</p>
									<p>Ingredients: ${product.ingredients}</p>
									<p>Description: ${product.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>`
    },

    displayBreadcrumbsHtml:function(name) {
        return `<a href="">Online Pizza Store</a>
				<a href="menu.html">Menu</a>
				<a href="">${name}</a>`
    },

    displayProduct: function (product) {
        let productHtml = Detail_page.getProductHtml(product);

        //cssSelector
        $('#single-container').html(productHtml);
    },

    displayBreadcrumbs: function (product) {
        let productHtml = Detail_page.displayBreadcrumbsHtml(product.name);

        //cssSelector
        $('#breadcrumbs').html(productHtml);
    },

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

    bindEvents: function () {
        $('#single-container').delegate(
            '.add_to_cart_button', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');
                Detail_page.addProductToCart(productId)
            });
    },

    getProducts:function(){
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Detail_page.displayProductsMargin(response.content);
        });
    },

    // getProductsHtml:function(product){
    //     return `<div class="single-product">
    //                 <div class="product-f-image">
    //                     <img src="${product.imagePath}" alt="">
    //                     <div class="product-hover">
    //                         <a href="" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
    //                         <a href="" class="view-details-link"><i class="fa fa-link"></i> See details</a>
    //                     </div>
    //                 </div>
    //                 <h2><a href="">${product.name}</a></h2>
    //                 <div class="product-carousel-price">
    //                     <ins>€${product.price}</ins> <del>€${product.salePrice}</del>
    //                 </div>
    //             </div>`
    // },


    displayOnMarginHtml:function(product) {
        return `<div class="thubmnail-recent">
                    
                            <img src="${product.imagePath}" class="recent-thumb" alt="">
                            <h2><a class="product-name" data-pizza_id="${product.id}" href="detail-page.html?id=${product.id}">${product.name}</a></h2>
                            <div class="product-sidebar-price">
                                <ins>€${product.price}</ins> <del>€${product.salePrice}</del>
                            </div>
                                                      
                        </div>`
    },

    displayProductsMargin: function (products) {
        let productsHtml = "";
        products.forEach(item => productsHtml += Detail_page.displayOnMarginHtml(item));
        productsHtml = `<h2 class="sidebar-title">More PIZZA!!!</h2>` + productsHtml;
        //cssSelector
        $('#sidebar-products').html(productsHtml);

    },

    openProductInDetailPage: function (productId){
        $.ajax({
            url:API_URL + "/products/" + productId,
            method: "GET",

        }).done(function () {
            window.location.replace("detail-page.html?id="+ productId)
        });
    },

    openFromMargin: function () {
        $('#products-container').delegate(
            '.product-name', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('pizza_id');
                Detail_page.openProductInDetailPage(productId)
            });
    }

};


Detail_page.getProducts();
Detail_page.getProduct();
Detail_page.bindEvents();
Detail_page.openFromMargin();

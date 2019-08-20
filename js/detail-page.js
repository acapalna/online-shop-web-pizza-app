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
            Detail_page.displayProduct(response)
        });
    },


    getProductHtml:function(product){

		return `<div class="product-breadcroumb">
					<a href="">Online Pizza Store</a>
					<a href="menu.html">Menu</a>
					<a href="">${product.name}</a>
				</div>

				<div class="row">
					<div class="col-sm-6">
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
					</div>
				</div>`
    },

    displayProduct: function (product) {
        let productHtml = Detail_page.getProductHtml(product);

        //cssSelector
        $('.product-content-right').html(productHtml);
    },
};

Detail_page.getProduct();

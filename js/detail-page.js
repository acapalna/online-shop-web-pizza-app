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
								<ins>$${product.price}</ins> <del>$${product.salePrice}</del>
							</div>

							<form action="" class="cart">
								<div class="quantity">
									<input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1">
								</div>
								<button class="add_to_cart_button" type="submit">Add to cart</button>
							</form>

							<div class="product-inner-category">
								<p>Category: <a href="">Summer</a>. Tags: <a href="">awesome</a>, <a href="">best</a>, <a href="">sale</a>, <a href="">shoes</a>. </p>
							</div>

							<div role="tabpanel">
								<ul class="product-tab" role="tablist">
									<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Description</a></li>
									<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Reviews</a></li>
								</ul>
								<div class="tab-content">
									<div role="tabpanel" class="tab-pane fade in active" id="home">
										<h2>Pizza Description</h2>
										<p>${product.weight}</p>
										<p>${product.ingredients}</p>
										<p>${product.description}</p>
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

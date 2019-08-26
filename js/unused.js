const API_URL = "http://localhost:8090";

window.Unused = {
   getProducts:function(){
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Detail_page.displayProductsMargin(response.content);
            Detail_page.displayProductsCarousel(response.content);
        });
    },

    getProductsHtml:function(product){
        return `<div class="single-product">
                    <div class="product-f-image">
                        <img src="${product.imagePath}" alt="">
                        <div class="product-hover">
                            <a href="" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                            <a href="" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                        </div>
                    </div>
                    <h2><a href="">${product.name}</a></h2>
                    <div class="product-carousel-price">
                        <ins>€${product.price}</ins> <del>€${product.salePrice}</del>
                    </div> 
                </div>`
    },
    displayProductsCarousel: function (products) {
        let productsHtml = "";
        products.forEach(item => productsHtml += Unused.getProductsHtml(item));
        productsHtml = `<div class="related-products-wrapper">
                          <h2 class="related-products-title">Alte produse</h2>
                            <div class="related-products-carousel">` + productsHtml + `</div></div>`;
        //cssSelector
        $('.related-products-wrapper').html(productsHtml);
    },






};
function freshStyle(stylesheet){
    $('#mainStyle').attr('href',stylesheet);
}

$('#logo').click(function(event){
    event.preventDefault();
    var restyled = 'style.css';
    freshStyle(restyled);
});

Unused.getProducts();


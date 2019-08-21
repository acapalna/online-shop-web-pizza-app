const API_URL = "http://localhost:8090";
let total = 0;
window.Cart = {

    getCart:function(){
        let clientId = 7;

        $.ajax({
            url: API_URL + "/cart/" + clientId,
            method: "GET",

        }).done(function(response) {
            console.log(response);
            Cart.displayProducts(response.pizza);
        });
    },

    removeProductFromCart: function (productId){
        $.ajax({
            url:API_URL + "/cart?clientId=7&pizzaId="+ productId,
            method: "DELETE",
            contentType: "application/json",
        }).done(function () {
            window.location.replace("order-list.html")
        });
    },



    getProductHtml:function(product){
    return `<tr class="cart_item" id="${product.id}">
                <td class="product-remove" id="pizza-remove">
                    <a title="Remove this item" data-product_id="${product.id}" class="remove" href="#">×</a>
<!--                    <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=${product.id}">Add to order list</a>-->
                </td>
        
                <td class="product-thumbnail">
                    <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src=${product.imagePath}></a>
                    </td>
        
                    <td class="product-name">
                    <a class="product-name" data-product_id="${product.id}" href="/canvas/menu/?add-to-cart=${product.id}">${product.name}</a>
<!--                    <a href="single-product.html">${product.name}</a>-->
                </td>
        
                <td class="product-price">
                    <span class="amount">€${product.price}</span>
                </td>
        
                <td class="product-quantity">
                    <div class="quantity buttons_added">
                    <input type="button" class="minus" value="-">
                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                    <input type="button" class="plus" value="+">
                    </div>
                    </td>
    
                    <td class="product-subtotal">
                    <span class="amount-total" data-price="${product.price}">€${product.price}</span>
                </td>
            </tr>`
    },

    removeEvent: function () {
        $('#cart-products-container').delegate(
            '.remove', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');
                Cart.removeProductFromCart(productId);
            });
    },

    displayProducts: function (products) {
        let productsHtml = "";
        products.forEach(item => productsHtml += Cart.getProductHtml(item));

        //cssSelector
        $('.shop_table.cart tbody').html(productsHtml);
    },

    openProductInDetailPage: function (productId){
        $.ajax({
            url:API_URL + "/products/" + productId,
            method: "GET",

        }).done(function () {
            window.location.replace("detail-page.html?id="+ productId)
        });
    },

    openDetail: function () {
        $('.shop_table.cart tbody').delegate(
            '.product-name', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');
                Cart.openProductInDetailPage(productId)
            });
    }

    //
    // displayPriceHtml:function (price) {
    //     let totalPrice = price + 15;
    //     return `<table cellspacing="0">
    //                                 <tbody>
    //                                     <tr class="cart-subtotal">
    //                                         <th>Cart Subtotal</th>
    //                                         <td><span class="cart-subtotal">€${price}</span></td>
    //                                     </tr>
    //
    //                                     <tr class="shipping">
    //                                         <th>Shipping and Handling</th>
    //                                         <td>€15.00</td>
    //                                     </tr>
    //
    //                                     <tr class="order-total">
    //                                         <th>Order Total</th>
    //                                         <td><strong><span class="cart-total">€${totalPrice}</span></strong> </td>
    //                                     </tr>
    //                                 </tbody>
    //                             </table>`
    // },
    //
    // displayTotalPrice:function(){
    //     //let totalPrice = 0;
    //     var total = 0;
    //     var nodes = document.getElementsByClassName('amount-total');
    //
    //     [].forEach.call(nodes, function(node) {
    //         console.log(node.dataset.price);
    //         total += parseFloat(node.dataset.price)
    //     });
    //
    //     // $('.amount-total').each(function () {
    //     //     totalPrice += parseFloat($(this).data('price'));
    //     // });
    //
    //     //$('.cart_totals').html(displayPriceHtml(totalPrice));
    //     $('.cart_total').html(total);
    // },



};

Cart.getCart();
Cart.removeEvent();
Cart.openDetail();
//Cart.displayTotalPrice();

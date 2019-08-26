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



    getProductHtml:function(product, index){
    return `<tr class="cart_item" id="${product.id}">
                <td class="product-remove" id="pizza-remove">
                    <a title="Remove this item" data-product_id="${product.id}" class="remove" href="#"><h1>×</h1></a>
                </td>
                <td class="index">
                    <div  title="index" data-product_id="${product.id}">${index}</div>
                </td>
        
                <td class="product-thumbnail">
                    <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src=${product.imagePath}></a>
                    </td>
        
                    <td class="product-name">
                    <a class="product-name" data-product_id="${product.id}" href="/canvas/menu/?add-to-cart=${product.id}">${product.name}</a>
                </td>
        
                 <td class="product-subtotal">
                     <span class="amount"data-price="${product.price}">€${product.price}</span>
                 </td>`
    },

    displayPriceHtml:function(price){
        let total = price + 15;
        return `
                        <table cellspacing="0">
                            <tbody>
                            <tr class="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span class="cart-subtotal">€${price}</span></td>
                            </tr>

                            <tr class="shipping">
                                <th>Shipping and Handling</th>
                                <td>€15.00</td>
                            </tr>

                            <tr class="order-total">
                                <th>Order Total</th>
                                <td><strong><span class="cart-total">€${total}</span></strong> </td>
                            </tr>
                            </tbody>
                        </table>`
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
        let index = 0;
        let price = 0;
        products.forEach(item =>
        {
            index = index +1;
            productsHtml += Cart.getProductHtml(item, index);
            price = price + item.price;
        });
        //cssSelector
        $('.shop_table.cart tbody').html(productsHtml);
        $('#cart-total').html(Cart.displayPriceHtml(price));
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
    },

};

Cart.getCart();
Cart.removeEvent();
Cart.openDetail();

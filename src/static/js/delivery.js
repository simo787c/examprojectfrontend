class DeliveryRenderer {

    constructor() {
    }

    async updateUI() {
        let productTable = document.getElementById("product-table");
        this.sessionTotal = 0;
        this.sessionWeight = 0;

        this.data = await utilFetch.operationData("products", "", "", "GET");

        console.log(this.data);
        try {
            //clear div content
            productTable.innerHTML = ""

            //iterate through each item, then clone and assign a htmltemplate for it
            this.data.forEach(element => {
                let clone = cloneHtmlTemplateTableTr("template-table-delivery-product")

                clone.querySelector(".name").innerHTML += element.name;
                clone.querySelector(".price").innerHTML += element.price;
                clone.querySelector(".weight").innerHTML += element.weight;
                clone.querySelector(".addButton").value += element.id;
                clone.querySelector(".quantity").setAttribute("id", "quantity" + element.id);

                productTable.appendChild(clone)
            });

        } catch (error) {
            console.log(error)
        }
    }

    //when enter is pressed while targeting a textbox on a table item
    //append the item data + the textbox value into the cart div as a new row
    //multiply price with quantity given in textbox
    addQuantityToCart(id) {
        let totalPrice = document.getElementById("totalPrice");
        let totalWeight = document.getElementById("totalWeight");
        let cart = $(".cart-list");
        let quantity = document.getElementById("quantity" + id).value;

        let item = document.getElementById("item" + id);
        console.log(this.data[id]);

        if (this.data[id - 1] != null) {
            if (!item) {
                cart.append(`
                                <li class="list-group-item d-flex justify-content-between lh-condensed cart-item" id="item${id}">
                                            <div>
                                                <h6 class="my-0">${this.data[id - 1].name}</h6>
                                            </div>
                                            <span class="text-muted price">${this.data[id - 1].price * quantity}kr.</span>
                                            <span class="text-muted quantity">${quantity} stk.</span>
                                            </li>
                            `);
            } else {
                item.querySelector(".price").innerHTML = quantity * this.data[id - 1].price + "kr.";
                item.querySelector(".quantity").innerHTML = quantity + " stk.";
            }

            if (totalPrice.innerHTML == "0") {
                this.sessionTotal = parseInt(quantity) * this.data[id - 1].price;
            } else {
                this.sessionTotal += parseInt(quantity) * this.data[id - 1].price;
            }

            if (totalWeight.innerHTML == "0") {
                this.sessionWeight = parseInt(quantity) * this.data[id - 1].weight;
            } else {
                this.sessionWeight += parseInt(quantity) * this.data[id - 1].weight;
            }


            totalPrice.innerHTML = this.sessionTotal;
            totalWeight.innerHTML = this.sessionWeight;
        }
    }

    /* Delete methods */

    delete(id) {
        if (this.confirmDelete()) {
            utilFetch.operationData("products/", id, "", "DELETE");
            //Remove deleted element from UI
            $('#' + "tr" + id).remove();
            console.log('Delete was successful');
        } else {
            console.log('Delete was cancelled');
        }
    }
    //Confirm prompt
    confirmDelete() {
        return confirm('Er du sikker på du vil slette?');
    }

    /* Create methods */

    async create() {

        let destination = document.getElementById("inputFirstName").value + ", " +
            document.getElementById("inputLastName").value + ", " +
            document.getElementById("inputAddress").value + ", " +
            document.getElementById("inputZip").value
            ;
        let deliveryDate = document.getElementById("inputDeliveryDate").value;
        let fromWarehouse = document.getElementById("inputWarehouse").value;


        let deliveryEntity = new Map([
            ['deliveryDate', deliveryDate],
            ['fromWarehouse', fromWarehouse],
            ['destination', destination],
            ['productOrders', []],
        ]);

        //Iterate through all elements with class cart-item, get id from id attribute
        let productList = [].map.call($(".cart-item"), e => e.id.split("m")[1])

        console.log(productList);


        //for each id, map key and value, convert to object, then insert on productOrders set in deliveryEntity
        productList.forEach(element => {
            let quantity = document.getElementById("quantity" + element).value;

            let tempMap = new Map([
                ["quantity", quantity],
                ["product", { "id": element }]
            ])
            let tempMapData = Object.fromEntries(tempMap)
            deliveryEntity.get("productOrders").push(tempMapData)
        })
        console.log(deliveryEntity);

        //convert Entity (Map) to object
        let orderData = Object.fromEntries(deliveryEntity);

        await utilFetch.operationData("deliveries", "", orderData, "POST");
    }

}
var deliveryRenderer = new DeliveryRenderer;

class DeliveryRenderer {

    constructor() {
    }

    async updateUI() {
        let productTable = document.getElementById("product-table");

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
                clone.querySelector(".quantity").setAttribute("id","quantity" + element.id);

                productTable.appendChild(clone)
            });

        } catch (error) {
            console.log(error)
        }
    }

    //when enter is pressed while targeting a textbox on a table item
    //append the item data + the textbox value into the cart div as a new row
    //multiply price with quantity given in textbox
    addQuantityToCart(id){
        //console.log(quantity);
        //let cart = document.getElementsByClassName("cart-list");
        let cart = $(".cart-list");

        let quantity = document.getElementById("quantity" + id).value;

        if(!document.getElementById("item" + id)){
            cart.append(`
                        <li class="list-group-item d-flex justify-content-between lh-condensed cart-item" id="item${id}">
                                    <div>
                                        <h6 class="my-0">${this.data[id-1].name}</h6>
                                    </div>
                                    <span class="text-muted">${this.data[id-1].price}kr.</span>
                                    <span class="text-muted">${quantity} stk.</span>
                                    </li>
                    `);
        }else{

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

    //change onclick on modal submit button
    changeModalCreate() {
        $(".btn-submit").val("Opret")
        $(".btn-submit").attr("onclick", "productRenderer.create()")
        document.getElementById("inputName").value = "";
        document.getElementById("inputPrice").value = "";
        document.getElementById("inputWeight").value = "";
    }

    async create() {
        let name = document.getElementById("inputName").value;
        let price = document.getElementById("inputPrice").value;
        let weight = document.getElementById("inputWeight").value;

        const delivery = new Map([
            ['name', name],
            ['price', price],
            ['weight', weight]
        ])
        const data = Object.fromEntries(product);

        await utilFetch.operationData("products", "", data, "POST");

        this.updateUI();
    }

    /* Edit methods */

    //change onclick on modal submit button
    changeModalEdit(id) {
        $(".btn-submit").val("Gem")
        $(".btn-submit").attr("onclick", "productRenderer.edit()")
        document.getElementById("inputName").value = "";
        document.getElementById("inputPrice").value = "";
        document.getElementById("inputWeight").value = "";
        this.id = id;
    }

    async edit() {
        let name = document.getElementById("inputName").value;
        if(name == ""){
            name = null;
        }
        let price = document.getElementById("inputPrice").value;
        let weight = document.getElementById("inputWeight").value;

        console.log(this.id);
        const product = new Map([
            ['id', this.id],
            ['name', name],
            ['price', price],
            ['weight', weight]
        ])
        const data = Object.fromEntries(product);

        await utilFetch.operationData("products/", this.id, data, "PATCH");

        this.updateUI();

        $('#modal').modal('hide');
    }

}
var deliveryRenderer = new DeliveryRenderer;

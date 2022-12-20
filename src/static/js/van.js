class VanRenderer {

    constructor() {
    }

    async updateUI(query) {
        let productItemTable = document.getElementById("delivery-table");
        //if nothing is searched, every entry will match the empty query
        let data = await utilFetch.operationData("deliveries/search?query=" + query, "", "", "GET");

        console.log(data);
        try {
            //clear equipments div content
            productItemTable.innerHTML = ""

            //iterate through each item, then clone and assign a htmltemplate for it
            data.forEach(element => {
                let clone = cloneHtmlTemplateTableTr("template-table-delivery")
                let totalWeight = 0;
                
                clone.querySelector(".deliveryDate").innerHTML += element.deliveryDate;
                clone.querySelector(".fromWarehouse").innerHTML += element.fromWarehouse;
                clone.querySelector(".destination").innerHTML += element.destination;
                
                for (let i = 0; i < element.productOrders.length; i++) {
                    clone.querySelector(".productOrders").innerHTML += "ProduktOrdre[" + element.productOrders[i].id + "] ";
                    clone.querySelector(".productOrders").innerHTML += element.productOrders[i].product.name + ": ";
                    clone.querySelector(".productOrders").innerHTML += element.productOrders[i].quantity + " stk.<br>";
                    totalWeight += element.productOrders[i].product.weight * element.productOrders[i].quantity;
                    console.log(totalWeight);
                }

                clone.querySelector(".totalWeight").innerHTML += totalWeight;
                //Setting id of element on tr for deleteMethod
                clone.setAttribute("id", "tr" + element.id);

                productItemTable.appendChild(clone)
            });

        } catch (error) {
            console.log(error)
        }
    }
}
var vanRenderer = new VanRenderer;

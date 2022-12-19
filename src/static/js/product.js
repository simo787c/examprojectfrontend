class ProductRenderer {

    constructor() {
    }

    async updateUI(query) {
        let productItemTable = document.getElementById("product-table");
        //if nothing is searched, every entry will match the empty query
        let data = await utilFetch.operationData("products/search?query=" + query, "", "", "GET");

        console.log(data);
        try {
            //clear equipments div content
            productItemTable.innerHTML = ""

            //iterate through each item, then clone and assign a htmltemplate for it
            data.forEach(element => {
                let clone = cloneHtmlTemplateTableTr("template-table-product")

                clone.querySelector(".name").innerHTML += element.name;
                clone.querySelector(".price").innerHTML += element.price;
                clone.querySelector(".weight").innerHTML += element.weight;
                clone.querySelector(".editButton").value = element.id;
                clone.querySelector(".deleteButton").value = element.id;
                //Setting id of element on tr for deleteMethod
                clone.setAttribute("id", "tr" + element.id);

                productItemTable.appendChild(clone)
            });

        } catch (error) {
            console.log(error)
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

        const product = new Map([
            ['name', name],
            ['price', price],
            ['weight', weight]
        ])
        const data = Object.fromEntries(product);

        await utilFetch.operationData("products", "", data, "POST");

        this.updateUI();

        $('#modal').modal('hide');
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
var productRenderer = new ProductRenderer;

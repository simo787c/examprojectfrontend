'use strict'

class UtilFetch {
    //constructor
    constructor(data){
        this.data = data;
        this.url = "http://localhost:8080/api/v1/"
    }
    /**
     * async fetch, await response.
     * 
     * utilFetch.operationData(endpoint, id, formData, methodType)
     * 1. example of GET (all) -> utilFetch.operationData("car", "", "", "GET")
     * 2. example of GET (one) -> utilFetch.operationData("car/", id, "", "GET")
     * 3. example of PATCH -> utilFetch.operationData("car/", id, formData, "PATCH")
     * 4. example of POST -> utilFetch.operationData("car", "", formData, "POST")
     * @param {*} endpoint 
     * @param {*} id 
     * @param {*} formData 
     * @param {*} methodType 
     * @returns 
     */
    async operationData(endpoint, id, formData, methodType) {
        if (methodType == "GET") {
            this.settings = null;
        } else {
            this.settings = {
                method: methodType,
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(formData)
            }
        }
        try {
            let response = await fetch(this.url + endpoint + id, this.settings);
            this.data = await response.json();
            return this.data;
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${endpoint + id}.`);
        }
    }  
}
var utilFetch = new UtilFetch();
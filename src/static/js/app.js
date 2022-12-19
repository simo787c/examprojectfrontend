'use strict'

/**
 * Used to hold cached versions of used HTML templates.
 */
var htmlTemplateCache = new Map()

/**
 * Route template constants.
 */
const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_ORDER = 'order'
const ROUTE_TEMPLATE_KEY_PRODUCT = 'product'

/**
 * Route constants.
 */
const ROUTE_HOME = '/'
const ROUTE_ORDER = '/order'
const ROUTE_PRODUCT = '/product'

/**
 * Defines the routing templates used.
 */
template(ROUTE_TEMPLATE_KEY_HOME, home)
template(ROUTE_TEMPLATE_KEY_ORDER, order)
template(ROUTE_TEMPLATE_KEY_PRODUCT, product)

/**
 * Defines the #/... url routes and the templates they match..
 */
route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_ORDER, ROUTE_TEMPLATE_KEY_ORDER);
route(ROUTE_PRODUCT, ROUTE_TEMPLATE_KEY_PRODUCT);
/**
 * Clones an embedded HTML template, from the HTML file, via an id.
 */
function cloneHtmlTemplate(id) {
    let div = document.createElement('div');
    //div.setAttribute('class', 'container');
    const template = document.querySelector(`#${id}`);
    const clone = template.content.cloneNode(true);
    div.appendChild(clone)
    return div
}

function cloneHtmlTemplateTableTr(id) {
    let tr = document.createElement('tr');
    //div.setAttribute('class', 'container');
    const template = document.querySelector(`#${id}`);
    const clone = template.content.cloneNode(true);
    tr.appendChild(clone)
    return tr
}

/**
 * Home route action.
 */
function home() {
    $('#view').html(cloneHtmlTemplate('template-home'));
    //document.getElementById("view").setAttribute("class", "container")
}

function order() {
    $('#view').html(cloneHtmlTemplate('template-order'));
    deliveryRenderer.updateUI();
}

function product() {
    $('#view').html(cloneHtmlTemplate('template-product'));
    productRenderer.updateUI("");
};
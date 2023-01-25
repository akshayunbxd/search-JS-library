
<a  href="https://www.npmjs.com/package/@unbxd-ui/vanilla-search-library">
    <img  alt="npm"  src="https://img.shields.io/npm/v/@unbxd-ui/vanilla-search-library?color=blue">
</a>

<a  href="https://www.npmjs.com/package/@unbxd-ui/vanilla-search-library">
    <img  alt="npm"  src="https://img.shields.io/npm/l/@unbxd-ui/vanilla-search-library">
</a>

<a  href="https://www.npmjs.com/package/@unbxd-ui/vanilla-search-library">
    <img  alt="npm"  src="https://img.shields.io/npm/dm/@unbxd-ui/vanilla-search-library">
</a>
  

# search-JS-library

A JavaScript library for building performant and quick search experiences with Unbxd.


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11<sup>*</sup>, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions


(*) You need to use polyfills for making it work in IE browser. 
Please refer this <a  href="public/examples/internetExplorer.html" target="_blank">example</a> for more details

## Getting started

### Inlcude the Library

The library can be included in 2 ways


#### ES6

Install `@unbxd-ui/vanilla-search-library` using npm.

```shell

npm install @unbxd-ui/vanilla-search-library --save

```

then, import the `UnbxdSearch` constructor in your project

```js

import  UnbxdSearch  from  "@unbxd-ui/vanilla-search-library";

```

To get our default theme, you can include the CSS in below 2 ways:

```shell

import "@unbxd-ui/vanilla-search-library/public/dist/css/vanillaSearch.css";

```

or if you are using SCSS, include the SCSS file directly

```shell

import "@unbxd-ui/vanilla-search-library/styles/index.scss";

```

#### ES5

You can also use a global-friendly UMD build:

```html

<script  src="https://libraries.unbxdapi.com/search-sdk/v2.0.3/vanillaSearch.min.js"  type="text/javascript"></script>

```

This will set the `UnbxdSearch` constructor or class on the window object. 

And to get our default theme, include the CSS as shown below.

```html

<link  href="https://libraries.unbxdapi.com/search-sdk/v2.0.3/vanillaSearch.min.css"  rel="stylesheet"></script>

```

Now you are ready to start using the library.

### Invoke with configs

Invoke the `UnbxdSearch` constructor with the desired configs.

You can find a sample invocation below:

```shell
const unbxdSearch = new UnbxdSearch({
    siteKey: "<your Site Key>",
    apiKey: "<your API key>",
    searchBoxEl: document.getElementById("unbxdInput"),
    searchButtonEl: document.getElementById("searchBtn"),
    products: {
        el: document.getElementById("searchResultsWrapper"),
        attributesMap: {
            "unxTitle": "title",
            "unxImageUrl": "imageUrl"
            "unxPrice": "displaySalePrice"
        },
        productAttributes: [
            "title",
            "imageUrl",
            "price"
        ]
    },
    noResults: {
        template:function(query){return `<div class="UNX-no-results"> No Results found ${query} </div>`}
    },
    facet: {
        facetsEl: document.getElementById("facetsWrapper"),
        selectedFacetsEl: document.getElementById("selectedFacetWrapper"),
    },
    pagination: {
        type: "FIXED_PAGINATION",
        el: document.querySelector("#clickScrollContainer"),
    },
    sort: {
        el: document.getElementById("sortWrapper"),
        options: [{
                value: "sortPrice desc",
                text: "Price High to Low"
            },
            {
                value: "sortPrice asc",
                text: " Price Low to High"
            }
        ]
    }
});

```


## Full configuration List

**Note:**
- All templates are provided as functions where you can return the HTML string that needs to be rendered.
This provides you the power of entire Javascript to build your desired HTML string.
- All of the classnames generated by the library will have the prefix `"UNX-"`. So you can use it to customize styles.
- tagName -will be html element wrapper created by the sdk, by default it will be "DIV". If the template required wrapper element changes we can customise here.
- htmlAttributes -its an object where you can customise the html  attributes like class, id and data-*. key will be attribute name and value will be attribute value.
- events - this is an object you can add your own events to it. key will be event name(click) and value should be a function.


| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| siteKey | String | NA | This is the unique Site Key assigned by Unbxd to every site created in the console dashboard. Refer to [this section](https://unbxd.com/docs/site-search/documentation/configure-site-profile/) for steps on how to get the Site Key for your account. |
| apiKey | String | NA | This is the unique API Key assigned to every site created in the console dashboard.  Refer to [this section](https://unbxd.com/docs/site-search/documentation/configure-site-profile/) for steps on how to get the API Key for your account. |
| searchBoxEl | Element | null | Configure the search input element on which to listen to search query changes |
| searchButtonEl | Element | NA | Configure your search button here. Clicking on  this will load the results based the input value provided in "searchBoxEl"  |
| products | Object | Refer section | Products related configurations. You can find all the configs in [Products Config](#Products-Config) section|
| facet | Object | Refer section | Facet configurations. You can find all the configs in [Facets Config](#Facets-Config) section|
| pagination | Object | Refer section | Pagination component configurations. You can find all the configs in [Pagination Config](#Pagination-Config) section |
| pageSize | Object | Refer section | Page Size component configurations. You can find all the page size configs in [Page Size Config](#Page-Size-Config) section |
| sort | Object | Refer section | Sort component configurations. You can find all the configs in [Sort Config](#Sort-Config) section |
| productView | Object | Refer section | Product view type (list view or grid view) configurations. You can find all the configs in [Product Views Config](#Product-Views-Config) section|
| breadcrumb | Object | Refer section | Bread crumb component configurations. You can find all the configs in [Breadcrumb Config](#Breadcrumb-Config) section |
| spellCheck | Object | Refer section | Spellcheck component configurations. You can find all the configs in [Spell Check Config](#Spell-Check-Config) section. Please ignore incase of _browse_ or _category_ pages.|
| banner | Object | Refer section | Banner component configurations. You can find all the configs in [Banner Config](#Banner-Config) section. |
| variants | Object | Refer section | Set this object, if you have want to display variant products. by default variants will be undefined. You can find all the variants configs in [Variants Config](#Variants-Config) section |
| swatches | Object | Refer section | Set this object, if you have want to display swatches on your product cards. You can find all the swatch configs in [Swatches Config](#Swatches-Config) section |
| loader | Object | Refer section | Loader component configurations. You can find all the configs in [Loader Config](#Loader-Config) section |
| noResults | Object | Refer section | No results component configurations. You can find all the configs in [No Results Config](#No-Results-Config) section |
| unbxdAnalytics | Boolean | false | Turn this flag on if you want Unbxd to fire analytics events. Note that you have to include the Unbxd Analytics SDK for firing analytics events. |
| hashMode | Boolean | false | Turn this flag on if you want the URL update to happen on hash instead of using query params |
| updateUrls | Boolean | true | If you do not want the URLs to be updated on any search param change, set this config to false |
| actionBtnClass  | String  | "UNX-action-item" | CSS class name to add to any elements on which you want to trigger click event |
| actionChangeClass  | String  | "UNX-action-change" | CSS class name to be added to any custom input elements on which you want to trigger change event |
| onAction  | Function  | `function(event, context) {}` | Callback function called on a click or change on your custom element. This function will get 2 parameters: the event object & the `this` context  |
| onEvent | Function | function(context, type) {} | Callback that gets called after the supported events. This function gets 2 parameters: the current instance or context and the event type which is one of `BEFORE_API_CALL, AFTER_API_CALL, BEFORE_RENDER, BEFORE_NO_RESULTS_RENDER, AFTER_NO_RESULTS_RENDER, AFTER_RENDER, DELETE_FACET, FACETS_CLICK, DELETE_FACET_VALUE, DELETE_FACET, CLEAR_SORT, CHANGE_SORT, PAGE_NEXT, PAGE_PREV, CHANGE_INPUT, SET_CATEGORY_FILTER, DELETE_CATEGORY_FILTER`  |
| extraParams | Object | `{ "version":"V2" }` | Any additional parameters you want to send in the search API call |
| productId | String | "uniqueId" | The field name which denotes the unique identifier for each product |
| defaultFilters | Object | null | Default filters to apply to all search API requests |
| searchQueryParam | String | "q" | If you want to send the search query in a different query param key set this config. Example, if you want to send the query in a param called "query" like "query=dress", then set this config value to "query" | 
| searchEndPoint | String | "https://search.unbxd.io" | Domain name of the search API endpoint |
| searchPath | String | "" | Any additional path string to be added to the URL. This is useful incase you have an SPA and the search page is hosted on a subpath of your site |
| getCategoryId | Function | null | By default Category ID will be taken from unbxdPageConf object, but if you wish to customize use this function to return the category ID  |
| setCategoryId | Function | null | This method helps to navigate through the breadcrumbs, you can customize the logic here   |
| onQueryRedirect | Function | null | customise your logic here to handle the redirect configured in api |
| browseQueryParam | String | "p" | this will be the default query param for the browse and category|
## Products Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| productType | String | "SEARCH" | Type of products page to render. Accepted values are SEARCH or BROWSE or CATEGORY |
| el | Element | null | Element in which to render the search results |
| template | Function | [default](src/modules/searchResults/ui.js) | Customize the look and feel of the product card by returning your custom HTML string from this function. This function gets 5 parameters: complete product object and index of the current product, swatches, selected view type, product config |
| productAttributes | Array |  `["title", "uniqueId", "price", "sku", "imageUrl", "displayPrice", "salePrice", "sortPrice", "productDescription", "unbxd_color_mapping", "colorName", "color"]` | This is an array of all required fields for generating the result template. This is helpful to load the results faster. |
| attributesMap | Object |  `{"unxTitle": "title","unxImageUrl": "imageUrl","unxPrice": "salePrice","unxStrikePrice": "displayPrice","unxId": "uniqueId","unxDescription": "productDescription"}` | Field mappings for the data to be displayed in the product card |
| gridCount | Number | Adjusts as per screen size | If you want to have grid type user interface, then you can configure how many columns you want to have in a row with this config. By default it will adjust according to screen size. |
| productItemClass | String | "product-item" | Additional class name to be added to each product card |
| onProductClick | Function | `function(product, event) {}` | Callback functions called on click of a product card. This function gets the product object & the event object as params |
| defaultImage | String | "https://libraries.unbxdapi.com/sdk-assets/defaultImage.svg" | If product doesnt contain image url, by default this image will be shown |
| tagName | String | "DIV" | html element for the product wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-search-results-block UNX-result-wrapper"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |

## Facets Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| facetsEl | Element |  null | Element in which to render the facets |
| facetTemplate | Function | [default](src/modules/facets/ui.js) | Customize the look and feel of the facets block by returning your custom HTML string from this function. This function gets 3 parameters: the complete facet block, facet values, is expanded flag (in case you have chosen collapsible facets, i.e. `isCollapsible` is set to true) and the search text entered for this facet block (if `isSearchable` is set to true) |
| facetItemTemplate | Function | [default](src/modules/facets/ui.js) | Customize each individual facet value by returning your custom HTML string from this function. This function gets 3 parameters: the complete facet block, the current facet value and the search text entered for this facet block. |
| facetMultiSelect | Boolean | true | Turn this off if you want to disable the multiple selection of facets |
| facetClass | String | "UNX-facets-block" | Additional CSS class name to add to the the facet items |
| facetAction | String | "click | Event based on which to trigger facet selection / deselection: "click" or "change" |
| selectedFacetClass | String | "UNX-selected-facet-btn" | Additional CSS class name for the selected facet items |
| selectedFacetsEl | Element | null | Element in which to render the selected facets. If you don't provide this element selected facets will be rendered along with the facet blocks |
| selectedFacetTemplate | Function | [default](src/modules/facets/ui.js) | Customize the look & feel of the selected facets block by returning your custom HTML string from this function. This function gets 2 parameters: the selected facet complete block and the selected facet value |
| selectedFacetItemTemplate | Function | [default](src/modules/facets/ui.js) | Customize the look & feel of the selected facet by returning your custom HTML string from this function. This function gets 2 parameters: the selected facet complete block and the selected facet value |
| selectedFacetConfig | Object | { tagName:"DIV", htmlAttributes:{ class:"UNX-selected-facet-lb" }, events:{} } | object will be containing the configuration for the selected facet wrapper config |
| clearAllText | String | "Clear All" | The text to show for the clear all button that clears all selected facets |
| rangeTemplate | Function |  [default](src/modules/facets/renderRangeFacets.js) | Customize the look and feel of the range facets by returning your custom HTML string from this function. This function gets 1 parameter: the list of range facets available |
| rangeWidgetConfig | Object | NA | Configure the default range slider. Refer to the [Range Widget Config](#Facet-Range-Widget-Config) section below to view the detailed configs  |
| facetMultilevel | Boolean | true | Turn this on to send the multilevel parameter in the search API |
| facetMultilevelName | String | "Category" | Set the multilevel field name using this config |
| multiLevelFacetSelectorClass | String | "UNX-multilevel-facet" | Class name for each multi level facet item |
| multiLevelFacetTemplate | Function | [default](src/modules/facets/renderBucketedSearch.js) | Customize the look and feel of multi level facets by returning your custom HTML string from this function. This function gets 3 parameters: the complete facet block, selected values and the search text entered for this facet block (if `isSearchable` is set to true) |
| facetDepth | Number | 4 | Configure how many levels of category filter you want to have by setting this value |
| clearFacetsSelectorClass | String | "UNX-clear-facet" | Class name for the button to clear the selected facets |
| removeFacetsSelectorClass | String | "UNX-remove-facet" | Class name for the button to delete selected facets |
| onFacetLoad | Function | `function(facets) {}` | Callback function that gets called after each facet selection or deselection. This function gets all the facets as a parameter |
| applyMultipleFilters | false | Boolean | Turn this on if you want to apply multiple filters together |
| applyButtonText | String | "Apply" | The text to show for the apply button (when `applyMultipleFilters` is set as true) |
| clearButtonText | String | "clear" | The text to show for the clear button (when `applyMultipleFilters` is set as true) |
| isCollapsible | Boolean | true | Turn this off if you do not want to have a collapsible accordian for each facet block |
| defaultOpen | String | "ALL" | If "isCollapsible" is true, set this config to indicate the default open facet. Available options are "ALL" , "FIRST" , "NONE" |
| isSearchable | Boolean | true | Turn this on if you want to have search feature for each facet block |
| searchPlaceHolder | String | "" | Placeholder text for the facet search input |
| enableViewMore | Boolean | false | Turn this on for enabling view more or less functionality for individual facets  |
| viewMoreText | Array | ["show all", "show less"] | The text to show for the view more / less button. Pass the 2 strings in array format `[<viewMoreText>`, `viewLessText`]. Ex:  ["View more", "View less"] |
| viewMoreLimit | Number | 3 | Will show view more only if the facet values are greater than this value |
| tagName | String | "DIV" | html element for the facet wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-facets-results-block"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |


## Facet Range Widget Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| minLabel | String | "" | Text for the lower end of the range slider |
| maxLabel | String | "" | Text for the higher end of the range slider |
| prefix | String | "$" | Prefix text to be added to the range widget value. Example "$" for price facet |


## Pagination Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | true | Turn this off if you do not want the pagination widget |
| type                      	| String   	| "CLICK_N_SCROLL" | Type of pagination: "FIXED_PAGINATION" or "INFINITE_SCROLL" or "CLICK_N_SCROLL" |
| el                        	| Element  	| null | Element in which to render the pagination component  |
| template                  	| Function 	| [default](src/modules/pagination/fixedPaginationView.js) | Customize the look and feel of the pagination by returning your custom HTML string from this function. This function gets 1 parameter: an object that has the pagination information |  
| pageClass | String | "UNX-page-items" | CSS classname for the pagination component |
| selectedPageClass | String | "UNX-selected-page-item" | CSS classname for selected page item |
| onPaginate                	| `function(paginationInfo){}` 	| NA | Callback function that gets called after a pagination action |
| pageLimit | Number | 6 | Number of pages to show upfront (when `type` is `FIXED_PAGINATION`) |
| infinteScrollTriggerEl | Element | window | Element on which to detect infinite scroll page boundary (when `type` is set to `INFINITE_SCROLL`) |
| heightDiffToTriggerNextPage | Number | 100 | Height of the page to consider to fetch the next page data (when `type` is set to `INFINITE_SCROLL`) |
| action                    	| String   	| "click" | Action on which pagination should trigger: "click" or "change" |
| tagName | String | "DIV" | html element for the pagination wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-pagination-size-block"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Page Size Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | true | Turn this off if you do not want the page size component | 
| el                        	| Element  	| null | Element in which to render the page size element |
| pageSize                  	| Number   	| 12 | Number of results to be shown per page |
| options                   	| Array    	| `[8, 12, 16, 20, 24]` | Array of desired page sizes to be rendered. _It is suggested that the value be a multiple of number of columns (ex. if 3 columns then 15 or 18 or 21)._ |
| pageSizeClass             	| String   	| "UNX-pagesize" | Additional CSS class name to be added to the page size element |
| selectedPageSizeClass     	| String   	| "UNX-selected-pagesize" | Additional CSS class name to be added to the selected page size option |
| action                    	| String   	| "change" | Action on which page size change should trigger: "click" or "change" |
| template                  	| Function 	| [default](src/modules/pageSize/pageSizeView.js) | Customize the look and feel of the page size component by defining this function that is expected to return a HTML string for the template. This function gets 2 parameters: the selected page size and the page size config (i.e. this complete object)  |
| tagName | String | "DIV" | html element for the page size wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-selected-pagesize"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Sort Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | true | Turn this off if you do not want the sort component |  
| el                        	| Element  	| null | Element in which to render the sort component |
| options                   	| Array    	| `[{value: "price desc",text: "Price High to Low"},{value: "price asc",text: " Price Low to High"},{value: "rating asc",text: " Rating Low to High"},{value: "rating desc",text: " Rating High to low"}]` | Array of sort options |
| sortClass                 	| String   	| "UNX-sort-item" | CSS class name for the sort item, make sure you will be providing this information in template |
| selectedSortClass         	| String   	| "UNX-selected-sort" | CSS class name for the selected sort item |
| template                  	| Function 	| [default](src/modules/sort/index.js) | Customize the look and feel of the sort component by using this function. This function gets 2 parameters: the selected sort value and the sort config (i.e. this complete object) |
| action                    	| String   	| "change" | Action on which sort should trigger: "click" or "change" |
| tagName | String | "DIV" | html element for the sort wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-sort-block-lb"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Product Views Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | true | Turn this off if you do not want the product view component |
| el                        	| Element  	| null | Element in which to render the product views component |
| template                      | Function  | [default](src/modules/productViewType/index.js) | Customize the look and feel of the product views component by using this function. This function gets 2 parameters: the selected view type and the product views config (i.e. this complete object) |
| defaultViewType                 	| String   	| "GRID" | Product view types to be displayed by default: "LIST" or 'GRID" |
| action                    	| String   	| "click" | Action on which product view change should be triggerd: "click" or "change" |
| viewTypeClass             	| String   	| "UNX-product-view" | Additonal CSS class name to be added to the product view type elements |
| selectedViewTypeClass     	| String   	| "UNX-selected-product-view" | Additional CSS class name to be added to the selected view type element |
| tagName | String | "DIV" | html element for the product view type wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"product-view-container"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Breadcrumb Config

breadcrumb options are available here.

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled                   	| Boolean  	| true | Turn this flag on if you want to show breadcrumbs (if it is available) on your page |
| el                        	| Element  	| null | Element in which to render the breadcrumbs |
| template                  	| Function 	| [default](src/modules/breadcrumbs/breadcrumbsView.js) | Customize the look and feel of the breadcrumb component by defining this function that is expected to return a HTML string for the template. You will get the breadcrumbs list as parameter to this function |
| selectorClass             	| String   	| "bread-crumb" | Additional CSS class name for each breadcrumb item |
| tagName | String | "DIV" | html element for the breadcrumb wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-breadcrumbs-block"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Spell Check Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|    
| enabled                   	| Boolean  	| true | Turn this flag on for enabling spell check  |
| el                        	| Element  	| null | Element in which to render the spellcheck component |
| template                  	| Function 	| [default](src/modules/didYouMean/spellCheckView.js) | Customize the look and feel of the spellcheck component by returning your custom HTML string from this function. This function gets 3 parameters: the search query, the suggested query text and a config object with product count details (`{start, productsLn, numberOfProducts}`) |
| selectorClass             	| String   	| "UNX-suggestion" | Additional CSS class name for the spell check component |
| tagName | String | "DIV" | html element for the spellcheck wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-spellcheck-wrapper"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |



## Variants Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled                   	| Boolean  	| false | Turn this flag on for enabling variants |
| count                     	| Number   	| 5 | Indicates the number of variants to be shown |
| groupBy                   	| String   	| "v_colour" | Variants will be grouped based on this field value. The name of the field has to be the same one as in your catalog |
| attributes                	| Array    	| `["title", "v_imageUrl"]` | List of fields you need for each variant |
| mapping                   	| Object   	| `{"image_url": "v_imageUrl"}` | Field mapping of the catalog attributes to the variant attributes. This is needed to render the variant information correctly. |

## Swatches Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | false | Turn this flag on for enabling swatches |
| attributesMap | Object | `{swatchImgs: "unbxd_color_mapping","swatchColors": "color", "swatchList": "color"}` | Field mapping of the catalog attributes to the swatch attributes |
| swatchClass | String | "UNX-swatch-btn" | Additional CSS class name for the swatches |
| template | Function | [default](src/modules/swatches/ui.js) | Customize the look and feel of the swatches component by returning your custom HTML string from this function. This function gets the current swatch data and complete swatches list as parameters |

## Banner Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| enabled | Boolean | false | Turn this flag on for enabling Banner |
| el                        	| Element  	| null | Element in which to render the Banner component |
| template                  	| Function 	| [default](src/modules/banners/index.js) | Customize the look and feel of the banner component by returning your custom HTML string from this function. This function get the list of banners as the parameter. |
| count                     	| Number   	| 1 | Indicates the number of banners to be shown |
| openNewTab                    | Boolean   | false | by default landing page url load in same tab, if you want to load in another tab configured it to true |
| tagName | String | "DIV" | html element for the banner wrapper. by default it is div.  |
| htmlAttributes | Object | {class:"UNX-banner-block"} | by default it contains classes for the wrapper. you can add more classes or any attributes |
| events | object | {} | by default it will be empty. you can add further javascript events by keys and function as values. context will be the current object. |




## Loader Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| el | Element | null | Element in which to render the loader component |
| template | Function | `function(){return '<div class="UNX-loader">Loading search results....</div>'}` | Customize the look and feel of the loader component by using this function |


## No Results Config

| OPTIONS | DATATYPE | DEFAULT VALUE | DESCRIPTION |
|----------|----------|----------|----------|
| template | Function | `function(query){return '<div class="UNX-no-results"> No Results found '+ query + '</div>'}` | Customize the look and feel of the no results component by using this function. You will get the searched query as param to this function |

## Instance Methods

**Note:** All the below functions can be called on the instance returned by the `UnbxdSearch` constructor function

| OPTIONS | DATATYPE | DESCRIPTION |
|----------|----------|----------|
| reRender | function | Call this function if you want to render the page again. Ex: `unbxdSearch.reRender()` |
| updateConfig | function | Call this function for updating the config options in run time. Ex: `unbxdSearch.updateConfig({facet:{applyMultipleFilters:true}})` |
| getCategoryPage | function | Call this function to render the category page. Ex: `unbxdSearch.getCategoryPage()` |
| getBrowsePage | function | Call this function to render the browse page. Ex: `unbxdSearch.getBrowsePage()` |
| getResults | function | Call this function to refetch the search results. Ex: `unbxdSearch.getResults("dress")` |
| resetFacets | function | Call this method to reset the selected facets. Ex: `unbxdSearch.resetFacets()` |
| resetAll | function | Call this method to reset the all the page elements like selected facets, selected sort option, pagination etc. Ex: `unbxdSearch.resetAll()` |
| setPageStart | function | Call this method to set the the page number. Ex: `unbxdSearch.setPageStart(0)` |
| setRangeSlider | function | Call this method to update the range filter value. Ex:`unbxdSearch.setRangeSlider({"start":0,"end":573,"facetName":"price","gap": 200})` |
| getSelectedFacetsCount | function | Call this function if you want to  get the total count of selected facets Ex: `unbxdSearch.getSelectedFacetsCount()` |
| getAllSelectedFacets | function | Call this function to get all the selected facets Ex: `unbxdSearch.getAllSelectedFacets()` |
| getSelectedFacetValueCount | function | Call this function to get the total count of selected facet values. Ex: `unbxdSearch.getSelectedFacetValueCount()` |

## API Documentation

API documentation is available <a  href="http://cxdoc.unbxd.io/search-JS-library/" target="_blank">here</a>

## Overriding the default methods


We can over ride the methods like below.

```shell
import UnbxdSearch from '@unbxd-ui/vanilla-search-library';
class NewUnbxdSearch extends UnbxdSearch {
    //if you wish to over ride reRender
    reRender() {

    }
}
or
UnbxdSearchComponent.prototype.reRender = function(){

}
```
With es5 way.
```html
<script  src="https://libraries.unbxdapi.com/search-sdk/v2.0.3/vanillaSearch.min.js"  type="text/javascript"></script>
```
```shell
UnbxdSearch.prototype.reRender = function(){

}
var unbxdSearch = new UnbxdSearch({...options})
```




## Examples / Recipies

- <a  href="https://codesandbox.io/s/es5-demo-epq52">Basic (default template) : ES5</a>
- <a  href="https://codesandbox.io/s/minimal-config-qjpwq">Basic (default template) : ES6</a>
- <a  href="https://codesandbox.io/s/custom-product-card-5rulp">Custom product card</a>
- <a  href="https://codesandbox.io/s/infinitescroll-pes7g">Pagination: infinite scroll</a>
- <a  href="https://codesandbox.io/s/fixedpagination-yvwjo">Pagination: fixed size</a>
- <a  href="https://codesandbox.io/s/clicknscroll-1sowf">Pagination: Load More</a>
- <a  href="https://codesandbox.io/s/range-checkboxes-rwuqb">Range slider as checkboxes </a>
- <a  href="https://codesandbox.io/s/friendly-microservice-to3r8">Customized</a>
- <a  href="public/examples/internetExplorer.html">IE11</a>
- <a  href="https://codesandbox.io/s/categorypage-4e8bc">Category Page</a>
- <a  href="https://codesandbox.io/s/rangeslider-p23l9">RangeSlider</a>
- <a  href="https://codesandbox.io/s/custom-seo-url-jjg4k">Custom Url Format </a>

## Tips & Tricks

- If you are including our Search JS Library, [Autosuggest Library](https://unbxd.com/docs/site-search/integration-documentation/autosuggest-sdk/) & [Analytics Library](https://unbxd.com/docs/site-search/integration-documentation/browser-integration/) in your HTML page, the order of the files are important. 
Include the Search JS Library, followed by Autosuggest Library and then the Analytics JS Library. This should be followed by the code to invoke the library.
- Always ensure you are invoking the library (i.e. calling the UnbxdSearch constructor) after you have included the library either via URL or via npm
- Include the CSS inside the <head> tag of your HTML page & the scripts at the end of the body tag. This will ensure that the page rendering is not blocked by the javascript files.

## Issues & Feature Requests

Raise any issues or new feature requests using [Github Issues](https://github.com/unbxd/search-JS-library/issues)

## Contributions

To contribute to the project, read the [contribution guidelines](CONTRIBUTE.md)

## Changelog

Changes are tracked in the [changelog](CHANGELOG.md)

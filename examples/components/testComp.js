import { useEffect } from 'react';

function TestComp({ props }) {

    useEffect(() => {
        const unbxdCallbackEcma = function (instance, type, data) { };
        window.UnbxdAnalyticsConf = {
            page: "cat1820001"
        };
        window.UnbxdAnalyticsConf[ "page_type" ] = "CATEGORY_PATH";

        window.unbxdSearch = new window.UnbxdSearch({
            siteKey: "demo-unbxd700181503576558",
            apiKey: "fb853e3332f2645fac9d71dc63e09ec1",
            hashMode: false,
            updateUrls: false,
            products: {
                productType: "CATEGORY"
            }
        });
        window.unbxdSearch.updateConfig({
            searchBoxEl: document.getElementById("unbxdInput"),
            searchTrigger: "click",
            searchButtonEl: document.getElementById("searchBtn"),
            products: {
                el: document.getElementById("searchResultsWrapper")
            },
            spellCheck: {
                enabled: true,
                el: document.getElementById("didYouMeanWrapper")
            },
            noResults: {
                el: document.getElementById("noResultWrapper")
            },
            facet: {
                facetsEl: document.getElementById("facetsWrapper"),
                selectedFacetsEl: document.getElementById("selectedFacetWrapper"),
                selectedFacetClass: "UNX-selected-facet-btn"
            },
            pagination: {
                type: "INFINITE_SCROLL"
            },
            breadcrumb: {
                el: document.getElementById("breadcrumpContainer")
            },
            pagesize: {
                el: document.getElementById("changeNoOfProducts")
            },

            sort: {
                el: document.getElementById("sortWrapper"),
                options: [
                    {
                        value: "sortPrice desc",
                        text: "Price High to Low"
                    },
                    {
                        value: "sortPrice asc",
                        text: " Price Low to High"
                    }
                ]
            },
            loader: {
                el: document.getElementById("loaderEl")
            },
            productView: {
                el: document.getElementById("productViewTypeContainer"),
                viewTypes: "GRID"
            },
            banner: {
                el: document.getElementById("bannerContainer"),
                count: 1
            }
        });
        window.unbxdSearch.getCategoryPage();
        const setCategory = function (e) {
            const el = e.target;
            const { dataset } = el;
            console.log(dataset, "dataset");
            if (dataset && dataset.id) {
                window.UnbxdAnalyticsConf = {
                    page: dataset.id
                };
                window.unbxdSearch.getCategoryPage();
            }
        };
        const navElem = document.getElementById("categoryLinks");
        navElem.addEventListener("click", setCategory);

    }, [])

    return (
        <div>
            <div class="UNX-header">
                <div class="UNX-header-inner">
                    <div class="UNX-logo">
                        UNBXD
                    </div>
                    <div class="UNX-input-wrapper">
                        <input id="unbxdInput" class="UNX-input" />
                        <button id="searchBtn" class="fa fa-search UNX-search-btn"></button>
                    </div>
                </div>
                <nav id="categoryLinks" class="UNX-naviagtion-wrap">
                    <button data-id="cat700001" class="nav-links">Tail</button>
                    <button data-id="cat120002" class="nav-links">New Arrivals</button>
                    <button data-id="cat3410002" class="nav-links">Petite Tops</button>
                    <button data-id="cat2120039" class="nav-links">Stretch Cloths</button>
                </nav>
            </div>

            <div class="UNX-results-container">
                <div class="UNX-head-wrapper">
                    <div class="UNX-selected-actions">
                        <div class="UNX-bread-wrapper" id="breadcrumpContainer"></div>
                        <div
                            class="UNX-selected-facet-wrapper"
                            id="selectedFacetWrapper"
                        ></div>
                    </div>
                    <div class="UNX-product-type-block" id="productViewTypeContainer"></div>
                </div>
                <div class="UNX-product-results">
                    <div class="UNX-facet-wrapper">
                        <h2 class="UNX-filter-header">Filter By</h2>
                        <div class="UNX-fxd-facet">
                            <div
                                class="UNX-selected-facet-wrapper UNX-selected-f-m"
                                id="selectedMFacetWrapper"
                            ></div>
                            <div class="UNX-multilevel-block" id="bucketedFacetWrapper"></div>
                            <div class="UNX-text-facet-block" id="facetsWrapper"></div>
                            <div class="UNX-range-block" id="rangeFacetWrapper"></div>
                            <div class="UNX-m-facet-row">
                                <button
                                    data-action="applyFacets"
                                    class="UNX-primary-btn UNX-facet-trigger"
                                >
                                    Apply
                                </button>
                                <button
                                    data-action="clearFacets"
                                    class="UNX-default-btn UNX-facet-trigger"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div class="UNX-m-facet-row">
                            <button
                                class="UNX-m-facet-btn UNX-facet-trigger fa fa-filter"
                            ></button>
                        </div>
                    </div>
                    <div class="UNX-product-list">
                        <div class="UNX-result-header">
                            <div id="didYouMeanWrapper"></div>
                            <div class="UNX-result-right">
                                <div class="UNX-change-products" id="changeNoOfProducts"></div>
                                <div class="UNX-sort-wrapper" id="sortWrapper"></div>
                                <div
                                    class="UNX-change-pagination-wrap"
                                    id="paginationContainer"
                                ></div>
                                <div id="" class="UNX-change-pagination-wrap unxPagination"></div>
                            </div>
                        </div>
                        <div id="bannerContainer"></div>
                        <div class="UNX-product-wrapper" id="searchResultsWrapper"></div>
                        <div
                            id=""
                            class="UNX-change-pagination-wrap UNX-m-page unxPagination"
                        ></div>
                    </div>
                </div>
                <div class="UNX-loader-container" id="loaderEl"></div>
                <div id="noResultWrapper"></div>
                <div id="clickScrollContainer"></div>
            </div>
        </div>
    )
}

export default TestComp;
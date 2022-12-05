import UnbxdSearch from "../../src/index";


const setCategory = function (e) {
    const el = e.target;
    const {
        dataset
    } = el;
    if (dataset && dataset.id) {
        window.UnbxdAnalyticsConf = {
            page: dataset.id
        };
        window.unbxdSearch.getCategoryPage();
    }
};
const navElem = document.getElementById("categoryLinks");
navElem.addEventListener("click", setCategory);


const checkRangeTemplate = function (range, selectedRange, facet) {
    const {
        displayName,
        facetName,
        values,
        gap
    } = range;
    let valueUI = ``;
    const {
        facetClass,
        selectedFacetClass,
        applyMultipleFilters,
        applyButtonText,
        clearButtonText,
    } = facet;
    const selected = selectedRange.length > 0 ? true : false;
    values.forEach(item => {
        const {
            from,
            end
        } = item;
        const isSelected = this.isSelectedRange(facetName, item);
        const btnCss = (isSelected) ? `UNX-selected-facet-btn ${facetClass} ${selectedFacetClass}` : `${facetClass}`;
        valueUI += [ `<button class="${btnCss} UNX-range-facet UNX-change-facet" data-action="setRange" data-facet-name="${facetName}" data-start="${from.dataId}" data-end="${end.dataId}" >`,
        `<span class="UNX-facet-text">${from.name}  -  ${end.name}</span>`,
        `<span class="UNX-facet-count">(${from.count})</span>`,
            `</button>`
        ].join('');
    });
    let clearBtn = ``;
    let applyBtn = ``;
    if (selected) {
        if (applyMultipleFilters) {
            applyBtn = `<button class="UNX-default-btn ${facetClass} UNX-facet-primary" data-action="applyRange"> ${applyButtonText}</button>`;
        }
        clearBtn = `<button class="UNX-default-btn UNX-facet-clear  ${facetClass}" data-action="clearRangeFacets">${clearButtonText}</button>`;
    }
    return [ `<div class="UNX-range-wrapper">`,
        valueUI,
        `<div class="UNX-price-action-row">`,
        applyBtn, clearBtn,
        `<div>`,
        `</div>`
    ].join('')
}


const unbxdCallbackEcma = function (instance, type, data) {
    console.log(type, data, 'type,data');
}

let showFacet = false;
window.resizeTimer = null;

const facetBlock = document.querySelector(".UNX-fxd-facet");
const checkMobile = () => {
    const w = window.innerWidth;
    if (w < 980) {
        return true;
    }
    return false;
};
const toggleMobileFacets = (e) => {
    showFacet = !showFacet;
    const {
        action
    } = e.target.dataset;
    if (action === "applyFacets") {
        window.unbxdSearch.setPageStart(0);
        window.unbxdSearch.getResults();
    }
    if (action === "clearFacets") {
        window.unbxdSearch.clearAllFacets();
        window.unbxdSearch.setPageStart(0);
        window.unbxdSearch.getResults();
    }
    if (showFacet) {
        facetBlock.classList.add("UNX-show-facets")
    } else {
        facetBlock.classList.remove("UNX-show-facets")
    }
}

const btnEls = document.querySelectorAll(".UNX-facet-trigger");
btnEls.forEach(item => {
    item.addEventListener("click", toggleMobileFacets)
})
UnbxdSearch.prototype.setUrl = function (reload) {
    const {
        productType,
        hashMode,
        searchPath,
        onQueryRedirect
    } = this.options;
    const {
        userInput,
        urlLoad,
        isHistory,
        responseObj = {},
        startPageNo
    } = this.state;
    const {
        productViewType
    } = this.viewState;
    const {
        redirect
    } = responseObj;
    if (typeof onQueryRedirect === "function") {
        onQueryRedirect(this, redirect);
    }
    let facetStr = ``;
    facetStr += this.urlFlattenFacets();
    facetStr += this.getRangeFilterStr();
    facetStr += this.categoryFilterUrlStr();
    if (startPageNo > 0) {
        facetStr += this.getPageStartStr()
    }
    facetStr += `&viewType=${productViewType}`;
    const q = `q=${userInput}${facetStr}${this.getSortUrlString()}`;
    this.state.urlState = q;
    const isPath = location.pathname.includes(searchPath);
    if (hashMode) {
        const newQ = `#${q}`;
        if (isPath && (newQ !== location.hash)) {
            location.hash = q;
        }
    } else {
        if (isHistory && !urlLoad && isPath) {
            const newQ = `?${q}`;
            if (decodeURI(newQ) !== decodeURI(location.search)) {
                window.history.pushState(q, null, newQ);
                this.state.urlLoad = false;
            }
        }
        if (reload && isPath) {
            location.search = q;
        }
    }
}
window.unbxdSearch = new UnbxdSearch({
    siteKey: "ss-unbxd-Madras-Link-Dev35911657589844",
    apiKey: "4b0fb8e2d7c19bd771c4ce1795d5bdb3",
    updateUrls: true,
    searchBoxEl: document.getElementById("unbxdInput"),
    searchTrigger: "click",
    searchButtonEl: document.getElementById("searchBtn"),
    products: {
        productType: "SEARCH",
    },
    unbxdAnalytics: true,
    extraParams: {
        stats: 'price'
    },
});
window.unbxdSearch.updateConfig({
    products: {
        el: document.getElementById("searchResultsWrapper"),
        productType: "SEARCH",
        productClick: function (product, e) {
            console.log(product, "product,index", e);
        }
    },
    spellCheck: {
        enabled: true,
        el: document.getElementById("didYouMeanWrapper")
    },
    noResults: {
        el: document.getElementById("noResultWrapper")
    },
    selectedFacets: {
        el: document.getElementById("selectedFacetWrapper")
    },
    facet: {
        facetsEl: document.getElementById("facetsWrapper"),
        selectedFacetsEl: document.getElementById("selectedFacetWrapper"),
        viewMoreLimit: 6,
        enableViewMore: true,
        facetAction: "click",
        defaultOpen: "",
        facetMultiSelect: true,
        facetMultilevel: true,
        isSearchable: false,
        facetMultilevelName: "Category",
        facetClass: "UNX-facets-block",
        viewMoreText: [ "show all", "show less" ],
        clearFacetsSelectorClass: "UNX-clear-facet",
        removeFacetsSelectorClass: "UNX-remove-facet",
        selectedFacetClass: "UNX-selected-facet-btn",
        multiLevelFacetSelectorClass: "UNX-multilevel-facet",
        rangeWidgetConfig: {
            "minLabel": "0.00",
            "maxLabel": "2000.00",
            "prefix": '$'
        },
        onFacetLoad: function (facets) {
            document.getElementById("unbxdInput").value = "";
            // let priceSliderEle = document.getElementsByClassName('UNX-product-item grid__item grid-product');
            // if(priceSliderEle.length < 4 && priceSliderEle.length != 0){
            //     document.querySelector('.price').style.display = 'none'
            // }
            let _this = this;
            let self = this;
            let facet = this.options.facet;
            let rangeWidgetConfig = facet.rangeWidgetConfig;
            facets.forEach(function (facetItem) {
                let facetType = facetItem.facetType,
                    facetName = facetItem.facetName,
                    gap = facetItem.gap;
                let prefix = rangeWidgetConfig.prefix;
                if (facetType === "range") {
                    let rangeId = "".concat(facetName, "_slider");
                    let sliderElem = document.getElementById(rangeId);
                    let end = facetItem.end,
                        _gap = facetItem.gap,
                        max = facetItem.max,
                        min = facetItem.min,
                        start = facetItem.start;
                    let selectedValues = sliderElem.dataset;


                    // first time
                    // store the current q as prev q and current stats as prev stateblock_state
                    // second timers 
                    // if prev query is same as current query then
                    // use prev stats or min and max values

                    // if prev query is not same as new query then
                    // use current stats for min and max
                    // update prevQuery = current query
                    // update current stats = prev stats for current

                    // if(!window.prevQuery) {
                    //     window.prevQuery = window.unbxdSearch.getSearchQuery()
                    // }

                    if (!window.prevQuery) {
                        window.prevQuery = window.unbxdSearch.getSearchQuery()
                        const stats = window.unbxdSearch.state.responseObj.stats || {}
                        window.prevStats = stats || {};
                        min = Math.floor(stats.price.min) || 0;
                        max = Math.ceil(stats.price.max) || 0;
                    } else {
                        if (window.prevQuery === window.unbxdSearch.getSearchQuery()) {
                            const stats = window.prevStats || {}
                            min = Math.floor(stats.price.min) || 0;
                            max = Math.ceil(stats.price.max) || 0;
                        } else {
                            const stats = window.unbxdSearch.state.responseObj.stats || {}
                            min = Math.floor(stats.price.min) || 0;
                            max = Math.ceil(stats.price.max) || 0;
                            window.prevStats = window.unbxdSearch.state.responseObj.stats;
                            window.prevQuery = window.unbxdSearch.getSearchQuery()
                        }
                    }

                    // if(!window.prevQuery || window.prevQuery !== window.unbxdSearch.getSearchQuery()) {
                    //     const stats = window.unbxdSearch.state.responseObj.stats || {}
                    //      min = Math.floor(stats.price.min) || 0;
                    //      max = Math.ceil(stats.price.max) || 0;
                    //      window.prevStats = window.unbxdSearch.state.responseObj.stats;
                    // } else {
                    //     const stats = window.prevStats || {}
                    //      min = Math.floor(stats.price.min) || 0;
                    //      max = Math.ceil(stats.price.max) || 0;
                    // }

                    // window.unbxdSearch.getSearchQuery()
                    // window.unbxdSearch.getQueryParams()
                    //         const stats = window.unbxdSearch.state.responseObj.stats || {}
                    // const min = Math.floor(stats.price.min) || 0;
                    // const max = Math.ceil(stats.price.max) || 0;


                    console.log(sliderElem, 'sliderElem')
                    console.log(selectedValues, 'selectedValues')
                    if (selectedValues) {
                        start = Number(selectedValues.x);
                        end = Number(selectedValues.y);
                    }
                    // if (selectedValues) {
                    //     starts = (selectedValues.x);
                    //     ends = (selectedValues.y);
                    // }
                    _this[ rangeId ] = noUiSlider.create(sliderElem, {
                        start: [ start, end ],
                        tooltips: [ {
                            to: function to(value) {
                                return "".concat(prefix, " ").concat(Math.round(value));
                            }
                        }, {
                            to: function to(value) {
                                return "".concat(prefix, " ").concat(Math.round(value));
                            }
                        } ],
                        connect: true,
                        range: {
                            min: min,
                            max: max
                        },
                        format: {
                            to: function to(value) {
                                return Math.round(value);
                            },
                            from: function from(value) {
                                return Math.round(value);
                            }
                        },
                        padding: 0,
                        margin: 0,
                    });
                    _this[ rangeId ].on("set", function (data) {
                        let newData = {
                            start: data[ 0 ],
                            end: data[ 1 ],
                            facetName: facetName,
                            gap: _gap
                        };
                        self.setRangeSlider(newData);
                    });
                }
            });
        },
        multiLevelFacetTemplate: function multiLevelFacetTemplate(facet, selectedCategories, facetSearchTxt, facetConfig) {
            let facetValues = facet.values;
            let ui = "";
            let multiLevelFacetSelectorClass = facetConfig.multiLevelFacetSelectorClass,
                facetClass = facetConfig.facetClass;
            let UNX_facetLevel = this.testIds.UNX_facetLevel;
            if (selectedCategories) {
                for (let i = 0; i < facet.values.length; i++) {
                    for (let j = 0; j < selectedCategories.length; j++) {
                        if (facet.values[ i ].name == selectedCategories[ j ].value) {
                            facetValues.splice(i, 1)
                        }
                    }
                }
                selectedCategories.forEach(function (item) {
                    let level = item.level,
                        filterField = item.filterField,
                        value = item.value;
                    let lTid = "data-test-id=\"".concat(UNX_facetLevel).concat(level, "\"");
                    let levelCss = "".concat(multiLevelFacetSelectorClass, "  UNX-category-level-").concat(level);
                    ui += [ "<li ".concat(lTid, " data-parent=\"").concat(filterField, "\" data-level=\"").concat(level, "\" data-name=\"").concat(value, "\""), "class=\" ".concat(levelCss, " UNX-selected-crumb ").concat(facetClass, "\" data-action = \"clearCategoryFilter\">"), "<span class=\"UNX-category-icon\"></span><label class=\"UNX-facet-text\">".concat(decodeURIComponent(value), "</label>"), "</li>" ].join('');
                });
            }
            let level = facet.level,
                displayName = facet.displayName,
                values = facetValues,
                filterField = facet.filterField;
            let multiLevelField = facet.multiLevelField;
            if (!multiLevelField) {
                multiLevelField = filterField;
            }
            let lTid = "data-test-id=\"".concat(UNX_facetLevel).concat(level, "\"");
            let levelCss = "UNX-category-level-".concat(level);
            let valueUI = values.map(function (item) {
                let name = item.name,
                    count = item.count;
                if (facetSearchTxt && facetSearchTxt.length > 0) {
                    if (name.toUpperCase().indexOf(facetSearchTxt.toUpperCase()) < 0) {
                        facetClass += ' UNX-search-hidden';
                    }
                }
                return [ "<li ".concat(lTid, " data-parent=\"").concat(multiLevelField, "\" data-level=\"").concat(level, "\""), "class=\"".concat(multiLevelFacetSelectorClass, " ").concat(levelCss, " UNX-unselected-crumb ").concat(facetClass, "\" data-name=\"").concat(name, "\" data-action = \"setCategoryFilter\">"), "<label class=\"UNX-facet-text\">".concat(name, "</label></li>") ].join('');
            });
            ui += "<div class=\"UNX-category-values\">".concat(valueUI.join(''), "</div>");
            if (ui !== "") {
                return [ "<div class=\"UNX-multi-facet-wrap\">", "".concat(ui, "</div>") ].join('');
            } else {
                return "";
            }
        },
        facetItemTemplate: function facetItemTemplate(facet, value, facetSearchTxt) {
            let facetName = facet.facetName,
                isSelected = facet.isSelected;
            let name = value.name,
                count = value.count,
                dataId = value.dataId;
            let _this$options$facet = this.options.facet,
                facetClass = _this$options$facet.facetClass,
                selectedFacetClass = _this$options$facet.selectedFacetClass;
            let UNX_uFilter = this.testIds.UNX_uFilter;
            if (facetSearchTxt && facetSearchTxt.length > 0) {
                if (name.toUpperCase().indexOf(facetSearchTxt.toUpperCase()) < 0) {
                    facetClass += ' UNX-search-hidden'
                }
            }
            let action = "changeFacet";
            if (isSelected) {
                facetClass += ` ${selectedFacetClass}`
                action = "deleteFacetValue";
            }
            if (facetName === 'colorTags_uFilter') {
                let cName = name.toLowerCase();
                let fName = cName.replace(" ", "-");
                let facetNames = "https://cdn.shopify.com/s/files/1/0727/7773/t/57/assets/".concat(fName + "_50x.png");
                return [ `<button data-test-id="${UNX_uFilter}" data-facet-name="${facetName}" data-facet-action="${action}" class="UNX-change-facet UNX-color-facet ${facetClass}" data-id="${dataId}">`,
                `<span class="UNX-color-swatch">${name}</span><span class="UNX-facet-text color-swatch color-swatch--filter color-swatch" style="background-image: url(` + `${facetNames}` + `); background-color: ${fName};"></span></button>` ].join('');
            } else if (facetName === 'brand_uFilter') {
                return [ `<div title="${dataId ? dataId : 'None'}" data-test-id="${UNX_uFilter}" data-facet-name="${facetName}" data-facet-action="${action}" class="UNX-change-facet ${facetClass} " data-id="${dataId}">`,
                `<span class="UNX-brand ${facetClass}" type="checkbox"></span><div class="UNX-facet-text">${name}</div><span class="UNX-facet-count">(${count})</span></div>` ].join('');
            } else {
                return [ `<button title="${dataId ? dataId : 'None'}" data-test-id="${UNX_uFilter}" data-facet-name="${facetName}" data-facet-action="${action}" class="UNX-change-facet ${facetClass} " data-id="${dataId}">`,
                `<span class="UNX-facet-text">${name}</span></button>` ].join('');
            }
        },
        selectedFacetItemTemplate: function selectedFacetItemTemplate(selectedFacet, selectedFacetItem) {
            let facetName = selectedFacet.facetName,
                facetType = selectedFacet.facetType;
            let name = selectedFacetItem.name,
                count = selectedFacetItem.count,
                dataId = selectedFacetItem.dataId;
            let _this$options$facet = this.options.facet,
                facetClass = _this$options$facet.facetClass,
                selectedFacetClass = _this$options$facet.selectedFacetClass,
                removeFacetsSelectorClass = _this$options$facet.removeFacetsSelectorClass;
            let UNX_uFilter = this.testIds.UNX_uFilter;
            let action = "deleteSelectedFacetValue";
            if (facetType === "range") {
                action = "deleteSelectedRange";
            }
            let css = " ".concat(facetClass, " ").concat(selectedFacetClass, " ");
            if (facetName === 'colorTags_uFilter') {
                return [ "<li class=\"UNX-selected-facets-wrap\">",
                    "<a data-test-id=\"".concat(UNX_uFilter, "\" class=\"UNX-change-facet").concat(css, "\" data-facet-name=\"").concat(facetName, "\" data-facet-action=\"").concat(action, "\" data-id=\"").concat(dataId, "\">"), "<span class=\"UNX-facet-text \">".concat(name, "</span></a>"),
                    "<a class=\"UNX-delete-facet ".concat(removeFacetsSelectorClass, "").concat(css, "\" data-id=\"").concat(dataId, "\" data-facet-action=\"").concat(action, "\" data-facet-name=\"").concat(facetName, "\">x</a>"), "</li>"
                ].join('');
            }
            if (facetName === 'price') {
                let currency = name.trim().length > 0 ? "$" + name.split("TO ")[ 0 ] + "TO " + "$" + name.split("TO ")[ 1 ] : "&nbsp;&nbsp;&nbsp;";
                console.log(dataId, 'dataId')
                // console.log(dataset, 'dataset')
                console.log(selectedFacetItem, 'selectedFacetItem')
                console.log(selectedFacet, 'selectedFacet')

                return [ "<li class=\"UNX-selected-facets-wrap\">",
                    "<a data-test-id=\"".concat(UNX_uFilter, "\" class=\"UNX-change-facet").concat(css, "\" data-facet-name=\"").concat(facetName, "\" data-facet-action=\"").concat(action, "\" data-id=\"").concat(dataId, "\">"), "<span class=\"UNX-facet-text \">".concat(currency, "</span></a>"),
                    "<a class=\"UNX-delete-facet ".concat(removeFacetsSelectorClass, "").concat(css, "\" data-id=\"").concat(dataId, "\" data-facet-action=\"").concat(action, "\" data-facet-name=\"").concat(facetName, "\">x</a>"), "</li>"
                ].join('');
            } else {
                return [ "<li class=\"UNX-selected-facets-wrap\">",
                    "<a data-test-id=\"".concat(UNX_uFilter, "\" class=\"UNX-change-facet").concat(css, "\" data-facet-name=\"").concat(facetName, "\" data-facet-action=\"").concat(action, "\" data-id=\"").concat(dataId, "\">"), "<span class=\"UNX-facet-text \">".concat(name, "</span></a>"),
                    "<a class=\"UNX-delete-facet ".concat(removeFacetsSelectorClass, "").concat(css, "\" data-id=\"").concat(dataId, "\" data-facet-action=\"").concat(action, "\" data-facet-name=\"").concat(facetName, "\">x</a>"), "</li>"
                ].join('');
            }
        },
        facetTemplate: function facetTemplate(facetObj, children, isExpanded, facetSearchTxt, facet) {
            let displayName = facetObj.displayName,
                facetName = facetObj.facetName,
                multiLevelField = facetObj.multiLevelField,
                facetType = facetObj.facetType,
                values = facetObj.values;
            let facetClass = facet.facetClass,
                applyMultipleFilters = facet.applyMultipleFilters,
                isCollapsible = facet.isCollapsible,
                isSearchable = facet.isSearchable,
                searchPlaceHolder = facet.searchPlaceHolder,
                textFacetWrapper = facet.textFacetWrapper,
                enableViewMore = facet.enableViewMore,
                viewMoreText = facet.viewMoreText,
                viewMoreLimit = facet.viewMoreLimit,
                applyButtonText = facet.applyButtonText,
                clearButtonText = facet.clearButtonText;
            let _this$options = this.options,
                actionBtnClass = _this$options.actionBtnClass,
                actionChangeClass = _this$options.actionChangeClass;
            let _this$cssList = this.cssList,
                openBtn = _this$cssList.openBtn,
                closeBtn = _this$cssList.closeBtn;
            let viewMoreUi = "";
            let viewMoreCss = "";
            let selected = this.getSelectedFacets()[ facetName ];
            let isFtr = selected && selected.length > 0 ? true : false;
            if (enableViewMore && facetType === "text" && values.length > viewMoreLimit) {
                viewMoreCss = "UNX-view-more";
                viewMoreUi = "<div class=\"UNX-view-more-row \"><button class=\"".concat(actionBtnClass, "\" data-facet-name=\"").concat(facetName, "\" data-action=\"viewMore\" data-id=\"").concat(viewMoreText[ 0 ], "\">").concat(viewMoreText[ 0 ], "</button></div>");
            }
            let clearUI = "";
            let applyBtn = "";
            if (isFtr) {
                clearUI = "<button class=\"UNX-facet-clear ".concat(facetClass, " \"data-facet-action=\"deleteFacet\" data-facet-name=\"").concat(facetName, "\">").concat(clearButtonText, "</button>");
            }
            if (applyMultipleFilters && isFtr) {
                applyBtn = "<button class=\"UNX-facet-primary ".concat(facetClass, " \"data-facet-action=\"applyFacets\" >").concat(applyButtonText, "</button>");
            }
            let collapsibleUI = "";
            let searchInput = "";
            if (isCollapsible) {
                if (isExpanded) {
                    collapsibleUI = "<div class=\"UNX-facet-header ".concat(actionBtnClass, " UNX-facet-open\"  data-facet-name=\"").concat(facetName, "\" data-facet-action=\"facetClose\"> <h3>").concat(displayName, "</h3></div>");
                } else {
                    collapsibleUI = "<div class=\"UNX-facet-header ".concat(actionBtnClass, " UNX-facet-close\"  data-facet-name=\"").concat(facetName, "\" data-facet-action=\"facetOpen\"> <h3>").concat(displayName, "</h3></div>");
                }
            }
            if (isSearchable && facetSearchTxt !== null) {
                searchInput = "<div class=\"UNX-searchable-facets\"><input data-test-id=\"".concat(this.testIds.UNX_searchFacets, "\" class=\"UNX-facet-search ").concat(actionChangeClass, "\" value=\"").concat(facetSearchTxt, "\"  data-facet-name=\"").concat(facetName, "\" data-facet-action=\"searchFacets\" type=\"text\" placeholder=\"").concat(searchPlaceHolder, "\"/></div>");
            }
            return [ "<div class=\"UNX-text-facet-wrap\">",
                collapsibleUI,
                "<div class=\"UNX-facets-all\">", "<div class=\"UNX-facets ".concat(textFacetWrapper, " ").concat(viewMoreCss, "\">").concat(children, "</div>"), "</div>", "</div>" ].join('');
        },
        selectedFacetTemplate: function selectedFacetTemplate(selections, facet, selectedFacetsConfig) {
            const {
                clearAllText,
                clearFacetsSelectorClass
            } = facet;
            const selectedFClass = (this.selectedFacetClass) ? this.selectedFacetClass : selectedFacetsConfig.selectedFacetClass;
            if (selections.length > 0) {
                return [ "<div class=\"UNX-facets-selections\">",
                    "<div class=\"UNX-selected-facets-inner\">".concat(selections, "</div>"),
                    "</div>" ].join('');
            } else {
                return "";
            }
        },
        rangeTemplate: function (range, selectedRange, facet) {
            let facetName = range.facetName;
            const stats = window.unbxdSearch.state.responseObj.stats || {}
            const min = Math.floor(stats.price.min) || 0;
            const max = Math.ceil(stats.price.max) || 0;
            let rangeId = "".concat(facetName, "_slider");
            return [ "<div id=\"".concat(facetName, "\" data-id = \"").concat(facetName, "\" class=\"UNX-range-slider-wrap\">"), "<div class=\"UNX-value-container UNX-range-value-block\"></div>", "<div id=\"".concat(rangeId, "\" data-x =\"").concat(min, "\" data-y =\"").concat(max, "\" class=\"UNX-range-slider-wrapper\"></div>"), "</div><div></div>" ].join('');
        },
    },
    // facet: {
    //     facetsEl: document.getElementById("facetsWrapper"),
    //     applyMultipleFilters: false,
    //     defaultOpen: "FIRST",
    //     onFacetLoad: function(facets) {
    //         const self = this;
    //         const {
    //             facet
    //         } = this.options;
    //         const {
    //             rangeWidgetConfig
    //         } = facet;
    //         facets.forEach(facetItem => {
    //             const {
    //                 facetType,
    //                 facetName,
    //                 gap
    //             } = facetItem;
    //             const {
    //                 prefix
    //             } = rangeWidgetConfig;

    //             if (facetType === "range") {
    //                 const rangeId = `${facetName}_slider`;
    //                 const sliderElem = document.getElementById(rangeId);
    //                 let {
    //                     end,
    //                     gap,
    //                     max,
    //                     min,
    //                     start
    //                 } = facetItem;
    //                 const selectedValues = sliderElem.dataset;
    //                 if (selectedValues) {
    //                     start = Number(selectedValues.x),
    //                         end = Number(selectedValues.y)
    //                 }
    //                 this[rangeId] = noUiSlider.create(sliderElem, {
    //                     start: [start, end],
    //                     tooltips: [{
    //                             to: function(value) {
    //                                 return `${prefix} ${Math.round(value)}`;
    //                             }
    //                         },
    //                         {
    //                             to: function(value) {
    //                                 return `${prefix} ${Math.round(value)}`;
    //                             }
    //                         }
    //                     ],
    //                     connect: true,
    //                     range: {
    //                         'min': 0,
    //                         'max': max
    //                     },
    //                     format: {
    //                         to: function(value) {
    //                             return Math.round(value);
    //                         },
    //                         from: function(value) {
    //                             return Math.round(value);
    //                         }
    //                     },
    //                     padding: 0,
    //                     margin: 0,
    //                 });
    //                 this[rangeId].on("set", function(data) {
    //                     const newData = {
    //                         start: data[0],
    //                         end: data[1],
    //                         facetName,
    //                         gap
    //                     };
    //                     self.setRangeSlider(newData);
    //                 });

    //             }

    //         });
    //     },
    //     isCollapsible: true,
    //     isSearchable: true,
    //     enableViewMore: false,
    //     rangeTemplate: function(range, selectedRange, facet) {
    //         const {
    //             facetName,
    //             start,
    //             end
    //         } = range;
    //         let min = start;
    //         let max = end;
    //         if (selectedRange.length > 0) {
    //             const sel = selectedRange[0].replace(/[^\w\s]/gi, '').split(" TO ");
    //             min = sel[0];
    //             max = sel[1];
    //         }
    //         const rangId = `${facetName}_slider`;
    //         return [`<div id="${facetName}"  data-id="${facetName}" class=" UNX-range-slider-wrap">`,
    //             `<div class="UNX-value-container UNX-range-value-block" ></div>`,
    //             `<div id="${rangId}" data-x="${min}" data-y="${max}" class="UNX-range-slider-wrapper"></div>`,
    //             `</div>`,
    //             `<div>`,
    //             `</div>`
    //         ].join('')
    //     }
    // },
    pagination: {
        type: 'INFINITE_SCROLL',
        el: document.querySelector("#clickScrollContainer"),
        onPaginate: function (data) { console.log(data, "data") }
    },
    breadcrumb: {
        el: document.getElementById("breadcrumpContainer")
    },
    pagesize: {
        el: document.getElementById("changeNoOfProducts")
    },

    sort: {
        el: document.getElementById("sortWrapper"),
        options: [ {
            value: "min_price desc",
            text: "Price High to Low"
        },
        {
            value: "min_price asc",
            text: " Price Low to High"
        }
        ]
    },
    loader: {
        el: document.getElementById("loaderEl")
    },
    productView: {
        el: document.getElementById("productViewTypeContainer"),
        defaultViewType: "GRID"
    },
    banner: {
        el: document.getElementById("bannerContainer"),
        count: 1
    },
    swatches: {
        enabled: true,
        attributesMap: {
            swatchList: "color",
            swatchImgs: "unbxd_color_mapping",
            swatchColors: "color"
        }
    },
    onAction: function (e, ctx) { },
    onEvent: unbxdCallbackEcma

})



//window.unbxdSearch.initialize();

import renderPagination from './renderPagination';
import setUpInfiniteScroll from './infiniteScroller';
import {
    renderNewResults,
    paginationAction
} from './actions';


const getProductsPerPage = function(){
    const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
    return Number(urlParams.get(this.options.pagination.usePageAndCount ? 'count' :'rows')) || Number(this.options.pagesize.pageSize);
}

const getCurrentUrlPage = function(){
    const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
    if (this.options.pagination.usePageAndCount) {
        return Number(urlParams.get('page')) || 1;
    } else {
        return Number(urlParams.get('start') / getProductsPerPage()) + 1 || 0;
    }
}

const replaceParamInUrl = function (key, value) {
    const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
    urlParams.set(key, value);
    history.replaceState(null, null, this.urlSearchParamsToStr(urlParams));
}

const setPagination = (prototype) => {
    prototype = Object.assign(prototype, {
        renderPagination,
        renderNewResults,
        paginationAction,
        setUpInfiniteScroll,
        getProductsPerPage,
        getCurrentUrlPage,
        replaceParamInUrl
    })
}

export {
    setPagination as default,
    renderPagination,
    renderNewResults,
    paginationAction,
    setUpInfiniteScroll,
    getProductsPerPage,
    getCurrentUrlPage,
    replaceParamInUrl
};

import libEvents from "../../../../search-JS-core/src/constants";

function delegate(el, evt, sel, handler) {
    try{
        el.addEventListener(evt, function (event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                t = t.parentNode;
            }
        });
    }catch(err){
        this.onError("delegate.js",err,libEvents.runtimeError);
    }
    
}
export default delegate;

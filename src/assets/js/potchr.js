const Potchr = {
    extend: function (extendObject, extendFrom, overrides) {
        if (extendObject == null || extendFrom == null) {
            return null;
        }
        let objectConstructor = Object.prototype.constructor;
        let assertExtendFrom, assertOverrides;
        if (typeof (extendFrom) == "object") {
            assertOverrides = Array.prototype.slice.call(arguments, 1);
            overrides = extendFrom;
            assertExtendFrom = extendObject;
            extendObject = overrides.constructor != objectConstructor ? overrides.constructor : function () {
                assertExtendFrom.apply(this, arguments);
            };
        } else {
            assertExtendFrom = extendFrom;
            assertOverrides = Array.prototype.slice.call(arguments, 2);
        }
        let Template = function () {
        };
        let extendsForPrototype = assertExtendFrom.prototype;
        Template.prototype = extendsForPrototype;
        let extendObjectPrototype = extendObject.prototype = new Template();
        extendObjectPrototype.constructor = extendObject;
        extendObject.superclass = extendsForPrototype;
        if (extendsForPrototype.constructor == objectConstructor) {
            extendsForPrototype.constructor = assertExtendFrom;
        }
        for (let i = 0; i < assertOverrides.length; i++) {
            Potchr.apply(extendObjectPrototype, assertOverrides[i]);
        }
        return extendObject;
    },
    apply: function (obj, params) {
        if (!obj || !params) {
            return;
        }
        if (params instanceof Object) {
            for (let name in params) {
                obj[name] = params[name];
            }
        }
    }
};

Potchr.Object = function (params) {
    Potchr.apply(this, params);
}

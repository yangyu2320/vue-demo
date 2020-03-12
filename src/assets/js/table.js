import Potchr from "potchr.js"

Potchr.Table = function (params) {
    Potchr.Table.superclass.constructor.call(this, params);
}
Potchr.extend(Potchr.Table, Potchr.Object, {

    __init: function() {

    },

    getColumns: function () {
        return this.columns || [];
    },
    getColumn: function (colName) {
        if (!this.columns) {
            return null;
        }
        for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            if (column.name === colName) {
                return column;
            }
        }
        return null;
    }
})

<template>
    <div>
        <div class="panel">
            <div class="queryPane">
                <label>ID</label>
                <input class="query-item" type="text" placeholder="请输入。。。">
                <label>用户名</label>
                <input class="query-item" type="text" placeholder="请输入。。。">
                <label>手机</label>
                <input class="query-item" type="text" placeholder="请输入。。。">
                <label>邮箱</label>
                <input class="query-item" type="text" placeholder="请输入。。。">
            </div>
            <div class="queryPane-button">
                <a-button type="primary" size="small" icon="search">查询</a-button>
                <a-button type="primary" size="small" icon="reload">重置</a-button>
            </div>
        </div>
        <div class="split-line"/>
        <div class="tablePane" style="position: relative">
            <div id="tbody" class="table" style="height: 200px; overflow: scroll; width: 100%">
                <table width="400px">
                    <thead>
                    <tr>
                        <th style="width: 120px">ID</th>
                        <th style="width: 100px">姓名</th>
                        <th style="width: 150px">手机号</th>
                        <th style="width: 200px">电子邮箱</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in data" @click="editRow">
                        <td @dblclick="edit">{{row.id}}</td>
                        <td @dblclick="edit">{{row.name}}</td>
                        <td @dblclick="edit">{{row.mobile}}</td>
                        <td @dblclick="edit">{{row.selected}}</td>
                    </tr>
                    </tbody>
                    <input id="x" class="cell-input" style="text">
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios";

    window.onload = function () {

        let tbody = document.getElementById("tbody");
        let thead = document.getElementById("thead");
        let fix = document.getElementById("fix");

        thead.style.width = tbody.clientWidth + "px";
        fix.style.height = tbody.clientHeight + "px";

        tbody.onscroll = function () {
            thead.scrollLeft = tbody.scrollLeft;
            fix.scrollTop = tbody.scrollTop;
        }
    }

    const data = [{id: "test"}, {}, {}, {}, {}];

    export default {
        mounted() {
            this.loadData();
        },
        data() {
            return {
                data
            };
        },
        methods: {
            loadData() {
                axios.get('http://localhost:8010/user').then(response => {
                    this.data = response.data.data;
                }).catch(error => {
                    console.log(error);
                });
            },
            edit(event) {
                var offsetTop = event.currentTarget.offsetTop;
                var offsetLeft = event.currentTarget.offsetLeft;
                var offsetHeight = event.currentTarget.offsetHeight;
                var offsetWidth = event.currentTarget.offsetWidth;
                document.getElementById("x").style.top = offsetTop + "px";
                document.getElementById("x").style.left = offsetLeft + "px";
                document.getElementById("x").style.height = offsetHeight + "px";
                document.getElementById("x").style.width = offsetWidth + "px";
                document.getElementById("x").focus();
            },
            editRow(event) {
                if (event.currentTarget != this.selectedRow) {
                    if (this.selectedRow) {
                        this.selectedRow.classList.remove("selected");
                    }
                    this.selectedRow = event.currentTarget;
                    event.currentTarget.classList.add("selected");
                }
            }
        }
    };
</script>

<style>

    table {
        position: relative;
    }

    .cell-input {
        position: absolute;
        top: 0;
        left: 0;
    }

    .queryPane {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto auto;
        grid-template-rows: auto;
        grid-gap: 8px;
        width: min-content;
        height: min-content;
        align-items: center;
    }

    .tablePane {
        padding: 10px 15px;
    }

    label {
        white-space: nowrap;
        font-size: 12px;
        color: black;
        padding-left: 8px;
        text-shadow: #ccc;

    }

    input, .query-item {
        width: 140px;
        font-size: 12px;
        border: 1px solid grey;
        border-radius: 0.2em;
        border-color: #ccc;
        padding: 6px 8px;
        line-height: 14px;
        outline-style: none;
    }

    input, .query-item:focus {
        border-color: #3285e1;
    }

    .panel {
        padding: 10px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr;
        gap: 15px;
        width: min-content;
        height: min-content;
    }

    .queryPane-button {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-columns: auto;
        width: min-content;
        height: min-content;
        gap: 5px;
    }

    .split-line {
        height: 1px;
        background-color: #e8e8e8;
        width: 100%;
        display: block;
        margin: 5px 0;
    }

    table, th, td {
        border: 1px solid grey;
        border-collapse: collapse;
    }

    table {
        table-layout: fixed;
    }

    thead th {
        text-align: center;
    }

    tr td {
        white-space: nowrap;
        overflow: hidden;
    }

    tr th {
        white-space: nowrap;
        width: 100px;
        height: 20px;
    }

    html {
        font-family: Arial, Helvetica, sans-serif, "微软雅黑";
        font-weight: 400;
    }

    table, th, td, tr {
        border-color: #ccc;
    }

    thead tr th {
        padding: 8px 0;
        font-size: 12px;
    }

    tbody tr td {
        padding: 5px 8px;
        font-size: 12px;
        height: 28px;
        font-family: "微软雅黑";
        color: #000;
        font-weight: 400;
    }

    tbody tr:hover {
        background-color: #ecf4fd;
    }

    .selected {
        background-color: #e1f1ff;
    }

    thead {
        background-color: #f2f5f8;
    }

    #x {
        border-radius: unset;
        font-size: 12px;
        line-height: 14px;
        padding: 5px 8px;
    }

</style>

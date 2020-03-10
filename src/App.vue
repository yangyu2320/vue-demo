<template>
    <div>
        <div class="panel">
            <div class="queryPane">
                <label>ID</label>
                <div class="queryPane-item">
                    <a-input size="small" placeholder="default size"/>
                </div>
                <label>用户名</label>
                <div class="queryPane-item">
                    <a-input size="small" placeholder="default size"/>
                </div>
                <label>手机</label>
                <div class="queryPane-item">
                    <a-input size="small" placeholder="default size"/>
                </div>
                <label>邮箱</label>
                <div class="queryPane-item">
                    <a-input size="small" placeholder="default size"/>
                </div>
            </div>
            <div class="queryPane-button">
                <a-button type="primary" size="small" icon="search">查询</a-button>
                <a-button type="primary" size="small" icon="reload">重置</a-button>
            </div>
        </div>
        <div class="split-line"/>
        <div style="position: relative">
            <div id="tbody" class="table" style="height: 200px; overflow: scroll; width: 100%">
                <table width="400px">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>电子邮箱</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in data" v-on:click="row.selected=false" v-bind:class="{hoverColor : row.selected}">
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.mobile}}</td>
                        <td>{{row.selected}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="thead" class="head" style="overflow: hidden">
                <table style="width: 400px">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>电子邮箱</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div id="fix" class="fix" style="background-color: white; overflow: hidden;">
                <table style="width: 200px">
                    <thead style="background-color: #f3faff">
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in data" v-on:click="row.selected=false" v-bind:class="{hoverColor : row.selected}">
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="fix-thead" class="fix-thead" style="background-color: white;">
                <table style="width: 200px;  background-color: #f3faff">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                    </tr>
                    </thead>
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

    const data = [];

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
            }
        }
    };
</script>

<style>



    .queryPane {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto auto;
        grid-template-rows: auto;
        grid-gap: 5px;
        width: min-content;
        height: min-content;
        align-items: center;
    }

    label {
        white-space: nowrap;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        padding-left: 5px;
        font-weight: bolder;
    }

    .queryPane-item {
        width: 140px;
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
        width: 100px;
        height: 20px;
        overflow: hidden;
    }

    tr th {
        white-space: nowrap;
        width: 100px;
        height: 20px;
    }

    .table {
        position: absolute;
        top: 0;
        left: 0;
    }

    .fix {
        position: absolute;
        top: 0;
        left: 0;
    }

    .fix-thead {
        position: absolute;
        top: 0;
        left: 0;
    }

    .head {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f3faff;
    }

    .hoverColor {
        background-color: red;
    }
</style>

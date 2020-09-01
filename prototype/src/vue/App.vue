<template>
    <div class="main-window">
        <h1>Test a website</h1>
        <form class="main-window__form">
            <label for="url">Select a website: </label>
            <input id="url" type="text" v-model.lazy="url">
            <button @click.prevent="testUrl">Test & Save Report</button>
        </form>
        <a href="../../test.txt" download>Download It!</a>
    </div>
</template>

<script>
// const fs = require('fs');
const { ipcRenderer } = require('electron');

// Test a native module: Print the dirs and files in the current directory.
// fs.readdir('.', (err, files) => {
//     console.log(files);
//     if (err) console.log(err);
// });

export default {
    data() {
        return {
            url: ''
        };
    },
    methods: {
        testUrl() {
            ipcRenderer.send('STORE_REPORT', this.url);
        }
    }
};
</script>

<style>
    .main-window {
        margin: 10px 20px;
        text-align: center;
    }
</style>

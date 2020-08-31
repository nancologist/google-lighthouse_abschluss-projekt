<template>
    <div class="main-window">
        <h1>Test a website</h1>
        <form class="main-window__form">
            <label for="url">Select a website: </label>
            <input id="url" type="text" v-model.lazy="url">
            <button @click.prevent="testUrl">test</button>
        </form>
    </div>
</template>

<script>
const fs = require('fs');
const { ipcRenderer } = require('electron');

fs.readdir('.', (err, files) => {
    console.log(files);
    if (err) console.log(err);
});

export default {
    data() {
        return {
            url: ''
        };
    },
    methods: {
        testUrl() {
            ipcRenderer.send('xxx', this.url);
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

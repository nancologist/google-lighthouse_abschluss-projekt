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
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
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
            window.dispatchToE('xxx', this.url);
            // return;
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

<template>
    <div class="main-window">
        <h1>Test a websit</h1>
        <form class="main-window__form">
            <label for="url">Select a website: </label>
            <input id="url" type="text" v-model.lazy="url">
            <button @click.prevent="testUrl">test</button>
        </form>
    </div>
</template>

<script>
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

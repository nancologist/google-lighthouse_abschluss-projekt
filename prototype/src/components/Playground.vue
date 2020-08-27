<template>
<div id="app">
    <button v-on:click="greet">Start</button>
    <p>{{ myText }}</p>
</div>
</template>

<script>

export default {
    name: 'App',
    data: () => ({
        myText: 'Click on start!'
    }),
    methods: {
        greet() {
            this.myText = 'Hallo Helmut!'
        }
    }
}

</script>

<style>
    #app {
    }
</style>

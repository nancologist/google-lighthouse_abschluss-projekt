<template>
<div id="app">
    <button v-on:click="greet">Start</button>
    <p>{{ myText }}</p>
    <a v-bind:href="link">Google!</a>
</div>
</template>

<script>

export default {
    name: 'App',
    data: () => ({
        myText: 'Click on start!',
        link: 'http://google.com' // instead, "www.google.com" would be added like an endpoint!!!
    }),
    methods: {
        greet () {
            this.myText = 'Hallo Helmut!'
        }
    }
}

</script>

<style>
    #app {
    }
</style>

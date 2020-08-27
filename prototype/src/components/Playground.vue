<template>
<div id="app">
<!--    <button v-on:click="greet">Start</button>-->
<!--    <p>{{ myText }}</p>-->
<!--    <a v-bind:href="link">Google!</a>-->
    <button v-on:click="increase">ADD</button>
    <p>{{ num }}</p>
</div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            num: 0
        }
    },
    methods: {
        increase () { this.num++ }
    }
}

</script>

<style>
#app {
}
</style>

<!--
IMPORTANT:
    * Avoid using arrow functions in Vue! It saves you a lot of headachase.
-->

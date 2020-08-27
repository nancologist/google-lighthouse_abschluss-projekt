<template>
<div id="app">
    <button v-on:click="increase(2)">ADD</button>
    <p>{{ num }}</p>
    <p v-on:mousemove="updateCoord">
        (X: {{x}}, Y: {{y}})
        - <span v-on:click.stop="">DEAD SPOT</span>
    </p>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data () {
        return {
            num: 0,
            x: 0,
            y: 0
        }
    },
    methods: {
        increase (step) {
            this.num += step
        },
        updateCoord (event) {
            this.x = event.clientX
            this.y = event.clientY
        }
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

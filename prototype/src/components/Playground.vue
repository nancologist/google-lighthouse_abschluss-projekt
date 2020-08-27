<template>
<div id="app">
    <div>
        <button @click="alertMe">Show Alert</button>
    </div>
    <div>
        <input @keydown.enter="setValue" type="text">
        <p>{{ myValue }}</p>
    </div>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data () {
        return {
            myValue: ''
        }
    },
    methods: {
        alertMe () {
            alert('This is an alert!!!')
        },
        setValue ({ target: { value } }) {
            this.myValue = value
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

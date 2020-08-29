<template>
    <div id="app">
        <h1>Name in App: {{ myName }}</h1>
        <playground :name="myName" :callFunc="reverseName"/>
        <button @click="changeName">Change Name</button>
    </div>
</template>

<script>
import playground from './components/playground/Playground.vue'

export default {
    components: {
        playground
    },
    data () {
        return {
            myName: 'David'
        }
    },
    methods: {
        changeName() {
            this.myName = 'Sara'
        },
        reverseName() {
            this.myName = this.myName.split('').reverse().join('')
        }
    },
    name: 'App'
}
</script>

<style>
#app {
    background-color: coral;
    font-family: Arial;
    margin: 10px 20px;
    padding: 10px 20px;
}
</style>

<template>
<div id="playground">
    <div class="trafficLight">
        <div class="trafficLight__green" v-if="isGreen"></div>
        <div class="trafficLight__red" v-else></div>
    </div>
    <button @click="switchLight">SWITCH</button>
    <hr>
    <ul>
        <li v-for="(name, index) in names" :key="index">#{{index}} {{name}}</li>
    </ul>
    <hr>
    <div v-for="(val, key, index) in movie" :key="index">
        <p>{{ key }}: {{ val }}</p>
    </div>
    <hr>
    <div v-for="(item, index) in testObject" :key="index">
        <ul v-if="Array.isArray(item)">
            <li v-for="(x, i) in item" :key="i">{{x}}</li>
        </ul>
        <p v-else>{{ item }}</p>
    </div>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data () {
        return {
            isGreen: false,
            names: ['David', 'Michael', 'Paul', 'Oliver'],
            movie: {
                title: 'Lord of the Rings',
                author: 'J.R.R Tolkiens',
                books: 3
            },
            testObject: {
                name: 'TESTOBJECT',
                data: [1.67, 1.33, 2.43, 0.81]
            }
        }
    },
    methods: {
        switchLight () {
            this.isGreen = !this.isGreen
        }
    }
}

</script>

<style>
    @import './Playground.css';
</style>

<!--
IMPORTANT:
(If there's no explanation, please look at the README.md of the Vue Course on Github.)
    * Avoid using arrow functions in Vue! It saves you a lot of headachase.

    * v-on:keydown.enter

    * v-on:EVENT_NAME.stop

    * v-model (input-element two way binding)

    * computed vs methods : Video #26

    * computed vs watch : They are similar but in "watch" you can run an async code liek setTimeout(), what is not possible with "computed"

    * Shorthands : @ instead von v-on and : instead of v-bind

    * v-else-if : NEW!

    * vm.$data

    * ref-attr , this.$refs inside vue-instance
      (Important: using "ref" in React or Vue means accessing the DOM directly, which can be overwritten. So "ref" replaces the .querySelector())
-->

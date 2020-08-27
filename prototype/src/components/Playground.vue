<template>
<div id="playground">
    <div>
        <p>Current value: {{ num }}</p>
        <button @click="num += 1">Add 1</button>
        <button @click="num += 5">Add 5</button>
        <p>{{ isNotLessThan37 ? 'DONE!' : 'Not Enough' }}</p>
    </div>
    <div>
        <label for="timeout">Set timeout (sec)</label>
        <input type="number" id="timeout" v-model="timeout">
        <p>{{ num }}</p>
    </div>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data () {
        return {
            num: 0,
            timeout: 3
        }
    },
    computed: {
        isNotLessThan37 () {
            return this.num >= 37
        }
    },
    watch: {
        num () {
            setTimeout(() => { this.num = 0 }, +this.timeout * 1000)
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
(If there's no explanation, please look at the README.md of the Vue Course on Github.)
    * Avoid using arrow functions in Vue! It saves you a lot of headachase.

    * v-on:keydown.enter

    * v-on:EVENT_NAME.stop

    * v-model (input-element two way binding)

    * computed vs methods : Video #26

    * computed vs watch : They are similar but in "watch" you can run an async code liek setTimeout(), what is not possible with "computed"

    * Shorthands : @ instead von v-on and : instead of v-bind
-->

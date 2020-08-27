<template>
<div id="playground">
    <button @click="startEffect" >Start Effect</button>
    <div class="effect" :class="{highlight: hasEffect, shrink: !hasEffect}"></div>
    <div
        :class="[{black: shouldBeBlack}, 'whiteFont']"
    >
        I have no classes! :(
    </div>
    <input type="text" placeholder="Enter a Css Class" v-model="inputClass">
    <div class="effect" :class="inputClass"></div>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data () {
        return {
            hasEffect: false,
            shouldBeBlack: true,
            inputClass: ''
        }
    },
    methods: {
        startEffect () {
            setInterval(() => { this.hasEffect = !this.hasEffect }, 800)
        }
    }
}

</script>

<style>
    #playground > * {
        margin-bottom: 20px;
    }

    .effect {
        border: 1px solid black;
        height: 100px;
        transition: all 400ms;
        width: 100px;
    }

    .highlight {
        background-color: chartreuse;
        width: 200px;
    }

    .shrink {
        background-color: gray;
        width: 50px;
    }

    .black {
        background-color: black;
    }

    .whiteFont {
        color: white;
    }

    .circle {
        background-color: dodgerblue;
        border-radius: 50%;
        height: 100px;
        width: 100px;
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

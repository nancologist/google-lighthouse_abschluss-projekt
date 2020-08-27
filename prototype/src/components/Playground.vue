<template>
<div id="playground">
    <div
        class="demo"
        :class="{
            'red': shouldRedBg
        }"
        @click="toggleBg"
    ></div>
    <div class="demo"></div>
    <div class="demo"></div>
</div>
</template>

<script>

export default {
    name: 'Playground',
    data: function () {
        return {
            shouldRedBg: false
        }
    },
    methods: {
        toggleBg () {
            this.shouldRedBg = !this.shouldRedBg
        }
    }

}

</script>

<style>
    #playground {
        display: flex;
    }

    .demo {
        background-color: gray;
        height: 100px;
        margin: 15px;
        width: 100px;
    }

    .red {
        background-color: red;
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

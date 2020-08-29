<template>
    <div id="app">
        <h1>Home Page</h1>
        <component :is="currentCmp">
            <playground :name="'Mori'"/>
            <cmp1/>
            <cmp2/>
            <cmp3/>
        </component>
        <hr>
        <h3>Switch Components</h3>
        <button @click="currentCmp = 'cmp1'">cmp1</button>
        <button @click="currentCmp = 'cmp2'">cmp2</button>
        <button @click="currentCmp = 'cmp3'">cmp3</button>
        <button @click="currentCmp = 'playground'">playground</button>
    </div>
</template>

<script>
import cmp1 from './components/playground/Cmp1.vue';
import cmp2 from './components/playground/Cmp2.vue';
import cmp3 from './components/playground/Cmp3.vue';
import playground from './components/playground/Playground.vue';

export default {
    components: {
        cmp1,
        cmp2,
        cmp3,
        playground
    },
    data() {
        return {
            currentCmp: 'playground'
        };
    },
    name: 'App'
};
</script>

<style>
#app {
    background-color: coral;
    font-family: Arial;
    margin: 10px 20px;
    padding: 10px 20px;
}
</style>

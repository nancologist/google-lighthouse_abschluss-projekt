<template>
    <div id="app">
        <playground :name="'Mori'"/>
    </div>
</template>

<script>
import playground from './components/playground/Playground'

export default {
    name: 'App',
    components: {
        playground
    }
}
</script>

<style>
#app {
}
</style>

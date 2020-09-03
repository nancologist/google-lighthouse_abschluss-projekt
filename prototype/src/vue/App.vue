<template>
    <v-app>
        <div class="layout">
            <div class="main-window">
                <button v-if="!appStarted" @click="appStarted = true" >Start</button>
                <AuditForm v-else />
            </div>
        </div>
    </v-app>
</template>

<script>
import AuditForm from './components/AuditForm.vue';

export default {
    components: { AuditForm },
    data() {
        return {
            appStarted: false
        };
    }
};
</script>

<style>
    @import "assets/css/main.css";

    .main-window {
        margin: auto;
        text-align: center;
    }
</style>

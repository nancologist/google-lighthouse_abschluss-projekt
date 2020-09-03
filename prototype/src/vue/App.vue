<template>
    <v-app>
        <div class="main-window">
            <h1>Test a website</h1>
            <button v-if="!appStarted" @click="appStarted = true" >Start</button>
            <AuditForm v-else />
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
    .main-window {
        margin: 10px 20px;
        text-align: center;
    }
</style>

<template>
    <v-app>
        <div class="layout"> <!-- Todo: Maybe add a Layout cmp ? (but for now it's very thin and ok here) -->
            <div class="main-window">
                <v-btn v-if="!appStarted" @click="appStarted = true" >Start App</v-btn>
                <AuditForm v-else />
            </div>
        </div>
    </v-app>
</template>

<script>
import AuditForm from './components/AuditForm/AuditForm.vue';
export default {
    components: { AuditForm },
    data() {
        return {
            appStarted: false,
            name: 'Helmut'
        };
    }
};
</script>

<style>
    @import "assets/css/main.css";

    .main-window {
        margin: auto;
        text-align: center;
        width: 100%;
    }
</style>

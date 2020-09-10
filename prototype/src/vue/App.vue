<template>
    <v-app>
        <div class="layout"> <!-- Todo: Maybe add a Layout cmp ? (but for now it's very thin and ok here) -->
            <div class="main-window">
                <template v-if="!appStarted">
                    <v-btn @click="appStarted = true" >Start App</v-btn>
                    <div class="powered-by">
                        <span style="display: block; margin-bottom: 10px">_____ Powered By _____</span>
                        <v-icon color="white">mdi-electron-framework</v-icon>
                        <v-icon color="white">mdi-vuejs</v-icon>
                        <v-icon color="white">mdi-google-chrome</v-icon>
                        <v-icon color="white">mdi-vuetify</v-icon>
                        <v-icon color="white">mdi-lighthouse</v-icon>
                        <v-icon color="white">mdi-nodejs</v-icon>
                    </div>
                </template>
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

    .powered-by {
        bottom: 2%;
        color: white;
        left: 0;
        margin-bottom: 5px;
        position: absolute;
        right: 0;
    }
</style>

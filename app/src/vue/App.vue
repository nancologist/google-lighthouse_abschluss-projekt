<template>
    <v-app>
        <div class="layout"> <!-- Todo: Maybe add a Layout cmp ? (but for now it's very thin and ok here) -->
            <div class="main-window">
                <v-snackbar
                    color="danger"
                    v-model="notConnected"
                    :timeout="-1"
                    top
                    elevation="10"
                >
                    <v-icon style="margin-right: 10px">mdi-wifi-strength-off-outline</v-icon>
                    <span>No internet connection detected.</span>
                </v-snackbar>
                <template v-if="!appStarted">
                    <v-btn
                        @click="appStarted = true"
                        :disabled="notConnected"
                    >
                        Start
                    </v-btn>
                    <PoweredBy/>
                </template>
                <AuditForm v-else />
            </div>
        </div>
    </v-app>
</template>

<script>
import AuditForm from './components/AuditForm/AuditForm.vue';
import PoweredBy from './components/PoweredBy/PoweredBy.vue';
export default {
    components: { AuditForm, PoweredBy },
    data() {
        return {
            appStarted: false,
            notConnected: !navigator.onLine,
        };
    },
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

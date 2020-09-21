<template>
    <v-app>
        <div class="layout"> <!-- Todo: Maybe add a Layout cmp ? (but for now it's very thin and ok here) -->
            <div class="main-window">
                <NoConnection :showDialog="notConnected"/>
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
import NoConnection from './components/NoConnection/NoConnection.vue';
export default {
    components: { AuditForm, PoweredBy, NoConnection },
    data() {
        return {
            appStarted: false,
            notConnected: !navigator.onLine,
        };
    },
    created() {
        window.addEventListener('online', () => {
            this.notConnected = false;
        });
        window.addEventListener('offline', () => {
            this.notConnected = true;
        });
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

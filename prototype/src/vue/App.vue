<template>
    <div class="main-window">
        <button v-if="!appStarted" @click="appStarted = true" >Start Test</button>
        <AuditForm v-else />
    </div>
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

<template>
    <v-dialog
        content-class="no-connection-msg"
        max-width="330px"
        v-model="showDialog"
        persistent
        :timeout="-1"
        elevation="10"
    >
        <v-icon color="white">mdi-wifi-strength-off-outline</v-icon>
        <span>No internet connection detected.</span>
    </v-dialog>
</template>

<script>
export default {
    props: ['showDialog'],
};
</script>

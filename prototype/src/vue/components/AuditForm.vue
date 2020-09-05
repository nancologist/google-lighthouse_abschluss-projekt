<template>
    <form class="main-window__form">
        <h1>Test a website</h1>
        <v-text-field
            @focus="initUrlField"
            filled
            label="Enter URL"
            v-model.lazy="auditForm.url"
        />
        <v-select
            label="Select report format"
            v-model="auditForm.reportFormat"
            :items="formats"
        />
        <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
        <v-switch
            :label="'Use custom configuration?'"
            v-model="auditForm.isCustom"
        />
        <v-btn @click.prevent="testUrl">Run Test</v-btn>
    </form>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
    data() {
        return {
            auditForm: {
                isCustom: '',
                reportFormat: '',
                url: ''
            },
            formats: [
                { text: 'HTML', value: 'html' },
                { text: 'JSON', value: 'json' }
            ]
        };
    },
    methods: {
        testUrl() {
            // console.log(this.auditForm);
            ipcRenderer.send('STORE_REPORT', this.auditForm);
        },
        initUrlField() {
            if (!this.auditForm.url) {
                this.auditForm.url = 'https://';
            }
        }
    }
};
</script>

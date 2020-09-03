<template>
    <form class="main-window__form">
        <v-text-field
            @focus="auditForm.url = 'https://'"
            filled
            label="Enter URL"
            v-model.lazy="auditForm.url"
        />
        <v-select
            label="Select report format"
            v-model="auditForm.reportFormat"
            :items="['HTML', 'JSON']"
        />
<!--        <select name="reportFormat" v-model="auditForm.reportFormat">-->
<!--            <option disabled value="">Select report format</option>-->
<!--            <option value="json">JSON</option>-->
<!--            <option value="html">HTML</option>-->
<!--        </select>-->
<!--        <select name="isCutomConfig" v-model="auditForm.isCustom">-->
<!--            <option disabled value="">Use custom configuration?</option>-->
<!--            <option value="yes">Yes</option>-->
<!--            <option value="no">No</option>-->
<!--        </select>-->
<!--        <button @click.prevent="testUrl">Test & Save Report</button>-->
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
                'HTML',
                'JSON'
            ]
        };
    },
    methods: {
        testUrl() {
            this.auditForm = {
                ...this.auditForm,
                isCustom: (this.auditForm.isCustom === 'yes')
            };
            ipcRenderer.send('STORE_REPORT', this.auditForm);
        }
    }
};
</script>

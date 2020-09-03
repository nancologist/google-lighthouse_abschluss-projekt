<template>
    <div class="main-window">
        <h1>Test a website</h1>
        <form class="main-window__form">
            <input id="url" type="text" v-model.lazy="auditForm.url" placeholder="Enter URL...">
            <select name="reportFormat" v-model="auditForm.reportFormat">
                <option disabled value="">Select report format</option>
                <option value="json">JSON</option>
                <option value="html">HTML</option>
            </select>
            <select name="isCutomConfig" v-model="auditForm.isCustom">
                <option disabled value="">Use custom configuration?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <button @click.prevent="testUrl">Test & Save Report</button>
        </form>
        <a href="../../test.txt" download>Download It!</a>
    </div>
</template>

<script>
// const fs = require('fs');
const { ipcRenderer } = require('electron');

// Test a native module: Print the dirs and files in the current directory.
// fs.readdir('.', (err, files) => {
//     console.log(files);
//     if (err) console.log(err);
// });

export default {
    data() {
        return {
            auditForm: {
                isCustom: '',
                reportFormat: '',
                url: 'https://'
            }
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

<style>
    .main-window {
        margin: 10px 20px;
        text-align: center;
    }
</style>

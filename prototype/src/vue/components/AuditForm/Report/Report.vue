<template>
    <div class="report scrollbar">
        <div class="report-content">
            <h3>Test Report</h3>
            <hr>
            <AuditItem v-for="audit in audits" :key="audit.id" :audit="audit" />
        </div>
    </div>
</template>

<script>
import AuditItem from '../AuditItem/AuditItem.vue';
export default {
    components: { AuditItem },
    props: ['audits']
};
</script>

<style scoped>
/*Report*/
.report {
    background-color: #eee;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: var(--first-color);
    overflow: scroll;
    text-align: center;
}

.report-content {
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>

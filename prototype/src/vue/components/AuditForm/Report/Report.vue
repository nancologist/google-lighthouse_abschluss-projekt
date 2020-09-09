<template>
    <div class="report scrollbar">
        <div class="report-content">
            <h2>Test Report</h2>
            <hr>
            <template v-if="reports.length > 0">
                <div
                    v-for="audits in reports"
                    :key="audits.url"
                >
                    <h3 style="color: var(--second-color)">{{ audits.url }}</h3>
                    <AuditItem
                        v-for="audit in audits"
                        :key="audit.id"
                        :audit="audit"
                    />
                </div>
            </template>
            <AuditItem
                v-else
                v-for="audit in audits"
                :key="audit.id"
                :audit="audit"
            />
        </div>
    </div>
</template>

<script>
import AuditItem from './AuditItem/AuditItem.vue';
export default {
    components: { AuditItem },
    props: ['audits', 'reports']
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

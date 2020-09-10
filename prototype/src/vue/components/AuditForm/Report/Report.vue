<template>
    <div class="report scrollbar">
        <div class="report-content">
            <h2>Test Report</h2>
            <hr>
            <!-- If isPowertest = true, "reports" are an array of "audits" for multiple URLs -->
            <template v-if="isPowertest">
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
            <!-- If isPowertest = false, actually "reports" are "audits" of a single URL -->
            <AuditItem
                v-else
                v-for="audit in reports"
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
    props: ['audits', 'reports', 'isPowertest']
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

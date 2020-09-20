<template>
    <div class="audit" v-if="!!audit.id">
        <h4>{{ audit.title }}</h4>
        <div>Score: {{ audit.score }}</div>
        <div>Difference: {{ getDiff }} %</div>
        <div>Duration: {{ getDuration }} sec</div>
        <div>Reference Time: {{ getRefTime }} sec</div>
    </div>
</template>

<script>
export default {
    props: ['audit'],
    computed: {
        getDuration() {
            let num = this.audit.numericValue / 1000;
            num = Number(num.toFixed(2));
            return num;
        },
        getDiff() {
            const { refTime, numericValue } = this.audit;
            let num = (refTime - numericValue) * 100 / refTime;
            num = num = Number(num.toFixed());
            return num;
        },
        getRefTime() {
            return this.audit.refTime / 1000;
        }
    }
};
// audit:
// {
//     "id": "first-contentful-paint",
//     "title": "First Contentful Paint",
//     "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
//     "score": 0.79,
//     "scoreDisplayMode": "numeric",
//     "numericValue": 2845.5780000000004,
//     "numericUnit": "millisecond",
//     "displayValue": "2.8 s"
// }
</script>

<style scoped>
    .audit {
        text-align: left;
        padding: 5px 12px;
    }
</style>

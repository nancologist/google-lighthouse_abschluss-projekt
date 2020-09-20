<template>
    <div class="audit" v-if="!!audit.id">
        <h4>{{ audit.title }}</h4>
        <p>Score: {{ audit.score }}</p>
        <p>Duration: {{ audit.numericValue }} ms</p>
    </div>
</template>

<script>
export default {
    props: ['audit']
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

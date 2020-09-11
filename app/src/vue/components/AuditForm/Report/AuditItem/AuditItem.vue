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
</script>

<style scoped>
    .audit {
        text-align: left;
        padding: 5px 12px;
    }
</style>

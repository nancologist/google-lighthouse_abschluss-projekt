<template>
    <v-text-field v-model="nameVal"/>
</template>

<script>
export default {
    props: ['name'],
    computed: {
        nameVal: {
            get() {
                return this.name;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>

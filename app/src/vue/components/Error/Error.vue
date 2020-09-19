<template>
    <v-dialog v-model="showDialog" max-width="50%" persistent>
        <v-card>
            <v-card-title class="error white--text">
                <v-icon
                    color="white"
                    style="margin-right: 10px;"
                >
                    mdi-alert
                </v-icon>
                {{ error.title }}
            </v-card-title>

            <v-card-text class="text-body-1 mt-5">
                {{ error.msg }}
                <span style="display: block">{{error.details||'No more details.'}}</span>
            </v-card-text>
            <v-divider/>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="danger"
                    text
                    @click="$emit('update:showDialog', false)"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['showDialog', 'error']
};
</script>

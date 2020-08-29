<template>
    <div>
        <hr />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Divider extends Vue {}
</script>

<style lang="scss">
hr {
    margin: 0;
    border-color: #e8e8e8;
}
</style>

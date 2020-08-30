<template>
    <button v-on="$listeners"><slot></slot></button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BaseButton extends Vue {}
</script>

<style lang="scss" scoped>
button {
    border: 0;
    padding: 0;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    color: #0abaf4;
    font-weight: bold;
    text-align: center;
}
</style>

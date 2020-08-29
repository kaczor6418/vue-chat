<template>
    <div id="app">
        <CommentsContainer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommentsContainer from '@/components/CommentsContainer.vue';

@Component({
    components: {
        CommentsContainer
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    max-height: 100vh;
}
* {
    box-sizing: border-box;
}
</style>

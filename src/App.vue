<template>
    <div id="app">
        <messages-container class="comments-container" />
        <message-editor :user-data="createUserData()" class="message-editor" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommentsContainer from '@/components/CommentsContainer.vue';
import CommentEditor from '@/components/CommentEditor.vue';
import { User } from '@/common/interfaces/User';
import { CONSTANTS } from '@/common/CONSTANTS';

@Component({
    components: {
        MessageEditor: CommentEditor,
        MessagesContainer: CommentsContainer
    }
})
export default class App extends Vue {
    public createUserData(): User {
        /*eslint-disable */
        return {
            id: Date.now(),
            email: 'jan@kowalski.com',
            first_name: 'Jan',
            last_name: 'Kowalski',
            avatar: CONSTANTS.DEFAULT_AVATAR_URL
        };
        /*eslint-enable */
    }
}
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

    height: 100vh;
    max-height: 100vh;
    max-width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comments-container {
        max-height: 80%;
        flex: 8 1 auto;
    }

    .message-editor {
        max-height: 20%;
        flex: 2 0 auto;
    }
}
* {
    box-sizing: border-box;
}
</style>

<template>
    <div id="app">
        <comments-container :style="{ maxHeight: commentContainerMaxHeight }" class="comments-container" />
        <mention-user v-if="isSomeoneMentioned" :style="{ maxHeight: mentionUserMaxHeight }" class="mention-user" />
        <comment-editor :user-data="createUserData()" class="message-editor" :style="{ maxHeight: commentEditorMaxHeight }" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommentsContainer from '@/components/CommentsContainer.vue';
import CommentEditor from '@/components/CommentEditor.vue';
import { User } from '@/common/interfaces/User';
import { CONSTANTS } from '@/common/CONSTANTS';
import MentionUser from '@/components/MentionUser.vue';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';

@Component({
    components: {
        CommentEditor,
        CommentsContainer,
        MentionUser
    }
})
export default class App extends Vue {
    public isSomeoneMentioned: boolean = false;

    created(): void {
        EventBus.$on(Channels.MENTION_USER, this.createMentionComponent);
        EventBus.$on(Channels.MENTION_CONFIRM_RESPONSE, this.destroyMentionComponent);
        EventBus.$on(Channels.MENTION_ABORT, this.destroyMentionComponent);
    }

    beforeDestroy(): void {
        EventBus.$off(Channels.MENTION_USER, this.createMentionComponent);
        EventBus.$off(Channels.MENTION_CONFIRM_RESPONSE, this.destroyMentionComponent);
        EventBus.$off(Channels.MENTION_ABORT, this.destroyMentionComponent);
    }

    get commentContainerMaxHeight(): string {
        return this.isSomeoneMentioned ? '65%' : '85%';
    }

    get mentionUserMaxHeight(): string {
        return '20%';
    }

    get commentEditorMaxHeight(): string {
        return '15%';
    }

    private createMentionComponent() {
        this.isSomeoneMentioned = true;
    }

    private destroyMentionComponent() {
        this.isSomeoneMentioned = false;
    }

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
        flex: 8 1 auto;
    }

    .mention-user {
        flex: 1 1 auto;
    }

    .message-editor {
        flex: 2 0 auto;
    }
}
* {
    box-sizing: border-box;
}
</style>

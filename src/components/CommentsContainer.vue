<template>
    <div>
        <ul>
            <li v-for="comment in comments" :key="comment.id">
                <single-comment :comment="comment" />
                <divider />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SingleComment from '@/components/SingleComment.vue';
import { Comment } from '@/common/interfaces/Comment';
import { IHttpService } from '@/services/HttpService/interfaces/IHttpService';
import { HttpService } from '@/services/HttpService/HttpService';
import { CONSTANTS } from '@/common/CONSTANTS';
import { HttpServiceResponse } from '@/services/HttpService/interfaces/HttpServiceResponse';
import { UTILS } from '@/common/Utils';
import Divider from '@/components/Divider.vue';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';

@Component({
    components: {
        SingleComment,
        Divider
    }
})
export default class CommentsContainer extends Vue {
    private readonly httpService: IHttpService;

    private comments: Comment[] = [];

    constructor() {
        super();
        this.httpService = new HttpService(CONSTANTS.BASE_URL);
    }

    created(): void {
        void this.setCommentsData();
        EventBus.$on(Channels.ADD_COMMENT, this.addNewComment);
    }

    beforeDestroy(): void {
        EventBus.$off(Channels.ADD_COMMENT, this.addNewComment);
    }

    private async setCommentsData(): Promise<void> {
        const requestResult: HttpServiceResponse<Comment[]> = await this.httpService.get<Comment[]>('comments');
        this.comments = UTILS.isNullOrUndefined(requestResult.resource) ? [] : requestResult.resource;
    }

    private addNewComment(comment: Comment): void {
        this.comments.push(comment);
    }
}
</script>

<style lang="scss" scoped>
div {
    padding: 5px 5px 0;
    max-height: 100%;

    ul {
        max-height: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: transparent;
            border-radius: 15px;
        }

        &::-webkit-scrollbar {
            width: 8px;
            background-color: transparent;
            border-radius: 15px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 15px;
            background-image: linear-gradient(0deg, #01105e 0%, #ecaf20 100%);
        }

        li {
            padding: 5px 0;
        }
    }
}
</style>

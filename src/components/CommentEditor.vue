<template>
    <div>
        <alert-box class="alert" v-if="couldNotSendComment" :message="errorMessage" :alert-type="alertBoxType" />
        <divider />
        <div class="message-editor__wrapper">
            <avatar class="avatar" :avatar-url="userData.avatar"></avatar>
            <div
                id="message_container"
                @keyup.enter="createNewComment()"
                class="content"
                contenteditable="true"
                data-placeholder="Dodaj komentarz..."
            ></div>
            <base-button @click="createNewComment()" class="button">Opublikuj</base-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseButton from '@/components/Button.vue';
import Avatar from '@/components/Avatar.vue';
import Divider from '@/components/Divider.vue';
import { IHttpService } from '@/services/HttpService/interfaces/IHttpService';
import { HttpService } from '@/services/HttpService/HttpService';
import { CONSTANTS } from '@/common/CONSTANTS';
import { Comment } from '@/common/interfaces/Comment';
import { HttpServiceResponse } from '@/services/HttpService/interfaces/HttpServiceResponse';
import AlertBox from '@/components/AlertBox/AlertBox.vue';
import { AlertType } from '@/components/AlertBox/interfaces/AlertType';
import { UTILS } from '@/common/Utils';
import { Channels } from '@/common/Channels';
import { EventBus } from '@/EventBus';
import { User } from '@/common/interfaces/User';

@Component({
    components: {
        AlertBox,
        Divider,
        Avatar,
        BaseButton
    }
})
export default class CommentEditor extends Vue {
    @Prop({ required: true }) readonly userData!: User;

    public readonly errorMessage: string = 'An error occurred while sending comment to server';
    public readonly alertBoxType: AlertType = AlertType.ERROR;

    public couldNotSendComment: boolean = false;
    public sendingMessage: boolean = false;

    private readonly httpService: IHttpService;

    private errorMessageId: number | undefined = undefined;
    private messageContainer!: HTMLDivElement;

    constructor() {
        super();
        this.httpService = new HttpService(CONSTANTS.BASE_URL);
    }

    mounted(): void {
        this.setMessageContainer();
    }

    public async createNewComment(): Promise<void> {
        if (this.sendingMessage || UTILS.isNullOrUndefinedOrEmpty(this.messageContainer.textContent)) {
            return void 0;
        }
        this.sendingMessage = true;
        /*eslint-disable */
        const newComment: Comment = {
            created_at: UTILS.getCurrentUTCDate(),
            avatar: this.userData.avatar,
            first_name: this.userData.first_name,
            last_name: this.userData.last_name,
            id: Date.now(),
            email: this.userData.email,
            text: this.messageContainer.textContent ?? ''
        };
        /*eslint-enable */
        const requestResult: HttpServiceResponse<Comment> = await this.httpService.post<Comment>('comments', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        });
        if (!requestResult.response.ok) {
            window.clearTimeout(this.errorMessageId);
            this.couldNotSendComment = true;
            this.errorMessageId = window.setTimeout(() => (this.couldNotSendComment = false), 5000);
            this.sendingMessage = false;
            return void 0;
        }
        EventBus.$emit(Channels.ADD_COMMENT, newComment);
        this.sendingMessage = false;
        this.messageContainer.innerHTML = '';
    }

    private setMessageContainer(): void {
        const messageContainer: HTMLDivElement | null = this.$el.querySelector('#message_container');
        if (!UTILS.isNullOrUndefined(messageContainer)) {
            this.messageContainer = messageContainer;
        }
    }
}
</script>

<style lang="scss" scoped>
.alert {
    margin: 0 10% 10px;
    position: absolute;
    width: 80%;
    top: 0;
    z-index: 100;
}
div {
    max-height: 100%;
    position: relative;
    .message-editor__wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        max-width: 100%;
        max-height: calc(100% - 2px);
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .avatar {
            margin-right: 20px;
        }
        .content {
            outline: none;
            text-align: left;
            cursor: text;
            width: 100%;
            overflow-y: auto;

            &:empty:not(:focus) {
                align-self: center;
            }
            &[contentEditable='true']:empty:not(:focus):before {
                content: attr(data-placeholder);
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
        }
        .button {
            padding-left: 10px;
        }
    }
}
</style>

<template>
    <ul>
        <li v-for="user in usersList" :key="user.id">
            <div class="user-item__wrapper">
                <avatar :avatar-url="user.avatar" />
                <b>{{ `${user.first_name} ${user.last_name}` }}</b>
            </div>
            <divider class="divider" />
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import Divider from '@/components/Divider.vue';
import { EventBus } from '@/EventBus';
import { Channels } from '@/common/Channels';
import { IHttpService } from '@/services/HttpService/interfaces/IHttpService';
import { HttpService } from '@/services/HttpService/HttpService';
import { CONSTANTS } from '@/common/CONSTANTS';
import { User } from '@/common/interfaces/User';
import { HttpServiceResponse } from '@/services/HttpService/interfaces/HttpServiceResponse';
import { UTILS } from '@/common/Utils';

@Component({
    components: { Divider, Avatar }
})
export default class MentionUser extends Vue {
    private static ITEM_HEIGHT = 91;

    private readonly httpService: IHttpService;

    private usersList: User[] = [];
    private selectedUserIndex: number = 0;

    constructor() {
        super();
        this.httpService = new HttpService(CONSTANTS.BASE_URL);
    }

    mounted(): void {
        void this.initializeUsersList();
        EventBus.$on(Channels.MENTION_DOW, this.moveSelectorDown);
        EventBus.$on(Channels.MENTION_UP, this.moveSelectorUp);
        EventBus.$on(Channels.MENTION_CONFIRM_REQUEST, this.confirmMention);
    }

    beforeDestroy(): void {
        EventBus.$off(Channels.MENTION_DOW, this.moveSelectorDown);
        EventBus.$off(Channels.MENTION_UP, this.moveSelectorUp);
        EventBus.$off(Channels.MENTION_CONFIRM_REQUEST, this.confirmMention);
    }

    private async initializeUsersList(): Promise<void> {
        const requestResult: HttpServiceResponse<User[]> = await this.httpService.get<User[]>('users');
        if (!UTILS.isNullOrUndefined(requestResult.resource)) {
            this.usersList = requestResult.resource;
        }
    }

    private moveSelectorUp(): void {
        if (this.selectedUserIndex === 0) {
            return void 0;
        }
        this.$el.scrollBy(0, -MentionUser.ITEM_HEIGHT);
        (this.$el.childNodes[this.selectedUserIndex] as HTMLUListElement).setAttribute('aria-selected', 'false');
        --this.selectedUserIndex;
        (this.$el.childNodes[this.selectedUserIndex] as HTMLUListElement).setAttribute('aria-selected', 'true');
    }

    private moveSelectorDown(): void {
        if (this.selectedUserIndex === this.$el.childNodes.length - 1) {
            return void 0;
        }
        this.$el.scrollBy(0, MentionUser.ITEM_HEIGHT);
        (this.$el.childNodes[this.selectedUserIndex] as HTMLUListElement).setAttribute('aria-selected', 'false');
        ++this.selectedUserIndex;
        (this.$el.childNodes[this.selectedUserIndex] as HTMLUListElement).setAttribute('aria-selected', 'true');
    }

    private confirmMention(): void {
        EventBus.$emit(Channels.MENTION_CONFIRM_RESPONSE, this.usersList[this.selectedUserIndex]);
    }
}
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;

    background-color: #f1f1f1;
    max-height: 100%;
    overflow-y: auto;

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
        &[aria-selected='true'] {
            .user-item__wrapper {
                background-color: rgba(236, 175, 32, 0.51);
            }
        }
        .user-item__wrapper {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px;
        }

        .divider {
            margin: 5px 2%;
        }
    }
}
</style>

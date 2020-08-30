<template>
    <div>
        <div class="message__content">
            <Avatar class="message__content--avatar" :avatar-url="comment.avatar" />
            <p>
                <b>{{ getFullName() }}</b>
                {{ comment.text }}
                <br />
                <br />
                <time :datetime="comment.created_at">{{ timeDifference }}</time>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import { Comment } from '@/common/interfaces/Comment';
import { TimeConversionResult } from '@/converters/TimeConverter/interfaces/TimeConversionResult';
import { TimeConverter } from '@/converters/TimeConverter/TimeConverter';

@Component({
    components: {
        Avatar
    }
})
export default class SingleComment extends Vue {
    @Prop({ required: true }) readonly comment!: Comment;
    private currentTime: Date;
    private intervalId: number = 0;

    constructor() {
        super();
        this.currentTime = new Date();
    }

    mounted(): void {
        this.refreshCurrentTimeEvery();
    }

    beforeDestroy(): void {
        window.clearInterval(this.intervalId);
    }

    get timeDifference(): string {
        const createdAt: Date = new Date(this.comment.created_at);
        const differenceInMilliseconds: number = Math.abs(this.currentTime.getTime() - createdAt.getTime());
        const timDiff: TimeConversionResult = TimeConverter.fromMilliseconds(differenceInMilliseconds);
        return this.formatTimeDifference(timDiff);
    }

    public getFullName(): string {
        return `${this.comment.first_name} ${this.comment.last_name}: `;
    }

    private refreshCurrentTimeEvery(value: number = 60000): void {
        this.intervalId = window.setInterval(() => {
            this.currentTime = new Date();
        }, value);
    }

    private formatTimeDifference({ seconds, minutes, hours, days, weeks, months, years }: TimeConversionResult): string {
        if (years > 0) {
            return years === 1 ? `rok temu` : this.isDifferent(years) ? `${years} lata temu` : `${years} lat temu`;
        } else if (months > 0) {
            return months === 1 ? `miesiąc temu` : this.isDifferent(months) ? `${months} miesięcy temu` : `${months} miesiące temu`;
        } else if (weeks > 0) {
            return weeks === 1 ? `tydzień temu` : this.isDifferent(weeks) ? `${weeks} tygodnie temu` : `${weeks} tygodni temu`;
        } else if (days > 0) {
            return days === 1 ? `dzień temu` : `${days} dni temu`;
        } else if (hours > 0) {
            return hours === 1 ? `godzinę temu` : this.isDifferent(hours) ? `${hours} godziny temu` : `${hours} godzin temu`;
        } else if (minutes > 0) {
            return minutes === 1 ? `minutę temu` : this.isDifferent(minutes) ? `${minutes} minuty temu` : `${minutes} minut temu`;
        }
        return seconds === 1 ? `sekundę temu` : this.isDifferent(seconds) ? `${seconds} sekund temu` : `${seconds} sekundy temu`;
    }

    private isDifferent(time: number): boolean {
        const value: string = time.toString();
        return (
            !value.endsWith('12') &&
            !value.endsWith('13') &&
            !value.endsWith('14') &&
            (value.endsWith('2') || value.endsWith('3') || value.endsWith('4'))
        );
    }
}
</script>

<style lang="scss" scoped>
.message__content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &--avatar {
        margin-right: 20px;
    }
    p {
        margin: 0;
        padding: 0;
        text-align: left;
    }
    time {
        color: #b0b0b0;
    }
}
</style>

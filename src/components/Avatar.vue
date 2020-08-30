<template>
    <object :data="avatarUrl">
        <img :src="defaultAvatarUrl" alt="Default avatar" />
    </object>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CONSTANTS } from '@/common/CONSTANTS';

@Component({})
export default class Avatar extends Vue {
    @Prop() readonly avatarUrl!: string;
    @Prop({ default: CONSTANTS.DEFAULT_AVATAR_URL })
    readonly defaultAvatarUrl!: string;
}
</script>

<style lang="scss" scoped>
object,
img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
}
</style>

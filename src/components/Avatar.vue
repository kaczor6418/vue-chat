<template>
    <object :data="avatarUrl">
        <img :src="defaultAvatarUrl" alt="Default avatar" />
    </object>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly avatarUrl!: string;
    @Prop({ default: 'https://brainstormcursos.com.br/wp-content/uploads/2016/01/default-avatar-128x128.jpg' })
    readonly defaultAvatarUrl!: string;
}
</script>

<style lang="scss">
object,
img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
}
</style>

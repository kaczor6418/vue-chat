<template>
    <div :class="alertClass">
        <span>{{ message }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AlertType } from '@/components/AlertBox/interfaces/AlertType';
import { NotSupportedAlertType } from '../../../errors/NotSupportedAlertType';

@Component({})
export default class AlertBox extends Vue {
    @Prop({ required: true }) readonly message!: string;
    @Prop({ default: AlertType.INFO }) readonly alertType!: AlertType;

    private alertClass: string = 'info';

    constructor() {
        super();
    }

    mounted(): void {
        this.setAlertClass();
    }

    private setAlertClass(): void {
        switch (this.alertType) {
            case AlertType.ERROR:
                this.alertClass = 'error';
                break;
            case AlertType.INFO:
                this.alertClass = 'info';
                break;
            case AlertType.SUCCESS:
                this.alertClass = 'success';
                break;
            case AlertType.WARNING:
                this.alertClass = 'warning';
                break;
            default:
                throw new NotSupportedAlertType(`Alert type: ${this.alertType} is not supported by ${AlertBox.name} component`);
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

    span {
        text-align: center;
        color: #000000;
    }
}
.error {
    background-color: #ef5350;
}

.info {
    background-color: #26c6da;
}

.success {
    background-color: #9ccc65;
}

.warning {
    background-color: #ffa726;
}
</style>

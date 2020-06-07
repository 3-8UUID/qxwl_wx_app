Component({
    externalClasses: ['i-class'],

    properties: {
        percent: {
            type: Number,
            value: 0
        },
        // normal || active || wrong || order-result
        status: {
            type: String,
            value: 'normal'
        },
        strokeWidth: {
            type: Number,
            value: 10
        },
        hideInfo: {
            type: Boolean,
            value: false
        }
    }
});

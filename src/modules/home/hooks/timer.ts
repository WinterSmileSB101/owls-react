class Timer {
    private fxNow: number;

    constructor() {
        this.fxNow = undefined;
    }

    private createFxNow() {
        window.setTimeout(() => {
            this.fxNow = undefined;
        });

        return (this.fxNow = Date.now());
    }

    getFxNow() {
        return this.fxNow || this.createFxNow();
    }
}

export default Timer;

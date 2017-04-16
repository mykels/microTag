angular.module('microTag.utils')
    .service('Timer', timerService);

function timerService($interval) {
    var self = this;

    activate();

    function activate() {
    }

    this.start = function () {
        var timer = initTimer(), seconds, minutes;

        timer.job = $interval(function () {
            timer.value++;

            if (timer.value > 0 && timer.value < 60) {
                seconds = timer.value;
                timer.text = "{0}".format(padZeros(seconds));
            } else if (timer.value >= 60) {
                minutes = Math.floor(timer.value / 60);
                seconds = timer.value % 60;
                timer.text = "{0}:{1}".format(padZeros(minutes), padZeros(seconds));
            }

        }, 1000);

        return timer;
    };

    function initTimer() {
        return {
            value: 0,
            text: ''
        };
    }

    function padZeros(number) {
        return number < 10 ? "0{0}".format(number) : number;

    }

    this.stop = function (timer) {
        $interval.cancel(timer.job);
        timer.text = '';
        timer.value = 0;
    };
}

function TouchClock(options) {
    this.options = options;
    this.hourText = 10;
    this.minuteText = 10;
    this.timeRange = 'AM';
    this.clock = TouchClock.setupClock.call(this);
    TouchClock.appendCenter.call(this);

    var pointerCss = ' width: 18px; background: white; border-radius: 36px; position: absolute; left: 50%; top: 50%; margin-left: -9px; ';

    this.hourPointer = TouchClock.appendHourPointer.call(this, pointerCss);
    this.minutePointer = TouchClock.appendMinutePointer.call(this, pointerCss);

    this.selectedPointer = null;
    this.centerPoint = {x: this.options.width / 2 + clock.offsetLeft, y: this.options.height / 2 + clock.offsetTop};
    TouchClock.listenTouchStart.call(this);
    TouchClock.listenTouchMove.call(this);
    TouchClock.listenTouchEnd.call(this);
}

TouchClock.setupClock = function () {
    var clock = document.getElementById(this.options.clock);
    clock.innerHTML = '';
    clock.style.cssText = 'position: relative; border-radius: 50%; background: #FFD24D;';
    clock.style.width = this.options.width + 'px';
    clock.style.height = this.options.height + 'px';
    clock.style.margin = '0 auto';
    return clock;
};

TouchClock.appendCenter = function () {
    var center = document.createElement('div');
    center.style.cssText = ' position: absolute; left: 50%; top: 50%; margin-left: -18px; margin-top: -18px; background: white; border-radius: 50%; box-shadow: 0 0 10px #FFD24D; z-index: 1;';
    center.style.width = this.options.width / 6 + 'px';
    center.style.height = this.options.height / 6 + 'px';
    this.clock.appendChild(center);
};

TouchClock.appendHourPointer = function (css) {
    var pointer = document.createElement('div');
    pointer.style.cssText = css;
    pointer.style.height = this.options.height / 7 * 2 + 'px';
    pointer.style.marginTop = -this.options.height / 7 + 'px';
    pointer.style.transform = 'rotate(300deg) translate(0px, -40px)';
    pointer.style.webkitTransform = 'rotate(300deg) translate(0px, -40px)';
    this.clock.appendChild(pointer);
    return pointer;
};

TouchClock.appendMinutePointer = function (css) {
    pointer = document.createElement('div');
    pointer.style.cssText = css;
    pointer.style.height = this.options.height / 7 * 3 + 'px';
    pointer.style.marginTop = -this.options.height / 7 * 3 / 2 + 'px';
    pointer.style.transform = 'rotate(60deg) translate(0px, -40px)';
    pointer.style.webkitTransform = 'rotate(60deg) translate(0px, -40px)';
    this.clock.appendChild(pointer);
    return pointer;
};

TouchClock.listenTouchStart = function () {
    this.clock.addEventListener('touchstart', function (event) {
        if (event.target == this.hourPointer || event.target == this.minutePointer) {
            this.selectedPointer = event.target;
            this.selectedPointer.style.boxShadow = '0 0 22px white';
        }
    }.bind(this));
};

TouchClock.listenTouchMove = function () {
    this.clock.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (!this.selectedPointer) return;
        var c = this.centerPoint, t = event.changedTouches[0], x = t.pageX, y = t.pageY;

        if (x == c.x || y == c.y) return;

        var baseDeg;
        if (x > c.x && y < c.y) {
            baseDeg = 0
        } else if (x > c.x && y > c.y) {
            baseDeg = -180
        } else if (x < c.x && y > c.y) {
            baseDeg = 180
        } else {
            baseDeg = -360
        }

        console.log(x, y, this.centerPoint);

        var deg = Math.atan(Math.abs(x - c.x) / Math.abs(y - c.y)) / (2 * Math.PI) * 360;
        this.setTime(Math.abs(baseDeg + deg));
        this.selectedPointer.style.transform = 'rotate(' + Math.abs(baseDeg + deg) + 'deg)' + ' translate(0px, -40px)';
        this.selectedPointer.style.webkitTransform = 'rotate(' + Math.abs(baseDeg + deg) + 'deg)' + ' translate(0px, -40px)';
        this.options.callback && this.options.callback(this.hourText, this.minuteText);

    }.bind(this));
};

TouchClock.listenTouchEnd = function () {
    this.clock.addEventListener('touchend', function () {
        if (!this.selectedPointer) return;
        this.selectedPointer.style.boxShadow = null;
        this.selectedPointer = null;
    }.bind(this));
};

TouchClock.prototype = {

    setTime: function (deg) {
        if (this.selectedPointer == this.hourPointer) this.setHour(deg);
        if (this.selectedPointer == this.minutePointer) this.setMinute(deg);
    },

    setMinute: function (deg) {
        var t = Math.round(deg / 6);
        if (t >= 60) t = 0;
        this.minuteText = this.lstrip(t);
    },

    setHour: function (deg) {
        var t = Math.floor(deg * 12 / 360);
        this.setTimeRange(this.hourText, t);
        this.hourText = this.lstrip(this.getTimeOffset() + t);
    },

    setTimeRange: function (currentHour, nextHour) {
        var tr;
        currentHour = parseInt(currentHour);
        if (currentHour == 11 && nextHour == 0) {
            tr = 'PM'
        } else if (currentHour == 23 && nextHour == 0) {
            tr = 'AM'
        } else if (currentHour == 0 && nextHour == 11) {
            tr = 'PM'
        } else if (currentHour == 12 && nextHour == 11) {
            tr = 'AM'
        }
        if (tr) this.timeRange = tr;
    },

    getTimeOffset: function () {
        return this.timeRange == 'AM' ? 0 : 12;
    },

    lstrip: function (t) {
        t = parseInt(t);
        if (t >= 10) return t;
        return '0' + t;
    }
};
//在哪儿引用，在哪儿写
//new TouchClock({
//    clock: 'clock',
//    width: 420,
//    height: 420,
//    callback: function (hour, minute) {
//        console.log(hour, minute);
//        document.getElementById('hour').innerText = hour;
//        document.getElementById('minute').innerText = minute;
//    }
//});

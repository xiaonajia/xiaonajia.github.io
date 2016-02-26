(function (func) {
    window.Phantom = window.$P = func();
})(function () {
    "use strict";

    var Phantom = function (selector) {
    };

    Phantom.extend = function (collection) {
        for (var i in collection) {
            if (collection.hasOwnProperty(i) && typeof(Phantom[i]) === 'undefined')
                Phantom[i] = collection[i];
        }
    };

    Phantom._global = {
        readyList: []
    };

    var fn = Phantom.prototype = {
        DOMReady: function (callback) {
            document.readyState == 'complete' ? callback() : Phantom._global.readyList.push(callback);
        },
        Ajax: function (options) {
            var cfg = {
                url: '',
                method: 'GET',
                data: {},
                success: null,
                complete: null,
                fail: null
            };
            for (var i in cfg) {
                if (cfg.hasOwnProperty(i) && typeof(options[i]) !== 'undefined')
                    cfg[i] = options[i]
            }

            var xhr;
            try {
                xhr = new XMLHttpRequest();
            } catch (E) {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (E) {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        var r = JSON.parse(xhr.responseText);
                        cfg.complete && cfg.complete(r);
                        if (r.success && cfg.success) cfg.success(r);
                    } else if (xhr.status == 401) {
                        alert('请您先登录');
                        window.location.href = '/users/sign_in';
                    } else if (xhr.status == 422) {
                        alert('请求中没有包含CSRF TOKEN')
                    } else if (xhr.status >= 500) {
                        alert('服务器出现问题了，稍后再试');
                    } else {
                        cfg.fail && cfg.fail(xhr.responseText);
                    }
                }
            };

            if (typeof(cfg.data) == 'object') {
                //data['authenticity_token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');

                // rails 中的 POST 方法对应到 controller 时, 要伪装成 put 方法
                if (cfg.method == 'PUT') cfg.data['_method'] = 'put';
                if (cfg.method.toUpperCase() == 'DELETE') cfg.data['_method'] = 'delete';

                var formData = '';
                for (var i in cfg.data) {
                    if (!cfg.data.hasOwnProperty(i)) continue;
                    if (formData) formData += '&';
                    formData += i + '=' + cfg.data[i]
                }
            } else {
                formData = cfg.data;
            }

            var url = cfg.url;
            if (cfg.method.toUpperCase() == 'GET' && formData) {
                url.indexOf('?') > 0 ? url += '&' + formData : url += '?' + formData
            }
            xhr.open(cfg.method.toUpperCase() == 'GET' ? 'GET' : 'POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(formData);
        }
    };

    Phantom.extend(fn);

    (function () {
        if (document.readyState === "complete") {
            setTimeout(popDOMReadyArr());
        } else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", ready, false);
            // A fallback to window.onload, that will always work
            window.addEventListener("load", ready, false);
        }
    })();

    /**
     * The ready event handler and self cleanup method
     */
    function ready() {
        document.removeEventListener("DOMContentLoaded", ready, false);
        window.removeEventListener("load", ready, false);
        popDOMReadyArr();
    }

    function popDOMReadyArr() {
        Phantom._global.readyList.forEach(function (cb) {
            cb()
        });
        Phantom._global.readyList = [];
    }

    return Phantom;
});
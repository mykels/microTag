angular.module('microTag.core')
    .service('ToastService', toastService);

function toastService(toastr, ObjectUtils) {
    this.showInfo = function (msg, title) {
        toastr.info(msg, title);
    };

    this.showSuccess = function (msg, title, timeout, clickHandler, payload) {
        toastr.success(msg, title, {
            positionClass: "toast-top-left",
            progressBar: false,
            timeOut: ObjectUtils.defaultValue(timeout, 3000),
            onTap: function () {
                if (angular.isDefined(clickHandler)) {
                    clickHandler(payload);
                }
            }
        });
    };

    this.showWarning = function (msg, title) {
        toastr.warning(msg, title);
    };

    this.showError = function (msg, title) {
        toastr.error(msg, title, {
            positionClass: "toast-top-full-width",
            timeOut: 8000
        });
    };

    this.showFatalError = function (msg, title) {
        toastr.error(msg, angular.isDefined(title) ? title : "Fatal error", {
            closeButton: false,
            timeOut: 0
        });
    };
}

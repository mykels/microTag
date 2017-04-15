angular.module('microTag.core')
	.service('ToastService', toastService);

function toastService($q, toastr, Translator, ObjectUtils) {
	this.showInfo = function (msg, title) {
		return translateToast(msg, title).then(function (translated) {
			toastr.info(translated.msg, translated.title);
		});
	};

	this.showSuccess = function (msg, title, timeout, clickHandler, payload) {
		return translateToast(msg, title).then(function (translated) {
			toastr.success(translated.msg, translated.title, {
				positionClass: "toast-top-left",
				progressBar: false,
				timeOut: ObjectUtils.defaultValue(timeout, 3000),
				onTap: function () {
					if (angular.isDefined(clickHandler)) {
						clickHandler(payload);
					}
				}
			});
		});
	};

	this.showWarning = function (msg, title) {
		return translateToast(msg, title).then(function (translated) {
			toastr.warning(translated.msg, translated.title);
		});
	};

	this.showError = function (msg, title) {
		return translateToast(msg, title).then(function (translated) {
			toastr.error(translated.msg, translated.title, {
				positionClass: "toast-top-full-width",
				timeOut: 8000
			});
		});
	};

	this.showFatalError = function (msg, title) {
		return translateToast(msg, title).then(function (translated) {
			toastr.error(translated.msg, angular.isDefined(translated.title) ? translated.title : "Fatal error", {
				closeButton: false,
				timeOut: 0
			});
		});
	};

	function translateToast(msg, title) {
		var deferredTranslation = $q.defer();

		Translator.translate(msg).then(function (translatedMsg) {
			if (angular.isDefined(title)) {
				Translator.translate(title).then(function (translatedTitle) {
					deferredTranslation.resolve({
						msg: translatedMsg,
						title: translatedTitle
					});
				});
			} else {
				deferredTranslation.resolve({msg: translatedMsg});
			}
		});

		return deferredTranslation.promise;
	}
}

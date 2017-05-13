angular.module('microTag.core')
    .service('FileUploader', fileUploaderService);

function fileUploaderService($q, $timeout, Upload, System, StringUtils, LoadingService, DialogService,
                             ToastService, ObjectUtils) {
    var actionTitle = "";
    var self = this;

    this.upload = function (options) {
        var uploadDeferred = $q.defer();

        self.options = options;
        if (angular.isUndefined(self.options.fields)) {
            self.options.fields = {};
        }

        return upload(uploadDeferred);
    };

    function upload(uploadDeferred) {
        LoadingService.start();

        initDefaults();

        var uploadOptions = prepareUploadParams();

        var uploadPromise = Upload.http(uploadOptions);

        uploadPromise.then(function (response) {
            handleUploadResponse(uploadDeferred, response);
        }, handleUploadUnexpectedError);

        uploadPromise.catch(handleUploadUnexpectedError);

        return uploadDeferred.promise;
    }

    function initDefaults() {
        self.options.showLog = ObjectUtils.defaultValue(self.options.showLog, true);
    }

    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},

    function prepareUploadParams() {
        return {
            url: System.baseUrl + self.options.uploadUrl,
            fields: self.options.fields,
            file: self.options.file,
            data: self.options.file,
            headers: {'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"'},
            method: 'POST'
        };
    }

    function requestOverwrite(uploadDeferred, response) {
        DialogService.openConfirmationDialog({
            title: 'Confirm overwrite',
            description: response.data.errors.name + ' already exists. Overwrite?',
            onConfirmCallback: function () {
                self.options.fields.Overwrite = true;
                upload(uploadDeferred);
            },
            onCancelCallback: function () {
                onUploadError(uploadDeferred, response);
            }
        });
    }

    function onUploadError(uploadDeferred, response) {
        handleUploadExpectedError(response.data, self.options);
        uploadDeferred.reject(response);
    }

    function handleUploadResponse(uploadDeferred, response) {
        $timeout(function () {
            LoadingService.stop();

            handleActionTitle();

            console.log(response.data);

            if (angular.isDefined(response) && angular.isDefined(response.data) &&
                angular.isDefined(response.data.success) && response.data.success) {
                handleUploadSuccess(self.options);
                uploadDeferred.resolve(response);
            } else {
                var errorCode = response.data.errors.errorCode;
                if (angular.isDefined(errorCode) && errorCode === 409) {
                    requestOverwrite(uploadDeferred, response);
                    return;
                }
                onUploadError(uploadDeferred, response);
            }
        });
    }

    function handleActionTitle() {
        actionTitle = StringUtils.isNotEmpty(self.options.actionTitle) ?
            self.options.actionTitle : self.options.type + " Upload";
    }

    function handleUploadSuccess() {
        if (self.options.showLog) {
            ToastService.showSuccess(StringUtils.isNotEmpty(self.options.successLog) ? self.options.successLog :
                "Uploaded Successfully", actionTitle);
        }
    }

    function handleUploadExpectedError(responseData) {
        if (angular.isDefined(responseData) && angular.isDefined(responseData.errors) &&
            StringUtils.isNotEmpty(responseData.errors.errorDescription)) {

            if (self.options.showLog) {
                ToastService.showError(responseData.errors.errorDescription, actionTitle);
            }
        } else if (StringUtils.isNotEmpty(self.options.expectedErrorLog)) {
            if (self.options.showLog) {
                ToastService.showError(self.options.expectedErrorLog, actionTitle);
            }
        } else {
            handleUploadUnexpectedError();
        }

    }

    function handleUploadUnexpectedError(error) {
        console.info(error);
        if (self.options.showLog) {
            ToastService.showFatalError("Something went wrong while during " +
            StringUtils.isNotEmpty(actionTitle) ? actionTitle.toLowerCase() : " file upload");
        }
    }
}

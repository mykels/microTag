angular.module('microTag.core')
    .config(toastrConfigurator);

function toastrConfigurator(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        progressBar: true,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        timeOut: 4000
    });
}

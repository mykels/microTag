angular.module('microTag.core')
    .service('LogLevels', logLevelConstants);

function logLevelConstants(ConstantUtils) {
    var self = this;
    
    activate();

    function activate() {
        self.values = [
            {
                value: "NONE",
                text: "NONE"
            },
            {
                value: "NORMAL",
                text: "NORMAL"
            },
            {
                value: "DEBUG",
                text: "DEBUG"
            }
        ];
        
        self.default = self.values[0];
        
        createSeverityMap();
    }
    
    function createSeverityMap() {
    	self.severityMap = {};
    	for (var i = 0; i < self.values.length; i++) {
    		self.severityMap[self.values[i].value] = i;
    	}
    }
    
    self.isSevereThan = function (checkedLevel, fixedLevel) {
    	return self.severityMap[checkedLevel] >= self.severityMap[fixedLevel];
    };

    self.getByValue = function (constantElement) {
        return ConstantUtils.getByValue(constantElement, self);
    };
}

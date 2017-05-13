angular.module('microTag')
    .service('TerminalTabService', terminalTabService);

function terminalTabService(ObjectUtils, RandomUtils, CollectionUtils, TerminalEmulatorService) {
    var self = this;

    self.addTab = addTab;
    self.removeTab = removeTab;
    self.handleTabSelect = handleTabSelect;
    self.handleTabDeselect = handleTabDeselect;
    self.setActiveTab = setActiveTab;
    self.findTab = findTab;

    activate();

    function activate() {
        initTabState();
    }

    function initTabState() {
        self.tabState = {
            tabs: []
        };

        addTab({title: 'Terminal', type: 'terminal', closable: false});
    }

    function addTab(tab) {
        initTabDefaults(tab);

        self.tabState.tabs.push(tab);

        setActiveTab(tab);
    }

    function initTabDefaults(tab) {
        tab.id = ObjectUtils.defaultValue(tab.id, RandomUtils.guid());
        tab.closable = ObjectUtils.defaultValue(tab.closable, true);
    }

    function removeTab(tab) {
        self.tabState.tabs.splice(self.tabState.tabs.indexOf(tab), 1);
    }

    function handleTabSelect(tab) {
        setActiveTab(tab);
    }

    function handleTabDeselect(tab) {

    }

    function setActiveTab(tab) {
        self.tabState.tabs.forEach(function (tab) {
            tab.active = false;
        });

        tab.active = true;
    }

    function findTab(id) {
        return CollectionUtils.findByProperty(self.tabState.tabs, id, 'id');
    }
}

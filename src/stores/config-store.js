import { observable, configure } from 'mobx'

configure({ isolateGlobalState: true })

export class ConfigStore {
    @observable isConfigSectionOpen = false
    @observable isAdvancedConfigOpen = false
    @observable radioGrpSelectedIndex = 0
    @observable radioGrpSelectedValue = 'ipfs'
    
    @observable host = 'localhost'
    @observable port = '5001'
    @observable protocolArray = ['HTTP', 'HTTPS']
    @observable protocolIndex = 0

    constructor() {
      window.configStore = this
    }

}


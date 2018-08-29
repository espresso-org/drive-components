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

    _datastore

    constructor(datastore) {
      this._datastore = datastore
      window.configStore = this

      this.initialize()
    }

    async initialize() { 
      setTimeout(async () => {  
        const datastoreSettings = await this._datastore.getSettings()
        
        if(datastoreSettings.storageProvider === 0) 
          this.isConfigSectionOpen = true
        else {
          // TODO: Handle every possible storage providers
          this.host = datastoreSettings.ipfs.host
          this.port = datastoreSettings.ipfs.port
          this.protocolIndex = this.protocolArray.indexOf(datastoreSettings.ipfs.protocol)
        }
      }, 1000)
    }

}


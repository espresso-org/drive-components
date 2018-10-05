import { action, observable, configure } from 'mobx'

configure({ isolateGlobalState: true })

export class ConfigStore {
    @observable isConfigSectionOpen = false

    @observable isAdvancedConfigOpen = false

    @observable radioGrpSelectedIndex = 0

    @observable radioGrpSelectedValue = 'ipfs'

    @observable configSelected = true

    @observable host = 'localhost'

    @observable port = '5001'

    @observable protocolArray = ['HTTP', 'HTTPS']

    @observable protocolIndex = 0

    @observable encryptionAlgorithmArray = ['AES-CBC', 'AES-GCM']

    @observable encryptionKeyLengthArray = [128, 192, 256]

    @observable selectedEncryptionAlgorithm = 0

    @observable selectedEncryptionKeyLength = 0

    @observable savedEncryptionAlgorithm = 0

    @observable savedEncryptionKeyLength = 0

    _datastore

    constructor(datastore) {
      this._datastore = datastore
      window.configStore = this

      this.initialize()
    }

    async initialize() {
      setTimeout(async () => {
        (await this._datastore.events()).subscribe((event) => {
          console.log('New event: ', event)
          switch (event.event) {
            case 'SettingsChanged':
              this.isConfigSectionOpen = false
              this.configSelected = true
              this.isAdvancedConfigOpen = false
              break
          }
        });

        const datastoreSettings = await this._datastore.getSettings()

        if (datastoreSettings.storageProvider === 0) {
          this.isConfigSectionOpen = true
          this.configSelected = false
        } else {
          // TODO: Handle every possible storage providers
          this.radioGrpSelectedValue = 'ipfs'
          this.host = datastoreSettings.ipfs.host
          this.port = datastoreSettings.ipfs.port
          this.protocolIndex = this.protocolArray.indexOf(datastoreSettings.ipfs.protocol)
        }
      }, 1000)
    }

    /* @action async setIpfsStorageSettings(host, port, protocol) {
      if (host && port && protocol)
        await this._datastore.setIpfsStorageSettings(host, port, protocol)
    }

    @action async setAesEncryptionSettings(name, length, savedAlgorithm, savedKeyLength) {
      if (name && length) {
        await this._datastore.setAesEncryptionSettings(name, length)
        this.savedEncryptionAlgorithm = savedAlgorithm
        this.savedEncryptionKeyLength = savedKeyLength
      }
    } */

    @action async setSettings(host, port, protocol, name, length, savedAlgorithm, savedKeyLength) {
      if (host && port && protocol && name && length) {
        await this._datastore.setSettings(host, port, protocol, name, length)
        this.savedEncryptionAlgorithm = savedAlgorithm
        this.savedEncryptionKeyLength = savedKeyLength
      }
    }
}

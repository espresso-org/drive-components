import { observable, configure } from 'mobx'

configure({ isolateGlobalState: true })

export const PermissionType = {
  Entity: 'Entity',
  Group: 'Group'
}

export class PermissionsStore {
    
    _datastore

    constructor(datastore) {
      this._datastore = datastore

      this.initialize()
    }

    async initialize() { 

    }

}


import { observable, configure } from 'mobx'

configure({ isolateGlobalState: true })

export const PermissionType = {
  Entity: 'Entity',
  Group: 'Group'
}

export class PermissionsStore {
    
    _datastore


    async addPermission(fileId, permission) {

      if (permission.permissionType === PermissionType.Entity) {
        
        await this._datastore.setEntityPermissions(
          fileId, 
          permission.entity, 
          permission.read, 
          permission.write
        )
        
      }
      else if (permission.permissionType === PermissionType.Group) {
        await this._datastore.setGroupPermissions(
          fileId, 
          permission.group.id, 
          permission.read, 
          permission.write
        )  
      }
    } 
    

    async removePermission(permission) {
      if (permission.permissionType === PermissionType.Entity)
        await this.props.datastore.removeEntityFromFile(this.props.mainStore.selectedFile.id, permission.entity)
      else
        await this.props.datastore.removeGroupFromFile(this.props.mainStore.selectedFile.id, permission.groupId)
    }    

    constructor(datastore) {
      this._datastore = datastore

      this.initialize()
    }

    async initialize() { 

    }

}


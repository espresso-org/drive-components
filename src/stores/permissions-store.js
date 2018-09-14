import { observable, configure, observe } from 'mobx'

configure({ isolateGlobalState: true })

export const PermissionType = {
  Entity: 'Entity',
  Group: 'Group'
}

export class PermissionsStore {
    

    @observable entityPermissions = []
    @observable groupPermissions = []
    @observable selectedFilePermissions = []
    @observable selectedPermission = {}

    _datastore
    _mainStore




    constructor(datastore, mainStore) {
      this._datastore = datastore
      this._mainStore = mainStore

      this.initialize()
    }    

    async initialize() { 
      observe(this._mainStore, 'selectedFile', async () => {
        this.initialSelectedFilePermissions = 
          (await this._datastore.getFilePermissions(this._mainStore.selectedFile.id))
          .map(permission => ({ 
            permissionType: PermissionType.Entity, 
            ...permission
          }))
          .concat(await this._datastore.getFileGroupPermissions(this._mainStore.selectedFile.id))
          .map(permission => ({ 
            permissionType: PermissionType.Group, 
            ...permission
          }))

        
        this.selectedFilePermissions = [...this.initialSelectedFilePermissions]
        
      })
    }    


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
    
    async updateSelectedFilePermissions(updatedPermission) {
      this.selectedFilePermissions = this.selectedFilePermissions.map(perm => {
        if (updatedPermission.permissionType === PermissionType.Entity)
          return perm.entity === updatedPermission.entity ? updatedPermission : perm      
        else
          return perm.groupId === updatedPermission.groupId ? updatedPermission : perm 
      })
    }


    saveChanges = async () => {
      const permissionChanges = this.getPermissionChanges()
  
      await this._datastore.setPermissions(
        this._mainStore.selectedFile.id,
        permissionChanges.filter(perm => perm.permissionType === PermissionType.Entity),
        permissionChanges.filter(perm => perm.permissionType === PermissionType.Group)
      )
  
      this._mainStore.setEditMode(EditMode.None)
    }
    
    getPermissionChanges = () => {
      return this.selectedFilePermissions.filter((perm, i) => {
        return this.initialSelectedFilePermissions[i].write !== perm.write
            || this.initialSelectedFilePermissions[i].read !== perm.read
      })
      /*
      .concat(this.state.entityPermissions.filter((perm, i) => {
        return this.originalEntityPermissions[i].write !== perm.write
            || this.originalEntityPermissions[i].read !== perm.read
      }))*/
    }





}


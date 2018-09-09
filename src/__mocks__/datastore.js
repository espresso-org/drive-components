import { Observable } from 'rxjs'
import { BigNumber } from 'bignumber.js'



export class Datastore {
    _settings = {
        storageProvider: 0,
        encryptionType: 0,

        ipfs: undefined
    }
    _fileInfo = []
    _fileContent = []
    _groups = []


    _events

    constructor(opts) {
        this._events = new EventEmitter()
    }


    async addFile(name, file) {
        this._fileInfo.push({
            id: this._fileInfo.length + 1,
            name,
            storageRef: '',
            fileSize: new BigNumber(file.byteLength),
            isPublic: true,
            isDeleted: false,
            owner: '',
            isOwner: true,
            lastModification: new BigNumber(Math.round((new Date()).getTime() / 1000)),
            permissionAddresses: [],
            permissionGroups: [],
            permissions: {
                write: true,
                read: true // TODO
            },
            _groupPermissionList: [],
            _permissionList: [],
            
        })

        this._fileContent.push(file)
        this._events.emit('NewFile')
        
        return this._fileInfo.length
    }

    async addMockFile(fileInfo, fileContent) {
        this._fileInfo.push({ 
            id: this._fileInfo.length + 1,
            ...fileInfo 
        })
        this._fileContent.push(fileContent)
        this._events.emit('NewFile')
        return this._fileInfo.length
    }


    async getFile(fileId) {
        const fileInfo = this.getFileInfo(fileId)
        const fileContent = this._fileContent[fileId - 1]

        return { ...fileInfo, content: fileContent }
    }


    async getFileInfo(fileId) {

        const fileInfo = this._fileInfo[fileId - 1]

        return { id: fileId, ...fileInfo }
    }


    async deleteFile(fileId) {
        let fileInfo = this.getFileInfo(fileId)
        fileInfo.isDeleted = true
        this._events.emit('DeleteFile')
    }


    async getFilePermissions(fileId) {
        return (await this.getFileInfo(fileId))._permissionList
    }

    async getSettings() {
        return this._settings
    }


    async setIpfsStorageSettings(host, port, protocol) {
        this._settings.storageProvider = 1
        this._settings.ipfs = {
            host,
            port,
            protocol
        }
        this._events.emit('SettingsChanged')
    }

    async listFiles() {
        return Promise.all(
                this._fileInfo
                   .map((file, i) => this.getFileInfo(i + 1))
                )
    }


    async setFileContent(fileId, file) {
        this.fileContent[fileId - 1] = file
        this._events.emit('FileContentUpdate')
    }

    /**
     * Add/Remove read permission to an entity for
     * a specific file
     * 
     * @param {number} fileId File Id
     * @param {string} entity Entity address
     * @param {boolean} hasPermission Write permission
     */
    async setReadPermission(fileId, entity, hasPermission) {
        const fileInfo = this._fileInfo[fileId - 1]
        const filePermissions = fileInfo._permissionList
        const entityPermissions = filePermissions.find(permission => permission.entity === entity)

        if (entityPermissions)
            entityPermissions.read = hasPermission
        else {
            filePermissions.push({
                entity,
                read: hasPermission,
                write: false
            })
            fileInfo.permissionAddresses.push(entity)
        }
        this._events.emit('NewReadPermission')
    }

    /**
     * Add/Remove write permission to an entity for
     * a specific file
     * 
     * @param {number} fileId File Id
     * @param {string} entity Entity address
     * @param {boolean} hasPermission Write permission
     */
    async setWritePermission(fileId, entity, hasPermission) {
        const fileInfo = this._fileInfo[fileId - 1]
        const entityPermissions = fileInfo._permissionList.find(permission => permission.entity === entity)

        if (entityPermissions)
            entityPermissions.write = hasPermission
        else {
            fileInfo._permissionList.push({
                entity,
                write: hasPermission,
                read: false
            })
            fileInfo.permissionAddresses.push(entity)
        }
        this._events.emit('NewWritePermission')
    }

    /**
     * Changes name of a file for `newName`
     * @param {number} fileId File Id
     * @param {string} newName New file name
     */
    async setFilename(fileId, newName) {
        const fileInfo = this.getFileInfo(fileId)

        fileInfo.name = newName

        this._events.emit('FileRename')
    }



    /**
     * Groups related methods
     */


    async createGroup(groupName, entities) {
        this._groups.push({
            id: this._groups.length + 1,
            name: groupName,
            entities: entities || []
        })
    }

    async deleteGroup(groupName) {
        delete this._groups[groupName]
    }

    async renameGroup(groupName, newGroupName) {
        this._groups[newGroupName] = this._groups[groupName]
        delete this._groups[groupName]
    }

    async addEntityToGroup(groupName, entity) {
        this._groups[groupName].push(entity)
    }

    async removeEntityFromGroup(groupName, entity) {
        this._groups[groupName] = this._groups[groupName].filter(ent => ent !== entity)
    }

    async setGroupPermissions(fileId, groupName, read, write) {
        const fileInfo = this._fileInfo[fileId - 1]
        const groupPermissions = fileInfo._groupPermissionList.find(permission => permission.groupName === groupName)

        if (groupPermissions) {
            groupPermissions.read = read
            groupPermissions.write = write
        }
        else {
            fileInfo._groupPermissionList.push({
                entity,
                read: read,
                write: write
            })
            fileInfo.permissionGroups.push(groupName)
        }
        this._events.emit('NewGroupPermissions')
    }

    async removeGroupFromFile(fileId, groupName) {
        const fileInfo = this._fileInfo[fileId - 1]

        fileInfo._groupPermissionList = fileInfo._groupPermissionList.filer(permission => permission.groupName !== groupName)

    }



    /**
     * Datastore events
     * 
     */
    async events(...args) {
        return this._events.events
    }

}


class EventEmitter {
    _observer    
    events

    constructor() {
        this.events = Observable.create(observer => this._observer = observer)
    }

    emit(event) {
        this._observer.next({
            event
        })
    }
}
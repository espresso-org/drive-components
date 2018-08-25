import * as async from 'async'

//import { DatastoreSettings } from './datastore-settings';
//import { RpcProvider } from './rpc-providers/rpc-provider';


export class Datastore {
    _settings
    _fileInfo = []
    _fileContent = []

    constructor(opts) {
        

    }


    async addFile(name, file) {
        this._fileInfo.push({
            name,
            storageRef: '',
            fileSize: file.byteLength,
            isPublic: true,
            isDeleted: false,
            owner: '',
            isOwner: true,
            lastModification: new Date(),
            permissionAddresses: [],
            permissions: {
                write: true,
                read: true // TODO
            },
            _permissionList: []
        })

        this._fileContent.push(file)
        
        return this._fileInfo.length
    }

    async addMockFile(fileInfo, fileContent) {
        this._fileInfo.push(fileInfo)
        this._fileContent.push(fileContent)
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
    }


    async getFilePermissions(fileId) {
        /*
        const entitiesAddress = await this._contract.getPermissionAddresses(fileId)

        return Promise.all(
            entitiesAddress.map(async entity => ({
                entity,
                ...createPermissionFromTuple(await this._contract.getPermission(fileId, entity))
            })) 
        )*/
        return this.getFileInfo(fileId)._permissionList
    }

    /**
     * Fetch the datastore settings
     */
    async getSettings() {
        return this._settings
    }


    async setIpfsStorageSettings(host: string, port: number, protocol: string) {
        await this._initialize()

        await this._contract.setIpfsStorageSettings(host, port, protocol)
        await this._refreshSettings()
    }

    async listFiles() {
        return this._fileInfo
                   .map((file, i) => this.getFileInfo(i + 1))
    }

    /**
     * Replace content for a specific file
     * @param {number} fileId File Id
     * @param {ArrayBuffer} file File content
     */
    async setFileContent(fileId: number, file: ArrayBuffer) {
        await this._initialize()

        const storageId = await this._storage.addFile(file)
        await this._contract.setFileContent(fileId, storageId, file.byteLength)
    }

    /**
     * Add/Remove read permission to an entity for
     * a specific file
     * 
     * @param {number} fileId File Id
     * @param {string} entity Entity address
     * @param {boolean} hasPermission Write permission
     */
    async setReadPermission(fileId: number, entity: string, hasPermission: boolean) {
        await this._initialize()

        await this._contract.setReadPermission(fileId, entity, hasPermission)
    }

    /**
     * Add/Remove write permission to an entity for
     * a specific file
     * 
     * @param {number} fileId File Id
     * @param {string} entity Entity address
     * @param {boolean} hasPermission Write permission
     */
    async setWritePermission(fileId: number, entity: string, hasPermission: boolean) {
        await this._initialize()

        await this._contract.setWritePermission(fileId, entity, hasPermission)
    }

    /**
     * Changes name of a file for `newName`
     * @param {number} fileId File Id
     * @param {string} newName New file name
     */
    async setFilename(fileId: number, newName: string) {
        await this._initialize()

        await this._contract.setFilename(fileId, newName)
    }

    /**
     * Datastore events
     * 
     */
    async events(...args) {
        // TODO: Return an Observable without async
        await this._initialize()
        
        return this._contract.events(...args)
    }

}

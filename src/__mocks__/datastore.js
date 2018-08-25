
export class Datastore {
    _settings = {
        storageProvider: 0,
        encryptionType: 0,

        ipfs: undefined
    }
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
        return this.getFileInfo(fileId)._permissionList
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
    }

    async listFiles() {
        return this._fileInfo
                   .map((file, i) => this.getFileInfo(i + 1))
    }


    async setFileContent(fileId, file) {
        this.fileContent[fileId - 1] = file
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
        const filePermissions = fileInfo._permissionList
        const entityPermissions = filePermissions.find(permission => permission.entity === entity)

        if (entityPermissions)
            entityPermissions.write = hasPermission
        else {
            filePermissions.push({
                entity,
                write: hasPermission,
                read: true
            })
            fileInfo.permissionAddresses.push(entity)
        }
    }

    /**
     * Changes name of a file for `newName`
     * @param {number} fileId File Id
     * @param {string} newName New file name
     */
    async setFilename(fileId, newName) {
        const fileInfo = this.getFileInfo(fileId)

        fileInfo.name = newName
    }

    /**
     * Datastore events
     * 
     */
    async events(...args) {
        
    }

}

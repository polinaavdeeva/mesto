class UserInfo {
    constructor(userName, userDescriprion) {
        this._userName = userName;
        this._userDescription = userDescriprion;
    }

    getUsetInfo() {
        return userData = {
            userName: this._userName,
            userDescriprion: this._userDescription
        }
    }

    setUserInfo(name, descriprion) {
        this._userName = name;
        this._userDescription = descriprion;
    }
}
export default class UserInfo {
    constructor(userName, userDescriprion) {
        this._userName = userName;
        this._userDescription = userDescriprion;
    }

    getUsetInfo() {
        const userData = {
            userName: this._userName.textContent,
            userDescriprion: this._userDescription.textContent
        };

        return userData;
    }

    setUserInfo(name, descriprion) {
        this._userName.textContent = name;
        this._userDescription.textContent = descriprion;
    }
}
export default class UserInfo {
    constructor (nameSelector, occupationSelector) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);
    }

    getUserInfo() {
       return {
          name: this._name.textContent,
          occupation: this._occupation.textContent,
       }
    }

    setUserInfo({name, occupation}) {
        this._name.textContent = name
        this._occupation.textContent = occupation
    }
}

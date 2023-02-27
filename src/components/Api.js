export default class Api {
    constructor(Parameters){
        this._url = Parameters.baseUrl;
        this._headers = Parameters.headers;
    }

    getInitialCards() {     
        return fetch(`${this._url}/cards`, {headers: this._headers})
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {headers: this._headers})
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    editProfile({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers:this._headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    addNewCard({name, link}) {
        return fetch( `${this._url}/cards`, {
            method: 'POST',
            headers:this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(res => {
        if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers:this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    dislikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers:this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers:this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    changeAvatar({avatar}) {
        return fetch( `${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers:this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }
}
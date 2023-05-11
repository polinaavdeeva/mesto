export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    async getUserInfo() {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`);
    }

    async getInitalCards() {
        const response = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async editUserInfo(data) {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['userName'],
                about: data['aboutUser']
            })
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async addNewCard(data) {
        const response = await fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['placeName'],
                link: data['imgLink']
            })
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async deleteCard(id) {
        const response = await fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async editUserAvatar(data) {
        const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['avatarLink']
            })
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async putLike(id) {
        const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

    async deleteLike(id) {
        const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
        if (response.ok) {
            return response.json();
        }
        return await Promise.reject(`Ошибка: ${response.status}`)
    }

}
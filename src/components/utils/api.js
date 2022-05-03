import { config } from "./config";

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

    getPosts(itemId) {
        const requestURL = itemId ? `${this._url}/posts/${itemId}` : `${this._url}/posts`
        return fetch(requestURL, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponce)
    }

    addPosts(posts) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(posts)
        }).then(onResponce)
    }

    deletePosts(itemId) {
        return fetch(`${this._url}/posts/${itemId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    getCurentUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        }).then(onResponce)
    }

    addLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    deleteLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponce)
    }

    //ДЛЯ ИЗМЕНЕНИЯ ПОЛЬЗОВАТЕЛЯ
    // letUser() {
    //     return fetch(`${this._url}/users/me`, {
    //         method: 'PATCH',
    //         headers: {
    //             authorization: `Bearer ${this._token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: "Гундин Иван Александрович",
    //             about: "Пользователь",
    //             //avatar: "https://img2.goodfon.ru/original/800x480/4/b0/the-witcher-2-vedmak-glaza.jpg"
    //         })
    //     }).then(onResponce)
    // }

    //           <<-- ДЛЯ СОЗДАНИЯ НОВОГО ПОСТА: ->>>
    // getNewPost() {
    //     return fetch(`${this._url}/posts`, {
    //         method: 'POST',
    //         headers: {
    //             authorization: `Bearer ${this._token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "title": "...", // тип данных строка, обязательное
    //             "text": "...", // тип данных строка, обязательное
    //             "image": "https://citytraffic.ru/wp-content/uploads/2019/10/1551422207.jpg", // тип данных строка
    //             "tags": ["...", "...", "..."] //тип данных массив строк
    //         })
    //     }).then(onResponce)
    // }

    //           <<-- ДЛЯ УДАЛЕНИЯ ПОСТА: ->>>
    // getRemovePost(ID) {
    //     return fetch(`${this._url}/posts/${ID}`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: `Bearer ${this._token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "title": "...", // тип данных строка, обязательное
    //             "text": "...", // тип данных строка, обязательное
    //             "image": "https://citytraffic.ru/wp-content/uploads/2019/10/1551422207.jpg", // тип данных строка
    //             "tags": ["...", "...", "..."] //тип данных массив строк
    //         })
    //     }).then(onResponce)
    // }
}

export default new Api(config);
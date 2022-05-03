import React, { useState, useEffect } from 'react';
import api from './components/utils/api.js'
//import { postData } from '../posts';   // -> для моковых данный posts.js
import { Header } from './components/Header';
import { Cards } from './components/ListCards';
import { Footer } from './components/Footer';
import Background from './components/img2.jpg';
import { Routes, Route } from "react-router-dom";
import { Item } from './components/item';
import { CreateItem } from './components/CreateItem/index.js';

const sectionStyle = {
    backgroundImage: `url(${Background})`
};

export const App = () => {
    //const [itemCard, setCard] = useState(postData);  // -> state для моковых данный 
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    // state информации о пользователе с сервера:
    const [user, setUser] = useState(null)
    // state постов с сервера:
    const [posts, setPosts] = useState(null)

    // Маунтинг информации о пользователе с сервера:
    useEffect(() => {
        api.getCurentUser().then((user) => setUser(user))
    }, [])
    // Маунтинг постов с сервера:
    useEffect(() => {
        api.getPosts().then((data_posts) => setPosts(data_posts))
    }, [])

    //  <<-- ДЛЯ ИЗМЕНЕНИЯ ПОЛЬЗОВАТЕЛЯ ->>> (api -> letUser)
    // useEffect(() => {
    //     api.letUser().then((user_new) => setUser(user_new))
    // }, [])

    //           <<-- ДЛЯ СОЗДАНИЯ НОВОГО ПОСТА: ->>>
    // // state нового поста:
    // const [newPost, setNewPost] = useState(null)
    // // Маунтинг нового поста:
    // useEffect(() => {
    //     api.getNewPost().then((data_newPost) => setNewPosts(data_newPost))
    // }, [])

    //           <<-- ДЛЯ УДАЛЕНИЯ  ПОСТА: ->>>
    // // state поста:
    // const [removePost, setRemovePost] = useState(null)
    // // Удаление поста:
    // useEffect(() => {
    //     api.getRemovePost(ID).then((data_removePost) => setRemovePost(data_removePost))
    // }, [])

    return (
        <div style={sectionStyle}>
            {/* <Link to="/about">ada</Link> */}
            <Header name={user?.name} favorites={favorites} />
            <div className='content container'>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className='content_cards'>
                                <Cards
                                    posts={posts}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                />
                            </div>
                        }
                    />
                    <Route path="posts/:itemId" element={<Item />} />
                    <Route path="posts/create" element={<CreateItem />} />
                    <Route path="about" element={<div>About работает проверка</div>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};
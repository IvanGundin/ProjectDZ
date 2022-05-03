import React from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';


export const CreateItem = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            target: { title, text, image }
        } = event;
        api.addPosts({
            title: title.value,
            text: text.value,
            image: image.value,
            //tags: tags.value,
        })
            .then((data) => {
                console.log(data)
                navigate('/')
            })
            .catch((err) => alert(err));
        //console.log(title, text, image, tags)
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container flexDirection='column' alignItems = 'center' spacing='10'>
                <Grid item>
                    <input name='title' placeholder='title, строка (обязательное)' />
                </Grid>
                <Grid item>
                    <input name='text' placeholder='text, строка (обязательное)' />
                </Grid>
                <Grid item>
                    <input name='image' placeholder='image, строка' />
                </Grid>
                <Grid item>
                    <button>Создать пост</button>
                </Grid>
            </Grid>
        </form >
    )
}
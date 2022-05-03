import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { TextField, Grid, Button } from '@mui/material';

export const Item = () => {

    const [item, setItem] = useState();
    const navigate = useNavigate();
    const params = useParams();

    const handleClik = () => {
        api.deletePosts(params.itemId)
            .then((data) => {
                alert('Вы удалили пост')
                navigate('/')
            })
            .catch((err) => alert(err));
    }

    useEffect(() => {
        api.getPosts(params.itemId)
            .then((data) => setItem(data))
            .catch((err) => alert(err));
    }, []);

    return (
        <>
            {item && <Grid container spacing={1} flexDirection='column' alignItems='center'>
                <Grid item xs={8}>
                    <h1> Автор: {item?.author.name} </h1>
                </Grid>
                <Grid item xs={8}>
                    <img
                        src={item.image}
                        width="400"
                        alt="картинка"
                    />
                </Grid>
                <Grid item xs={8}>
                    <h2> Заголовок: {item?.title} </h2>
                </Grid>
                <Grid item xs={8}>
                    Комментарии: {item?.comments.map(data => (data.text + ', '))}
                </Grid>
            </Grid>
            }
            < br />
            < br />
            <Grid container flexDirection='column' alignItems='center'>
                <Button onClick={handleClik} variant="contained" color='primary' size='small'>Удалить пост</Button>
                <pre>{JSON.stringify(item, null, 4)}</pre>
            </Grid>
        </>
    )
};

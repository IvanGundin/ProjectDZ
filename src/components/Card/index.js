import * as React from 'react';
import api from '../utils/api';

import { Card as CardMUI } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DayJS from 'react-dayjs';
import { Link } from "react-router-dom";

const styles = {
    element_post_text: {
        display: 'WebkitBox',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    }
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Card = ({ itemData, isInFevorits, setFavorites }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || [];
        storage.push(value);
        localStorage.setItem(key, JSON.stringify(storage));
    };

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key));
        const filteredStorage = storage.filter((itemID) => value !== itemID);
        localStorage.setItem(key, JSON.stringify(filteredStorage));
    };

    const addFavorite = () => {
        writeLS('favorites', itemData._id)
        ++itemData.likes.length
        setFavorites((prevState) => [...prevState, itemData._id]);
        api.addLike(itemData._id)
            .then((addedItem) => {
                setOpen(true);
            })
            .catch(() => {
                alert('Не удалось добавить')
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', itemData._id)
        --itemData.likes.length
        setFavorites((prevState) => prevState.filter((itemID) => itemData._id !== itemID))
        api.deleteLike(itemData._id)
            .then((removeItem) => {
                setOpen(true);
            })
            .catch(() => {
                alert('Не удалось удалить')
            });
    };

    //console.log(itemData._id)
    return (
        <Stack spacing={2}>
            <CardMUI sx={{ width: 480, height: 500 }} >
                <CardMedia
                    component="img"
                    height="230"
                    src={itemData?.image}
                    alt="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        <Link to={`posts/${itemData._id}`} style={{ TextDecoration: 'none' }}>{itemData.author?.email}</Link>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {itemData?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={styles.element_post_text}>
                        <span> {itemData?.text}</span>

                        {/* Комментарии: {itemData?.comments.map(data => (data.text + ', '))} */}
                        <span>
                            Дата создания:  <DayJS format="DD.MM.YYYY">{itemData?.created_at}</DayJS>
                        </span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{itemData.tags[0]}</Button>
                    <Button href={itemData.image} target="blank" size="small">image</Button>
                    {isInFevorits ? (
                        <IconButton variant="outlined" aria-label="add to favorites" onClick={removeFavorite}>
                            <FavoriteIcon /> {itemData.likes.length}
                        </IconButton>
                    ) : (
                        <IconButton variant="outlined" aria-label="add to favorites" onClick={addFavorite}>
                            <FavoriteBorderOutlinedIcon /> {itemData.likes.length}
                        </IconButton>
                    )}
                </CardActions>
            </CardMUI >
            {/* Snackbar */}
            {isInFevorits ? (
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Пост пользователя: "{itemData?.author?.name}" добавлен в избранное!
                    </Alert>
                </Snackbar>
            ) : (
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Пост пользователя: "{itemData?.author?.name}" удален из избранного!
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    );
};
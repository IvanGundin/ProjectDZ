import React from 'react';
import style from './style.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import DayJS from 'react-dayjs';
import { Link } from 'react-router-dom';
import picture from '../icon.png';
import avatar from '../ava.jpg';
import GitHub from '../GitHub.png';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import IconButton from '@mui/material/IconButton';


import Avatar from '@mui/material/Avatar';



const styles = {
    textName: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1.7em',
        fontFamily: 'cursive'
    },
    textNameColor: {
        color: '#DC143C',
        textShadow: '2px 1px 3px rgba(21, 23, 22, 0.713)'

    },
    info: {
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}

export const Header = ({ name, favorites }) => {

    const navigate = useNavigate()
    const navigatToCreatePage = () => {
        navigate('posts/create')
    };

    return (
        <div >
            <div className={style.header}>
                <div className={style.homePage}>
                    <Link to='/' style={{ TextDecoration: 'none' }}>
                        <img src={picture} alt="picture" width="180" />
                    </Link>
                </div>
                <div style={styles.textName}>

                    <Avatar src={avatar} />

                    <div style={styles.textNameColor}>{name}</div>
                    <div> total {favorites.length} <FavoriteIcon /> likes </div>
                </div>

                <div style={styles.info}>
                    <a href="https://github.com/IvanGundin" target="blank"
                        style={{
                            FontSize: '1.4em',
                            TextDecoration: 'none',
                            Color: 'rgb(140, 193, 140)',
                            TextShadow: '2px 1px 2px rgba(21, 23, 22, 0.713)'
                        }}>
                        <img src={GitHub} alt="picture" width="80" />
                    </a>
                    <br />
                    <div className={style.addPost}><b>Добавить пост</b></div>
                    <IconButton onClick={navigatToCreatePage} >
                        <PostAddSharpIcon variant="outlined" aria-label="add to favorites" />
                    </IconButton>
                </div>
            </div>
            <div className={style.headerText}>
                <div>Welcome to Our Image Board</div>
                <div>We're stoked that you're here 🥳</div>
            </div>
            <div className={style.headerData}>today: <DayJS format="DD.MM.YYYY"></DayJS></div>
        </div>
    );
};

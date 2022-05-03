import React from 'react'
import { Card } from '../Card';
import './index.css';

export const Cards = ({ posts, favorites, setFavorites }) => {

    return (
        <div className="cards">
            {posts?.map((item) => (
                <Card
                    key={item._id}
                    itemData={item}
                    isInFevorits={favorites.includes(item._id)}
                    setFavorites={setFavorites}

                />
            ))}
        </div>
    );
};
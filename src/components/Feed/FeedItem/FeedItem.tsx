import React from 'react';
import moment from 'moment';

import { Tweet } from '../../../constants/Tweet';

import './FeedItem.scss';

interface Props {
    tweet: Tweet;
}

const FeedItem: React.FC<Props> = ({ tweet }) => {
    return (
        <article className="fed-Item">
            <div className="fed-Item_ImageContainer">
                <img alt={tweet.text} src={tweet.image} className="fed-Item_Image"/>
            </div>

            <div className="fed-Item_Body">
                <p className="fed-Item_Meta">{tweet.username}
                    <time className="fed-Item_Time">{moment(tweet.timeStamp).startOf('hour').fromNow()}</time>
                </p>

                <p className="fed-Item_Text">{tweet.text}</p>
            </div>
        </article>
    );
};

export default FeedItem;

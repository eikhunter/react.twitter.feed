import React from 'react';
import { observer } from 'mobx-react';

import FeedStore from '../../stores/FeedStore';
import FeedItem from '../../components/Feed/FeedItem/FeedItem';
import Loader from '../../components/Layout/Loader/Loader';

import './Feed.scss';

interface Props {
    feedStore: FeedStore;
}

const initialState = () => ({

});

type State = ReturnType<typeof initialState>;

@observer
class Feed extends React.Component<Props, State> {
    readonly state: State = initialState();

    componentDidMount(): void {
        const { feedStore } = this.props;

        feedStore.getTweets();
        setInterval(() => feedStore.getTweets(), 2000);
    }

    render() {
        const { feedStore } = this.props;

        return (
            <div className={feedStore.loading ? 'fed-Feed' : 'fed-Feed fed-Feed-loaded'}>
                <div className="fed-Feed_Inner">
                    <div className="fed-Feed_Content">
                        <header className="fed-Feed_Header">
                            <h1 className="fed-Feed_Title">Home</h1>
                        </header>

                        <div className="fed-Feed_Body">
                            <ul className="fed-Feed_Items">
                                {feedStore.tweets.map(item => (
                                    <li key={item.id} className="fed-Feed_Item">
                                        <FeedItem tweet={item} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="fed-Feed_Overlay">
                            <Loader />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;

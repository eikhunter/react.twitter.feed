import FeedStore from '../stores/FeedStore';

export class RootStore {
    feed: FeedStore;

    constructor() {
        this.setStores();
        this.feed = new FeedStore();
    }

    getStores = (): Stores => {
        return {
            feedStore: this.feed
        };
    };

    setStores() {
        this.feed = new FeedStore();
    }
}

export default (): Stores => {
    const rootStore = new RootStore();
    return rootStore.getStores();
};

export interface Stores {
    feedStore: FeedStore;
}

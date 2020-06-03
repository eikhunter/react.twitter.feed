import { observable, action, computed } from 'mobx';

import { Tweet } from '../constants/Tweet';

export default class FeedStore {
    loadCount: number = 25; // How many you want to load at one time
    threshold: number = 99; // How many tweets you can show on th page at one time
    @observable loading: boolean = true;
    @observable tweets: Tweet[] = [];

    @action async getTweets(): Promise<void> {
        try {
            // Check to see if this is the initial load or not by checking the array length
            if (this.tweets.length > 1) {
                // We use the api to only load tweets that are after the latest tweet received
                const response = await fetch(`http://magiclab-twitter-interview.herokuapp.com/eik-hunter/api?count=${this.loadCount}&afterId=${this.latestTweetId}`);
                const newTweets = await response.json();

                this.tweets.unshift(...newTweets);

                // If the amount of tweets loaded reach the threshold, we remove some off the end of the array so we don't have thousands of tweets shown at one time which can affect performance
                if (this.tweets.length > this.threshold) {
                    const spliceStart = this.tweets.length - this.loadCount;

                    this.tweets.splice(spliceStart, this.loadCount)
                }
            } else {
                // Initial load just grabs the latest tweets
                const response = await fetch(`http://magiclab-twitter-interview.herokuapp.com/eik-hunter/api?count=${this.loadCount}`);

                this.tweets = await response.json();
            }

            this.loading = false;
        } catch (e) {
            return e;
        }
    }

    @computed get latestTweetId(): number {
        return this.tweets[0].id;
    }
}

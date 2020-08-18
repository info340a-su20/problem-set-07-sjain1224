'use strict';

import readline from 'readline-sync';

import * as model from './Model';
import {printTweets} from './View';

export function runSearch() {
    console.log('Here are some tweets by @UW_iSchool');
    let recent = model.getRecentTweets();
    printTweets(recent);

    let userInput = readline.question('Search tweets, or EXIT to quit: ');

    if(userInput == 'EXIT') {
        return;
    }

    let results = model.searchTweets(userInput);
    printTweets(results);
}
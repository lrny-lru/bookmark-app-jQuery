import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './main.css';

import $ from 'jquery';

import { bindEventHandlers } from './events';
import { render } from './render';
import store from './store';

import api from './api';

const initStore = function () {
  api.readRecords()
    .then(response => {
      response.forEach(bookmark => store.addBookmarkToStore(bookmark));
      render();
    })
    .catch(error => {
      store.error = error;
      render();
      store.error = null;
    });
};

const main = function () {
  bindEventHandlers();
  initStore();
  store.bookmarks = [];
};

$(main);
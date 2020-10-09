import $ from 'jquery';
import store from './store';
import api from './api';
import { render } from './render';

const findBookmarkId = function (target) {
  return $(target).closest('li').data('id');
};

const handleNewBookmarkFormSubmit = function () {
  $('main').on('submit', '#new-bookmark-form', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBookmark = {};
    formData.forEach((val, name) => newBookmark[name] = val);
    api.createRecord(newBookmark)
      .then(data => {
        store.addBookmarkToStore(data);
        store.newBookmark = {};
        store.currentView = 'bookmarkList';
        render();
      })
      .catch(error => {
        store.error = error;
        render();
        store.error = null;
      });
  });
};

const handleToggleExpandBookmark = function () {
  $('main').on('click', '.js-bookmark-name, .collapse-bookmark', event => {
    const id = findBookmarkId(event.currentTarget);
    store.toggleExpandBookmark(id);
    render();
  });
};

const handleRatingChange = function () {
  $('main').on('change', '.js-bookmark-rating', event => {
    const newRating = $(event.currentTarget)
      .find('input[type="radio"]:checked').val();
    const id = findBookmarkId(event.currentTarget);
    const updateData = {
      rating: parseInt(newRating)
    };
    api.updateRecord(id, updateData)
      .then(() => {
        store.updateBookmark(id, updateData);
        render();
      })
      .catch(error => {
        store.error = error;
        render();
        store.error = null;
      });
  });
};

const handleDeleteBookmark = function () {
  $('main').on('click', '.js-bookmark-delete', event => {
    const id = findBookmarkId(event.currentTarget);
    api.deleteRecord(id)
      .then(() => {
        store.deleteBookmark(id);
        render();
      })
      .catch(error => {
        store.error = error;
        render();
        store.error = null;
      });
  });
};

const handleAddNewBookmark = function () {
  $('main').on('click', '.js-new-bookmark', () => {
    store.currentView = 'newBookmark';
    render();
  });
};

const handleNewBookmarkRatingChange = function () {
  $('main').on('change', '.js-new-bookmark-rating', event => {
    const newBookmark = {
      title: $('#new-bookmark-name').val(),
      rating: parseInt($(event.currentTarget)
        .find('input[type="radio"]:checked').val()),
      url: $('#new-bookmark-url').val(),
      description: $('#new-bookmark-description').val()
    };
    Object.assign(store.newBookmark, newBookmark);
    render();
  });
};

const handleFilterBookmarks = function () {
  $('main').on('change', '#filter-select', event => {
    store.filter = $(event.target).val();
    render();
  });
};

const bindEventHandlers = function () {
  handleToggleExpandBookmark();
  handleRatingChange();
  handleDeleteBookmark();
  handleAddNewBookmark();
  handleNewBookmarkRatingChange();
  handleFilterBookmarks();
  handleNewBookmarkFormSubmit();
};

export { bindEventHandlers };
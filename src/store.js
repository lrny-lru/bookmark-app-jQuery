const bookmarks = [];

let error = null;
let newBookmark = {};
let filter = 0;
let currentView = 'bookmarkList';

const updateBookmark = function (id, newData) {
  const item = this.bookmarks.find(currentItem => currentItem.id === id);
  Object.assign(item, newData);
};

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const toggleExpandBookmark = function (id) {
  const item = this.bookmarks.find(currentItem => currentItem.id === id);
  item.expanded = !item.expanded;
};

const addBookmarkToStore = function (bookmark) {
  this.bookmarks.push({
    id: bookmark.id,
    title: bookmark.title,
    rating: bookmark.rating,
    url: bookmark.url,
    description: bookmark.desc ? bookmark.desc : '',
    expanded: false
  });
};

export default {
  bookmarks,
  newBookmark,
  filter,
  currentView,
  error,

  updateBookmark,
  deleteBookmark,
  addBookmarkToStore,

  toggleExpandBookmark
};
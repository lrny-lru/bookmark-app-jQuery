import store from './store';
import templates from './templates';

const bookmarkList = function () {
  const actionPalette = templates.actionPalette();
  const bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  const bookmarkList = templates.bookmarkList(bookmarks);
  const errorMessage = templates.errorMessage();
  return [ actionPalette, bookmarkList, errorMessage ];
};

const newBookmark = function () {
  const newBookmarkForm = templates.newBookmarkForm();
  const errorMessage = templates.errorMessage();
  return [ newBookmarkForm, errorMessage ];
};
export default {
  bookmarkList,
  newBookmark
};
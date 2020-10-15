import store from './store';

import { event } from 'jquery';

const errorMessage = function () {
  return store.error ? `<footer class="error">API Error ${store.error.code}: ${store.error.message}</footer>` : '';
};

const ratingId = function (id, rating) {
  return `${id}-rating-${rating}`;
};

const starRating = function (item) {

  let stars = [];
  for (let i = 1; i <= item.rating; i++) {
    stars.push({
      rating: i,
      
      class: 'fas',
      checked: i === item.rating ? 'checked' : '',
      focusable: true

    });
  }

  for (let i = item.rating; i < 5; i++) {
    stars.push({
      rating: i + 1,
      class: 'far',
      checked: '',
      focusable: true
    });
  }

  return stars.map(star => {
    return `<label    for="${ratingId(item.id, star.rating)}">
    <span class="">
     ${star.rating} 
    </span>
    <i class="${star.class}  fa-star"></i><input  class=' tabindex="${star.rating}"   aria-label='${star.rating}' type="radio" ${star.checked}
    name="rating" 
    id="${ratingId(item.id, star.rating)}" value="${star.rating}"/></label>
   `;
  }).join('');
};

const listItem = function (item) {
  if (item.expanded) {
    return `
    <li class="js-bookmark-item bookmark-item expanded" data-id="${item.id}">
    

    <h2 class="js-bookmark-name bookmark-name">${item.title}</h2>
      <section class="bookmark">  
        <section class="bookmark-line">
          <div class="js-bookmark-rating bookmark-rating">
            ${starRating(item)}
          </div>
          <button aria-label="delete-button" tabindex="1" class="js-bookmark-delete bookmark-delete">
            <span class="hidden">Delete Bookmark</span>
            <i class="fas fa-trash-alt"></i>
          </button>
        </section>
      <section class="bookmark-body">
        <p class="bookmark-description">
          ${item.description}
        <footer>
          <button tabindex="1" class="collapse-bookmark">Collapse</button>
          <button tabindex="1" class="bookmark-link">Visit Site</button>
        </footer>
      </section>
    </section>
  </li>
    `;
  } else {
    return `
    <li class="js-bookmark-item bookmark-item" data-id="${item.id}">
      <section class="bookmark-line">
      <button tabindex="1" area-label="delete-button" class="js-bookmark-delete bookmark-delete">
      <span class="hidden">Delete Bookmark</span>
      <i class="fas fa-trash-alt"></i>
       </button>
        <button tabindex="1" class="js-bookmark-name bookmark-name">${item.title}</button>
        <div class="bookmark-rating js-bookmark-rating">
        ${starRating(item)}
        </div>
      </section>
    </li>
    `;
  }
};


const bookmarkList = function (bookmarks) {
  let elementList = bookmarks.map(item => listItem(item));
  return `
    <ul class="bookmark-list">
      ${elementList.join('')}
    </ul>
  `;
};

const actionPalette = function () {
  return `
    <section class="js-action-palette action-palette">
      <button tabindex="0"  class="js-new-bookmark new-bookmark">
        <div class="new-bookmark-icon"><i class="fas fa-pencil-alt"></i></div>
        <div aria-label="new-bookmark button label" class="new-bookmark-button-label">Add new bookmark</div>
      </button>
      <div class="filter-bookmarks">
      <label for="filter-select">
      Filter
      </label>
        <select aria-label="Select star filter" tabindex="1" id="filter-select">
          <option disabled selected hidden>Filter by</option>
          <option aria-label="show 5 stars" value=5>Show 5 Stars</option>
          <option area-label="show 4 stars" value=4>Show 4+ Stars</option>
          <option aria-label="show 3 stars" value=3>Show 3+ Stars</option>
          <option aria-label="show 2 stars" value=2>Show 2+ Stars</option>
          <option aria-label="show only 1 star" value=1>Show 1+ Stars</option>
          <option aria-label="Show 0 stars" value=0>Show All</option>
        </select>
      </div>
    </section>
  `;
};

const newBookmarkForm = function () {
  const title = store.newBookmark.title ?
    `value="${store.newBookmark.title}"` : '';
  const rating = starRating({
    rating: store.newBookmark.rating ? store.newBookmark.rating : 0,
    title: 'new-bookmark'
  });
  const description = store.newBookmark.description ?
    store.newBookmark.description : '';
  const url = store.newBookmark.url ?
    `value="${store.newBookmark.url}"` : '';
  return `
  <h2>Add New Bookmark</h2>
    <form id="new-bookmark-form">
      <section>
        <p>
          <label class="hidden" for="new-bookmark-name">
            New Bookmark name</label>
          <input tabindex="0" aria class="new-bookmark-form-input" type="text" name="title" id="new-bookmark-name" placeholder="New Bookmark Name"
          required ${title}/>
        </p >
        <p><label class="hidden" for="new-bookmark-url">
    New Bookmark Url</label>
          <input tabindex="0"  class="new-bookmark-form-input" type="url" name="url" id="new-bookmark-url"
            placeholder="URL, eg. https://example.code" required ${url}/></p>
        <p><label class="hidden" for="new-bookmark-rating">
    New Bookmark Rating</label>
          <div class="js-new-bookmark-rating new-bookmark-rating">
      ${rating}
          </div>
        </p>
      </section >
      <section class="bookmark-body">
        <p><label class="hidden" for="new-bookmark-description">
      New Bookmark Description</label>
          <textarea tabindex="1" class="new-bookmark-form-input" name="desc" id="new-bookmark-description" rows=4 placeholder="Enter description">${description}</textarea>
        </p>

        <p><button tabindex="0" type="submit" class="new-bookmark-form-input">Submit</button></p>
      </section >
    </form >
  `;
  
  
};

export default {
  errorMessage,
  bookmarkList,
  actionPalette,
  newBookmarkForm
};
import $ from 'jquery';
import views from './views';
import store from './store';

const render = function (){
  let view = store.currentView;
  $('main').html(views[view]().join(''));
};

export {render};
import $ from 'jquery';

import { NAMESPACE } from './consts';
import SimpleModal from './simple-modal';
import './jquery-simple-modal.scss';

$.fn.simpleModal = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleModal($elem, options));
  });
};

$.SimpleModal = SimpleModal;

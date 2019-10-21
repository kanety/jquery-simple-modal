import $ from 'jquery';
import './simple-modal.scss';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  opener: null,
  closer: null,
  focus: null,
  owner: null,
  closeByEsc: true,
  closeByModalClick: true
};

export default class SimpleModal {
  constructor(content, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.$content = $(content);
    this.$parent = this.$content.parent();
    this.$opener = $(this.options.opener);
    this.$closer = $(this.options.closer);

    this.$owner = this.options.owner ? $(this.options.owner) : this.$content.parent();
    this.$ownerDocument = $(this.$owner.get(0).ownerDocument);

    this.$modal = $('<div>').addClass(NAMESPACE).hide();
    this.$owner.append(this.$modal.append(this.$content));

    this.init();
  }

  init() {
    this.$content.addClass(`${NAMESPACE}-content`);
    this.unbind();
    this.bind();
  }

  destroy() {
    this.$content.removeClass(`${NAMESPACE}-content`);
    this.$content.removeData(NAMESPACE);
    this.$parent.append(this.$content);
    this.$modal.remove();
    this.unbind();
  }

  bind() {
    this.$opener.on(`click.${this.namespace}`, (e) => {
      e.preventDefault();
      this.open($(e.currentTarget));
    });
    this.$closer.on(`click.${this.namespace}`, (e) => {
      e.preventDefault();
      this.close($(e.currentTarget));
    });

    if (this.options.closeByModalClick) {
      this.$modal.on(`click.${this.namespace}`, (e) => {
        if (e.target != this.$content.get(0) && !$.contains(this.$content.get(0), e.target)) {
          this.close($(e.currentTarget));
        }
      });
    }

    if (this.options.closeByEsc) {
      $(document).on(`keydown.${this.namespace}`, (e) => {
        if (e.keyCode == 27) {
          e.preventDefault();
          this.close($(e.currentTarget));
        }
      });
    }
  }

  unbind() {
    this.$opener.off(`.${this.namespace}`);
    this.$closer.off(`.${this.namespace}`);
    this.$modal.off(`.${this.namespace}`);
    $(document).off(`.${this.namespace}`);
  }

  open($target) {
    if (this.$modal.is(':visible')) return;

    this.$ownerDocument.find('body').addClass(`${NAMESPACE}-disable-scroll`);
    this.$content.show();
    this.$modal.show();

    if (this.options.focus) {
      this.$content.find(this.options.focus).focus();
    }

    this.$content.trigger('modal:open', [$target]);
  }

  close($target) {
    if (this.$modal.is(':hidden')) return;

    this.$ownerDocument.find('body').removeClass(`${NAMESPACE}-disable-scroll`);
    this.$modal.hide();
    this.$content.hide();

    this.$content.trigger('modal:close', [$target]);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(true, DEFAULTS, options);
  }
}

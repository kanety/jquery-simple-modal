describe('jquery-simple-modal', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', () => {
    let $content, $modal;
    let $opener, $ok, $cancel;
 
    beforeEach(() => {
      $content = $('#basic');
      $modal = $content.closest('.simple-modal');
      $opener = $('#basic_opener');
      $ok = $('#basic_ok');
      $cancel = $('#basic_cancel');
    });

    it('opens a modal', () => {
      expect($modal.is(':visible')).toEqual(false);
      $opener.click();
      expect($modal.is(':visible')).toEqual(true);
    });

    it('closes a modal by ok button', () => {
      $opener.click();
      $ok.click();
      expect($modal.is(':visible')).toEqual(false);
    });

    it('closes a modal by close button', () => {
      $opener.click();
      $cancel.click();
      expect($modal.is(':visible')).toEqual(false);
    });

    it('closes a modal by modal click', () => {
      $opener.click();
      $modal.click();
      expect($modal.is(':visible')).toEqual(false);
    });

    it('closes a modal by ESC key', () => {
      $opener.click();
      $(document).trigger($.Event('keydown', { keyCode: 27 }));
      expect($modal.is(':visible')).toEqual(false);
    });

    it('focuses an element', () => {
      $opener.click();
      expect(document.activeElement.id).toEqual('basic_ok');
    });
  });

  describe('callbacks', () => {
    let $content, $modal;
    let $opener, $ok, $cancel;
 
    beforeEach(() => {
      $content = $('#callback');
      $modal = $content.closest('.simple-modal');
      $opener = $('#callback_opener');
      $ok = $('#callback_ok');

      spyOn(console, 'log');
    });

    it('runs open callbacks', () => {
      $opener.click();
      expect(console.log).toHaveBeenCalledWith('opened by callback_opener');
      $ok.click();
      expect(console.log).toHaveBeenCalledWith('closed by callback_ok');
    });
  });

  describe('destroy', () => {
    let $content;
 
    beforeEach(() => {
      eval($('script').text());
      $content = $('#basic');
      $content.data('simple-modal').destroy();
    });

    it('destroys existing object', () => {
      expect($content.data('simple-modal')).toEqual(undefined);
    });
  });
});

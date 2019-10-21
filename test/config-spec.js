describe('jquery-simple-modal', () => {
  it('config', () => {
    let defaults = $.SimpleModal.getDefaults();
    expect(defaults.focus).toEqual(null);

    defaults = $.SimpleModal.setDefaults({focus: '#elem'});
    expect(defaults.focus).toEqual('#elem');
  });
});

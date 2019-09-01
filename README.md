# jquery-simple-modal

A jquery plugin for simple modal.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-modal --save

## Usage

Build html as follows:

```html
<div id="content">
  <div>content</div>
  <div>content</div>
  <hr>
  <div>
    <button type="button" id="ok">OK</button>
    <button type="button" id="cancel">Cancel</button>
  </div>
</div>
<button type="button" id="open">Open</button>
```

Then run:

```javascript
$('#content').simpleModal({
  opener: '#open',
  closer: '#ok,#cancel'
});
```

### Options

Focus elements when modal is opened:

```javascript
$('#content').simpleModal({
  focus: '#ok'
});
```

Set modal owner element:

```javascript
$('#content').simpleModal({
  owner: '#element'
});
```

Disable modal closing for specific events:

```javascript
$('#content').simpleModal({
  closeByEsc: false,         // ESC key
  closeByModalClick: false   // click modal background
});
```

### Callbacks

Run callbacks when a modal is opened or closed:

```javascript
$('#content').simpleModal({
  ...
}).on('modal:open', function(e, $handler) {
  console.log("opened by " + $handler.attr('id'));
}).on('modal:close', function(e, $handler) {
  console.log("closed by " + $handler.attr('id'));
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Em

const down  = $.Event('keydown', { keyCode: 40, which: 40})
const up    = $.Event('keydown', { keyCode: 38, which: 38})
const enter = $.Event('keydown', { keyCode: 13, which: 13})
const esc   = $.Event('keydown', { keyCode: 27, which: 27})

moduleForComponent('ember-inline-edit', 'Integration | Component | ember inline edit', {
  integration: true,

  beforeEach: function () {
    this.on('onSave', (val) => {
      this.set('value', val)
    })

    this.set('value', null)

    this.render(hbs`{{ember-inline-edit 
                          value=value 
                          onSave="onSave"}}`);
  }
});

test('it renders', function (assert) {
  assert.equal(this.$('.ember-inline-edit').length, 1)
})

test('the label is default', function (assert) {
  assert.equal(this.$('.ember-inline-edit').text().trim(), 'Not Provided')
})

test('on click, it shows the input and button', function (assert) {
  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)

  const editor = this.$('.ember-inline-edit')
  run(() => { editor.click() })

  assert.equal(this.$('.ember-inline-edit-input').length, 1)
  assert.equal(this.$('.ember-inline-edit-save').length, 1)
})

test('on save, it sends the save action', function (assert) {
  const editor = this.$('.ember-inline-edit')
  run(() => { editor.click() })

  const input = this.$('.ember-inline-edit-input')
  const save = this.$('.ember-inline-edit-save')

  run(() => {
    input.val('Something')
    input.trigger('input')
    save.click()
  })

  assert.equal(this.get('value'), 'Something')
})

test('on pressing enter, it sends the save action', function (assert) {
  const editor = this.$('.ember-inline-edit')
  run(() => { editor.click() })

  const input = this.$('.ember-inline-edit-input')
  const save = this.$('.ember-inline-edit-save')

  run(() => {
    input.val('Something')
    input.trigger('input')
    input.trigger(enter)    
  })

  assert.equal(this.get('value'), 'Something')
})
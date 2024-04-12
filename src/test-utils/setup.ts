// This is a workaround while JSDOM is implementing support for native <dialog> elements
// See: https://github.com/jsdom/jsdom/issues/3294
beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  })

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  })

  HTMLDialogElement.prototype.close = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = false;
  })
})
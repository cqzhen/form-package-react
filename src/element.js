class Element {
  constructor(data) {
    this.option = data;
  }

  get validNull() {
    if(!this.option.require) return true;
    if(this.option.value) return true;
    return false;
  }

  get isRegex() {
    if(!this.option.value) return true;
    if(!this.option.regex) return true;
    return this.option.regex.test(this.option.value);
  }

  getElement() {
    this.option.remindText = '';
    if (!this.validNull) this.option.remindText = this.option.nullText;
    if (!this.isRegex) this.option.remindText = this.option.regexText;
    return this.option;
  }
}

module.exports = Element;

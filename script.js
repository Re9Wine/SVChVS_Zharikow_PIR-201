import { keyboardFragment, keyboardKeys } from './keyboardLayout.js';

class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem('lang');
  }

  init() {
    this.wrapper = document.createElement('main');
    this.text = document.createElement('textarea');
    this.keyboard = document.createElement('div');
    this.language = document.createElement('p');

    this.wrapper.classList.add('wrapper');

    this.text.autofocus = true;
    this.text.classList.add('text');

    this.keyboard.classList.add('keyboard');

    this.language.classList.add('info');
    this.language.textContent = 'To switch ENG/РУС input methods, press Shift+Alt.';

    this.keyboard.appendChild(keyboardFragment);
    this.showLanguage(this.lang);

    this.wrapper.appendChild(this.text);
    this.wrapper.appendChild(this.keyboard);
    this.wrapper.appendChild(this.language);

    document.body.appendChild(this.wrapper);

    this.createListeners();
  }

  createListeners() {
    this.text.addEventListener('blur', () => {
        this.text.focus();
    });

    document.addEventListener('keydown', (e) => {
      e.stopImmediatePropagation();

      const key = document.getElementById(e.code);

      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.code === 'CapsLock' && !e.repeat) {
        e.preventDefault();
        this.caps = !this.caps;

        const addRemove = this.caps ? 'add' : 'remove';
        key.classList[addRemove]('active');

        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if (e.altKey && e.shiftKey && !e.repeat) {
          e.preventDefault();
          this.lang = this.lang === 'ru' ? 'en' : 'ru';
          localStorage.setItem('lang', this.lang);
          this.showLanguage(this.lang, e.shiftKey);
        } else if (!keyboardKeys[e.code].func) {
          e.preventDefault();
          this.insertText(key.textContent);
        } else if (e.key === 'Shift' && !e.repeat) {
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        } else if (e.code === 'Tab') {
          e.preventDefault();
          this.insertText('\t');
        } else if (e.code === 'Enter') {
          e.preventDefault();
          this.insertText('\n');
        } else if (e.code === 'Backspace') {
          e.preventDefault();
          this.pressBackspace();
        } else if (e.code === 'ArrowUp' && !e.isTrusted) {
          this.arrowUp();
        } else if (e.code === 'ArrowDown' && !e.isTrusted) {
          this.arrowDown();
        } else if (e.code === 'ArrowLeft' && !e.isTrusted) {
          this.arrowLeft();
        } else if (e.code === 'ArrowRight' && !e.isTrusted) {
          this.arrowRight();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      e.stopImmediatePropagation();

      const key = document.getElementById(e.code);
      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.code !== 'CapsLock') {
        key.classList.remove('active');
        if (e.key === 'Shift') {
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        }
      }
    });

    this.keyboard.addEventListener('click', (e) => {
      this.text.focus();
      const eventKeyDown = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code: e.target.id,
        view: window,
      });
      document.dispatchEvent(eventKeyDown);

      this.text.focus();
      const eventKeyUp = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        code: e.target.id,
        view: window,
      });
      document.dispatchEvent(eventKeyUp);
    });
  }

  arrowUp() {
    this.text.selectionStart = 0;
    this.text.selectionEnd = this.text.selectionStart;
  }

  arrowDown() {
    this.text.selectionEnd = this.text.textLength;
    this.text.selectionStart = this.text.selectionEnd;
  }

  arrowLeft() {
    this.text.selectionStart = Math.max(0, this.text.selectionStart - 1);
    this.text.selectionEnd = this.text.selectionStart;
  }

  arrowRight() {
    this.text.selectionStart = Math.min(
      this.text.textLength,
      this.text.selectionEnd + 1,
    );
    this.text.selectionEnd = this.text.selectionStart;
  }

  insertText(chars) {
    const cursorAt = this.text.selectionStart;

    this.text.value =
      this.text.value.slice(0, cursorAt) +
      chars +
      this.text.value.slice(this.text.selectionEnd);

    this.text.selectionStart = cursorAt + chars.length;
    this.text.selectionEnd = this.text.selectionStart;
  }
  
  pressBackspace() {
    if (this.text.selectionStart !== this.text.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = Math.max(0, this.text.selectionStart - 1);

      this.text.value =
        this.text.value.slice(0, cursorAt) +
        this.text.value.slice(this.text.selectionEnd);

      this.text.selectionStart = cursorAt;
      this.text.selectionEnd = this.text.selectionStart;
    }
  }

  showLanguage(lang, shift = false) {
    Array.from(this.keyboard.querySelectorAll('.keyboard__key')).forEach(
      (e) => {
        e.textContent = keyboardKeys[e.id][lang];
      },
    );

    this.switchCaps(shift);
  }

  switchCaps(shiftKey) {
    const showUpperCase = (this.caps && !shiftKey) || (!this.caps && shiftKey);
    const toCase = showUpperCase ? 'toUpperCase' : 'toLowerCase';
    Array.from(this.keyboard.querySelectorAll('.keyboard__key')).forEach(
      (e) => {
        if (!keyboardKeys[e.id].func) {
          if (e.id === 'Backquote' && this.lang === 'en') {
            e.textContent = shiftKey ? '~' : '`';
          } else if (e.id === 'Minus') {
            e.textContent = shiftKey ? '_' : '-';
          } else if (e.id === 'Equal') {
            e.textContent = shiftKey ? '+' : '=';
          } else if (e.id === 'BracketLeft' && this.lang === 'en') {
            e.textContent = shiftKey ? '{' : '[';
          } else if (e.id === 'BracketRight' && this.lang === 'en') {
            e.textContent = shiftKey ? '}' : ']';
          } else if (e.id === 'Backslash' && this.lang === 'en') {
            e.textContent = shiftKey ? '|' : '\\';
          } else if (e.id === 'Semicolon' && this.lang === 'en') {
            e.textContent = shiftKey ? ':' : ';';
          } else if (e.id === 'Quote' && this.lang === 'en') {
            e.textContent = shiftKey ? '"' : "'";
          } else if (e.id === 'Comma' && this.lang === 'en') {
            e.textContent = shiftKey ? '<' : ',';
          } else if (e.id === 'Period' && this.lang === 'en') {
            e.textContent = shiftKey ? '>' : '.';
          } else if (e.id === 'Slash' && this.lang === 'en') {
            e.textContent = shiftKey ? '?' : '/';
          } else if (e.id === 'Slash' && this.lang === 'ru') {
            e.textContent = shiftKey ? ',' : '.';
          } else {
            e.textContent = e.textContent[toCase]();
          }
        }
      },
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
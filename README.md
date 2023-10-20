# Console Vue Log

_A console.log for vue_

### Install

```shell
npm install @rodrive/console-vlog
```

### Usage

`file: src/main.js`

```js
import { createApp } from 'vue';
import App from './App.vue';
import consoleVlog from '@rodrive/console-vlog';

createApp(App).use(consoleVlog, {
  override: false,  // override console.log() [default: false]
}).mount('#app');
```

`file: components/foobar.vue`

```js
const foobar = ref('foo');
const reactiveObj = reactive({ bool: false });

console.vlog(foobar);
console.vlog(reactiveObj);

foobar.value = 'bar';
reactiveObj.bool = true;
```

### Console

```shell
Ref(0): http://localhost:5173/src/App.vue:13:9
   foo
Proxy(0): http://localhost:5173/src/App.vue:14:9
   {bool: false}
Ref(1): http://localhost:5173/src/App.vue:13:9
   bar
Proxy(1): http://localhost:5173/src/App.vue:14:9
   {bool: true}
```

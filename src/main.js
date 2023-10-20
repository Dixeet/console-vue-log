import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import consoleVlog from '../lib/console-vlog.js';

createApp(App).use(consoleVlog).mount('#app');

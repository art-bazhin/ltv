// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import Icon from 'element-ui/lib/icon';
import Button from 'element-ui/lib/button';
import InputNumber from 'element-ui/lib/input-number';
import Row from 'element-ui/lib/row';
import Col from 'element-ui/lib/col';
import Card from 'element-ui/lib/card';

import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/input-number.css';
import 'element-ui/lib/theme-chalk/row.css';
import 'element-ui/lib/theme-chalk/col.css';
import 'element-ui/lib/theme-chalk/card.css';

Vue.config.productionTip = false;
Vue.use(Icon);
Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Col);
Vue.use(Row);
Vue.use(Card);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});

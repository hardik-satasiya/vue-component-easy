// main.js
import Vue from 'vue'
import Comp from './component'
import Test from './components/test.vue'

Vue.config.delimiters = ['[[', ']]']

var parentData = {
	'test': 123,
	'name': 'hardik'
};

var parentVue = new Vue({
	el: 'body',
	data: parentData,
	ready() {
		console.log('main instance loaded.')
	},
	components: {
		'comp-app': Comp,
		'test': Test
	},
	methods: {

	}
});
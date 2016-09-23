import Vue from 'vue'

var comp = Vue.extend({
	data: function() {
	  return {
	    // Start with the same value as our
	    // first time entry. Hard-coded for now
	    // because we'll use a different approach
	    // in the next article anyway
	    'totalTime': 'working now i guess'
	  };
	},

	ready () {
		console.log('comp init.');
	},
	methods: {
	  // Increment the totalTime value based on the new
	  // time entry that is dispatched up
	  timeUpdate () {
	    console.log('12346');
	  },
	}
})

module.exports = comp;
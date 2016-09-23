<template>
  <div class="hero">
    Hello [[ message ]]
  </div>
</template>

<script>
test = {
	data: function() {
	  return {
	    // Start with the same value as our
	    // first time entry. Hard-coded for now
	    // because we'll use a different approach
	    // in the next article anyway
	    'message': 'hardik working now'
	  };
	},

	ready () {
		console.log('vue file loaded.');
	},
	methods: {

	}
}
module.exports = test;
</script>

<style scoped>
.hero {
  background: #eee;
  padding: 1em;
}
</style>
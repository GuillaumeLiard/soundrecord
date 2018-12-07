<template>
	<v-toolbar dark color="primary" fixed app>
		<v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
	</v-toolbar>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		toggleDrawer: function() {
			this.$store.commit('toggleDrawer')
		}
	}
}
</script>

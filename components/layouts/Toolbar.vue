<template>
	<v-toolbar dark color="primary" fixed app>
		<v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
	</v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		...mapMutations({
			toggleDrawer: 'toggleDrawer'
		})
	}
}
</script>

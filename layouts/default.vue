<template>
	<v-app>
		<Navigation/>
		<Toolbar :title="title"/>
		<v-content>
			<v-container fluid>
				<router-view>
					<nuxt/>
				</router-view>
			</v-container>
		</v-content>
		<v-footer app></v-footer>
	</v-app>
</template>

<script>
import Navigation from '~/components/layouts/Navigation.vue'
import Toolbar from '~/components/layouts/Toolbar.vue'
export default {
	components: {
		Toolbar,
		Navigation
	},
	computed: {
		title: function() {
			const { fullPath } = this.$route
			const pages = this.$store.getters['navigation/pages']
			const match = pages.filter(page => page.fullPath === fullPath)
			return match.length === 1 ? match[0].title : 'ee'
		}
	},
}
</script>

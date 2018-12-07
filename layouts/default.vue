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
			const { getPageTitleByFullPath } = this.$store.getters
			return getPageTitleByFullPath(this.$route.fullPath)
		}
	},
}
</script>

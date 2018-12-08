<template>
	<v-app>
		<NavigationLeft/>
		<NavigationTop :title="title"/>
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
import NavigationLeft from '~/components/navigation/left.vue'
import NavigationTop from '~/components/navigation/top.vue'

export default {
	components: {
		NavigationLeft,
		NavigationTop
	},
	computed: {
		title: function() {
			const { fullPath } = this.$route
			const pages = this.$store.getters['navigation/pages']
			const match = pages.filter(page => page.fullPath === fullPath)
			return match.length === 1 ? match[0].title : ''
		}
	},
}
</script>

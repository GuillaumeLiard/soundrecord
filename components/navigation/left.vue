<template>
	<v-navigation-drawer app clipped v-model="drawerModel">
		<v-list>
			<nuxt-link
				v-for="link in links"
				:key="link.title"
				:to="link.fullPath"
				exact>
				<v-list-tile>
					<v-list-tile-action>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ link.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</nuxt-link>
			<a id="github_link" href="https://github.com/GuillaumeLiard/soundrecord" target="_blank" rel="noopener">
				<img class="github_image" src="~/static/github-corner-right.svg">
				<span>Github</span>
			</a>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	computed: {
		drawerModel: {
			set(drawerState) {
				this.$store.commit('navigation/setDrawerState', drawerState)
			},
			get() {
				return this.$store.getters['navigation/drawer']
			}
		},
		links: function() {
			return this.$store.getters['navigation/pages']
		}
	}
}
</script>

<style media="screen">
a {

	display: block
}
.nuxt-link-active {
	opacity: 0.2;
	text-decoration: none;
}
.v-navigation-drawer {

	/* position: relative; */
}
#github_link {

	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
	right: 2em;
}
.github_image {
	width: 65px;
	height: auto;
}
</style>

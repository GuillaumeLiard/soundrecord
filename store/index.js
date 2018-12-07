export const state = function() {
	return {
		drawer: false,
		pages: [
			{
				url:'/',
				title: 'Kickstarter',
			},
			{ title: 'one', icon: 'dashboard', url: '/one' },
			{ title: 'two', icon: 'widgets', url: '/two' }
		],
		// links: [
		// 	{ title: 'one', icon: 'dashboard', url: '/one' },
		// 	{ title: 'two', icon: 'widgets', url: '/two' }
		// ]
	}
}

export const getters = {
	getPageTitle: function(state) {
		return function(payload) {
			const match = state.pages.filter(page => page.url === payload)
			return match ? match.length > 0 ? match[0].title : '' : ''
		}
	},
	drawer: function(state) {
		return state.drawer
	}
}

export const mutations = {
	toggleDrawer: function(state) {
		state.drawer = !state.drawer
	},
	setDrawerState: function(state, payload) {
		state.drawer = payload
	}
}

export const state = () => {
	return {
		drawer: false,
		pages: [
			{
				fullPath:'/',
				title: 'Kickstarter',
			},
			{
				fullPath: '/one' ,
				title: 'one',
				icon: 'dashboard'
			},
			{
				fullPath: '/two' ,
				title: 'two',
				icon: 'dashboard'
			}
		]
	}
}

export const getters = {
	getPageTitleByFullPath: function(state) {
		return function(payload) {
			const match = state.pages.filter(page => page.fullPath === payload)
			return match ? match.length > 0 ? match[0].title : '' : ''
		}
	},
	pages: function(state) {
		return state.pages
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

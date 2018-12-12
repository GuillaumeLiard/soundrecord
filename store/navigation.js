export const state = () => {
	return {
		drawer: false,
		pages: [
			{
				fullPath:'/',
				title: 'soundrecord',
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
			},
			{
				fullPath: '/three' ,
				title: 'Pitch detector',
				icon: 'dashboard'
			}
		]
	}
}

export const getters = {
	drawer: function(state) {
		return state.drawer
	},
	pages: function(state) {
		return state.pages
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

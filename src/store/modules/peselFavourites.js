
const peselFavourites = {
    namespaced: true,
    state: () => ({
        favourites: JSON.parse(localStorage.getItem('favourites-pesels') || '[]')
    }),
    mutations: {
        toggleFavourites (state, { pesel }) {
            const excludeIndex = state.favourites.indexOf(pesel);
            if (excludeIndex !== -1) {
                state.favourites.splice(excludeIndex, 1);
            } else {
                state.favourites.push(pesel);
            }
            localStorage.setItem('favourites-pesels', JSON.stringify(state.favourites))
        },
    },
    actions: {
        async toggleFavourites ({ commit }, payload) {
            commit('toggleFavourites', payload)
        }
    }
}

export default peselFavourites;
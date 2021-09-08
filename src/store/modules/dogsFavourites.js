
const favouritesStorageKey = 'favourite-dogs';

const dogsFavourites = {
    namespaced: true,
    state: () => ({
        favourites: JSON.parse(localStorage.getItem(favouritesStorageKey) || '[]') ?? []
    }),
    mutations: {
        toggleFavourites (state, { dog }) {
            const excludeIndex = state.favourites.indexOf(dog);
            if (excludeIndex !== -1) {
                state.favourites.splice(excludeIndex, 1);
            } else {
                state.favourites.push(dog);
            }
            localStorage.setItem(favouritesStorageKey, JSON.stringify(state.favourites))
        },
    },
    actions: {
        async toggleFavourites ({ commit }, payload) {
            commit('toggleFavourites', payload)
        }
    }
}

export default dogsFavourites;
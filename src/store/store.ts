import { createStore, Store } from 'vuex'

const store = createStore({
    state: {
        products: [],
        displayedProducts: [],
        selectedProductIndex: -1
    },
    mutations: {
        updateProducts(state, newProducts) {
            state.products = newProducts
        },
        updateDisplayedProducts(state, newDisplayedProducts) {
            state.displayedProducts = newDisplayedProducts;
        },
        updateSelectedProductIndex(state, index) {
            state.selectedProductIndex = index;
        }
    },
    actions: {
        initializeProducts({commit}, initialProducts: Array<object>) {
            commit('updateProducts', initialProducts)
            commit('updateDisplayedProducts', initialProducts.slice(0, 3))
            commit('updateSelectedProduct', -1)
        },
        setDisplayedProducts({commit}, newDisplayedProducts) {
            commit('updateDisplayedProducts', newDisplayedProducts);
        },
        setSelectedProductIndex({commit}, newIndex) {
            commit('updateSelectedProductIndex', newIndex)
        }
    }
});

export default store;
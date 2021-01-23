import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch(){
        const arr = [];
        if(localStorage.length>0){
            for(let i=0; i < localStorage.length; i++){
                if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
                    //JSON.parse - 오브젝트로 변형
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
            }
        } 
        return arr;
    }
}

export const store = new Vuex.Store({
    state:{
        todoItems: storage.fetch()
    },
    mutations:{
        addOneItem(state, payload){
            const obj = {completed: false, item: payload};
            localStorage.setItem(payload, JSON.stringify(obj));
            state.todoItems.push(obj)
        },
        removeOneItem(state, payload){
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload){
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
        },
        clearAllItems(state){
            localStorage.clear();
            state.todoItems = [];
        }
    }
});
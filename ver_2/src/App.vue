<template>
  <div id="app">
    <TodoHeader/>
    <TodoInput @addTodoItem="addOneItem"/>
    <TodoList :propsData="todoItems" @removeItem="removeOneItem" @toggleItem="toggleOneItem"/>
    <TodoFooter @clearAll="clearAllItems"/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
export default {
  name: 'App',
  data(){
    return{
        todoItems:[],
    }
  },
  methods:{
    addOneItem(todoItem){
       const obj = {completed: false, item: todoItem};
        //localStorage.setItem('key','value');
        localStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj)
    },
    removeOneItem(todoItem, index){
      localStorage.removeItem(todoItem.item); // 로컬에서 아이템 지우기
      this.todoItems.splice(index, 1); // 화면단에서도 아이템 지우기
    },
    toggleOneItem(todoItem, index){
      this.todoItems[index].completed = !this.todoItems[index].completed
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    clearAllItems(){
       localStorage.clear();
       this.todoItems = [];
    }
  },
  created(){ // 인스턴스가 생성된 즉시 실행되는 함수
    if(localStorage.length>0){
        for(let i=0; i < localStorage.length; i++){
            if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
                //JSON.parse - 오브젝트로 변형
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
    } 
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  }
}
</script>
<style>
body{
  text-align: center;
  background: #f6f6f6;
}
input{
  border-style: groove;
  width: 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}

</style>
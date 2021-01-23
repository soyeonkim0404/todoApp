<template>
  <div>
      <ul>
            <li v-for="(todoItem, index) in todoItems" :key="todoItem.item" class="shadow">
                <i 
                    class="fas fa-check checkBtn" 
                    :class="{checkBtnCompleted:todoItem.completed}" 
                    @click="toggleComplete(todoItem,index)"
                >
                </i>
                <span :class="{textCompleted:todoItem.completed}">{{todoItem.item}}</span>
                <span class="removeBtn" @click="removeTodo(todoItem, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            todoItems:[],
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
    methods:{
        removeTodo(todoItem, index){
           // console.log(todoItem, index);
            localStorage.removeItem(todoItem);
            this.todoItems.splice(index, 1)
        },
        toggleComplete(todoItem, index){
            todoItem.completed = !todoItem.completed;
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
        }
    }
}
</script>

<style scoped>
ul{
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    text-align: left;
}
li{
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: #fff;
    border-radius: 5px;
}
.checkBtn{
    line-height: 45px;
    color:#62acde;
    margin-right: 5px;
}
.checkBtnCompleted{
    color:#b3adad;
}
.textCompleted{
    text-decoration: line-through;
}
.removeBtn{
    margin-left: auto;
    color:red;
}
</style>
<template>
  <div class="inputBox shadow">
      <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
      <span class="addContainer" @click="addTodo">
          <i class="fas fa-plus addBtn"></i>
      </span>
  </div>
</template>

<script>
export default {
    data(){
        return{
            newTodoItem:'',
        }
    },
    methods:{
        addTodo(){
            if(this.newTodoItem !== ''){
                var obj = {
                    completed: false, 
                    item: this.newTodoItem
                    };
                //localStorage.setItem('key','value');
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
                this.newTodoItem = '';
            }
        }
    }
}
</script> 

<style scoped>
input:focus{
    outline: none;
}
.inputBox{
    background: #fff;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input{
    width: calc(100% - 3rem);
    height: 100%;
    padding: 5px 5px 5px 20px;
    font-size: 1rem;
    border-style: none;
    box-sizing: border-box;
}
.addContainer{
    float: right;
    background: linear-gradient(to right, #6478fb, #8763fb);
    display: block;
    width:3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn{
    color: #fff;
    vertical-align: middle;
}
</style>
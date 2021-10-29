import { useState, useEffect } from "react";
import { ulid } from "ulid"
import * as todoData from "../apis/todos"

// useTodoカスタムフックを作成(外部で利用可能にするためexportする)
export const useTodo = () => {

  const [todoList, setTodoList] = useState([])
  
  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse())
    })
  }, [])

  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id)
    const newTodoItem = {...todoItem, done: !done}
    todoData.updateTodoData(id, newTodoItem).then((updateTodo) => {
      const newTodoList = todoList.map((item) =>
        item.id !== updateTodo.id ? item : updateTodo
      )
      setTodoList(newTodoList)
    })
  }

  // 新規TODOを追加する
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false
    }
    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList])
    })
  }

  // TODOを削除する
  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemId
      )
      setTodoList(newTodoList)
    })
  }

  // 作成した関数を返す
  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem
  }

}
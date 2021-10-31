import axios from "axios"
// モックサーバーURL
const todoDataUrl = "http://localhost:3100/todos"

// axios.get() 全てのデータを取得
export const getAllTodosData = async() => {
  const response = await axios.get(todoDataUrl)
  return response.data
}

// axios.post() 新規TODO追加
export const addTodoData = async(todo) => {
  const response = await axios.post(todoDataUrl, todo)
  return response.data
}

// axios.delete() 一致したidのTODOを削除
export const deleteTodoData = async(id) => {
  await axios.delete(`${todoDataUrl}/${id}`)
  return id
}

// axios.put() 一致したidのTODOを更新
export const updateTodoData = async(id, todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo)
  return response.data
}
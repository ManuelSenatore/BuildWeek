export interface Post {
  id: number
  autore: number
  title: string
  body: string
}
export interface comments {
  id: number
  idPost: number
  idUser: number
  body: string
}
export interface user{
  id: number
  username: string
  email: string
  password: string
  name: string
  age: number
}

<h1>:orthodox_cross: :orthodox_cross: todoIT API :orthodox_cross: :orthodox_cross:</h1>

---

<h2>Register</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/auth/register

**Method** : post

**Body** : {
"email": SOME EMAIL,
"password": SOME PASSWORD,
"name": SOME NAME
}

**Password** must be not less 6 symbol and not more 12 symbols

---

<h2>Login</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/auth/login

**Method** : post

**Body** : {
"email": SOME EMAIL,
"password": SOME PASSWORD
}

**Return** Token , UserId , Todo

---

<h2>Get all Todo</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/todo/

**Method** : get

**headers** : { 'Authorization': 'Bearer ' + Token }

**Return** { message: ""Good", todo: [ AllTodo ] }

---

<h2>Add Todo</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/todo/

**Method** : post

**headers** : { 'Authorization': 'Bearer ' + Token }

**Body** : { title: Todo Title , important: "not important"}

**Return** { message: "Good", todo: [ AllTodo ] }

---

<h2>Update Todo</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/todo/

**Method** : patch

**headers** : { 'Authorization': 'Bearer ' + Token }

**Body** : { id: Todo Id, title: Todo Title }

**Return** : { message: ""Good", todo: [ Todo ] }

---

<h2>Delete Todo</h2>

**Route** : https://intense-peak-83437.herokuapp.com/api/todo/

**Method** : delete

**Headers** : { 'Authorization': 'Bearer ' + Token }

**Body** : { id: Todo Id }

**Return** : { message: "To do delete", todo: Todo }

---

Have fun :-)

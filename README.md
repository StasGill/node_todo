# node_todo api

---

Register route : https://intense-peak-83437.herokuapp.com/api/auth/register

Method : post

Body : {
"email": <SOME EMAIL>,
"password":<SOME PASSWORD>
}

Password must be not less 6 simbols and not more 12 simbols

---

Login route : https://intense-peak-83437.herokuapp.com/api/auth/login

Method : post

Body : {
"email": <SOME EMAIL>,
"password":<SOME PASSWORD>
}

Return Token

---

---

Get all Todo : https://intense-peak-83437.herokuapp.com/api/todo/

Method : get

header : {
Token : <Token>
}

Return { message: ""Good", todo: [ <Alltodo> ] }

---

Add Todo : https://intense-peak-83437.herokuapp.com/api/todo/

Method : post

header : {
Token : <Token>
}
Body : {
title: <Todo Title>
}

Return { message: ""Good", todo: [ <Alltodo> ] }

---

Add Todo : https://intense-peak-83437.herokuapp.com/api/todo/

Method : patch

header : {
Token : <Token>
}
Body : {
id: <Todo Id>
title: <Todo Title>
}

Return { message: ""Good", todo: [ <Todo> ] }

---

Delete Todo : https://intense-peak-83437.herokuapp.com/api/todo/

Method : delete

header : {
Token : <Token>
}
Body : {
id: <Todo Id>
}

Return { message: "To do delete", todo: <Todo> }

---

Have fun :-)

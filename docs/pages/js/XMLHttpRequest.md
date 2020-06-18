原生JS实现Ajax

1. get
```javascript
function getAjax() {
  var xhr = new XMLHttpRequest()
  xhr.open('get', '/api/getStatus?name=myName&age=18')
  xhr.send()
  xhr.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      return ajax.responseText()
    }
  }  
}

```

2. post
```javascript
function postAjax() {
  var xhr = new XMLHttpRequest()
  xhr.setRequestHeader('Content-type', 'application/x-ww-form-urlencoded')
  xhr.open('post', '/api/getStatus')
  xhr.send('name=myName&age=18')
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      return xhr.responeText()
    }
  }
}
```  




#### 
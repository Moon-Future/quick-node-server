document.getElementById('get').addEventListener('click', function() {
  axios.get('http://127.0.0.1:3000/api/test1/getData', {
    params: {get: 'node-server'}
  }).then(function(res){
    console.log(res)
  });
  /*
    若还有跨域问题，使用以下方式请求
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/api/test1/getData',
      params: {
        project: 'node-server'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(function(res){
      console.log(res)
    });
  */
})

document.getElementById('post').addEventListener('click', function() {
  axios.post('http://127.0.0.1:3000/api/test2/postData', {
    post: 'node-server'
  }).then(function(res){
    console.log(res)
  });
})

document.getElementById('database').addEventListener('click', function() {
  axios.post('http://127.0.0.1:3000/api/test1/login', {
    email: '666@gamil.com',
    password: '666'
  }).then(function(res){
    console.log(res)
    const data = res.data
    alert(data.message)
  });
})
// promise封装ajax异步请求
function ajax(method, url, data) {
    let xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
    if (method == "get") {
        xhr.open(method, url + "?" + data, true);
        xhr.send();
    } else {
        xhr.open(method, url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    return new Promise((resolve, reject)=> {
        xhr.onreadystatechange = ()=> {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					try {
						var response = JSON.parse(XHR.responseText);
						resolve(response);
					} catch (e) {
						reject(e);
					}
				}else {
                    reject(new Error("Request was unsuccessful: " + XHR.status))
                }
            }
        }
    })
}
//JSON.stringify() 转化为json字符串（序列化）
//JSON.parse() 转化为json对象（反序列化）
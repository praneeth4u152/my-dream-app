import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message:string){ }
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('pranu:pranu')
  })
};


@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:9000/hello-world-bean',httpOptions);
   
  }
  

  executeHelloWorldServiceWithPathVariable(name)  {
     let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

     let headers = new HttpHeaders({
         Authorization: basicAuthHeaderString
       })

       headers.append("Access-Control-Request-Headers","content-type");
//console.log(name);
    return this.http.get<HelloWorldBean>(
      `http://localhost:9000/hello-world/path-variable/${name}`,httpOptions
      );
   
  }

   createBasicAuthenticationHttpHeader() {
     let username = 'pranu'
     let password = 'pranu'
     let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
     return basicAuthHeaderString;
   }
  //Access to XMLHttpRequest at 
  //'http://localhost:9000/hello-world/path-variable/in28minutes' 
  //from origin 'http://localhost:4200' has been blocked by CORS policy: 
  //No 'Access-Control-Allow-Origin' header is present on the requested resource.

  //Access to XMLHttpRequest at 'http://localhost:9000/hello-world/path-variable/in28minutes' from origin 'http://localhost:4200' 
  //has been blocked by CORS policy: 
  //Response to preflight request doesn't pass 
  //access control check: It does not have HTTP ok status
}

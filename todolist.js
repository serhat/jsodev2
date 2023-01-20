
let todos=[]
/*element eklemeyi sağlayan bir fonksiyon */
function newElement(e){
    let inputtask=document.querySelector("#task").value.trim()//input kutusundaki girilen değeri etrafındaki boşlukları trimle atıp alıyor
   
    let li=document.createElement("li")//li etiketi oluşturuyor
    let i=document.createElement("i")
    i.className="fa-regular fa-circle-xmark float-right p-2"
    if(inputtask==""){/*Listeye boş karakter eklenemiyor. Bununla birlikte hiçbir şey yazılmadığında da aynı hatayı veriyor */
       
        $('.error').toast('show')
    }
    else{
      
        let textNode=document.createTextNode(inputtask)//Bir metin düğümü oluşturuyor
        
        li.appendChild(textNode)
        li.appendChild(i)
        let newlitext=document.querySelector("#list").appendChild(li)

        addlocal(inputtask)

       
        $('.success').toast('show')
    
        document.querySelector("#task").value=""
        
    }



}
function addlocal(n) {//localstroge ekleme
    controllocal()
    todos.push(n)
    localStorage.setItem("todos",JSON.stringify(todos))
}

document.addEventListener("DOMContentLoaded",loaded)

function loaded() {
    controllocal()
    todos.forEach(function (inputtask) {
        let li=document.createElement("li")//li etiketi oluşturuyor
        let i=document.createElement("i")
        i.className="fa-regular fa-circle-xmark float-right p-2"
        let textNode=document.createTextNode(inputtask)//Bir metin düğümü oluşturuyor
        
        li.appendChild(textNode)
        li.appendChild(i)
        let newlitext=document.querySelector("#list").appendChild(li)

    })
}





document.addEventListener("click",removeUI)
/*element silmeyi sağlayan bir fonksiyon */
function removeUI(e){
  
if (e.target.className==="fa-regular fa-circle-xmark float-right p-2") {
    let todo=e.target.parentElement//arayüzden silme
    todo.remove()
   
    localremove(todo.textContent)
    
    console.log(todo.textContent)
}
}

function localremove(e) {//localstroge silme
    controllocal()
    todos.forEach(function (todo,index) {
       
        if (e===todo) {
            todos.splice(index,1)  
        }
     
         
        
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}





function controllocal() {//localstroge kontrol etme
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    
}

/*yapıldı işaretlenmesini sağlayan bir fonksiyon */

let listItems = document.querySelectorAll("#list") 
listItems.forEach(event => event.addEventListener('click', function onClick(event) {
    
    if (event.target.innerHTML.includes("✓ ")) {     
 
        event.target.style.textDecoration = ""
        event.target.style.backgroundColor = ""
        event.target.style.color = ""
        event.target.innerHTML = event.target.innerHTML.replace("✓ ", "")   
    
    }
    else  { 
   
        if (event.target.className!="fa-regular fa-circle-xmark float-right p-2") {
            event.target.innerHTML = "✓ " + event.target.innerHTML
            event.target.style.textDecoration = "line-through"
            event.target.style.backgroundColor = "darkblue"
            event.target.style.color = "white"

           
        } 
        

    }

   
    
}))




const dialogNewBook=document.querySelector(".newbookdialog");
const newBookButton=document.querySelector('.newbookbutton');
const submitButton=document.querySelector('#submit');
const formElements=document.querySelectorAll('input');
const cancelButton=document.querySelector('#cancel');
const libCont=document.querySelector('.lib-cont');

let library=new Array();
function Book(...arr) {
    this.author=arr[0].value?arr[0].value:'unknown';
    this.title=arr[1].value;
    this.pages=arr[2].value?arr[2].value:'unknown';
    this.read=arr[3].checked;
}
function addBook(newbook){
    let bookcell=document.createElement('div');
    bookcell.setAttribute('class','bookcell');
    let x=[];
    x[0]=document.createElement('div');
    x[0].textContent='Author: '+newbook.author;
    x[1]=document.createElement('div');
    x[1].textContent='Title: '+newbook.title;
    x[2]=document.createElement('div');
    x[2].textContent='No. of pages: '+newbook.pages;
    x[3]=document.createElement('button');
    x[3].textContent=newbook.read?'Read':'Not Read';
    x[3].setAttribute('class','togglebutton');
    x[3].addEventListener('click',(e)=>{
        x[3].textContent=(x[3].textContent=='Read')?'Not Read':'Read';
    });
    x[4]=document.createElement('button');
    x[4].textContent='Delete';
    x[4].setAttribute('class','deletebutton');
    x[4].addEventListener('click',(e)=>{
        x[4].parentElement.parentElement.removeChild(x[4].parentElement);
        x[4].removeEventListener('click',()=>{});
        x[3].removeEventListener('click',()=>{});
        let index=library.find(q=>{
            q.author==x[1].textContent;
        });
        library.splice(index,1);
    });
    for(let i=0;i<5;i++) {
        bookcell.appendChild(x[i]);
    }
    libCont.appendChild(bookcell);
}
function clearContent(){
    formElements.forEach(x=>{
        x.value=null;
    });
    formElements[3].checked=false;
}


newBookButton.addEventListener('click',(e)=>{
    
    dialogNewBook.showModal();
    clearContent();
});
let newbook;

submitButton.addEventListener('click',(e)=>{
    
    if(formElements[1].value==null||formElements[1].value=='') {
        alert('Please enter a title for your book');
    } 
    else {
        newbook=new Book(...formElements);
        library.push(newbook);
        addBook(newbook);
        dialogNewBook.close();
    }
});
cancelButton.addEventListener('click',(e)=>{
    dialogNewBook.close();
});

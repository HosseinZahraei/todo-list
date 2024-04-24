document.addEventListener('DOMContentLoaded',()=>{
    
    const inputBtn = document.getElementById('inputBtn');
    const input = document.getElementById('input');
    // let trashList;
    let localStorageLength = localStorage.length;
    let date = new Date();
    // تابع به روز کردن و ایجاد لیست تودوز و گرفتن اطلاعات از لوکال استوریج
    const list = document.getElementById('todoListUl');
    async function createList(){
        list.innerHTML = ''
        localStorageLength = localStorage.length
        const localStorageKeys = Object.keys(localStorage)
        for (let i = 0; i < localStorageKeys.length; i++){
            key = localStorageKeys.sort()[i]
            const li = document.createElement('li')
            li.setAttribute('id',`${key}`)
            async  function liInnerHtml(){
                li.innerHTML = `
                <span  ${(localStorage.getItem(`${key}`).split(',').length == 1)?  `class='spanText'`:`class='spanText checked'`}>${localStorage.getItem(`${key}`).split(',')[0]}</span>
                <div class="liIcons">
                <span>${createTime(key.split('-')[1])}</span>
                <i class="fa-regular fa-circle-check"></i>
                <i class="fa-solid fa-rotate-left"></i>
                <i class="fa-regular fa-trash-can"></i>
                </div>
                `
            }
            liInnerHtml().then( 
                list.appendChild(li)

            )
        }
        // localStorageKeys.forEach(key => {
            
        // });

    }
    function createTime(milisecons){
        const date = new Date(parseInt(`${milisecons}`))
        const option = {
            year:'numeric',
            month: 'numeric',
            day:'numeric',
            hour:'numeric',
            minute:'numeric',
            second:'numeric'
        }
        return(`${date.toLocaleDateString('fa-IR',option)}`)
    }
    function updateList(){
        const trashList = (document.getElementsByClassName('fa-trash-can'));
        const checkList = document.getElementsByClassName('fa-circle-check');
        const rotateList = document.getElementsByClassName('fa-rotate-left');
        // حذف تکی کار ها با زدن روی ایکون سطل 
        for (const trashBtn of trashList) {
            trashBtn.addEventListener('click',(event)=>{
                const target = event.target.parentElement.parentElement
                const targetId = (target.id)
                localStorage.removeItem(targetId)
                target.outerHTML =''

            })
        }
        // تیک زدن کار ها

        for (const checkBtn of checkList) {
            checkBtn.addEventListener('click',(event)=>{
                const target = event.target.parentElement.parentElement
                const targetId = (target.id)
                const targetSpan = event.target.parentElement.parentElement.firstElementChild
                targetSpan.setAttribute('class','spanText checked')
                localStorage.setItem(targetId,`${targetSpan.innerText},checked`)

            })
        }
        // برداشتن تیک کار ها
        for (const rotateBtn of rotateList) {
            rotateBtn.addEventListener('click',(event)=>{
                const target = event.target.parentElement.parentElement
                const targetId = (target.id)
                const targetSpan = event.target.parentElement.parentElement.firstElementChild
                targetSpan.setAttribute('class','spanText')
                localStorage.setItem(targetId,`${targetSpan.innerText}`)

            })
        }
    }
    createList().then(updateList());
    
    // حذف لیست با زدن وی دکمه حذف لیست
    let eraseBtn = document.getElementById('listEraseBtn');
    eraseBtn.addEventListener('click',()=>{
        localStorage.clear()
        list.innerHTML = ''
    })
    // تابع اضاف کردن متن داخل اینتپوت به لیست 
    function inputFunc(e,date,input,localStorage){
        if (e.key==='Enter' || e.type ==='click' ){
            date = new Date()
            const inputValue = input.value
            if (inputValue != ''){
                localStorageLength = localStorage.length;
                input.value = ''
                localStorage.setItem(`li-${date.getTime()}`,inputValue)
                createList()
            }
            updateList()
        }
    }
    input.addEventListener('keypress',(e)=>{inputFunc(e,date,input,localStorage)});
    document.addEventListener('contextmenu',(e)=>{e.preventDefault()})
    inputBtn.addEventListener('click',(e)=>{inputFunc(e,date,input,localStorage)});
});

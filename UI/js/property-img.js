//helpers 

//shorthand for querySelector function
function $(str){ return document.querySelector(str) }
//shorthand for querySelectorAll function
function $$(str){ return document.querySelectorAll(str) }

const containerList = [...$$('#product-viewer--main .thumbnail-container')],
      imgList = containerList.map(container => container.firstElementChild),
      productImg = $('#product-viewer--main img[name="product-img"]'),
      btnLeft = $('#paginator--main .button[name="left-button"]'),
      btnRight = $('#paginator--main .button[name="right-button"]'),
      pageViewer = $('#paginator--main .badge')

let index = 0,
    currentPos = 1,
    length = imgList.length,
    selectedImg = imgList[index],
    src = selectedImg.getAttribute('src'),
    alt = selectedImg.getAttribute('alt')

containerList.forEach((container, index) =>
{
   container.addEventListener('mouseenter', handler)
   container.addEventListener('mouseleave', handler)
   container.addEventListener('click', handler)
   
   container.setAttribute('data-index', index)
})

btnLeft.addEventListener('click', prev)
btnRight.addEventListener('click', next)

productImg.setAttribute('src', src)
productImg.setAttribute('alt', alt)
selectedImg.parentElement.classList.add('is-active')
pageViewer.textContent = `${currentPos} / ${length}`

function handler(e)
{
   if(!e) e = window.event //For IE
   
   let ct = e.currentTarget,
       targetHasActiveClass = /is-active/g.test(ct.classList.value)
   
   switch(e.type)
   {
      case 'mouseenter':
         
         if(targetHasActiveClass) break
         let _src = ct.firstElementChild.getAttribute('src')
         productImg.setAttribute('src', _src)
         break
         
      case 'mouseleave':
         
         if(targetHasActiveClass) break
         
         productImg.setAttribute('src', src)
         break
         
      case 'click':        
         
         if(targetHasActiveClass) break
         
         index = parseInt(ct.dataset.index)
         currentPos = index + 1
         
         if(currentPos === 1)
         {
            btnLeft.setAttribute('disabled', 'disabled')
            btnRight.removeAttribute('disabled')   
         }
         else if(currentPos > 1)
         {
            btnLeft.removeAttribute('disabled')   
         }
         else if(currentPos < length)
         {
            btnRight.removeAttribute('disabled')
         }
         else if(currentPos === length)
         {   
            btnRight.setAttribute('disabled', 'disabled')
            btnLeft.removeAttribute('disabled')  
         }
         
         selectedImg.parentElement.classList.remove('is-active')
         selectedImg = imgList[index]
         src = selectedImg.getAttribute('src')
         productImg.setAttribute('src', src)
         selectedImg.parentElement.classList.add('is-active')
         pageViewer.textContent = `${currentPos} / ${length}`
         break
   } 
}

function next(e)
{
   if(!e) window.event //For IE
   
   currentPos++
   
   if(currentPos === length)
   {
      btnRight.setAttribute('disabled', 'disabled')
      btnLeft.removeAttribute('disabled')
   }
   else if(currentPos === 2)
   { 
      btnLeft.removeAttribute('disabled')
   }
   
   index++
   
   selectedImg.parentElement.classList.remove('is-active')
   selectedImg = imgList[index]
   src = selectedImg.getAttribute('src')
   productImg.setAttribute('src', src)
   selectedImg.parentElement.classList.add('is-active')
   pageViewer.textContent = `${currentPos} / ${length}`
}

function prev(e)
{
   if(!e) window.event //For IE
   
   currentPos--
   
   if(currentPos === 1)
   {
      btnLeft.setAttribute('disabled', 'disabled')
      btnRight.removeAttribute('disabled')
   }
   else if(currentPos === length - 1)
   { 
      btnRight.removeAttribute('disabled')
   }
   
   index--
   
   selectedImg.parentElement.classList.remove('is-active')
   selectedImg = imgList[index]
   src = selectedImg.getAttribute('src')
   productImg.setAttribute('src', src)
   selectedImg.parentElement.classList.add('is-active')
   pageViewer.textContent = `${currentPos} / ${length}`
}
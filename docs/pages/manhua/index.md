# manhua

<div class="content">
    <!-- <div class="item">
      <h4>风起苍岚/第2季7话</h4>
      <ul>
        <li>
          <img src="https://mhpic.dm300.com/comic/F/风起苍岚/第2季7话F0_239096/2.jpg-mht.low.webp" />
        </li>
      </ul> -->
    </div>
  </di>
  <script>
    window.onload = function() {
      const title = '风起苍岚'
      const urls = [
        '第2季7话F0_239096',
        '第2季8话F0_240006',
        '第2季9话F0_240435',
        '第2季12话F0_242855',
        '第2季13话F0_243759',
        '第2季14话F0_244673',
        '第2季15话F0_245662',
        '第2季16话F0_246658',
        '第2季17话F0_247588',
        '第2季18话F0_249977',
        '第2季19话F0_251749',
        '第2季20话F0_254190',
        '第2季21话F0_257229',
        '第2季22话F0_258795',
        '第2季23话F0_258990',
        '第2季24话F0_260339',
        '第2季25话F0_262601',
        '第2季26话F2_263653',
        '第2季27话F1_264606',
        '第2季28话F0_266007'
      ]
      const oContent = document.getElementsByClassName('content')[0]

      for (let i = 0; i < urls.length; i++) {
        const curr = urls[i]
        const oDiv = document.createElement('div')
        oDiv.className = 'item'
        const oTitle = document.createElement('h4')
        oTitle.innerHTML = curr.split('_')[0]
        oDiv.appendChild(oTitle)
        
        const oUl = document.createElement('ul')
        for (let j = 1; j < 50; j++) {
          const oLi = document.createElement('li')
          const oImg = document.createElement('img')
          oImg.src = `https://mhpic.dm300.com/comic/F/风起苍岚/${curr}/${j}.jpg-mht.low.webp`
          oLi.appendChild(oImg)
          oUl.appendChild(woLi)
        }
        oDiv.appendChild(oUl)
    
        oContent.appendChild(oDiv)
      }
    }
  </script>
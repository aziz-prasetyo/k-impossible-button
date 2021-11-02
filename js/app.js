const body = document.querySelector('body')
const preloader = document.getElementById('preloader')
const glass = document.querySelectorAll('.glass')
const inp = document.querySelectorAll('.inp')
const yes = document.getElementById('yes')
const no = document.getElementById('no')

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hide')
  }, 2000)
})

window.onbeforeunload = function(event) {
  return '';
};

inp.forEach(inp => {
  inp.setAttribute('onfocusin', 'inpFocIn(this)');
  inp.setAttribute('onfocusout', 'inpFocOut(this)');
})

const inpFocIn = e => {
  e.classList.add('focus')
}

const inpFocOut = e => {
  e.classList.remove('focus')
}

const bool = document.getElementById('bool')
const boolSpan = bool.querySelector('span')
const ind = document.getElementById('ind')
const indText = ind.querySelectorAll('.first')

let boolTemp = false
function boolVal() {
  bool.style.pointerEvents = 'none'
  if(!boolTemp) {
    boolTemp = true
    bool.classList.add('true')
    boolSpan.classList.add('true')
    
    ind.children[0].style.transform = 'translateY(-32px)'
    ind.children[1].style.transform = 'translateY(-32px)'
    ind.children[1].style.opacity = '1'
  } else {
    boolTemp = false
    bool.classList.remove('true')
    boolSpan.classList.remove('true')
    
    ind.children[0].style.transform = 'translateY(0)'
    ind.children[1].style.transform = 'translateY(-64px)'
    ind.children[0].style.opacity = '1'
  }
  
  setTimeout(() => {
    ind.children[0].style.opacity = boolTemp ? '0' : '1'
    ind.children[1].style.opacity = boolTemp ? '1' : '0'
    ind.children[0].style.transform = boolTemp ? 'translateY(32px)' : 'translateY(0)'
    ind.children[1].style.transform = boolTemp ? 'translateY(-32px)' : 'translateY(0)'
  }, 300)

  setTimeout(() => {
    bool.style.pointerEvents = 'auto'
  }, 450)
  return boolTemp
}

const x = 3
const y = 3
let xTemp = 1
let yTemp = 1
function yesAns() {
  
  do{
    xRand = Math.floor(Math.random() * x) + 1
    yRand = Math.floor(Math.random() * y) + 1
  } while(((xRand === xTemp) && (yRand === yTemp)) || ((xRand === 3) && (yRand === 1)))

  yes.style.gridColumnStart = `${xRand}`
  yes.style.gridRowStart = `${yRand}`
  xTemp = xRand
  yTemp = yRand
}

function noAns() {
  do{
    xRand = Math.floor(Math.random() * x) + 1
    yRand = Math.floor(Math.random() * y) + 1
  } while(((xRand === xTemp) && (yRand === yTemp)) || ((xRand === 1) && (yRand === 1)))

  no.style.gridColumnStart = `${xRand}`
  no.style.gridRowStart = `${yRand}`
  xTemp = xRand
  yTemp = yRand
}

const resGlass = () => {
  const main = document.querySelector('.main')
  const result = document.querySelector('.result')
  const wait = document.getElementById('wait')
  wait.style.display = 'flex'
  glass.forEach((e) => {
    e.style.pointerEvents = 'none'
  })
  body.style.cursor = 'no-drop'
  setTimeout(() => {
    glass.forEach((e) => {
      e.style.pointerEvents = 'auto'
    })
    body.style.cursor = 'auto'
    main.classList.add('hide')
    result.classList.remove('pre')
  }, 3000);
}

inpAns = (boolTemp) => {
  if(!boolTemp) {
    no.addEventListener('mouseover', noAns)
    yes.addEventListener('click', resGlass)
  } else{
    yes.addEventListener('mouseover', yesAns)
    no.addEventListener('click', resGlass)
  }
}

bool.addEventListener('click', boolVal)

const btnBox = document.querySelector('.btn-box')
const btn = document.querySelectorAll('.btn')

btn.forEach(btn => {
  btn.setAttribute('onclick', 'focusIn(this)')
})

const focusIn = (e) => {
  e.classList.add('focus')
}

const mainGlass = () => {
  const main = document.querySelector('.main')
  const setting = document.querySelector('.setting')
  main.classList.remove('pre')
  setting.classList.add('hide')
}

const inpQue = (q) => {
  const queText = document.querySelector('.que-box p')
  queText.textContent = q
}

const inpHead = (h) => {
  const headText = document.querySelector('.result h2')
  headText.textContent = h
}

const inpNote = (n) => {
  const noteText = document.querySelector('.result .note-box p')
  noteText.textContent = n
}

const inpCre = (c) => {
  const cre = document.getElementById('cre')
  cre.textContent = c
}

const ques = document.getElementById('question')
const head = document.getElementById('header')
const note = document.getElementById('note')
const creator = document.getElementById('creator')
const inputCheck = () => {
  let qVal = ques.value
  let hVal = head.value
  let nVal = note.value
  let cVal = creator.value
  if((!qVal || !hVal) || (!nVal || !cVal)) {
    return true
  } else {
    inpQue(qVal)
    inpHead(hVal)
    inpNote(nVal)
    inpCre(cVal)
    return false
  }
}

const save = document.getElementById('save')
const notif = document.querySelector('.notif')

save.addEventListener('click', () => {
  inp.forEach(inp => {
    if(inp.value) return inp.classList.remove('err')
    return inp.classList.add('err')
  })

  if(inputCheck()) {
    notif.style.display = 'block'
    save.classList.remove('focus')
    body.style.cursor = 'auto'
    glass.forEach((e) => {
      e.style.pointerEvents = 'auto'
    })
  } else {
    notif.style.display = 'none'
    inpAns(boolTemp)
    mainGlass()
  }
})
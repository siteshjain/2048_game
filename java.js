
// document.addEventListener('DOMContentLoaded',()=>{

// })

const width=4;
const matrix=document.querySelector('.matrix');
const score=document.getElementById('score');
const res=document.querySelector('.gameover');
const bset=document.getElementById('best');
let allSquares=[];
let score1=0
let hivalue
let high_score=localStorage.getItem("high_score");
if(high_score===null)
{
    hivalue=0;
    localStorage.setItem("high_score",JSON.stringify(hivalue))

}else{
    hivalue=JSON.parse(high_score);
    bset.innerHTML=high_score;

}

const color=()=>{
    for(let i=0;i<allSquares.length;i++)
    {
        if (allSquares[i].innerHTML == 0) allSquares[i].style.backgroundColor = '#afa192'
        else if (allSquares[i].innerHTML == 2) allSquares[i].style.backgroundColor = '#eee4da'
        else if (allSquares[i].innerHTML  == 4) allSquares[i].style.backgroundColor = '#eee1c9' 
        else if (allSquares[i].innerHTML  == 8) allSquares[i].style.backgroundColor = '#f3b27a' 
        else if (allSquares[i].innerHTML  == 16) allSquares[i].style.backgroundColor = '#f69664' 
        else if (allSquares[i].innerHTML  == 32) allSquares[i].style.backgroundColor = '#f77c5f' 
        else if (allSquares[i].innerHTML == 64) allSquares[i].style.backgroundColor = '#f75f3b' 
        else if (allSquares[i].innerHTML == 128) allSquares[i].style.backgroundColor = '#fd9982' 
        else if (allSquares[i].innerHTML == 256) allSquares[i].style.backgroundColor = '#ead79c' 
        else if (allSquares[i].innerHTML == 512) allSquares[i].style.backgroundColor = '#76daff' 
        else if (allSquares[i].innerHTML == 1024) allSquares[i].style.backgroundColor = '#beeaa5' 
        else if (allSquares[i].innerHTML == 2048) allSquares[i].style.backgroundColor = '#d7d4f0' 
    }

}
const createGrid=()=>{
    for(let i=0;i<width*width;i++){
       boxSquare=document.createElement('div');
       boxSquare.innerHTML=0;
        matrix.appendChild(boxSquare)
        allSquares.push(boxSquare)
    }
  

}
createGrid();

const generateRandom=()=>{
    let rand_number=Math.floor(Math.random()*allSquares.length)
    if(allSquares[rand_number].innerHTML==0){
        allSquares[rand_number].innerHTML=2;
        color();
       
        checkLose();
    }else{
       
        generateRandom();
    }
}
generateRandom();
generateRandom();

const rightMove=()=>{
    for(let i=0;i<width*width;i++){
        if(i%width==0){
            let t1=allSquares[i].innerHTML;
            let t2=allSquares[i+1].innerHTML;
            let t3=allSquares[i+2].innerHTML;
            let t4=allSquares[i+3].innerHTML;
          
          
            let row=[parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)]  //toconvert to string

           
            const findUnique=row.filter(num=>num)
            

            let empty=width-findUnique.length;
            let fillZero=Array(empty).fill(0);
           

            let new_row=fillZero.concat(findUnique);
           
            allSquares[i].innerHTML=new_row[0];
           
            allSquares[i+1].innerHTML=new_row[1];
            
            allSquares[i+2].innerHTML=new_row[2];
           
            allSquares[i+3].innerHTML=new_row[3];
        
          
            
        }
    }
}




const leftMove=()=>{
    for(let i=0;i<width*width;i++){
        if(i%width==0){
            let t1=allSquares[i].innerHTML;
            let t2=allSquares[i+1].innerHTML;
            let t3=allSquares[i+2].innerHTML;
            let t4=allSquares[i+3].innerHTML;
            
           
            let row=[parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)]  //to convert string to int

           
            const findUnique=row.filter(num=>num)
            

            let empty=width-findUnique.length;
            let fillZero=Array(empty).fill(0);
           

            let new_row=findUnique.concat(fillZero);
           
            allSquares[i].innerHTML=new_row[0];
            
           
            allSquares[i+1].innerHTML=new_row[1];
            
            allSquares[i+2].innerHTML=new_row[2];
       
            allSquares[i+3].innerHTML=new_row[3];
           
           
            
        }
    }
}

const downMove=()=>{
    for(let i=0;i<width;i++){
        let t1=allSquares[i].innerHTML;
        let t2=allSquares[i+width+1].innerHTML;
        let t3=allSquares[i+width+2].innerHTML;
        let t4=allSquares[i+width+3].innerHTML;
      
       
        let col=[parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)] 
        const findUnique=col.filter(num=>num)
            

        let empty=width-findUnique.length;
        let fillZero=Array(empty).fill(0);
       

        let new_col=fillZero.concat(findUnique);
       
        allSquares[i].innerHTML=new_col[0];
       
        allSquares[i+1+width].innerHTML=new_col[1];
        
        allSquares[i+width+2].innerHTML=new_col[2];
     
        allSquares[i+width+3].innerHTML=new_col[3];
         
    }
}
const upMove=()=>{
    for(let i=0;i<width;i++){
        let t1=allSquares[i].innerHTML;
        let t2=allSquares[i+width+1].innerHTML;
        let t3=allSquares[i+width+2].innerHTML;
        let t4=allSquares[i+width+3].innerHTML;

       
        let col=[parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)] 
        const findUnique=col.filter(num=>num)
            

        let empty=width-findUnique.length;
        let fillZero=Array(empty).fill(0);
       

        let new_col=findUnique.concat(fillZero);
       
        allSquares[i].innerHTML=new_col[0];
      
        allSquares[i+1+width].innerHTML=new_col[1];
      
        allSquares[i+width+2].innerHTML=new_col[2];
    
        allSquares[i+width+3].innerHTML=new_col[3];
       
       
    }
}

const combineRows=()=>{
    for(let i=0;i<(width*width)-1;i++){
        if(allSquares[i].innerHTML===allSquares[i+1].innerHTML){
            let comb=parseInt(allSquares[i].innerHTML)+parseInt(allSquares[i+1].innerHTML)
           
           
           
            allSquares[i].innerHTML=comb;
           
            allSquares[i+1].innerHTML=0;
          
            score1+=comb;
            if(score1>hivalue){
                hivalue=score1;
                localStorage.setItem("high_score",JSON.stringify(hivalue));
                bset.innerHTML=hivalue;
            }
            score.innerHTML=score1;
        }
    }
    color();
    checkWinner();
}
const combineCols=()=>{
    for(let i=0;i<(width*width)-4;i++){
        if(allSquares[i].innerHTML===allSquares[i+width].innerHTML){
            let comb=parseInt(allSquares[i].innerHTML)+parseInt(allSquares[i+width].innerHTML)
           
            allSquares[i].innerHTML=comb;
            allSquares[i+width].innerHTML=0;
           
            score1+=comb;
            if(score1>hivalue){
                hivalue=score1;
                localStorage.setItem("high_score",JSON.stringify(hivalue));
                bset.innerHTML=hivalue;
            }
            score.innerHTML=score1;
        }
    }
    color();
    checkWinner();
}

const keyControl=(e)=>{
    if(e.keyCode==37){
        keyLeft();
    }
    else if(e.keyCode===39){
        keyRight();

    }
    else if(e.keyCode===40){
        keyDown();
    }else{keyUp()}
    
}
document.addEventListener('keyup',keyControl);
const keyLeft=()=>{
    leftMove();
    combineRows();
    leftMove();
    generateRandom();
}
const keyRight=()=>{
    rightMove();
    combineRows();
    rightMove();
    generateRandom();

}
const keyUp=()=>{
    upMove();
    combineCols();
    upMove();
    generateRandom();
}
const keyDown=()=>{
    downMove();
    combineCols();
    downMove();
    generateRandom();
}
let flag=false;
const showGameOver=()=>{
    let message=flag?"You Lose":"You Win";
    res.innerHTML=`<h1>${message}</h1>
    <div class="play" onclick="location.reload()">Play Again</div>
    `
    res.classList.remove('hide');
    matrix.classList.add('hide');
}
const checkWinner=()=>{
    for(let i=0;i<allSquares.length;i++){
        if(allSquares[i].innerHTML==8){
           showGameOver();
            document.removeEventListener('keyup',keyControl)

        }
    }

}

function checkLose(){
    let cnt=0;
    for(let i=0;i<allSquares.length;i++)
    {
        if(allSquares[i].innerHTML==0)cnt++;

    }
    if(cnt==0){
        flag=true;
       showGameOver();
    }
}
function clear() {
    clearInterval(myTimer)
  }


color();



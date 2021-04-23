const total=document.querySelector('.total');
const balance=document.querySelector('.balance');
const budgetAmount=document.querySelector('#budget-amount');
const budgetTitle=document.querySelector('#budget-title');
const addInput=document.querySelector('.add');
const title=document.querySelector('.title');

const addInputs=document.querySelector(".add-inputs")
const expense= document.querySelector('#expense');
const amount= document.querySelector('#amount');
const addExpense= document.querySelector(".add-input");

//variables
let ENTRY_LIST=[];


//eventlisteners
addInput.addEventListener('click',(e)=>{
    // if(budgetInput.value!==''){
    //     total.textContent=budgetInput.value;
    //     balance.textContent=budgetInput.value
    //     budgetInput.value='';
    //     // budgetInput.disabled=true;
    // }else{
    //     alert("You have an empty field")
    // }
    e.preventDefault();
    let income={
        type:"income",
        title: budgetTitle.value,
        amount: Number(budgetAmount.value)
    };
    
    if(budgetAmount.value =="" || budgetTitle.value==""){
            return;
        }else{
            ENTRY_LIST.push(income);
            console.log(ENTRY_LIST);
            total.textContent=income.amount;
            title.textContent=income.title
        }
    
});


addExpense.addEventListener('click', implementAddExpense);
 

// function implementAddExpense(){

//     if(expense.value !=='' || amount.value !==''){
//         let expenseObj={
//                      type:"expense",
//                     title:expense.value,
//                     amount:Number(amount.value)
//                  }
//                  ENTRY_LIST.push(expenseObj);
//                  console.log(ENTRY_LIST);
//     }

//   const newList=  `<li>
//     <div>${title}: ${amount}</div>
//     <div>EDIT</div>
//     <div>DELETE</div>
//     </li>
//     `;
//     addInputs.insertAdjacentHTML('afterbegin', newList);
//  }


function implementAddExpense(){
   
    const expenseValue= document.createElement('input');
    expenseValue.classList.add('expenditure-input');
    expenseValue.type='text';
    expenseValue.disabled=true;

    const amountValue= document.createElement('input');
    amountValue.type='text';
    amountValue.classList.add('amount-input');
    amountValue.disabled=true;
    let expenseObj={
        type:"expense",
        title:expense.value,
        amount:Number(amount.value)
    }
    
    
    if(expense.value !=='' || amount.value !==''){
        

        const div= document.createElement('div');
        div.classList.add('inputs')
    
        const expenditureAmount= document.createElement('div');
        expenditureAmount.classList.add('expenditureAmount');

        expenditureAmount.appendChild(expenseValue);
        expenditureAmount.appendChild(amountValue);
        
        expenseValue.value=expenseObj.title;
        amountValue.value=expenseObj.amount;
        ENTRY_LIST.push(expenseObj);
       
        div.appendChild(expenditureAmount)
        addInputs.appendChild(div);

        console.log(ENTRY_LIST)
        console.log("You clicked");
    
        expense.value='';
        amount.value='';

        const div2= document.createElement('div');
        div2.classList.add('edit')
        const btn=document.createElement('button');
        const textEdit= document.createTextNode('EDIT');
        btn.appendChild(textEdit)
        btn.classList.add('edit-btn');
    
        btn.addEventListener('click', editText);
        function editText(){
            amountValue.disabled=!amountValue.disabled;
            // expenseValue.disabled=!expenseValue.disabled;
        }
        const fontAwesome= document.createElement('i');
        fontAwesome.setAttribute("class", "fas fa-times times");

        fontAwesome.addEventListener('click', deleteEntry);
        function deleteEntry(entry){
            // const targetBtn= event.target;
            //  const entry=targetBtn.parentElement.parentElement;
            //  entry.remove();
             ENTRY_LIST.splice(entry.id, 1);
            console.log(ENTRY_LIST)

        }
        // div.appendChild(fontAwesome);
        div2.appendChild(btn);
        div2.appendChild(fontAwesome)
        
        
        // addInputs.appendChild(div2)
        div.appendChild(div2);
        //calculate total expense
        computeExpenseTotal();
    }else{
       alert("You have an empty field");
       return;
    }   
   
}




//ADDING UP THE TOTAL EXPENSE
const expenseTotal= document.querySelector('.expense-total');


function computeExpenseTotal(){
    let sum=0;
    ENTRY_LIST.forEach(entry=>{
        if(entry.type==='expense'){
            sum+=entry.amount;
            console.log(sum)
           
    expenseTotal.textContent= sum;
    // console.log(expenseTotal.textContent)
     return sum;

        }
        return 0;

    });
     
    
};

//COMPUTATION OF THE BALANCE
function computeBalance(){
    let balanceTotal=0;
    balanceTotal+= total.textContent-expenseTotal.textContent;
    console.log(balanceTotal);
    balance.textContent=balanceTotal
}


//ON KEYDOWN
window.addEventListener('keydown', (e)=>{
    if(e.which===13){
        implementAddExpense();
        computeExpenseTotal()
        computeBalance()
    }
});


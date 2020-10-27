document.addEventListener('DOMContentLoaded', function () {

    const calcTotal = document.querySelector('button'),
        Container = document.querySelector('.items'),
        form = document.getElementById('formTax'),
        mainform = document.querySelector('.form');
        maincontainer = document.querySelector('.container');

    checkPayment();
    eventListeners();
    getItem();
    function eventListeners(){
        form.addEventListener('submit' , getTaxes);
        
    }
    function checkPayment(){
        document.getElementById('credit').checked = true;
    }
    class TaxClass {
        constructor(city , address , payment){
            this.city = city;
            this.address = address;
            this.payment = payment;
        }
        calculateTax(taxClass){
            let base = 100,
                c = taxClass.city;
            switch(c){
                case '1':
                    base *= 2;
                    break;
                case '2':
                    base *= 1.5;
                    break;   
                case '3':
                    base *= 1.8;
                    break;  
            }       
            return base; 
        }
    }
    function getTaxes(e){
        e.preventDefault();
        let city = document.getElementById('cities').value;
            address = document.getElementById('address').value;
            payment = document.querySelector('input[name = "payment"]:checked').value;
        
        validate(city , address , payment);
    }
    function validate(city , address , payment){
        if(city === '' || address === '' || payment === ''){
            displayError();
        }
        else{
            removeError();
            let taxClass = new TaxClass(city , address , payment);
            const tax = taxClass.calculateTax(taxClass);
            displayTax(tax);
        }
    }

    function displayTax(tax){
        taxT = document.querySelector('.taxDiv');
        if(taxT){
            
            taxT.remove();
        }
            taxDiv = document.createElement('div');
            taxDiv.innerHTML = ` <div class="taxDiv">
                                <h4>Your Total Taxes is:</h4>
                                <p>${tax}$</p>
                             </div>
        `
            form.insertBefore(taxDiv , document.querySelector('button'));
        
        
    }
    function displayError(){
        if(document.querySelector('.error')){
            return;
        }
        else{
            const error = document.createElement('div');
            error.classList = 'error';
            error.innerHTML = `<div>
                                <p>All fields must be filled<p>
                               </div>
            `;
            mainform.insertBefore(error , document.querySelector('form'));
        }

    }
    function removeError(){
        if(document.querySelector('.error')){
            error = document.querySelector('.error');
            mainform.removeChild(error);
        }
       
    }
    function getItem(){ 
        let itemArray = getFromLS();
        
        itemArray.forEach(function(item) {
            imgBuy = document.createElement('div');
            imgBuy.innerHTML = `<div class='item-container'>
                                    <div class = "img-container">
                                        <img src='${item.img}'>
                                    </div>
                                    <h2>${item.body}</h2>  
                                <div> `;

            Container.appendChild(imgBuy);
            
        }); 
    } 

    function getFromLS(){
        let itemArray = JSON.parse(localStorage.getItem('macArray')) ;
        return itemArray;
    
    }
    });
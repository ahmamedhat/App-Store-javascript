document.addEventListener('DOMContentLoaded', function () {
    let mac = document.querySelector('.container'),
        cart = document.querySelector('#cart-content'),
        btn = document.getElementById('cart-btn');

        checkCartEmptiness();
        getFromLocalStorage();
        eventlis();
        

    function eventlis(){
        mac.addEventListener('click',buymac);
        cart.addEventListener('click',removeMacCart);
        cart.addEventListener("click", eventtable );
        btn.addEventListener('click',changeWindow);  
    }
    
    function changeWindow(){
        location.href = 'cart.html';
    }
    function eventtable(e){   
        e.target.style.opacity = "1";
        console.log("clicked on");
      }
   
    function checkCartEmptiness(){
        let macs = getFromStorage();
        
        if(macs.length > 0){
            cart.querySelector('th').style.display = 'none';
            document.querySelector('#cart-btn').style.display = 'block';
            
        }
        else{
            cart.querySelector('th').style.display ='block';
            document.querySelector('#cart-btn').style.display = 'none';
            }
    }
    
    function removeMacCart(e){
        e.preventDefault();
        let mac , macId;
        if(e.target.classList.contains('remove-mac')){
            
            e.target.parentElement.parentElement.remove();
            mac = e.target.parentElement.parentElement;
            macId = mac.querySelector('a').getAttribute('data-id'); 
            
        }
            removeMacFromLs(macId);
            checkCartEmptiness();
            
        }

        function removeMacFromLs(id){
            let macs = getFromStorage();
            macs.forEach(function(mac , index){
                if(mac.id === id){
                    macs.splice(index , 1);
                }
            
            
        });
        localStorage.setItem('macArray', JSON.stringify(macs));
    }
    function buymac(e){
        
        if(e.target.classList.contains('add')){
            const macInfo = e.target.parentElement;
            getMacInfo(macInfo);
            
        }

        checkCartEmptiness();

    }
    

    function getMacInfo(macInf){
        const macInfo = {
            img: macInf.querySelector('img').src,
            body: macInf.querySelector('h4').textContent,
            id: macInf.querySelector('.add').getAttribute('data-id')

        }

        addToCart(macInfo);
    }

    function addToCart(macInfo){
        row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td>
                    <img src = "${macInfo.img}">
                </td>
                <td>
                    <h4>${macInfo.body}</h4>
                </td>
                <td>
                    <a href="#" class="remove-mac" data-id='${macInfo.id}'>X</a>
                </td>

            </tr>
        `;
        cart.appendChild(row);
        saveMacIntoStorage(macInfo);

    }
    function saveMacIntoStorage(macInfo){
        let macs = getFromStorage();

        macs.push(macInfo);
        localStorage.setItem('macArray', JSON.stringify(macs));

    }
    function getFromStorage(){
        let macArray;
        if(localStorage.getItem('macArray') === null){
            macArray = [];
        }
        else{
            macArray = JSON.parse(localStorage.getItem('macArray'));
        }
        return macArray;
    }
    function getFromLocalStorage(){
        let macsLs = getFromStorage();
        macsLs.forEach(function(macInfo){
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr>
                <td>
                    <img src = "${macInfo.img}">
                </td>
                <td>
                    <h4>${macInfo.body}</h4>
                </td>
                <td>
                    <a href="#" class="remove-mac" data-id='${macInfo.id}'>X</a>
                </td>

            </tr>
        `;
        cart.appendChild(row);

        });
        
    }
});
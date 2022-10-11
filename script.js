
const select = document.getElementById("select");
const personDetails = document.getElementById("personName");
const movieDetails = document.getElementById("movieName");
const contact_number = document.getElementById("mobileNumber");
const email = document.getElementById("email");
const form = document.userDetailsForm;
const bookedTicket = document.getElementById('bookedTicket');
const movieList = ["Bahubali 2","KGF Chapter 2","Dangal","RRR","KK"];
let count=0;
let allButtons;                   // variable to store all seat 
movieList.map((element)=>{
   let option = document.createElement("option"),
    txt = document.createTextNode(element);
    option.appendChild(txt);
    option.setAttribute("value",element);
    select.insertBefore(option,select.lastChild);
})   

/**
 * validation on userContactNumber.
 * @param {*} event 
 */
const getContactNumber=(event)=>{      
    if(!(event.charCode >=48 && event.charCode <= 57)){
        event.preventDefault();
    }
}
/**
 * validation on userName.
 * @param {*} event 
 */
const getUserName=(event)=> {               
      var regex = /^[a-zA-Z ]*$/;
      if(!(event.key.match(regex)))
      {
        event.preventDefault();
      }
}
/**
 * To validate user details.
 * @param {*} event 
 * @returns 
 */
const validate=(event)=>{          
    event.preventDefault();
    const  contact_number = form.contact_number.value;
    const dateOfBirth = document.getElementById("DOB").value; 
    const todayDate = new Date();
    const DOB = new Date(dateOfBirth);

    const age = todayDate.getFullYear() - DOB.getFullYear();
    const ageMonth = todayDate.getMonth() - DOB.getMonth();
    const ageDay = todayDate.getDate() - DOB.getDate();
    if( form.name.value.trim().length == 0 ) {
        alert( "Please provide your name!" );
        form.name.focus() ;
        return false;
     }
     if(form.movie.value == "default"){
        alert( "Please provide Movie Name!" );
        form.movie.focus() ;
        return false;
     }
     if ((age == 12 && ageMonth <= 0 && ageDay <= 0) || age < 12) {
         alert("Age should be more than 12 years.Please enter a valid Date of Birth");
         form.age.focus();
         return false;
     }
     if(dateOfBirth.length == 0){
        alert('please provide your D.O.B');
        form.age.focus();
        return false
     }
     if(form.contact_number.value.length == 0 && form.email.value.length == 0 ){
        alert("Enter either mobile number or email");
        return false
     }
     if(form.contact_number.value.length != 0){
        if(contact_number.length <= 9){
            alert("please provide valid mobile number");
            form.contact_number.focus() ;
            return false;
         }
     }
     if(form.email.value.length != 0){
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(form.email.value.length != 0){
            if(!form.email.value.match(regex))
            {
            alert("You have entered an invalid email address!");
            form.email.focus();
            return false;
            }
        }
     }
    getAllButtons(18);
    const btnAll = document.querySelectorAll('button');
    allButtons = btnAll;
    btnAll.forEach((element,index)=>{
        if(index<btnAll.length-1){
            element.addEventListener("click",() =>{
                if(element.style.color === "wheat"){
                    element.style.color = "green"
                    count++
                }else{
                    element.style.color = "wheat"
                    count--;
                }
                document.getElementById('bookedSeats').innerHTML = "Booked Seat : "+ count + ",";
                document.getElementById('availableSeats').innerHTML = "Available Seat : "+ (allButtons.length-1-count)+","
                document.getElementById('totalSeats').innerHTML = "Total Seat : "+ (allButtons.length-1);
                btnAll.forEach((element,index)=>{
                if(index == btnAll.length-1){
                    element.disabled=false;
                    element.style.cursor="pointer";
                }
            })
            })
        }
    })
    btnAll.forEach((element,index)=>{
        if(index == btnAll.length-1){
            element.disabled=true;
            element.style.cursor ="not-allowed";
        }
    });
    document.getElementById("submit").disabled = true;
    document.getElementById('bookedSeats').innerHTML = "Booked Seat : "+ count + ",";
    document.getElementById('availableSeats').innerHTML = "Available Seat : "+ (allButtons.length-1-count)+","
    document.getElementById('totalSeats').innerHTML = "Total Seat : "+ (allButtons.length-1);
    return true;
}
/**
 * to booked the seat.
 */
const onTicketBook=()=>{    
    const data = document.querySelector('form');
    const h2 = document.querySelector('h2');
    personDetails.innerHTML = " Name  :"+ form.name.value
    movieDetails.innerHTML = "Movie Name :" + form.movie.value
    contact_number.innerHTML = "Mobile Number :" + form.contact_number.value;
    email.innerHTML = "Email : "+ form.email.value;
    bookedTicket.innerHTML = "No of ticket have booked :" + count;
    allButtons.forEach((element)=>{
        element.disabled=true;
        element.style.cursor="not-allowed"
    })
    data.replaceWith(h2);
    document.getElementById('userInformation').style.display="flex";
    document.getElementById('userInformation').style.flexDirection="column-reverse";
    document.getElementById('userDetails').style.padding="11% 39%";     
}
/**
 * dynamically created multiple button/seat.
 * @param {*} e 
 */
const getAllButtons=(e)=>{                        
    for(let index = 0; index< e; index++){
      const buttonElement = document.createElement('button');
      buttonElement.innerText="chair";
      buttonElement.className="material-icons";
      buttonElement.setAttribute('style', 'color: wheat')
      document.querySelector('#button-container').appendChild(buttonElement);
    }
}
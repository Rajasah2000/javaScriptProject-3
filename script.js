const select = document.getElementById("select");
const personDetails = document.getElementById("personName");
const movieDetails = document.getElementById("movieName");
const contactNumber = document.getElementById("mobileNumber");
const email = document.getElementById("email");
const form = document.userDetailsForm;
const bookedTicket = document.getElementById('bookedTicket');
const movieList = ["Bahubali 2","KGF Chapter 2","Dangal","RRR","KK"];
let count=0;
/**
 * to Create a Dropdown List with Array(movieList) Values.
 *  */       
movieList.map((element)=>{
   let option = document.createElement("option"),
    txt = document.createTextNode(element);
    option.appendChild(txt);
    option.setAttribute("value",element);
    select.insertBefore(option,select.lastChild);
})   

/**
 * dynamically created multiple button/seat.
 * @param {*} e 
 */
 const getAllButtons=(seat)=>{                        
    for(let index = 0; index< seat; index++){
      const buttonElement = document.createElement('button');
      buttonElement.innerText="chair";
      buttonElement.className="material-icons";
      buttonElement.setAttribute('style', 'color: wheat')
      document.querySelector('#button-container').appendChild(buttonElement);
    }
    document.getElementById('bookedSeats').innerHTML = "Selected Seat : "+ count + ",";
    document.getElementById('availableSeats').innerHTML = "Available Seat : "+ 18+","
    document.getElementById('totalSeats').innerHTML = "Total Seat : "+ 18;
}

getAllButtons(18);


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
      const regex = /^[a-zA-Z ]*$/;
      if(!(event.key.match(regex)))
      {
        event.preventDefault();
      }
}

/**
 *    variable to store all seat .
 */
const allButtons = document.querySelectorAll('button');

/**
 * Initially disabled  all seat and book button.
 */

allButtons.forEach((element)=>{
        element.disabled=true;
        element.style.cursor ="not-allowed";
});

/**
 * To validate user details.
 * @param {*} event 
 * @returns 
 */
const validate=(event)=>{          
    event.preventDefault();
    const  contactNumber = form.contactNumber.value;
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
     if(form.contactNumber.value.length == 0 && form.email.value.length == 0 ){
        alert("Enter either mobile number or email");
        return false
     }
     if(form.contactNumber.value.length != 0){
        if(contactNumber.length <= 9){
            alert("please provide valid mobile number");
            form.contactNumber.focus() ;
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

     /**
      * After checking all user details validation enabled all seat/button  except book button.
      */
    allButtons.forEach((element,index)=>{
        if(index != allButtons.length-1){
            element.disabled=false;
            element.style.cursor ="pointer";
        }
    });

    /**
     * After checking all user details validation disabled all user details input field.
     */
    document.getElementById("submit").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("emails").disabled = true;
    document.getElementById("DOB").disabled = true;
    document.getElementById("select").disabled = true;
    document.getElementById("contactNumber").disabled = true;
    return true;
}

/**
 * User can select the seat.
 */

allButtons.forEach((element,index)=>{
    if(index<allButtons.length-1){
        element.addEventListener("click",() =>{
            if(element.style.color === "wheat"){
                element.style.color = "green"
                count++
            }else{
                element.style.color = "wheat"
                count--;
            }
            document.getElementById('bookedSeats').innerHTML = "Selected Seat : "+ count + ",";
            document.getElementById('availableSeats').innerHTML = "Available Seat : "+ (allButtons.length-1-count)+","
            document.getElementById('totalSeats').innerHTML = "Total Seat : "+ (allButtons.length-1);
            allButtons.forEach((element,index)=>{
            if(index == allButtons.length-1){
                element.disabled=false;
                element.style.cursor="pointer";
            }
        })
        })
    }
})


/**
 * to booked the seat.
 */
const onTicketBook=()=>{    
    const data = document.querySelector('form');
    const h2 = document.querySelector('h2');
    personDetails.innerHTML = " Name  :"+ form.name.value
    movieDetails.innerHTML = "Movie Name :" + form.movie.value
    contactNumber.innerHTML = "Mobile Number :" + form.contactNumber.value;
    email.innerHTML = "Email : "+ form.email.value;
    bookedTicket.innerHTML = "No of ticket have booked :" + count;
    /**
     * after clicking book button again disabled all seat and book button.
     */
    allButtons.forEach((element)=>{
        element.disabled=true;
        element.style.cursor="not-allowed"
    })
    data.replaceWith(h2);
    document.getElementById('userInformation').style.display="flex";
    document.getElementById('userInformation').style.flexDirection="column-reverse";
    document.getElementById('userDetails').style.padding="11% 39%";     
}
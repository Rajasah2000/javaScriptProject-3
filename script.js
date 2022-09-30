const storeButtonElement = document.querySelectorAll('button');

let personName = document.getElementById("person-name");
let movieName = document.getElementById("movie-name");
let ages = document.getElementById("age");
let mobileNumber = document.getElementById("mobile-number");
let bookedTicket = document.getElementById('booked-ticket');
let count=0;

storeButtonElement.forEach((ele)=>{
    ele.disabled=true;
    ele.style.cursor="not-allowed";
})

const getMobileNumber=(event)=>{
    if(!(event.charCode >=48 && event.charCode <= 57)){
        event.preventDefault();
    }
}
const validate=(event)=>{
    event.preventDefault();
    const  age =document.contact_form.age.value;
    const  mobileNumber = document.contact_form.mobileNumber.value;
    let year = age.slice(0, 4);
    if(2022-parseInt(year)<12){
         alert('age should be atleast be 12');
         document.contact_form.age.focus();
         return false;
    }
    
    if( document.contact_form.name.value == "" ) {
        alert( "Please provide your name!" );
        document.contact_form.name.focus() ;
        return false;
     }
     if( document.contact_form.movie.value == "0" ) {
        alert( "Please provide Movie Name!" );
        document.contact_form.movie.focus() ;
        return false;
     }
     
     if(age == ''){
        alert('please provide your D.O.B');
        document.contact_form.age.focus();
        return false
     }

     if( document.contact_form.mobileNumber.value == "" ) {
        alert( "Please provide your mobile  number! " );
        document.contact_form.mobileNumber.focus() ;
        return false;
     }
     if(mobileNumber.length <= 9){
        alert("please provide valid mobile number");
        document.contact_form.mobileNumber.focus() ;
        return false;
     }

    storeButtonElement.forEach((ele,i)=>{
        if(i<=storeButtonElement.length-2){
            ele.disabled=false;
            ele.style.cursor ="pointer";
        }
    });
     return true;
}



const onTicketBook=()=>{
    let age =document.contact_form.age.value;
    let year = age.slice(0, 4);
    let userAge =2022-parseInt(year);
    let data = document.querySelector('form');
    let h2 = document.querySelector('h2');
    
    storeButtonElement.forEach((ele)=>{
        if(ele.style.color == 'green'){
            count++;
        }
    })
  
    personName.innerHTML = " Name  :       "+ document.contact_form.name.value
    movieName.innerHTML = "Movie Name :       " + document.contact_form.movie.value
    ages.innerHTML = "Age :     "+ userAge;
    mobileNumber.innerHTML = "Mobile Number :       " + document.contact_form.mobileNumber.value;
    bookedTicket.innerHTML = "No of ticket have booked :       " + count;

    document.getElementById('bookedSeats').innerHTML = "Booked Seat : "+ count + ",";
    document.getElementById('availableSeats').innerHTML = "Available Seat : "+ (storeButtonElement.length-1-count)+","
    document.getElementById('totalSeats').innerHTML = "Total Seat : "+ (storeButtonElement.length-1);

    storeButtonElement.forEach((ele)=>{
        ele.disabled=true
        ele.style.cursor="not-allowed"
    })

    data.replaceWith(h2);
    document.getElementById('section1').style.display="flex"
    document.getElementById('section1').style.flexDirection="column-reverse"
    document.getElementById('userDetails').style.padding="14% 33%"     
}


storeButtonElement.forEach((ele,i)=>{
    if(i<=storeButtonElement.length-2){
        ele.addEventListener("click",(e) =>{
            let backgroundColor = ele.style.color;
            if(backgroundColor === "wheat"){
                ele.style.color = "green"
            }else{
            ele.style.color = "wheat"
            }

        storeButtonElement.forEach((ele,i)=>{
            if(i==storeButtonElement.length-1){
                ele.disabled=false;
                ele.style.cursor="pointer";
            }
        })
        })
    }
})
const submitbutton = document.getElementById("submitbutton");
const cityName = document.getElementById("cityname");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("templogo");
const day = document.getElementById("day");
const today = document.getElementById("today_date");
const getCurrentDay = ()=>{
  var weekday = new Array (7);
  weekday[0] = "Sunday";
  weekday[1] ="Monday";
  weekday [2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";
  let currentTime = new Date();
  console.log(weekday[currentTime.getDay()]);
  day.innerText= (weekday[currentTime.getDay()]);
  
} 
getCurrentDay();

const getCurrentdate=() =>{
var month = new Array (12);
month[0] = "January";
month[1] ="February";
month [2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";

let currentTime = new Date();

today.innerText=(`${ currentTime.getDate()} ${month[currentTime.getMonth()]}`)
}
getCurrentdate();


const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `Please enter your city to search!`;
  } else {
    try {
      let url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},+91&limit=1&appid=d9b5c4168b05d480f739cd6386a39a01`;
      const response = await fetch(url1);
      const arrData1 = await response.json();
      let url2= `http://api.openweathermap.org/data/2.5/weather?lat=${arrData1[0].lat}&lon=${arrData1[0].lon}&appid=d9b5c4168b05d480f739cd6386a39a01`;
      const response2 = await fetch(url2);
      const arrData2 = await response2.json();
      console.log(`${arrData2.main.temp-273} temp\n${arrData2.name}`);
      temp.innerText=`${(arrData2.main.temp-273).toFixed(1)}`;
      city_name.innerText = `${arrData2.name},${arrData1[0].state},${arrData1[0].country}`;
      // temp_status=`${arrData2.weather[0].temp}`;

      
        let tempStatus=`${arrData2.weather[0].main}`;
        console.log(`${arrData2.weather[0].main}`);
        if(tempStatus==="Sunny"){
            temp_status.innerHTML="<i class='fas fa-sun' style='color: rgb(236, 236, 0);'></i>";
        }
        else if(tempStatus==="Clouds"||tempStatus==="Mist"){
          temp_status.innerHTML="<i class='fas fa-cloud' style='color: rgb(236, 236, 0);'></i>"
        }
        else if(tempStatus==="Rainy"){
          temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color: rgb(236, 236, 0);'></i>"
        }
        else {
          temp_status.innerHTML="<i class='fas fa-sun' style='color: rgb(236, 236, 0);'></i>"
        }

        



    } catch {
      city_name.innerText = `Please enter your city name properly`;
    }
  }
};
submitbutton.addEventListener("click", getInfo);

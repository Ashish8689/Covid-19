// ********* Hamburger Menu  *********

    $(document).ready(function(){
  		$('.hamburger').on('click',function(){
          $('.nav-list').toggleClass('active');
  		});

  
  // **************  Window on Scroll  ***************

    $(window).scroll(function () {
	    var scroll = $(window).scrollTop();
	    if (scroll > 100) {
	      $(".nav").css({"box-shadow":"0 5px 10px rgba(0,0,0,.5)"});
	    } else {
	      $(".nav").css({"box-shadow":"none"});
	    }
	  });

    // Link to content body

    const navlinks = document.querySelectorAll('.nav-link');
    const ul = document.querySelector('.nav-list');

    navlinks.forEach(navlink =>{
      navlink.addEventListener('click',function(){
          ul.classList.remove('active');
      })
    });

});



// ********************  Whole World cases  *****************************


 const CoronaData = () =>{

    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(data => {

         let output = ' ';

      data.Countries.forEach((country,index) =>{ 
      	
        output +=`<tr key={index} >
  				<th>${country.Country}</th>
  				<td>${country.TotalConfirmed}</td>
  				<td>${country.TotalDeaths}</td>
  				<td>${country.TotalRecovered}</td>	
  		    </tr>`
         })


       document.querySelector('.output').innerHTML = output;

      // ***************  Total Cases in world  **********************
           document.querySelector('.con-cases').innerHTML = data.Global.TotalConfirmed;

      // **************  Total Deathsin world  ***********************
           document.querySelector('.death').innerHTML = data.Global.TotalDeaths;

      // **************  Total Deathsin world  ***********************
           document.querySelector('.recovered').innerHTML = data.Global.TotalRecovered;


      //   *************  For the CountDown   *****************

           $('.number').counterUp({delay:10,time:1000});



        
        // ********************  World cart ****************************


       let myChart = document.getElementById('World').getContext('2d');
         let report = new Chart(myChart, {

            type :'doughnut',
            data:{
              labels:['Confirm','Recovered','Death'],
              datasets:[{
                  label:'Preformance',
                  backgroundColor:[
                    '#3d5af1',
                    '#c093ea',
                    '#ff5959'
                  ],

                  data:[data.Global.TotalConfirmed,data.Global.TotalRecovered,data.Global.TotalDeaths],
                  borderColor:'#777',
                  borderWidth:'1',
                  hoverBorderWidth:'3',
                  hoverBorderColor:'black'
              }],
            },
         
           options:{
              title:{
                display:true,
                text:'Active vs Recovered vs Death',
                fontSize:16,
                fontStyle:'900',
                fontColor:'#50658e',
                fontFamily:'Roboto, sans-serif'
              }
           }
       });
  
   


         // ****************  Selecting highest in Country   *************
          const max = data.Countries.map(user => user.TotalConfirmed);
          const sorted = max.sort((a, b) => b - a).slice(0,5);


         let mos = '';
         for(let i=0;i<=sorted.length;i++){
             const list = data.Countries.filter(data => data.TotalConfirmed === sorted[i]);

              [...list].map((most,index) =>{
                 mos +=`
                  <th>${most.Country}</th>
                  <td>${most.TotalConfirmed}</td>
                  <td>${most.TotalDeaths}</td>
                  <td>${most.TotalRecovered}</td>  
                  </tr>`
             })
             document.querySelector('.most').innerHTML = mos;
         }     
     })
 }


 // *********************  India Covid-19 Cases  *****************************

 const India = () =>{

  fetch('https://api.covid19india.org/data.json')
  .then(res => res.json())
  .then(data =>{

    let india = '';

    const exact=data.statewise.filter(ex => ex.state !== 'Total');

    exact.map((data,index) =>{

      india +=`
          <th>${data.state}</th>
          <td>${data.confirmed}</td>
          <td>${data.deaths}</td>
          <td>${data.recovered}</td> 
          <td>${data.active}</td>  
          </tr>`
    })
    document.querySelector('.india').innerHTML = india;


    const total=data.statewise.filter(ex => ex.state === 'Total');
    console.log(total[0]);

    // ***************  Total Cases in India  **********************
           document.querySelector('.india-cases').innerHTML = total[0].confirmed;

      // **************  Total Deathsin India  ***********************
           document.querySelector('.india-death').innerHTML = total[0].deaths;

      // **************  Total Deathsin India  ***********************
           document.querySelector('.india-recovered').innerHTML = total[0].recovered;

     // **************  Total Active case in India  ***********************
           document.querySelector('.india-ac-cases').innerHTML = total[0].active;



       //   *************  For the CountDown   *****************
    
           $('.number').counterUp({delay:10,time:800});




            let myChart = document.getElementById('india').getContext('2d');
            let report = new Chart(myChart, {

            type :'doughnut',
            data:{
              labels:['Active','Recovered','Death'],
              datasets:[{
                  label:'Preformance',
                  backgroundColor:[
                    '#22eaaa',
                    '#c093ea',
                    '#ff5959'
                  ],

                  data:[total[0].active,total[0].recovered,total[0].deaths],
                  borderColor:'#777',
                  borderWidth:'1',
                  hoverBorderWidth:'3',
                  hoverBorderColor:'black'
              }],
            },
         
           options:{
              title:{
                display:true,
                text:'Active vs Recovered vs Death',
                fontSize:16,
                fontStyle:'900',
                fontColor:'#50658e',
                fontFamily:'Roboto, sans-serif'
              }
           }
       });

  })
 }



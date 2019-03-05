const TimeFormat = require('hh-mm-ss')
const moment = require('moment')

module.exports = (month, user) => {
   let today = new Date();
   let dd = today.getDate();
   let mm = today.getMonth() + 1;
   const yyyy = today.getFullYear();
   if (dd < 10) {
      dd = `0${dd}`;
   }
   if (mm < 10) {
      mm = `0${mm}`;
   }
   today = `${dd}/${mm}/${yyyy}`;



   let taskRow;
   let total = month.tasks.reduce((total, task) => {
      return total + parseFloat(task.time.toString())
   }, 0)
   console.log(total)
   month.tasks.forEach(task => {
      taskRow += ` <tr>
         <td>${task.title}</td>
         <td>${task.description}</td>
         <td>${TimeFormat.fromS(task.time, "hh:mm:ss")}</td>
     
       </tr>`
   })


   return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>${month.name}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<style>   * {
   margin:0;
   padding:0;

}
html{
  
   padding: 0;
}
body{
   padding: 20px;
   background-color: #fff;
}
thead tr th{
   font-size: 20px !important;
   font-style:bold
}
tr td{
   font-size: 12px;
}
.bold{
   font-weight: 900;
   font-size:22px;
}
p{
   font-size: 10px
}
.center{
   text-align: center
}
.left{
   text-align: left
}
.full-width{
   width: 100%
}
</style>
       </head>
       <body>
       <div class="full-width left"><p>id:${month._id}</p>
       <p class="left">${user.email}</p></div>
       
       <span class="left">${today}</span>
       <div class="center"><h4>${month.name}/${month.year}</h4>
       </div>    
       <table>
       <thead>
         <tr>
             <th>Title</th>
             <th>Description</th>
             <th>Time</th>
         </tr>
       </thead>
       <tbody>
       ${taskRow}
       <tr>
       <td></td>
       <td>Total:</td>
       <td ><p class="bold">${TimeFormat.fromS(total, "hh:mm:ss")}</p></td></tr>
       </tbody>
     </table>
       </body>
    </html>
    `;
}
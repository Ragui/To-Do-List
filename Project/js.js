function task( des , name , date ){
	this.name=name;
	this.date=date;	
	this.des=des;
}
	var i=0;
	var tasks=[];
	var arch=[];
	var prog=[];
	var comp=[];
	var type=1;
	var Hell=[];
	var aaa=[tasks,prog,comp,arch];
	var now;
	
	
$(document).ready(function(){
	$.ajax({
		url:'/load',
		type:'POST',
		dataType: "text",
		success:function(data){
			document.getElementById("name123").id = data;
			$.getJSON(data+'.json',function (data2) {
		        aaa = data2;
		        tasks=aaa[0];
	        	prog=aaa[1];
				arch=aaa[3];
				comp=aaa[2];
				draw_all();
	        });
		},
		error:function(xhr,status,error){
			if(error.message!=undefined)
			{
				alert(console.log('Error:'+error.message));
			}
		},
	});	
});

function saveAll(){
	$.ajax({
		url:'/ho',
		data:{newdata:JSON.stringify(aaa,null,4), mail:document.body.getAttribute('id')},
		type:'POST',
		error:function(xhr,status,error){
			if(error.message!=undefined)
			{
				alert(console.log('Error:'+error.message));
			}
		},
	}
	);
}



function logout(){
	var x=confirm("Are you sure you want to Log Out ?");
	return x;
}
/*function ShowBeginingPage(){
	var str="<table><tr>";
	str +="<td id=\"log\">";
	str +="<label for=\"username\">User Name</lable></br>";
	str +="<input type=\"text\" id=\"username\"></br>";
	str +="<label for=\"pass\">Password</lable></br>";
	str +="<input type=\"password\" id=\"pass\"></br>";
	str +="<button onclick=\"log_in()\" >log in</button>";
    str +="</td>";
	str +="<td id=\"sign\">";
	str +="<button onclick=\"account()\" >Sign in</button>";
	str +="</td></tr></table>";
	document.getElementById("beforeTable").innerHTML=str;
}*/





function add_not(){

	var str;
	str="<label for=\"task\">Task  </label>";
    str+="<input type=\"text\" id=\"task\"></br>";
	str+="<label for=\"date\">Date  </label>";
	str+="<input type=\"date\" id=\"date\"></br>";
	str+="<label for=\"task\">Descreption  </label>";
    str+="<input type=\"text\" id=\"des\"></br>";
	str+="<button onclick=\"add()\">Add</button>";
	str+="<button onclick=\"Cancel()\">Cancel</button><br>";
	document.getElementById("addtask").innerHTML=str;

}
function Cancel(){
	var str="";
	document.getElementById("addtask").innerHTML=str;
}

function add(){
	var i;
	var y=0;
	var name=document.getElementById("task").value;
	var date=document.getElementById("date").value;
	var des=document.getElementById("des").value;
	for(i=0;i<prog.length;i++)
	{
		if(prog[i].name==name && prog[i].date==date)
		{
			alert("Task already exist !");
			y=1;
			break;
		}
	}
	if(name.charAt(0) == ' ' || name == "" )
	{
		alert("Enter a non empty task and that isn't begining whith whitespace.");
	}
	else if(y==1);
	else if(y==0){
	var con=confirm("Are you sure you want to add new task ?");
    if(con==true){
	var x=new task(des , name , date);
	tasks.push(x);
	prog.push(x);
	var str="";
	document.getElementById("addtask").innerHTML=str;
	draw_all();
}

}
}

function draw_table(){
	
	var str;
	str="<h id=\"title\">All Tasks</h>";
	str +="<table>";
	str +="<th class=\"dropdown\" >";
	str +="<button class=\"dropbtn\">Actions</button>";
	str +="<div class=\"dropdown-content\">";
	str +="<a href=\"#\" onclick=\"DelCheck()\">Delete checked</a>";
	str +="<a href=\"#\" onclick=\"archCheck()\" id=\"arall\">Archive checked</a>";
	str +="<a href=\"#\" onclick=\"doneCheck()\" id=\"dall\">Done checked</a>";
	str +="<a href=\"#\" onclick=\"sort_name()\" id=\"butt\">Sort by name</a>";
	str +="<a href=\"#\" onclick=\"sort_date()\" id=\"butt\">Sort by date</a>";
	str +="</div>";
	str +="</th>";
	str +="<th width=\"30%\">Task name</th>";
	str +="<th width=\"30%\">Date</th>";
	str +="<th width=\"30%\">Task Actions</th>";
	
	
	for(i=0;i<tasks.length;i++)
		{
			var k=i+100;
			
			str +="<tr>";
			str +="<td><input type=\"checkbox\"  width=\"100%\"  onclick=\"hell(this.parentNode.parentNode.rowIndex)\" ></td>";
		    str +="<td title=\"go\" onmouseover=\"show_des(this.parentNode.rowIndex)\" id=\"x" +i+ "\">";
		    str +=tasks[i].name;
		    str +="</td>";
			str +="<td  id=\"date" +i+ "\">";
		    str +=tasks[i].date;
		    str +="</td>";
			str +="<td class=\"dropdown\"  id=\"hov_"+i+"\">";
			str +="</td>";
			
		    str +="</tr>";
			
		
		}	
		str +="</table>";
		document.getElementById("myTable").innerHTML=str;
		
		var str2 ="<button onclick=\"add_not()\">Add new task</button>";
		document.getElementById("mm").innerHTML=str2;
}

function show_des(w){
	
	var str="";
	str +="<button class=\"dropbtn\">Menu</button>";
	str +="<div class=\"dropdown-content\">";
	if(type==1){
	document.getElementById("x"+(w-1)).title=tasks[w-1].des;
	str +="<a href=\"#\" onclick=\"Archived(this.parentNode.parentNode.parentNode.rowIndex)\">Archived</a>";
	str +="<a href=\"#\" onclick=\"done(this.parentNode.parentNode.parentNode.rowIndex)\"> Mark as Done</a>";
	str +="<a href=\"#\" onclick=\"Edit_name(this.parentNode.parentNode.parentNode.rowIndex)\">Edit name</a>";
	str +="<a href=\"#\" onclick=\"Edit_date(this.parentNode.parentNode.parentNode.rowIndex)\">Edit date</a>";
	str +="<a href=\"#\" onclick=\"del(this.parentNode.parentNode.parentNode.rowIndex)\">Delete</a>";
	}
	if(type==2){
	document.getElementById("x"+(w-1)).title=comp[w-1].des;
	str +="<a href=\"#\" onclick=\"Archived(this.parentNode.parentNode.parentNode.rowIndex)\">Archived</a>";
	str +="<a href=\"#\" onclick=\"Edit_name(this.parentNode.parentNode.parentNode.rowIndex)\">Edit name</a>";
	str +="<a href=\"#\" onclick=\"Edit_date(this.parentNode.parentNode.parentNode.rowIndex)\">Edit date</a>";
	str +="<a href=\"#\" onclick=\"del(this.parentNode.parentNode.parentNode.rowIndex)\">Delete</a>";
	}
	if(type==3){
	document.getElementById("x"+(w-1)).title=prog[w-1].des;
	str +="<a href=\"#\" onclick=\"Archived(this.parentNode.parentNode.parentNode.rowIndex)\">Archived</a>";
	str +="<a href=\"#\" onclick=\"done(this.parentNode.parentNode.parentNode.rowIndex)\"> Mark as Done</a>";
	str +="<a href=\"#\" onclick=\"Edit_name(this.parentNode.parentNode.parentNode.rowIndex)\">Edit name</a>";
	str +="<a href=\"#\" onclick=\"Edit_date(this.parentNode.parentNode.parentNode.rowIndex)\">Edit date</a>";
	str +="<a href=\"#\" onclick=\"del(this.parentNode.parentNode.parentNode.rowIndex)\">Delete</a>";
	}
	if(type==4){
	document.getElementById("x"+(w-1)).title=arch[w-1].des;
	str +="<a href=\"#\" onclick=\"Edit_name(this.parentNode.parentNode.parentNode.rowIndex)\">Edit name</a>";
	str +="<a href=\"#\" onclick=\"Edit_date(this.parentNode.parentNode.parentNode.rowIndex)\">Edit date</a>";
	str +="<a href=\"#\" onclick=\"del(this.parentNode.parentNode.parentNode.rowIndex)\">Delete</a>";
	}
	
	str +="</div>";
	document.getElementById("hov_"+(w-1)).innerHTML=str;	
}


function hell(w){
	var i;
	var s=0;
	var size=Hell.length;
	for(i=0;i<size;i++)
	{
		if(Hell[i]==w)
		{
			Hell.splice(i,1);
			s=1;
		}
	}
	if(s==0)
	{
		Hell.push(w);
	}
	Hell.sort();
}

function del(w){
	var x=confirm("Are you sure you want to delete ?");
	if(x==true)
	{	
	if(type==1)
	{
		for(i=0;i<prog.length;i++)
		{
			if((tasks[w-1].name).localeCompare(prog[i].name)==0)
			{
				prog.splice(i,1);
			}
		}
		for(i=0;i<comp.length;i++)
		{
			if((tasks[w-1].name).localeCompare(comp[i].name.strike())==0)
			{
				comp.splice(i,1);
			}
		}
		tasks.splice(w-1,1);
	}
	else if(type==3)
	{
		for(i=0;i<tasks.length;i++)
		{
			if((prog[w-1].name).localeCompare(tasks[i].name)==0)
			{
				tasks.splice(i,1);
			}
		}
		prog.splice(w-1,1);
	}
	else if(type==2)
	{
		for(i=0;i<tasks.length;i++)
		{
			if((comp[w-1].name.strike()).localeCompare(tasks[i].name)==0)
			{
				tasks.splice(i,1);
			}
		}
		comp.splice(w-1,1);
	}
	else if(type==4)
	{
		arch.splice(w-1,1);
	}
	draw_all();	
	}
	
}

function DelCheck(){
	var x=confirm("Are you sure you want to delete all selected ?");
	var i;
	var len=Hell.length;
	if(x==true){
		
	for(i=len-1;i>=0;i--)
	{	
		del(Hell[i]);
	}

	if(len==0)
	{
		alert("No checked box !");
	}
	else
	{
	    draw_all();	
		Hell=[];
	}
	}
}

function archCheck(){
	var x=confirm("Are you sure you want to archive all selected ?");
	var i;
	var len=Hell.length;
	if(x==true){
		
	for(i=len-1;i>=0;i--)
	{	
		Archived(Hell[i]);
	}

	if(len==0)
	{
		alert("No checked box !");
	}
	else
	{
	    draw_all();	
		Hell=[];
	}
	}
}

function doneCheck(){
	var x=confirm("Are you sure you want to mark  all as done ?");
	var i;
	var len=Hell.length;
	if(x==true){
		
	for(i=len-1;i>=0;i--)
	{	
		done(Hell[i]);
	}

	if(len==0)
	{
		alert("No checked box !");
	}
	else
	{
	    draw_all();	
		Hell=[];
	}
	}
}


function Edit_name(w){
	var edit=window.prompt("Enter your edit","");
	var i;
	if(edit!=null)
	{
	if(type==1)
	{
		for(i=0;i<prog.length;i++)
		{
			if((tasks[w-1].name).localeCompare(prog[i].name)==0)
			{
				prog[i].name=edit;
			}
		}
		tasks[w-1].name=edit;
	}
	else if(type==3)
	{
		for(i=0;i<tasks.length;i++)
		{
			if((prog[w-1].name).localeCompare(tasks[i].name)==0)
			{
				tasks[i].name=edit;
			}
		}
		prog[w-1].name=edit;
	}
	else if(type==2)
	{
		for(i=0;i<tasks.length;i++)
		{
			if((comp[w-1].name.strike()).localeCompare(tasks[i].name)==0)
			{
				tasks[i].name=edit.strike();;
			}
		}
		comp[w-1].name=edit;
	}
	else if(type==4)
	{
		arch[w-1].name=edit;
	}
	}
	
	draw_all();
}
var ed;
var temp;

function ad(g){
	
	ed=document.getElementById("ppp"+(g-1)).value;
	if(ed!="")
	{
	if(type==1)
	{
		for(i=0;i<prog.length;i++)
		{
			if((ed).localeCompare(prog[i].date)==0)
			{
				prog[i].date=ed;
			}
		}
		tasks[g-1].date=ed;
	}
	else if(type==3)
	{
		for(i=0;i<tasks.length;i++)
		{
			if((ed).localeCompare(tasks[i].date)==0)
			{
				tasks[i].date=ed;
			}
		}
		prog[g-1].date=ed;
	}
	else if(type==2)
	{
		comp[g-1].date=ed;
	}
	else if(type==4)
	{
		arch[g-1].date=ed;
	}
	}
	document.getElementById("date"+(g-1)).innerHTML=ed;
	draw_all();
}
	
function addd(g){
	draw_all();
}


function Edit_date(w){
    temp = document.getElementById("date"+(w-1)).innerHTML;
	var g=w-1;
	var str="<input type=\"date\" title=\"editdate\" id=\"ppp"+g+"\"><br>";
	str +="<button onclick=\"ad(this.parentNode.parentNode.rowIndex)\" >Add</button>";
	str +="<button onclick=\"addd(this.parentNode.parentNode.rowIndex)\" >Not</button>";
	document.getElementById("date"+(w-1)).innerHTML = str;
}

function Archived(w){
	var x=confirm("Are you sure you want to archive ?");
	var i;
	if(x==true)
	{
		if(type==1)
		{
	   	var y=new task(tasks[w-1].des , tasks[w-1].name , tasks[w-1].date);
	    arch.push(y);
		for(i=0;i<prog.length;i++)
		{
			if((tasks[w-1].name).localeCompare(prog[i].name)==0)
			{
				prog.splice(i,1);
			}
		}
		tasks.splice(w-1,1);
        arch.sort();
		draw_all();
		}
		else if(type==3)
		{
		var y=new task(prog[w-1].des , prog[w-1].name , prog[w-1].date);
	    arch.push(y);
		for(i=0;i<tasks.length;i++)
		{
			if((prog[w-1].name).localeCompare(tasks[i].name)==0)
			{
				tasks.splice(i,1);
			}
		}
		prog.splice(w-1,1);
        arch.sort();
		draw_all();
		}
		else if(type==2)
		{
			var y=new task(comp[w-1].des , comp[w-1].name , comp[w-1].date);
	        arch.push(y);
			var z=(y.name).strike();
			comp.splice(w-1,1);
			for(i=0;i<tasks.length;i++)
		    {
			if((z).localeCompare(tasks[i].name)==0)
			{
				tasks.splice(i,1);
			}
		}
			draw_all();

		}
	}
	
	
}

function done(w){
	var x=confirm("Are you sure to mark as done ?");
	var i;
	if(x==true)
	{
		if(type==1)
		{
		var y=new task(tasks[w-1].des, tasks[w-1].name , tasks[w-1].date);
		comp.push(y);
		for(i=0;i<prog.length;i++)
		{
			if((tasks[w-1].name).localeCompare(prog[i].name)==0)
			{
				prog.splice(i,1);
			}
		}
		var d=(tasks[w-1].name).strike();
		tasks[w-1].name=d;
		tasks.push(tasks[w-1]);
		tasks.splice(w-1,1);
		}
		
		else if(type==3)
		{
			var y=new task(prog[w-1].des , prog[w-1].name , prog[w-1].date);
			comp.push(y);
			for(i=0;i<tasks.length;i++)
		    {
			if((prog[w-1].name).localeCompare(tasks[i].name)==0)
			{
				var d=(tasks[i].name).strike();
		        tasks[i].name=d;
		        tasks.push(tasks[i]);
				tasks.splice(i,1);
			}
		}
		prog.splice(w-1,1);
		
		
		}
		draw_all();
		
	}
}
function Draw_comp(){
	var str;
	str ="<h id=\"title\">Completed</h>";
	str +="<table>";
	str +="<th class=\"dropdown\" >";
	str +="<button class=\"dropbtn\">Actions</button>";
	str +="<div class=\"dropdown-content\">";
	str +="<a href=\"#\" onclick=\"DelCheck()\">Delete checked</a>";
	str +="<a href=\"#\" onclick=\"archCheck()\" id=\"arall\">Archive checked</a>";
	str +="<a href=\"#\" onclick=\"sort_name()\" id=\"butt\">Sort by name</a>";
	str +="<a href=\"#\" onclick=\"sort_date()\" id=\"butt\">Sort by date</a>";
	str +="</div>";
	str +="</th>";
	str +="<th width=\"30%\">Task name</th>";
	str +="<th width=\"30%\">Date</th>";
	str +="<th width=\"30%\">Task Actions</th>";
	for(i=0;i<comp.length;i++)
		{
			
			str +="<tr>";
			str +="<td><input type=\"checkbox\" width=\"100%\" onclick=\"hell(this.parentNode.parentNode.rowIndex)\" ></td>";
		    str +="<td title=\"go\" onmouseover=\"show_des(this.parentNode.rowIndex)\" id=\"x" +i+ "\">";
		    str +=comp[i].name;
		    str +="</td>";
			str +="<td id=\"date" +i+ "\">";
		    str +=comp[i].date;
		    str +="</td>";
			str +="<td class=\"dropdown\" id=\"hov_"+i+"\">";
			str +="</td>";
		    str +="</tr>";
			
		
		}	
		str +="</table>";
		document.getElementById("myTable").innerHTML=str;
		document.getElementById("mm").innerHTML="";

		
		
}

function Draw_prog(){
	var str;
	str ="<h id=\"title\">In progress</h>";	
	str +="<table>";
	str +="<th class=\"dropdown\" >";
	str +="<button class=\"dropbtn\">Actions</button>";
	str +="<div class=\"dropdown-content\">";
	str +="<a href=\"#\" onclick=\"DelCheck()\">Delete checked</a>";
	str +="<a href=\"#\" onclick=\"archCheck()\" id=\"arall\">Archive checked</a>";
	str +="<a href=\"#\" onclick=\"doneCheck()\" id=\"dall\">Done checked</a>";
	str +="<a href=\"#\" onclick=\"sort_name()\" id=\"butt\">Sort by name</a>";
	str +="<a href=\"#\" onclick=\"sort_date()\" id=\"butt\">Sort by date</a>";
	str +="</div>";
	str +="</th>";
	str +="<th width=\"30%\">Task name</th>";
	str +="<th width=\"30%\">Date</th>";
	str +="<th width=\"30%\">Task Actions</th>";
	for(i=0;i<prog.length;i++)
		{
			
			str +="<tr>";
			str +="<td><input type=\"checkbox\" width=\"100%\" onclick=\"hell(this.parentNode.parentNode.rowIndex)\" ></td>";
		    str +="<td title=\"go\" onmouseover=\"show_des(this.parentNode.rowIndex)\" id=\"x" +i+ "\">";
		    str +=prog[i].name;
		    str +="</td>";
			str +="<td id=\"date" +i+ "\">";
		    str +=prog[i].date;
		    str +="</td>";
			str +="<td class=\"dropdown\" id=\"hov_"+i+"\">";
			str +="</td>";
		    str +="</tr>";
			
		
		}	
		str +="</table>";
		document.getElementById("myTable").innerHTML=str;
		var str2 ="<button onclick=\"add_not()\">Add new task</button>";
		document.getElementById("mm").innerHTML=str2;
}

function Draw_arch(){
	var str;
	str ="<h id=\"title\">Archived</h>";
	str +="<table>";
	str +="<th class=\"dropdown\" >";
	str +="<button class=\"dropbtn\">Actions</button>";
	str +="<div class=\"dropdown-content\">";
	str +="<a href=\"#\" onclick=\"DelCheck()\">Delete checked</a>";
	str +="<a href=\"#\" onclick=\"sort_name()\" id=\"butt\">Sort by name</a>";
	str +="<a href=\"#\" onclick=\"sort_date()\" id=\"butt\">Sort by date</a>";
	str +="</div>";
	str +="</th>";
	str +="<th width=\"30%\">Task name</th>";
	str +="<th width=\"30%\">Date</th>";
	str +="<th width=\"30%\">Task Actions</th>";
	for(i=0;i<arch.length;i++)
		{
			
			str +="<tr>";
			str +="<td><input type=\"checkbox\" width=\"100%\" onclick=\"hell(this.parentNode.parentNode.rowIndex)\" ></td>";
		    str +="<td title=\"go\" onmouseover=\"show_des(this.parentNode.rowIndex)\" id=\"x" +i+ "\">";
		    str +=arch[i].name;
		    str +="</td>";
			str +="<td id=\"date" +i+ "\">";
		    str +=arch[i].date;
		    str +="</td>";
			str +="<td class=\"dropdown\" id=\"hov_"+i+"\">";
			str +="</td>";
		    str +="</tr>";
			
		
		}	
		str +="</table>";
		document.getElementById("myTable").innerHTML=str;
		document.getElementById("mm").innerHTML="";

}


function Alltasks(){
	type=1;
	draw_table();
	Hell=[];
}

function completed(){
	type=2;
	Draw_comp();
	Hell=[];
}

function Inprogress(){
	type=3;
	Draw_prog();
	Hell=[];
}

function archived(){
	type=4;
	Draw_arch();
	Hell=[];
}

function draw_all(){
	document.getElementById("w").innerHTML=tasks.length;
	document.getElementById("x").innerHTML=prog.length;
	document.getElementById("y").innerHTML=comp.length;
	document.getElementById("z").innerHTML=arch.length;

	if(type==1)
	{
		draw_table();
	}
	else if(type==2)
	{
		Draw_comp();
	}
	else if(type==3)
	{
		Draw_prog();
	}
	else 
	{
		Draw_arch();
	}
	saveAll();
}

function sort_name(){
	
if(type==1){
tasks.sort(function(a, b){
 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});
}
if(type==2){
comp.sort(function(a, b){
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});
}
if(type==3){
prog.sort(function(a, b){
 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});
}
if(type==4){
arch.sort(function(a, b){
 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});
}
draw_all();
}

function sort_date(){
if(type==1){
tasks.sort(function(a, b){
 var nameA=a.date.toLowerCase(), nameB=b.date.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});

var i;
while(true)
{
	if(tasks[0].date=="")
	{
		tasks.push(tasks[0]);
		tasks.splice(0,1);
	}
	else
	{
		break;
	}
}

}
if(type==2){
comp.sort(function(a, b){
var nameA=a.date.toLowerCase(), nameB=b.date.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});

var i;
while(true)
{
	if(comp[0].date=="")
	{
		comp.push(comp[0]);
		comp.splice(0,1);
	}
	else
	{
		break;
	}
}
}
if(type==3){
prog.sort(function(a, b){
 var nameA=a.date.toLowerCase(), nameB=b.date.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});

var i;
while(true)
{
	if(prog[0].date=="")
	{
		prog.push(prog[0]);
		prog.splice(0,1);
	}
	else
	{
		break;
	}
}
}
if(type==4){
arch.sort(function(a, b){
 var nameA=a.date.toLowerCase(), nameB=b.date.toLowerCase()
 if (nameA < nameB) 
  return -1
 if (nameA > nameB)
  return 1
 return 0 
});

var i;
while(true)
{
	if(arch[0].date=="")
	{
		arch.push(arch[0]);
		arch.splice(0,1);
	}
	else
	{
		break;
	}
}
}

draw_all();
}


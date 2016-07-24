 var doingul=document.querySelector('.doing ul');
 var overul=document.querySelector('.over ul');
 var shu1=document.querySelector('h2>.shu1');
 var shu2=document.querySelector('h2>.shu2');
 var addlist=document.querySelector('.addlist');
 reload()
 var data=[];
 	 addlist.onkeydown=function(e){
	 	ev=e||window.event;
	 	if(ev.type=="keydown"&&ev.keyCode=="13"){
	 		 var val=this.value;
	 		 if(val.length==0){
	 		 	alert('内容不能为空');
	 		 	return;
	 		 }else{
		 		 var data=getData();
		 		 data.push({title:val,done:false});
		 		 this.value="";
		 		 saveData(data);
		 		 reload();
	 		 }
		}
	}

	 
	function saveData(data){
		localStorage.setItem('todos',JSON.stringify(data))
	}
    function getData(){
    	var data=JSON.parse(localStorage.getItem('todos'));
    	return data||[];
    }
    function reload(){
    	var data=getData();
		var doingstr="";
		var overstr="";
		var doingnum=0;
		var overnum=0;
		for(var i=0 ;i<data.length;i++){
			if(data[i].done==false){				
				doingstr+="<li class='list'><input type='checkbox' onclick=status("+i+",true) id='dian'><i contenteditable onblur=contentchange("+i+",this.innerHTML)>"+data[i].title+"</i><span style='color:white' onclick=removelist("+i+")>--</span></li>";
				doingnum++
			}else if(data[i].done==true){	
				overstr+="<li class='list'><input type='checkbox' onclick=status("+i+",false) id='dian'><i>"+data[i].title+"</i><span style='color:white' onclick=removelist("+i+")>--</span></li>";
				overnum++
			}
		}
		doingul.innerHTML=doingstr;
		overul.innerHTML=overstr;
		shu1.innerHTML=doingnum;
		shu2.innerHTML=overnum;
	}
	function status(i,sta){
		var data=getData();
		data[i].done=sta;
		saveData(data);
		reload();
	}
	function doing(){

	}
	function removelist(i){
		var data=getData();
		data.splice(i,1);
		saveData(data);
		reload();
	}
	function contentchange(i,text){
		var data=getData();
		data[i].title=text;
		saveData(data);
	}
	//清空数据
	// localStorage.clear()
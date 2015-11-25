/*! Fabrik */
var fabrikFullcalendar=new Class({Implements:[Options],options:{},initialize:function(a,b){this.el=document.id(a),this.setOptions(b),this.date=new Date,this.windowopts={id:"addeventwin",title:"add/edit event",loadMethod:"xhr",minimizable:!1,evalScripts:!0,width:380,height:320,onContentLoaded:function(a){a.fitToContent()}.bind(this)},"null"!==typeOf(this.el.getElement(".addEventButton"))&&this.el.getElement(".addEventButton").addEvent("click",function(a){this.openAddEvent(a)}.bind(this)),Fabrik.addEvent("fabrik.form.submitted",function(){jQuery("#calendar").fullCalendar("refetchEvents"),Fabrik.Windows.addeventwin.close()}.bind(this));{var c=[];this.options.url}this.options.eventLists.each(function(a,b){c.push({events:new Function("start","end","tz","callback","new Request({'url': '"+this.options.url.add+"&listid="+a.value+"&eventListKey="+b+"','evalScripts': true,'onSuccess': function (e, json) {\nif (typeOf(json) !== 'null') {\nthis.processEvents(json, callback);\n}}.bind(this, callback)}).send();").bind(this),color:a.colour})}.bind(this));var d=this,e="";this.options.show_week!==!1&&(e+="agendaWeek"),this.options.show_day!==!1&&(e.length>0&&(e+=","),e+="agendaDay"),e.length>0&&(e="month,"+e);var f="month";switch(this.options.default_view){case"monthView":break;case"weekView":this.options.show_week!==!1&&(f="agendaWeek");break;case"dayView":this.options.show_day!==!1&&(f="agendaDay")}var g=function(){};"addOnly"!=this.options.add_type&&(g=function(a,b){b.on("dblclick",{date:a},function(a){var b="month";d.openAddEvent(a,b,a.data.date)})}),jQuery("#calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:e},fixedWeekCount:!1,timeFormat:this.options.time_format,defaultView:f,nextDayThreshold:"00:00:00",eventSources:c,eventClick:function(a){return d.viewEntry(a),!1},dayRender:g,viewRender:function(a){"month"==a.name&&1==d.options.greyscaledweekend&&(jQuery("td.fc-sat").css("background","#f2f2f2"),jQuery("td.fc-sun").css("background","#f2f2f2"))}})},processEvents:function(a,b){a=$H(JSON.decode(a));var c=[];a.each(function(a){c.push({title:a.label,start:a.startdate_locale,end:a.enddate_locale,url:a.link,listid:a._listid,rowid:a.__pk_val,formid:a._formid})}.bind(c)),b(c)},addEvForm:function(a){"undefined"!=typeof jQuery&&jQuery(this.popOver).popover("hide"),this.windowopts.id="addeventwin";var b="index.php?option=com_fabrik&controller=visualization.fullcalendar&view=visualization&task=addEvForm&format=raw&listid="+a.listid+"&rowid="+a.rowid;b+="&jos_fabrik_calendar_events___visualization_id="+this.options.calendarId,b+="&visualizationid="+this.options.calendarId,a.nextView&&(b+="&nextview="+a.nextView),b+="&fabrik_window_id="+this.windowopts.id,"undefined"!=typeof this.doubleclickdate&&(b+="&start_date="+this.doubleclickdate),this.windowopts.type="window",this.windowopts.contentURL=b;var c=this.options.filters;this.windowopts.onContentLoaded=function(a){c.each(function(a){if(document.id(a.key))switch(document.id(a.key).get("tag")){case"select":document.id(a.key).selectedIndex=a.val;break;case"input":document.id(a.key).value=a.val}}),a.fitToContent(!1)}.bind(this),Fabrik.getWindow(this.windowopts)},viewEntry:function(a){var b={};b.id=a.formid,b.rowid=a.rowid,b.listid=a.listid,b.nextView="details",this.addEvForm(b)},openAddEvent:function(a,b,c){var e,f,g,h,i,j,k,l;this.options.canAdd!==!1&&("monthView"!==this.options.viewType||this.options.readonlyMonth!==!0)&&("dblclick"!=a.type&&a.stop(),a.target.hasClass("addEventButton")?(k=new Date,e=k.getTime()):(k=new Date,k=c.toDate(),e=k.getTime()),this.dateInLimits(e)&&(a.target.get("data-date")&&console.log("data-date = ",a.target.get("data-date")),this.date.setTime(e),d=0,isNaN(e)||""===e||(l=new Date,l.setTime(e),i=l.getMonth()+1,i=10>i?"0"+i:i,f=l.getDate(),f=10>f?"0"+f:f,"month"!==b?(g=l.getHours(),g=10>g?"0"+g:g,h=l.getMinutes(),h=10>h?"0"+h:h):(g="00",h="00"),this.doubleclickdate=l.getFullYear()+"-"+i+"-"+f+" "+g+":"+h+":00",d="&jos_fabrik_calendar_events___start_date="+this.doubleclickdate),this.options.eventLists.length>1?this.openChooseEventTypeForm(this.doubleclickdate,e):(j={},j.rowid="",j.id="",d="&"+this.options.eventLists[0].startdate_element+"="+this.doubleclickdate,j.listid=this.options.eventLists[0].value,this.addEvForm(j))))},dateInLimits:function(a){var b=new Date;if(b.setTime(a),""!==this.options.dateLimits.min){var c=new Date(this.options.dateLimits.min);if(c>b)return alert(Joomla.JText._("PLG_VISUALIZATION_FULLCALENDAR_DATE_ADD_TOO_EARLY")),!1}if(""!==this.options.dateLimits.max){var d=new Date(this.options.dateLimits.max);if(b>d)return alert(Joomla.JText._("PLG_VISUALIZATION_FULLCALENDAR_DATE_ADD_TOO_LATE")),!1}return!0},openChooseEventTypeForm:function(a,b){var c="index.php?option=com_fabrik&tmpl=component&view=visualization&controller=visualization.fullcalendar&task=chooseaddevent&id="+this.options.calendarId+"&d="+a+"&rawd="+b;c+="&renderContext="+this.el.id.replace(/visualization_/,""),this.windowopts.contentURL=c,this.windowopts.id="chooseeventwin",this.windowopts.onContentLoaded=function(){new Fx.Scroll(window).toElement("chooseeventwin")},Fabrik.getWindow(this.windowopts)}});
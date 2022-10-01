import{h as f}from"./http-common.b8517154.js";import{_ as k,F as D,r as b,o as c,c as u,a as n,b as s,w as a,n as v,f as m,e as P,t as S,p as w,g as V}from"./index.03501aa5.js";class U{getAll(){return f.get("/patients")}getById(t){return f.get(`/patients/${t}`)}create(t){return f.post("/patients",t)}update(t,_){return f.put(`/patients/${t}`,_)}delete(t){return f.delete(`/patients/${t}`)}findByTitle(t){return f.get(`/patients?title=${t}`)}}const I={name:"patient-list",data(){return{patients:[],patientDialog:!1,deletePatientDialog:!1,deletePatientsDialog:!1,patient:{},selectedPatients:null,filters:{},submitted:!1,patientsService:null}},created(){this.patientsService=new U,this.patientsService.getAll().then(i=>{this.patients=i.data,console.log(this.patients),this.patients.forEach(t=>this.getDisplayablePatient(t)),console.log(this.patients)}),this.initFilters()},methods:{getDisplayablePatient(i){return i.status=i.published,i},getStorablePatient(i){return{id:i.id,name:i.name,age:i.age,reservation:i.reservation,invoices:i.invoices,phone:i.phone}},openNew(){this.patient={},this.submitted=!1,this.patientDialog=!0},hideDialog(){this.patientDialog=!1,this.submitted=!1},findIndexById(i){return console.log(`current id: ${i}`),this.patients.findIndex(t=>t.id===i)},savePatient(){this.submitted=!0,this.patient.name.trim()&&(this.patient.id?(console.log(this.patient),this.patient=this.getStorablePatient(this.patient),this.patientsService.update(this.patient.id,this.patient).then(i=>{console.log(i.data.id),this.patients[this.findIndexById(i.data.id)]=this.getDisplayablePatient(i.data),this.$toast.add({severity:"success",summary:"Successful",detail:"patients Updated",life:3e3}),console.log(i)})):(this.patient.id=0,console.log(this.patient),this.patient=this.getStorablePatient(this.patient),this.patientsService.create(this.patient).then(i=>{this.patient=this.getDisplayablePatient(i.data),this.patients.push(this.patient),this.$toast.add({severity:"success",summary:"Successful",detail:"Patient Created",life:3e3}),console.log(i)})),this.patientDialog=!1,this.patient={})},editPatient(i){console.log(i),this.patient={...i},console.log(this.patient),this.patientDialog=!0},confirmDeletePatient(i){this.patient=i,this.deletePatientDialog=!0},deletePatient(){this.patientsService.delete(this.patient.id).then(i=>{this.patients=this.patients.filter(t=>t.id!==this.patients.id),this.deletePatientsDialog=!1,this.patient={},this.$toast.add({severity:"success",summary:"Successful",detail:"Patient Deleted",life:3e3}),console.log(i)})},exportToCSV(){this.$refs.dt.exportCSV()},confirmDeleteSelected(){this.deletePatientsDialog=!0},deleteSelectedPatients(){this.selectedPatients.forEach(i=>{this.patientsService.delete(i.id).then(t=>{this.patients=this.patients.filter(_=>_.id!==this.patient.id),console.log(t)})}),this.deletePatientsDialog=!1},initFilters(){this.filters={global:{value:null,matchMode:D.CONTAINS}}}}},p=i=>(w("data-v-46019778"),i=i(),V(),i),N={class:"card"},q={class:"table-header flex flex-column md:flex-row md:justify-content-between"},M=p(()=>n("h5",{class:"mb-2 md:m-0 p-as-md-center text-xl"},"Manage Patients",-1)),L={class:"p-input-icon-left"},A=p(()=>n("i",{class:"pi pi-search"},null,-1)),B={class:"field mt-3"},T={class:"p-float-label"},F=p(()=>n("label",{for:"name"},"Name",-1)),R={key:0,class:"p-error"},E={class:"field"},O={class:"p-float-label"},Y=p(()=>n("label",{for:"age"},"Age",-1)),j={key:0,class:"p-error"},z={class:"field"},K={class:"p-float-label"},G=p(()=>n("label",{for:"reservation"},"Reservation",-1)),H={key:0,class:"p-error"},J={class:"field"},Q={class:"p-float-label"},W=p(()=>n("label",{for:"invoices"},"Invoices",-1)),X={key:0,class:"p-error"},Z={class:"field"},$={class:"p-float-label"},ee=p(()=>n("label",{for:"phone"},"Phone",-1)),te={key:0,class:"p-error"},ie={class:"confirmation-content"},se=p(()=>n("i",{class:"pi pi-exclamation-triangle mr-3",style:{}},null,-1)),le={key:0},ne={class:"confirmation-content"},oe=p(()=>n("i",{class:"pi pi-exclamation-triangle mr-3",style:{}},null,-1)),ae={key:0};function re(i,t,_,pe,e,r){const o=b("pv-button"),y=b("pv-toolbar"),h=b("pv-input-text"),d=b("pv-column"),C=b("pv-data-table"),g=b("pv-dialog");return c(),u("div",null,[n("div",N,[s(y,{class:"mb-4"},{start:a(()=>[s(o,{label:"New",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:r.openNew},null,8,["onClick"]),s(o,{label:"Delete",icon:"pi pi-trash",class:"p-button-danger",onClick:r.confirmDeleteSelected,disabled:!e.selectedPatients||!e.selectedPatients.length},null,8,["onClick","disabled"])]),end:a(()=>[s(o,{label:"Export",icon:"pi pi-download",class:"p-button-help",onClick:t[0]||(t[0]=l=>r.exportToCSV(l))})]),_:1}),s(C,{ref:"dt",value:e.patients,selection:e.selectedPatients,"onUpdate:selection":t[2]||(t[2]=l=>e.selectedPatients=l),dataKey:"id",paginator:!0,rows:10,filters:e.filters,paginatorTemplate:`FirstPageLink PrevPageLink PageLinks\r
NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown`,rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`Showing {first} to {last} of\r
{totalRecords} patients`,responsiveLayout:"scroll"},{header:a(()=>[n("div",q,[M,n("span",L,[A,s(h,{modelValue:e.filters.global.value,"onUpdate:modelValue":t[1]||(t[1]=l=>e.filters.global.value=l),placeholder:"Search..."},null,8,["modelValue"])])])]),default:a(()=>[s(d,{selectionMode:"multiple",style:{width:"3rem"},exportable:!1}),s(d,{field:"id",header:"Id",sortable:!0,style:{"min-width":"12rem"}}),s(d,{field:"name",header:"name",sortable:!0,style:{"min-width":"16rem"}}),s(d,{field:"age",header:"age",sortable:!0,style:{"min-width":"16rem"}}),s(d,{field:"reservation",header:"reservation",sortable:!0,style:{"min-width":"16rem"}}),s(d,{field:"invoices",header:"invoices",sortable:!0,style:{"min-width":"16rem"}}),s(d,{field:"phone",header:"phone",sortable:!0,style:{"min-width":"16rem"}}),s(d,{exportable:!1,style:{"min-width":"8rem"}},{body:a(l=>[s(o,{icon:"pi pi-pencil",class:"p-button-text p-button-rounded",onClick:x=>r.editPatient(l.data)},null,8,["onClick"]),s(o,{icon:"pi pi-trash",class:"p-button-text p-button-rounded",onClick:x=>r.confirmDeletePatient(l.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"])]),s(g,{visible:e.patientDialog,"onUpdate:visible":t[8]||(t[8]=l=>e.patientDialog=l),style:{width:"450px"},header:"Patient Information",modal:!0,class:"p-fluid"},{footer:a(()=>[s(o,{label:"Cancel".toUpperCase(),icon:"pi pi-times",class:"p-button-text",onClick:r.hideDialog},null,8,["label","onClick"]),s(o,{label:"Save".toUpperCase(),icon:"pi pi-check",class:"p-button-text",onClick:r.savePatient},null,8,["label","onClick"])]),default:a(()=>[n("div",B,[n("span",T,[s(h,{type:"text",id:"title",modelValue:e.patient.name,"onUpdate:modelValue":t[3]||(t[3]=l=>e.patient.name=l),modelModifiers:{trim:!0},required:"true",autofocus:"",class:v({"p-invalid":e.submitted&&!e.patient.name})},null,8,["modelValue","class"]),F,e.submitted&&!e.patient.name?(c(),u("small",R,"Name is required.")):m("",!0)])]),n("div",E,[n("span",O,[s(h,{type:"number",id:"age",modelValue:e.patient.age,"onUpdate:modelValue":t[4]||(t[4]=l=>e.patient.age=l),modelModifiers:{trim:!0},required:"true",autofocus:"",class:v({"p-invalid":e.submitted&&!e.patient.age})},null,8,["modelValue","class"]),Y,e.submitted&&!e.patient.age?(c(),u("small",j,"Age is required.")):m("",!0)])]),n("div",z,[n("span",K,[s(h,{type:"number",id:"reservation",modelValue:e.patient.reservation,"onUpdate:modelValue":t[5]||(t[5]=l=>e.patient.reservation=l),modelModifiers:{trim:!0},required:"true",autofocus:"",class:v({"p-invalid":e.submitted&&!e.patient.reservation})},null,8,["modelValue","class"]),G,e.submitted&&!e.patient.reservation?(c(),u("small",H,"reservation is required.")):m("",!0)])]),n("div",J,[n("span",Q,[s(h,{type:"number",id:"invoices",modelValue:e.patient.invoices,"onUpdate:modelValue":t[6]||(t[6]=l=>e.patient.invoices=l),modelModifiers:{trim:!0},required:"true",autofocus:"",class:v({"p-invalid":e.submitted&&!e.patient.invoices})},null,8,["modelValue","class"]),W,e.submitted&&!e.patient.invoices?(c(),u("small",X,"invoices is required.")):m("",!0)])]),n("div",Z,[n("span",$,[s(h,{type:"number",id:"phone",modelValue:e.patient.phone,"onUpdate:modelValue":t[7]||(t[7]=l=>e.patient.phone=l),modelModifiers:{trim:!0},required:"true",autofocus:"",class:v({"p-invalid":e.submitted&&!e.patient.phone})},null,8,["modelValue","class"]),ee,e.submitted&&!e.patient.phone?(c(),u("small",te,"phone is required.")):m("",!0)])])]),_:1},8,["visible"]),s(g,{visible:e.deletePatientDialog,"onUpdate:visible":t[10]||(t[10]=l=>e.deletePatientDialog=l),style:{width:"450px"},header:"Confirm",modal:!0},{footer:a(()=>[s(o,{label:"No".toUpperCase(),icon:"pi pi-times",class:"p-button-text",onClick:t[9]||(t[9]=l=>e.deletePatientDialog=!1)},null,8,["label"]),s(o,{label:"Yes".toUpperCase(),icon:"pi pi-check",class:"p-button-text",onClick:r.deletePatient},null,8,["label","onClick"])]),default:a(()=>[n("div",ie,[se,e.patient?(c(),u("span",le,[P("Are you sure you want to delete "),n("b",null,S(e.patient.title),1),P("?")])):m("",!0)])]),_:1},8,["visible"]),s(g,{visible:e.deletePatientsDialog,"onUpdate:visible":t[12]||(t[12]=l=>e.deletePatientsDialog=l),style:{width:"450px"},header:"Confirm",modal:!0},{footer:a(()=>[s(o,{label:"No".toUpperCase(),icon:"pi pi-times",class:"p-button-text",onClick:t[11]||(t[11]=l=>e.deletePatientsDialog=!1)},null,8,["label"]),s(o,{label:"Yes".toUpperCase(),icon:"pi pi-check",class:"p-button-text",onClick:r.deleteSelectedPatients},null,8,["label","onClick"])]),default:a(()=>[n("div",ne,[oe,e.patient?(c(),u("span",ae,"Are you sure you want to delete the selected patients?")):m("",!0)])]),_:1},8,["visible"])])}const ue=k(I,[["render",re],["__scopeId","data-v-46019778"]]);export{ue as default};

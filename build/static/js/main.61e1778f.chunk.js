(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.e8ba0555.png"},function(e,t,a){e.exports=a.p+"static/media/cards.5d6cd32d.png"},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAAeCAYAAAAB6YS9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALtSURBVHgB7d3fURpBAMfx366AgTgGZ5LM5I0OYirQDmIHxhJSQbSDpIKYDrQD0gHpgHeT6Dgi/2+zSzSDzhAE9mAdv58XEfAe4O7rsnfcmV/XzgkAkBwrAECSCDQAJIpAA0CiCDQAJIpAA0CiCDQAJIpAA0CCnNOp4ThoAEiM04W1elcQlsu/8MboYurzjJqalVNt4kNOVb/MqvD4TVuH/OP+s/H0dWxcNn398CO5mpCvv+9tw1gdbJVN0whP0rlz1X5LNbOmqnXa9ivCjt8At8VGuFL+fWg6o7rfUH/4f6rNvlUj3P/Gb6zCk0Ogccd529WG0q6P9nsf7D0hXzcjJv9an/aMTggxxhFoTBRG2cOO9vye5H0/mtsVovEbXj1E2ZZ1vGXMbNMReDIINB5kNLLOdOhHeztiGmQ+frScSV9cUSevS6YhYAoCjZncToEYp08i1A9zE+ZCRZ8ZLWMWBBpz+9l2Hwj1fxBmLIhAY2GE+h7CjEgINKI5a7lDa7SvHELtXCY36MsW17WILCyjUFQuCDMiI9CIamxn4r4i6rUuNOhcydiCipVNFdYrM/191u+q174c/Sw821DpecTv7BBm5IRAIxexQ50Ne+pe/pbLBqPfHxrq8TAHtrCu0sYL2bWSojA6ttLRFscvIwcEGrkKoXbS11jHUQ+61+pfX04NdXjeoNv6F+Z5R96ThOOYh0ZHr8qmLiAnBBpLEXtH4qRQB3fuN3Y0pVEob4xuR9DMjA4IM5aBQGOpYoY6RHjQCSPlK387u/NY9DD7eWZn9fFl2RwLWBICjZWIHeowag6j6qBY3owaZnYAYlUINFYqdqiDMN2xMMKMBBBoJCGhL7s0M6dvhBkpINBISgj1Ks6ex1EZSBGBRpKWcvY8zi6HxBFoJO+s7cLZ8/as044zo6u+zM0vp5EZfffLOWG0jNQRaDwq4SICg462baZdP7p+O7qOnlPt/vXywqWjbg6Na9xePmqtojrzynhM/gClZWTtD2yBNAAAAABJRU5ErkJggg=="},function(e,t,a){e.exports=a(35)},,,,,,,,function(e,t,a){},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),o=a.n(c),l=(a(24),a(6)),s=a(3);var i=a(37).a.create({baseURL:"http://3.133.158.10:3000",headers:{"Content-Type":"application/json"}});const m=Object(n.createContext)(),d=e=>{let{children:t}=e;const[a,c]=Object(n.useState)(()=>{const e=localStorage.getItem("authToken");return console.log("Initial token from localStorage:",e),e?{token:e,userType:localStorage.getItem("userType")}:{}});return Object(n.useEffect)(()=>{console.log("Auth state on mount:",a);(async()=>{if(a.token&&!a.userType)try{console.log("Fetching user data with token:",a.token);const t=await i.get("/users/me",{headers:{Authorization:"Bearer ".concat(a.token)}}),{userType:n}=t.data;c(e=>({...e,userType:n})),localStorage.setItem("userType",n),console.log("Fetched user data - UserType:",n)}catch(e){console.error("Error fetching user data:",e)}})(),a.token?(localStorage.setItem("authToken",a.token),console.log("Token set in localStorage:",localStorage.getItem("authToken"))):(localStorage.removeItem("authToken"),localStorage.removeItem("userType"),console.log("Token removed from localStorage"))},[a]),r.a.createElement(m.Provider,{value:{auth:a,setAuth:c}},a.userType?t:r.a.createElement("div",null,"Loading..."))};var u=m,g=(a(29),a(13)),p=a.n(g),E=a(14),v=a.n(E);var h=()=>{const[e,t]=Object(n.useState)(""),[a,c]=Object(n.useState)(""),[o,l]=Object(n.useState)(""),{setAuth:m}=Object(n.useContext)(u),d=Object(s.o)();return r.a.createElement("div",{className:"background-wrapper"},r.a.createElement("div",{className:"login-container"},r.a.createElement("div",{className:"login-header"},r.a.createElement("img",{src:p.a,alt:"Fitclub",className:"logo"}),r.a.createElement("p",null,"\u06cc\u06a9 \u0627\u0634\u062a\u0631\u0627\u06a9 \u0628\u0631\u0627\u06cc \u062a\u0645\u0627\u0645\u06cc \u06a9\u0644\u0627\u0633 \u0647\u0627")),r.a.createElement("div",{className:"login-cards"},r.a.createElement("img",{src:v.a,alt:"Class 2",className:"full-width-image"})),r.a.createElement("form",{className:"login-form",onSubmit:async t=>{t.preventDefault();try{console.log("Submitting login form with:",{phonenumber:e,password:a});const t=await i.post("/auth/login",{phonenumber:e,password:a});console.log("Login response:",t.data),l("Login successful!"),m({token:t.data.token}),localStorage.setItem("authToken",t.data.token),console.log("Token stored in localStorage:",localStorage.getItem("authToken")),d("/calendar")}catch(n){console.error("Error:",n.response?n.response.data:n.message),l("Login failed. Please check your credentials and try again.")}}},r.a.createElement("label",{htmlFor:"phonenumber",className:"right-aligned"},"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644"),r.a.createElement("input",{type:"text",id:"phonenumber",name:"phonenumber",placeholder:"091********",value:e,onChange:e=>t(e.target.value)}),r.a.createElement("label",{htmlFor:"password",className:"right-aligned"},"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),r.a.createElement("input",{type:"password",id:"password",name:"password",placeholder:"********",value:a,onChange:e=>c(e.target.value)}),r.a.createElement("button",{type:"submit",className:"login-button"},"\u0648\u0631\u0648\u062f")),o&&r.a.createElement("p",null,o)))},b=a(11),A=a.n(b);a(30),a(31);var N=e=>{let{children:t}=e;return r.a.createElement("div",{className:"background-wrapper"},r.a.createElement("div",{className:"container"},t))},f=a(15),k=a.n(f);a(32);var S=e=>{let{isEventLive:t,englishToFarsiNumbers:a,formatTime:c,formatTimeWAP:o,calculateEndTime:l,onEdit:s}=e;const[m,d]=Object(n.useState)([]),{auth:g}=Object(n.useContext)(u),p=Object(n.useCallback)(async()=>{console.log("Fetching events...");try{const a=await i.get("/calendar",{headers:{Authorization:"Bearer ".concat(g.token)}});console.log("Fetched events:",a.data);const n=a.data.sort((e,a)=>{const n=t(e.time_date,90);return t(a.time_date,90)-n});d(n)}catch(e){console.error("Error fetching events:",e)}},[g.token,t]);return Object(n.useEffect)(()=>{p()},[p]),r.a.createElement("div",{className:"calendar-events"},m.map(e=>{const n=a(c(e.time_date)),i=a(o(e.time_date)),m=a(c(l(e.time_date,90))),d=t(e.time_date,90);return r.a.createElement("div",{key:e.id,className:"event-wrapper-horizontal"},r.a.createElement("div",{className:"event-time"},i),r.a.createElement("div",{key:e.id,className:"event-wrapper-vertical"},r.a.createElement("div",{className:"event-card",style:{backgroundColor:"#E3FDDD"}},r.a.createElement("div",{className:"event-info"},r.a.createElement("h2",null,"".concat(m," - ").concat(n)),r.a.createElement("h3",null,e.trainer_name),r.a.createElement("p",null,e.title)),r.a.createElement("div",{className:"trainer-image-container"},r.a.createElement("div",{className:"trainer-image-wrapper ".concat(d?"live":"")},r.a.createElement("img",{src:e.trainer_image,alt:e.trainer_name,className:"trainer-image"}),d&&r.a.createElement("div",{className:"online-text"},"\u0622\u0646\u0644\u0627\u06cc\u0646")))),r.a.createElement("div",{className:"event-actions"},r.a.createElement("button",{className:"join-button",onClick:()=>window.location.href=e.live_video_link},"\u0648\u0631\u0648\u062f \u0628\u0647 \u0644\u0627\u06cc\u0648"),"admin"===g.userType&&r.a.createElement("button",{className:"join-button",onClick:()=>s(e)},"\u0648\u06cc\u0631\u0627\u06cc\u0634"))))}))};var y=()=>{const[e,t]=Object(n.useState)(""),[a,c]=Object(n.useState)([]),[o,l]=Object(n.useState)([]),[i,m]=Object(n.useState)(""),{auth:d}=Object(n.useContext)(u),g=Object(s.o)();Object(n.useEffect)(()=>{console.log("Calendar component auth state:",d)},[d]);const p=Object(n.useCallback)((e,t)=>{const a=new Date,n=e.split("T")[0],r=e.split("T")[1].split(".")[0],c="".concat(n,"T").concat(r),o=new Date(c),l=new Date(o.getTime()+6e4*t);return console.log("Current Time:",a.toString()),console.log("Start Time:",o.toString()),console.log("End Time:",l.toString()),console.log("Is Live:",a>=o&&a<=l),console.log("User:",d.userType),a>=o&&a<=l},[d.userType]),E=Object(n.useCallback)(()=>{const e=["\u0641\u0631\u0648\u0631\u062f\u06cc\u0646","\u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a","\u062e\u0631\u062f\u0627\u062f","\u062a\u06cc\u0631","\u0645\u0631\u062f\u0627\u062f","\u0634\u0647\u0631\u06cc\u0648\u0631","\u0645\u0647\u0631","\u0622\u0628\u0627\u0646","\u0622\u0630\u0631","\u062f\u06cc","\u0628\u0647\u0645\u0646","\u0627\u0633\u0641\u0646\u062f"],a=new Date,n=A.a.toJalaali(a.getFullYear(),a.getMonth()+1,a.getDate()),r=n.jm-1;t(e[r]),m(b("".concat(n.jd," ").concat(e[r],", ").concat(v(a.getDay()))))},[]);Object(n.useEffect)(()=>{E(),h()},[E]);const v=e=>["\u0634\u0646\u0628\u0647","\u06cc\u06a9\u0634\u0646\u0628\u0647","\u062f\u0648\u0634\u0646\u0628\u0647","\u0633\u0647\u200c\u0634\u0646\u0628\u0647","\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647","\u067e\u0646\u062c\u0634\u0646\u0628\u0647","\u062c\u0645\u0639\u0647"][(e+1)%7],h=()=>{const e=["\u0634","\u06cc","\u062f","\u0633","\u0686","\u067e","\u062c"],t=new Date,a=A.a.toJalaali(t.getFullYear(),t.getMonth()+1,t.getDate()).jd,n=(t.getDay()+1)%7,r=[],o=[];for(let c=-3;c<=3;c++){const t=(n+c+7)%7;r.push(e[t]);const l=a+c;o.push(l)}c(r),l(o)},b=e=>{const t=["0","1","2","3","4","5","6","7","8","9"],a=["\u06f0","\u06f1","\u06f2","\u06f3","\u06f4","\u06f5","\u06f6","\u06f7","\u06f8","\u06f9"];return e.replace(/\d/g,e=>a[t.indexOf(e)])};return r.a.createElement(N,null,r.a.createElement("div",{className:"container"},"admin"===d.userType&&r.a.createElement("button",{className:"add-button",onClick:()=>g("/add-calendar-record")},"+"),r.a.createElement("div",{className:"calendar-header"},r.a.createElement("h3",{className:"title-text"},"\u0644\u0627\u06cc\u0648\u0647\u0627\u06cc \u0628\u0631\u0646\u0627\u0645\u0647 \u0631\u06cc\u0632\u06cc \u0634\u062f\u0647"),r.a.createElement("p",{className:"current-month"},e),r.a.createElement("div",{className:"weekdays-row"},a.map((e,t)=>r.a.createElement("div",{key:t,className:"weekday ".concat(3===t?"current-day":"")},e))),r.a.createElement("div",{className:"days-row"},o.map((e,t)=>r.a.createElement("div",{key:t,className:"day-number ".concat(3===t?"current-day-number":"")},b(e.toString()))))),r.a.createElement("div",{className:"edge"},r.a.createElement("img",{src:k.a,alt:"Fitclub",className:"edge"})),r.a.createElement("div",{className:"current-date"},r.a.createElement("p",{className:"formatted-date"},i)),r.a.createElement(S,{isEventLive:p,englishToFarsiNumbers:b,formatTime:e=>{const t=new Date(e),a=t.getHours(),n=t.getMinutes().toString().padStart(2,"0");return"".concat((a%12===0?12:a%12).toLocaleString("fa-IR",{minimumIntegerDigits:2}),":").concat(n)},formatTimeWAP:e=>{const t=new Date(e),a=t.getHours(),n=t.getMinutes().toString().padStart(2,"0"),r=a<12?"\u0635\u0628\u062d":"\u0639\u0635\u0631";return"".concat((a%12===0?12:a%12).toLocaleString("fa-IR",{minimumIntegerDigits:2}),":").concat(n," ").concat(r)},calculateEndTime:(e,t)=>{const a=new Date(e);return new Date(a.getTime()+6e4*t).toISOString()},onEdit:e=>{g("/add-calendar-record?edit=".concat(e.id))}})))};a(33),a(34);var C=()=>{const[e,t]=Object(n.useState)({live_video_link:"",trainer_name:"",time_date:"",title:"",trainer_image:"",background_color:""}),{auth:a}=Object(n.useContext)(u),c=Object(s.o)(),o=Object(s.m)(),l=new URLSearchParams(o.search).get("edit");Object(n.useEffect)(()=>{l&&(async()=>{try{const n=(await i.get("/calendar/".concat(l),{headers:{Authorization:"Bearer ".concat(a.token)}})).data,r=new Date(n.time_date).toISOString().slice(0,16);t({...n,time_date:r})}catch(e){console.error("Error fetching event data:",e)}})()},[l,a.token]);const m=a=>{const{name:n,value:r}=a.target;t({...e,[n]:r})};return r.a.createElement(N,null,r.a.createElement("div",{className:"add-calendar-record-container"},r.a.createElement("h2",{className:"title"},l?"Edit Calendar Record":"Add Calendar Record"),r.a.createElement("form",{className:"add-calendar-record-form",onSubmit:async t=>{t.preventDefault();try{l?(await i.put("/calendar/".concat(l),e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a.token)}}),alert("Event updated successfully")):(await i.post("/calendar",e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a.token)}}),alert("Event added successfully")),c("/calendar")}catch(n){console.error("Error submitting event:",n.response?n.response.data:n.message),alert("Error submitting event")}}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"live_video_link"},"Live Video Link"),r.a.createElement("input",{type:"text",id:"live_video_link",name:"live_video_link",value:e.live_video_link,onChange:m,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"trainer_name"},"Trainer Name"),r.a.createElement("input",{type:"text",id:"trainer_name",name:"trainer_name",value:e.trainer_name,onChange:m,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"time_date"},"Time and Date"),r.a.createElement("input",{type:"datetime-local",id:"time_date",name:"time_date",value:e.time_date,onChange:m,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Title"),r.a.createElement("input",{type:"text",id:"title",name:"title",value:e.title,onChange:m,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"trainer_image"},"Trainer Image URL"),r.a.createElement("input",{type:"text",id:"trainer_image",name:"trainer_image",value:e.trainer_image,onChange:m,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"background_color"},"Background Color"),r.a.createElement("input",{type:"color",id:"background_color",name:"background_color",value:e.background_color,onChange:m,required:!0})),r.a.createElement("button",{type:"submit",className:"submit-button"},l?"Update Event":"Add Event"),l&&r.a.createElement("button",{type:"button",className:"delete-button",onClick:async()=>{try{await i.delete("/calendar/".concat(l),{headers:{Authorization:"Bearer ".concat(a.token)}}),alert("Event deleted successfully"),c("/calendar")}catch(e){console.error("Error deleting event:",e),alert("Error deleting event")}}},"Delete Event"))))};var w=()=>r.a.createElement(d,null,r.a.createElement(l.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/login",element:r.a.createElement(h,null)}),r.a.createElement(s.a,{path:"/calendar",element:r.a.createElement(y,null)}),r.a.createElement(s.a,{path:"/add-calendar-record",element:r.a.createElement(C,null)}),r.a.createElement(s.a,{path:"/",element:r.a.createElement(h,null)}))));var T=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,38)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:c,getTTFB:o}=t;a(e),n(e),r(e),c(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null,r.a.createElement(w,null)))),T()}],[[16,1,2]]]);
//# sourceMappingURL=main.61e1778f.chunk.js.map